import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { InputGroupProps, SpaceProps } from 'antdv-next'
import type { SetupContext, VNode } from 'vue'
import type { LightWrapperProps } from '../../BaseForm/LightWrapper'
import type { FieldSetRender } from '../../RenderTypings'
import type { ProFormItemProps } from '../FormItem'
import { isSpecialNode, runFunction } from '@antdv-next1/pro-utils'
import { omit } from '@v-c/util'
import { Space, SpaceCompact } from 'antdv-next'
import { toArray } from 'antdv-next/dist/form/utils/typeUtil'
import { cloneVNode, computed, defineComponent, isVNode } from 'vue'
import { createField } from '../../BaseForm/createField'
import { useGridHelpers } from '../../helpers'

export interface ProFormFieldSetProps<T = Record<string, any>> {
  value?: T[]
  onChange?: (value: T[]) => void
  space?: SpaceProps | InputGroupProps
  valuePropName?: 'checked' | 'value' | 'fileList'
  type?: 'space' | 'group'
  fieldProps?: any
  convertValue?: ProFormItemProps['convertValue']
  transform?: ProFormItemProps['transform']
  lightProps?: LightWrapperProps
}
const FieldSetType = {
  space: Space,
  group: SpaceCompact,
}

export function defaultGetValueFromEvent(valuePropName: string, ...args: any) {
  const event = args[0] as Event
  if (event && event.target && valuePropName in event.target) {
    return (event.target as HTMLInputElement)[valuePropName as keyof typeof event.target]
  }
  return event
}

const BaseProFormFieldSet = defineComponent(
  <T extends Record<string, any>>(props: ProFormFieldSetProps<T>, { slots, attrs }: SetupContext<{}, CustomSlotsType<{
    default?: FieldSetRender
  }>>) => {
    const mergeProps = computed(() => ({ ...attrs, ...(props.fieldProps || {}), ...props }) as ProFormFieldSetProps<T>)
    const gridHelpersProps = computed(() => {
      const {
        value,
        valuePropName,
        onChange,
        fieldProps,
        space,
        type = 'space',
        transform,
        convertValue,
        lightProps,
        ...rest
      } = mergeProps.value
      return rest
    })
    const { RowWrapper } = useGridHelpers(gridHelpersProps.value)
    /**
     * 使用方法的引用防止闭包
     *
     * @param fileValue
     * @param index
     */
    const fieldSetOnChange = (fileValue: any, index: number) => {
      const newValues = [...(mergeProps.value.value || [])]
      newValues[index] = defaultGetValueFromEvent(mergeProps.value.valuePropName || 'value', fileValue) as unknown as T
      mergeProps.value.onChange?.(newValues)
      mergeProps.value.fieldProps?.onChange?.(newValues)
    }
    return () => {
      const { value = [], space, type = 'space' } = props
      const Components = FieldSetType[type as keyof typeof FieldSetType] as typeof Space
      const Wrapper = (dom: VueNode): VueNode => {
        // 从 space props 中提取 wrap，如果未定义则不传递
        const spacePropsWithWrap = {
          ...(space as SpaceProps),
          align: 'start' as const,
        }
        // 只有当 space 中明确定义了 wrap 时才传递，否则使用组件默认行为
        if (type === 'space' && (space as SpaceProps)?.wrap !== undefined) {
          spacePropsWithWrap.wrap = (space as SpaceProps).wrap
        }
        return (
          <Components
            {...spacePropsWithWrap}
          >
            {dom}
          </Components>
        )
      }

      let itemIndex = -1
      const list = (toArray(runFunction(slots.default?.(), value, props)) as VNode<any, any, {
        fieldProps?: Record<string, any>
        onChange?: (value: any) => void
      }>[]).map(
        (item) => {
          if (isVNode(item) && !isSpecialNode(item)) {
            itemIndex += 1
            const index = itemIndex
            const isProFromItem
              = (item.type as { __PRO_FORM_COMPONENT: boolean }).__PRO_FORM_COMPONENT
                || (item?.props as { readonly: boolean })?.readonly
            const forkProps = isProFromItem
              ? {
                  // key: index,
                  ignoreFormItem: true,
                  ...(omit(item.props || {}, ['onChange'])),
                  // 如果不是我们自定义的组件 fieldProps 无法识别
                  fieldProps: {
                    ...omit(item?.props?.fieldProps || {}, ['onChange']),
                    onChange: (...restParams: any) => {
                      fieldSetOnChange(restParams[0], index)
                    },
                  },
                  value: value?.[index],
                  onChange: undefined,
                }
              : {
                  // key: index,
                  ...(omit(item.props || {}, ['onChange'])),
                  // 清除 name 以阻止 antdv-next Form.Item 按 name 将子字段注册到顶层 model，
                  // 防止子字段的 dataIndex（如 groupState/groupTitle）泄漏到 FormSet 容器外。
                  // 保留 Form.Item 的渲染以展示子字段的 label/title。
                  // name: undefined,
                  value: value?.[index],
                  onChange: (itemValue: any) => {
                    console.log(itemValue, 'itemValue')
                    fieldSetOnChange(itemValue, index)
                    item.props?.onChange?.(itemValue)
                  },
                }
            return cloneVNode(item, forkProps)
          }
          return item
        },
      )
      return <RowWrapper wrapper={Wrapper}>{list}</RowWrapper>
    }
  },
  {
    name: 'BaseProFormFieldSet',
    inheritAttrs: false,
    props: ['convertValue', 'fieldProps', 'lightProps', 'onChange', 'space', 'transform', 'type', 'value', 'valuePropName'],

  },
)
const ProFormFieldSet = createField<ProFormFieldSetProps>(BaseProFormFieldSet)

ProFormFieldSet.inheritAttrs = false
ProFormFieldSet.displayName = 'ProFormFieldSet'
export default ProFormFieldSet
