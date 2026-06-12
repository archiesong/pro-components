import type { CustomSlotsType, Key, VueNode } from '@v-c/util/dist/type'
import type { App, ComponentOptionsMixin, CreateComponentPublicInstanceWithMixins, Plugin, SetupContext } from 'vue'
import type { ProListyProps } from './typing'
import ProConfigProvider from '@antdv-next1/pro-provider'
import { defineComponent } from 'vue'
import InternalProListy from './InternalProListy'
import ProListyItem from './Item'

const _ProListy = defineComponent(
  <T extends Record<string, any>, K extends Key>(props: ProListyProps<T, K>, {
    slots,
    expose,
  }: SetupContext<
    {},
    CustomSlotsType<{
      groupRender?: ProListyProps<T, K>['groupRender']
      itemRender?: ProListyProps<T, K>['itemRender']
      default?: () => VueNode
    }>
  >) => {
    expose({})
    return () => {
      return (
        <ProConfigProvider needDeps>
          <InternalProListy {...props} v-slots={slots} />
        </ProConfigProvider>
      )
    }
  },
  {
    name: 'ProListy',
    inheritAttrs: false,
    props: [
      'group',
      'height',
      'groupBy',
      'class',
      'classes',
      'variant',
      'emptyRender',
      'footer',
      'grid',
      'groupRender',
      'header',
      'itemLayout',
      'loading',
      'pagination',
      'size',
      'split',
      'style',
      'styles',
      'itemHeight',
      'itemRender',
      'items',
      'onEndReached',
      'prefixCls',
      'rowKey',
      'sticky',
      'virtual',
    ],
  },
) as new <T extends Record<string, any>, K extends Key>(
  props: ProListyProps<T, K>,
) => CreateComponentPublicInstanceWithMixins<
  ProListyProps<T, K>,
  {},
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  {},
  {},
  false,
  {},
  CustomSlotsType<{
    groupRender?: ProListyProps<T, K>['groupRender']
    itemRender?: ProListyProps<T, K>['itemRender']
    default?: () => VueNode
  }>
>
const ProListy = _ProListy as typeof _ProListy
  & Plugin & {
    Item: typeof ProListyItem
  }
ProListy.Item = ProListyItem
ProListy.install = (app: App) => {
  app.component(ProListy.name!, ProListy)
  app.component(ProListyItem.name!, ProListyItem)
}

export default ProListy
