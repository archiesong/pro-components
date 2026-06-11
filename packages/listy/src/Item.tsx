import type { VueNode } from '@v-c/util'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { CSSProperties } from 'vue'
import { classNames } from '@v-c/util'
import { toArray } from '@v-c/util/dist/Children/toArray'
import { Col } from 'antdv-next'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { cloneVNode, computed, defineComponent, isVNode, Text } from 'vue'
// import ListyItemMeta from './ItemMeta'
import { useProListyContext } from './context'

type SemanticName = 'actions' | 'extra'

export interface ProListyItemProps {
  actions?: VueNode[]
  extra?: VueNode
  prefixCls?: string
  class?: string
  style?: string | CSSProperties
  classNames?: Partial<Record<SemanticName, string>>
  styles?: Partial<Record<SemanticName, CSSProperties>>
  colStyle?: string | CSSProperties
}

type ListItemClassNamesModule = keyof Exclude<ProListyItemProps['classNames'], undefined>
type ListItemStylesModule = keyof Exclude<ProListyItemProps['styles'], undefined>

const ProListyItem = defineComponent<ProListyItemProps, {}, string, CustomSlotsType<{
  actions?: () => VueNode
  extra?: () => VueNode
  default?: () => VueNode
}>>(
  (
    props,
    {
      slots,
      expose,
    },
  ) => {
    const config = useConfig()
    const prefixCls = computed(() => props.prefixCls || config.value.getPrefixCls('pro-listy'))
    const baseClassName = computed(() => `${prefixCls.value}-item`)
    const { grid, itemLayout } = useProListyContext()
    const moduleClass = (moduleName: ListItemClassNamesModule) =>
      classNames(
        // list?.item?.classNames?.[moduleName],
        props.classNames?.[moduleName],
      )

    const moduleStyle = (moduleName: ListItemStylesModule): CSSProperties => ({
      // ...list?.item?.styles?.[moduleName],
      ...props.styles?.[moduleName],
    })
    const isItemContainsTextNodeAndNotSingular = () => {
      let result = false
      toArray(slots.default?.()).forEach((vnode) => {
        if (vnode.type === Text) {
          result = true
        }
      })
      return result && toArray(slots.default?.()).length > 1
    }
    const isFlexMode = () => {
      if (itemLayout?.value === 'vertical') {
        return !!props.extra
      }
      return !isItemContainsTextNodeAndNotSingular()
    }
    const actions = computed(() => {
      return props.actions
    })
    const actionsContent = computed(() => {
      return (
        actions.value
        && actions.value.length > 0 && (
          <ul class={classNames(`${prefixCls.value}-item-action`, moduleClass('actions'))} key="actions" style={moduleStyle('actions')}>
            {actions.value.map((action: VueNode, i: number) => (
              <li key={`${baseClassName.value}-action-${i}`}>
                {action}
                {i !== actions.value!.length - 1 && <em class={`${baseClassName.value}-action-split`} />}
              </li>
            ))}
          </ul>
        )
      )
    })
    expose({})
    return () => {
      const { colStyle, prefixCls, class: className, extra } = props
      const Element = grid?.value ? 'div' : 'li'
      const itemChildren = (
        <Element
          class={classNames(
            baseClassName.value,
            {
              [`${baseClassName.value}-no-flex`]: !isFlexMode(),
            },
            className,
          )}
        >
          {itemLayout?.value === 'vertical' && extra
            ? [
                <div class={`${prefixCls}-item-main`} key="content">
                  {slots.default?.()}
                  {actionsContent.value}
                </div>,
                <div class={classNames(`${prefixCls}-item-extra`, moduleClass('extra'))} key="extra" style={moduleStyle('extra')}>
                  {extra}
                </div>,
              ]
            : [slots.default?.(), actionsContent.value, extra && isVNode(extra) ? cloneVNode(extra!, { key: 'extra' }) : extra]}
        </Element>
      )
      return grid?.value
        ? (
            <Col flex={1} style={colStyle}>
              {itemChildren}
            </Col>
          )
        : (
            itemChildren
          )
    }
  },
  {
    name: 'ProListyItem',
    inheritAttrs: false,
  },
)

export default ProListyItem
