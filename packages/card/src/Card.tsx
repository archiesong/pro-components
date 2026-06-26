import type { VueNode } from '@antdv-next1/pro-utils'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { ColProps } from 'antdv-next'
import type { Gutter } from 'antdv-next/dist/grid/row'
import type { CSSProperties, VNode } from 'vue'
import type { ProCardProps } from './ProCard'
import type { Breakpoint } from './typing'
import {
  childrenToArray,
  isSpecialNode,
} from '@antdv-next1/pro-utils'
import { InfoCircleOutlined } from '@antdv-next/icons'
import { classNames } from '@v-c/util'
import { BorderBeam, Card, Col, Collapse, Row, Tooltip, useBreakpoint } from 'antdv-next'
import { responsiveArray } from 'antdv-next/dist/_util/responsiveObserver'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent, isVNode, ref, watch } from 'vue'
import useStyle from './style'

const InternalProCard = defineComponent<ProCardProps, {}, string, CustomSlotsType<{
  default?: () => VNode[]
  extra?: () => VueNode
  title?: () => VueNode
}>>(
  (props, { slots, attrs }) => {
    const config = useConfig()
    const prefixCls = computed(() => props.prefixCls || config.value.getPrefixCls('pro'))
    const baseClassName = computed(() => `${prefixCls.value}-card`)
    const { wrapSSR, hashId } = useStyle(baseClassName)
    // console.log(hashId, 'hashId')
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
              if (element.props?.[`col-${key}`] !== undefined) {
                prev[key] = element.props?.[`col-${key}`]
              }
              return prev
            }, {} as ColProps)
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
    name: 'InternalProCard',
    inheritAttrs: false,
  },
)

export default InternalProCard
