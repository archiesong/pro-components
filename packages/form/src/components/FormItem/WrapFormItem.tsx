import type { FormItemProps, SearchConvertKeyFn, VueNode } from '@antdv-next1/pro-utils'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { VueNode as AntdVueNode } from 'antdv-next/dist/_util/type'
import type { EventArgs, NamePath } from 'antdv-next/dist/form/types'
import type { CSSProperties, VNode } from 'vue'
import { defaultGetValueFromEvent, FormItem, omitUndefined } from '@antdv-next1/pro-utils'
import { Flex } from 'antdv-next'
import { useFormContext } from 'antdv-next/dist/form/context'
import { getNamePath } from 'antdv-next/dist/form/utils/valueUtil'
import { computed, defineComponent } from 'vue'
import { useFieldContextInject } from '../../FieldContext'
import { useFormItemContextProvider } from './context'

export type WrapFormItemProps = Omit<FormItemProps, 'help' | 'name'> & {
  name?: NamePath<string | number | boolean>
  valuePropName?: 'value' | 'checked' | 'fileList'
  isRenderProps?: boolean
  // value?: any
  /** @name addonBefore 前置的dom */
  addonBefore?: VueNode
  /** @name addonAfter 后置的dom */
  addonAfter?: VueNode
  /**
   * 包裹的样式，一般没用
   */
  addonWarpStyle?: CSSProperties
  /**
   * @name convertValue 获取时转化值，一般用于将数据格式化为组件接收的格式
   * @param value 字段的值
   * @param namePath 字段的name
   * @returns 字段新的值
   *
   *
   * @example a,b => [a,b]     convertValue: (value,namePath)=> value.split(",")
   * @example string => json   convertValue: (value,namePath)=> JSON.parse(value)
   * @example number => date   convertValue: (value,namePath)=> Dayjs(value)
   * @example YYYY-MM-DD => date   convertValue: (value,namePath)=> Dayjs(value,"YYYY-MM-DD")
   * @example  string => object   convertValue: (value,namePath)=> { return {value,label:value} }
   */
  convertValue?: SearchConvertKeyFn
  help?:
    | AntdVueNode
    | ((params: {
      errors: VueNode[]
      warnings: VueNode[]
    }) => VueNode)
}

const WrapFormItem = defineComponent<WrapFormItemProps, {}, string, CustomSlotsType<{
  default?: () => VNode[]
}>>(
  (props, { slots }) => {
    const formItemProps = computed(() => ({
      name: props.name,
      label: props.label,
    }))
    useFormItemContextProvider(formItemProps)
    const { formRef } = useFieldContextInject()
    const formContext = useFormContext()
    return () => {
      const { addonAfter, addonBefore, convertValue, valuePropName, addonWarpStyle, help, _internalItemRender, ...restProps } = props
      let getValuePropsFunc: any = (value: any) => {
        const newValue = convertValue?.(value, props.name!) ?? value
        if (props.getValueProps)
          return props.getValueProps(newValue)
        return {
          [valuePropName || 'value']: newValue,
          [`onUpdate:${valuePropName || 'value'}`]: (...args: EventArgs) => {
            console.log(args, 'args')
            let newValue
            if (props.getValueFromEvent) {
              newValue = props.getValueFromEvent(...args)
            }
            else {
              newValue = defaultGetValueFromEvent(valuePropName!, ...args)
            }
            if (props.normalize) {
              newValue = props.normalize(newValue.value, value, formContext.value.model!)
            }
            if (newValue !== value && formRef?.value) {
              formRef.value.setFieldValue(getNamePath(props.name), newValue)
            }
          },
        }
      }
      if (!convertValue && !props.getValueProps) {
        getValuePropsFunc = undefined
      }
      if (!addonAfter && !addonBefore) {
        return (
          <FormItem
            {...omitUndefined(restProps)}
            valuePropName={valuePropName}
            getValueProps={getValuePropsFunc}
            v-slots={slots}
          />
        )
      }
      return (
        <FormItem
          {...omitUndefined(restProps)}
          help={typeof help !== 'function' ? help : undefined}
          valuePropName={valuePropName}
          getValueProps={getValuePropsFunc}
          _internalItemRender={{
            mark: 'pro_table_render',
            render: (
              inputProps,
              doms,
            ) => (
              <>
                <Flex wrap="wrap" align="center" gap="small" style={addonWarpStyle}>
                  {addonBefore ? (
                    <div>{addonBefore}</div>
                  ) : null}
                  {doms.input}
                  {addonAfter ? (
                    <div>{addonAfter}</div>
                  ) : null}
                </Flex>
                {typeof help === 'function'
                  ? help({
                      errors: inputProps.errors,
                      warnings: inputProps.warnings,
                    })
                  : doms.errorList}
                {doms.extra}
              </>
            ),
          }}
          v-slots={slots}
        />
      )
    }
  },
  {
    name: 'WarpFormItem',
    inheritAttrs: false,
  },
)

export default WrapFormItem
