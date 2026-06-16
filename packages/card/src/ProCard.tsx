import type { VueNode } from '@antdv-next1/pro-utils'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { BorderBeamProps, CardProps, ColProps, RowProps } from 'antdv-next'
import type { Gutter } from 'antdv-next/dist/grid/row'
import type { App, CSSProperties, Plugin, VNode } from 'vue'
import type { Breakpoint, CollapsibleType } from './typing'
import { InfoCircleOutlined } from '@antdv-next/icons'
import {
  childrenToArray,
  isSpecialNode,
} from '@antdv-next1/pro-utils'
import { classNames } from '@v-c/util'
import { BorderBeam, Card, Col, Collapse, Row, Tooltip, useBreakpoint } from 'antdv-next'
import { responsiveArray } from 'antdv-next/dist/_util/responsiveObserver'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent, isVNode, ref, watch } from 'vue'
import useStyle from './style'

export interface ProCardProps extends CardProps, RowProps {
  /** 标题说明 */
  tooltip?: VueNode
  /** 拆分卡片方式 */
  split?: 'vertical' | 'horizontal'
  /** 指定 Flex 方向，仅在嵌套子卡片时有效 */
  direction?: 'column' | 'row'
  /** 栅格间距 */
  gutter?: Gutter | [Gutter, Gutter]
  colStyle?: CSSProperties
  /** 边框流光 */
  borderBeam?: BorderBeamProps | boolean
  /** 布局，center 代表垂直居中 */
  layout?: 'default' | 'center'
  /** 是否有卡片阴影 */
  boxShadow?: boolean
  disabled?: boolean
  /** 头部是否有分割线 */
  headerBordered?: boolean
  /** 幽灵模式，即是否取消卡片内容区域的 padding 和 背景颜色。 */
  ghost?: boolean
  collapsible?: CollapsibleType
  /** 受控 collapsed 属性 */
  collapsed?: boolean
  /** 折叠按钮自定义节点 */
  collapsibleIconRender?: ({ collapsed }: { collapsed: boolean }) => VueNode
  /** 配置默认是否折叠 */
  defaultCollapsed?: boolean
  /** 收起卡片的事件 */
  onCollapse?: (collapsed: boolean) => void
  /** 是否展示选中样式 */
  checked?: boolean
  /** 选中改变 */
  onChecked?: (e: MouseEvent) => void
  /** 栅格占位格数，24 栅格，colSpan={6} */
  colSpan?: ColProps['span']
  /** 栅格左侧的间隔格数，间隔内不可以有栅格 */
  colOffset?: ColProps['offset']
  /** flex 布局填充 */
  colFlex?: ColProps['flex']
  /** 栅格顺序，flex 布局模式下有效 */
  colOrder?: ColProps['order']
  /** 栅格向左移动格数 */
  colPull?: ColProps['pull']
  colPush?: ColProps['push']
  /** <576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  colXs?: ColProps['xs']
  /**  ≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  colSm?: ColProps['sm']
  /** ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  colMd?: ColProps['md']
  /** ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  colLg?: ColProps['lg']
  /** ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  colXl?: ColProps['xl']
  /** ≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  colXxl?: ColProps['xxl']
  onClick?: (e: MouseEvent) => void
}

const _ProCard = defineComponent<ProCardProps, {}, string, CustomSlotsType<{
  default?: () => VNode[]
  extra?: () => VueNode
  title?: () => VueNode
}>>(
  (props, { slots, attrs }) => {
    const config = useConfig()
    const prefixCls = computed(() => props.prefixCls || config.value.getPrefixCls('pro'))
    const baseClassName = computed(() => `${prefixCls.value}-card`)
    const { wrapSSR, hashId } = useStyle(baseClassName)
    const activeKey = ref()
    const screens = useBreakpoint()
    /**
     * 根据响应式获取 gutter, 参考 antd 实现
     * @param gut
     */
    const getNormalizedGutter = (gut: Gutter | Gutter[]) => {
      const results: [number, number] = [0, 0]
      const normalizedGutter = Array.isArray(gut) ? gut : [gut, 0]
      normalizedGutter.forEach((g, index) => {
        if (typeof g === 'object') {
          for (let i = 0; i < responsiveArray.length; i += 1) {
            const breakpoint: Breakpoint | undefined = responsiveArray[i]
            if (screens.value?.[breakpoint!] && g[breakpoint!] !== void 0) {
              results[index] = g[breakpoint!] as number
              break
            }
          }
        }
        else {
          results[index] = g || 0
        }
      })
      return results
    }
    /**
     * 根据条件返回 style.ts，负责返回空对象
     *
     * @param withStyle 是否符合条件
     * @param appendStyle 如果符合条件要返回的 style.ts 属性
     */
    const getStyle = (withStyle: boolean, appendStyle: CSSProperties) => {
      return withStyle ? appendStyle : {}
    }
    watch(
      () => props.defaultCollapsed,
      (next) => {
        if (!next) {
          activeKey.value = ['collapseCard']
        }
      },
      {
        immediate: true,
      },
    )
    // 判断是否套了卡片，如果套了的话将自身卡片内部内容的 padding 设置为0
    let containProCard = false

    const slotTitleProps = computed(() => {
      if ((props.title && props.tooltip) || (slots.title && props.tooltip)) {
        return {
          title: () => (
            <>
              { props.title || slots.title?.() }
              <Tooltip v-slots={{ title: () => props.tooltip }}>
                <InfoCircleOutlined
                  style={{
                    marginInlineStart: '4px',
                    cursor: 'pointer',
                  }}
                />
              </Tooltip>
            </>
          ),
        }
      }
      if (slots.title && !props.tooltip) {
        return {
          title: slots.title,
        }
      }
      return {}
    })
    return () => {
      const {
        ghost,
        direction,
        boxShadow,
        colSpan,
        split,
        align,
        borderBeam,
        colStyle,
        headerBordered = false,
        collapsible = false,
        collapsibleIconRender,
        collapsed: controlCollapsed,
        defaultCollapsed = false,
        onChecked,
        checked,
        onCollapse,
        justify,
        colLg,
        colFlex,
        colMd,
        colXl,
        colXxl,
        colSm,
        colPush,
        colPull,
        colXs,
        disabled,
        gutter = 0,
        title,
        tooltip,
        ...rest
      } = props
      const [horizontalGutter, verticalGutter] = getNormalizedGutter(gutter)
      const { default: children, title: slotTitle, ...restSlots } = slots
      const childrenDom = childrenToArray(children?.())?.map((element) => {
        if (isVNode(element) && !isSpecialNode(element)) {
          if (
            element.props
            && (element.type as { isProCard: boolean }).isProCard
            && direction === 'column'
          ) {
            const colBreakpointKeyList: Array<keyof ColProps> = [
              'span',
              'flex',
              'offset',
              'order',
              'pull',
              'push',
              'xs',
              'sm',
              'md',
              'lg',
              'xl',
              'xxl',
            ]
            const colPropsClass = Object.entries(element.props).reduce(
              (prev, [key, value]) => {
                const keys = key.split('-')
                if (colBreakpointKeyList.includes(keys[keys.length - 1] as keyof ColProps)) {
                  if (['span', 'flex'].includes(keys[keys.length - 1] as string)) {
                    prev[`${baseClassName.value}-${keys[keys.length - 2]}-${value}`] = true
                  }
                  else {
                    prev[`${baseClassName.value}-${key}-${value}`] = true
                  }
                }
                return prev
              },
              {} as Record<string, any>,
            )
            containProCard = true
            return (
              <div
                style={{
                  ...getStyle(horizontalGutter! > 0, {
                    paddingInlineEnd: `${horizontalGutter / 2}px`,
                    paddingInlineStart: `${horizontalGutter / 2}px`,
                  }),
                  ...getStyle(verticalGutter! > 0, {
                    paddingBlockStart: `${verticalGutter / 2}px`,
                    paddingBlockEnd: `${verticalGutter / 2}px`,
                  }),
                }}
                class={classNames([`${baseClassName.value}-col`], colPropsClass)}
              >
                {element}
              </div>
            )
          }
          if ((element.type as { isProCard: boolean }).isProCard) {
            containProCard = true
            const colPropsKeyList: Array<keyof ColProps> = [
              'span',
              'flex',
              'offset',
              'order',
              'pull',
              'push',
              'xs',
              'sm',
              'md',
              'lg',
              'xl',
              'xxl',
            ]
            const colProps = colPropsKeyList.reduce((prev, key) => {
              console.log(key, prev, element.props?.[`col-${key}`],element, 'asdas')
              if (element.props?.[`col-${key}`] !== undefined) {
                prev[key] = element.props?.[`col-${key}`]
              }
              return prev
            }, {} as ColProps)
            console.log(colProps, element, 'colProps')
            return <Col {...colProps}>{element}</Col>
          }
        }
        return element
      })
      return wrapSSR(
        <>
          {collapsible ? (
            <Collapse
              bordered={rest.variant !== 'borderless'}
              {...(defaultCollapsed
                ? {}
                : {
                    activeKey: activeKey.value,
                    // 'onUpdate:activeKey': _activeKey => (activeKey.value = _activeKey),
                  })}
              class={classNames(baseClassName.value, attrs.class, hashId.value)}
              ghost={!ghost}
            >
              asdsa
              {/* <CollapsePanel
                key="collapseCard"
                {...(title && !tooltip && !slotTitle ? { header: title } : {})}
                headerClass={
                  headerBordered
                    ? `${baseClassName.value}-header ${baseClassName.value}-header-border`
                    : `${baseClassName.value}-header`
                }
                v-slots={{
                  ...((title && tooltip) || slotTitle
                    ? slotTitle
                      ? {
                          header: slotTitle,
                        }
                      : {
                          header: () => (
                            <>
                              {title}
                              <Tooltip title={tooltip}>
                                <InfoCircleOutlined
                                  style={{
                                    marginInlineStart: '4px',
                                    cursor: 'pointer',
                                  }}
                                />
                              </Tooltip>
                            </>
                          ),
                        }
                    : {}),
                  default: () => slots.default?.(),
                }}
              /> */}
            </Collapse>
          ) : (
            <>
              {
                rest.variant !== 'borderless' && borderBeam && !disabled ? (
                  <BorderBeam {...(typeof borderBeam === 'boolean' ? {} : borderBeam)}>
                    <Card
                      {...attrs}
                      {...rest}
                      class={classNames(baseClassName.value, attrs.class, hashId.value, {
                        [`${baseClassName.value}-direction-column`]:
                  split === 'horizontal' || direction === 'column',
                        [`${baseClassName.value}-ghost`]: ghost,
                        [`${baseClassName.value}-box-shadow`]: boxShadow,
                        [`${baseClassName.value}-contain-card`]: containProCard,
                      })}
                      {...(title && !tooltip && !slotTitle ? { title } : {})}
                      styles={{
                        header: headerBordered ? { } : { borderBlockEnd: 'none' },
                        ...rest.styles,
                      }}
                      v-slots={{
                        ...restSlots,
                        ...slotTitleProps.value,
                      }}
                    >
                      {direction !== 'column' && containProCard ? (
                        <Row gutter={gutter}>{childrenDom}</Row>
                      ) : ghost && containProCard ? (
                        <div
                          class={`${baseClassName.value}-column`}
                          style={{
                            ...getStyle(horizontalGutter! > 0, {
                              marginInlineEnd: `-${horizontalGutter / 2}px`,
                              marginInlineStart: `-${horizontalGutter / 2}px`,
                            }),
                            ...getStyle(verticalGutter! > 0, {
                              marginBlockStart: `-${verticalGutter / 2}px`,
                              marginBlockEnd: `-${verticalGutter / 2}px`,
                            }),
                          }}
                        >
                          {childrenDom}
                        </div>
                      ) : (
                        childrenDom
                      )}
                    </Card>
                  </BorderBeam>
                ) : (
                  <Card
                    {...attrs}
                    {...rest}
                    class={classNames(baseClassName.value, attrs.class, hashId.value, {
                      [`${baseClassName.value}-direction-column`]:
                  split === 'horizontal' || direction === 'column',
                      [`${baseClassName.value}-ghost`]: ghost,
                      [`${baseClassName.value}-disabled`]: disabled,
                      [`${baseClassName.value}-box-shadow`]: boxShadow,
                      [`${baseClassName.value}-contain-card`]: containProCard,
                    })}
                    {...(title && !tooltip && !slotTitle ? { title } : {})}
                    styles={{
                      header: headerBordered ? { } : { borderBlockEnd: 'none' },
                      ...rest.styles,
                    }}
                    v-slots={{
                      ...restSlots,
                      ...slotTitleProps.value,
                    }}
                  >
                    {direction !== 'column' && containProCard ? (
                      <Row gutter={gutter}>{childrenDom}</Row>
                    ) : ghost && containProCard ? (
                      <div
                        class={`${baseClassName.value}-column`}
                        style={{
                          ...getStyle(horizontalGutter! > 0, {
                            marginInlineEnd: `-${horizontalGutter / 2}px`,
                            marginInlineStart: `-${horizontalGutter / 2}px`,
                          }),
                          ...getStyle(verticalGutter! > 0, {
                            marginBlockStart: `-${verticalGutter / 2}px`,
                            marginBlockEnd: `-${verticalGutter / 2}px`,
                          }),
                        }}
                      >
                        {childrenDom}
                      </div>
                    ) : (
                      childrenDom
                    )}
                  </Card>
                )
              }
            </>
          )}
        </>,
      )
    }
  },
  {
    name: 'ProCard',
    inheritAttrs: false,
  },
)

const ProCard = _ProCard as typeof _ProCard & Plugin & {
  isProCard?: boolean
}

ProCard.isProCard = true
ProCard.install = (app: App) => {
  app.component(ProCard.name, ProCard)
  return app
}

export default ProCard
