import type { FormItemProps } from '@antdv-next1/pro-utils'
import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { NamePath } from 'antdv-next/dist/form/types'
import type { DefineSetupFnComponent, FunctionalComponent } from 'vue'
import type { ExtendsProps, ProFormFieldItemProps, ProFormItemCreateConfig } from '../typing'
import type { ProFormInstance } from './BaseForm'
import { normalizeProps, omitUndefined, pickProFormItemProps } from '@antdv-next1/pro-utils'
import { classNames, omit, set } from '@v-c/util'
import { getNamePath, getValue } from 'antdv-next/dist/form/utils/valueUtil'
import { computed, defineComponent } from 'vue'
import { useFormListContextInject } from '../components'
import ProFormDependency from '../components/Dependency'
import ProFormItem from '../components/FormItem'
import { useFieldContextInject } from '../FieldContext'
import { useGridHelpers } from '../helpers'

const WIDTH_SIZE_ENUM = {
  // 适用于短数字，短文本或者选项
  xs: 104,
  s: 216,
  // 适用于较短字段录入、如姓名、电话、ID 等。
  sm: 216,
  m: 328,
  // 标准宽度，适用于大部分字段长度。
  md: 328,
  l: 440,
  // 适用于较长字段录入，如长网址、标签组、文件路径等。
  lg: 440,
  // 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
  xl: 552,
}

const ignoreWidthValueType = ['switch', 'radioButton', 'radio', 'rate']

/**
 * 处理fieldProps和formItemProps为function时传进来的方法
 * 目前只在SchemaForm时可能会有
 */
export interface FunctionFieldProps {
  getFormItemProps?: () => Record<string, any>
  getFieldProps?: () => Record<string, any>
}

/**
 * 这个方法的主要作用是帮助 Field 增加 FormItem 同时也会处理 lightFilter
 *
 * @param Field
 * @param config
 */
export function createField<P extends ProFormFieldItemProps<Record<string, any>> = any, K extends Record<string, any> = {}>(
  Field: DefineSetupFnComponent<P, any, any, any, any> & { __PRO_FORM_COMPONENT?: boolean },
  config?: ProFormItemCreateConfig,
) {
  // 标记是否是 ProForm 的组件
  Field.__PRO_FORM_COMPONENT = true
  //
  const FieldWithContext = defineComponent<{
    createFieldProps?: Omit<P, 'fieldProps'> & {
      variant?: 'outlined' | 'filled' | 'borderless'
      fieldProps?: P['fieldProps'] & {
        variant?: 'outlined' | 'filled' | 'borderless'
        format?: string
        id?: string
        onChange?: (...rest: any[]) => void
      }
    }
  } & ExtendsProps & FunctionFieldProps, {}, string, CustomSlotsType<{
    default?: () => VueNode
  }>>(
    (props, { slots, attrs }) => {
      /**
       * 从 context 中拿到的值
       */
      const fieldContextProvide = useFieldContextInject()
      const { isListField } = useFormListContextInject()
      const mergeProps = computed(() => {
        return {
          ...attrs,
          ...omitUndefined(omit(props, ['createFieldProps'])),
          ...props.createFieldProps || {},

        }
      })
      const fieldConfigProps = computed(
        () => ({ ...omitUndefined(mergeProps.value?.fieldConfig || {}), ...omitUndefined(config || {}) }) as ProFormItemCreateConfig,
      )
      const mergeDefaultProps = computed(() => ({
        ...omitUndefined(fieldConfigProps.value.defaultProps || {}),
        ...omitUndefined(mergeProps.value || {}),
      }))
      const rest = computed(() =>
        omit(mergeDefaultProps.value, [
          'label',
          'tooltip',
          'placeholder',
          'width',
          'bordered',
          'messageVariables',
          'ignoreFormItem',
          'transform',
          'convertValue',
          'readonly',
          'allowClear',
          'colSize',
          'getFormItemProps',
          'getFieldProps',
          'fieldConfig',
          'proFieldProps',
        ]),
      )

      const defaultFormItemProps = computed(() =>
        omit(fieldConfigProps.value, [
          'valueType',
          'customLightMode',
          'lightFilterLabelFormatter',
          'ignoreWidth',
          'defaultProps',
        ]),
      )
      const valueType = computed(() => fieldConfigProps.value.valueType || rest.value?.valueType)
      // 有些 valueType 不需要宽度
      const isIgnoreWidth = computed(
        () => fieldConfigProps.value.ignoreWidth || ignoreWidthValueType.includes(valueType.value!),
      )
      const restFormItemProps = computed(() => pickProFormItemProps(rest.value))

      const changedProps = computed(() => ({
        formItemProps: mergeDefaultProps.value.getFormItemProps?.(),
        fieldProps: mergeDefaultProps.value.getFieldProps?.(),
      }))

      const fieldProps = computed(() => {
        const newFieldProps = {
          ...(mergeDefaultProps.value.ignoreFormItem
            ? omitUndefined({ value: (rest.value as unknown as { value: any })?.value })
            : {}),
          placeholder: mergeDefaultProps.value.placeholder,
          disabled: mergeProps.value.disabled,
          ...omitUndefined(fieldContextProvide.fieldProps || {}),
          ...omitUndefined(changedProps.value.fieldProps || {}),
          // 支持未传递getFieldProps的情况
          // 某些特殊hack情况下覆盖原来设置的fieldProps参数
          ...rest.value.fieldProps,
        }
        newFieldProps.style = omitUndefined(newFieldProps?.style || {})
        return newFieldProps
      })

      const formItemProps = computed(
        () =>
          ({
            ...fieldContextProvide.formItemProps,
            ...restFormItemProps.value,
            ...changedProps.value.formItemProps,
            // 支持未传递getFormItemProps的情况
            // 某些特殊hack情况下覆盖原来设置的formItemProps参数
            ...rest.value.formItemProps,
          }) as FormItemProps,
      )
      const otherProps = computed(() => ({
        messageVariables: mergeDefaultProps.value.messageVariables,
        ...defaultFormItemProps.value,
        ...formItemProps.value,
      }))
      const proFieldKey = computed(() => {
        let name = otherProps.value?.name
        if (Array.isArray(name))
          name = name.join('_')
        return name && `form-${fieldContextProvide.formKey?.value ?? ''}-field-${name}`
      })
      const fieldProFieldProps = computed(() => {
        return omitUndefined({
          ...fieldContextProvide.proFieldProps,
          mode: rest.value.mode,
          readonly: mergeProps.value.readonly,
          params: rest.value.params,
          proFieldKey: proFieldKey.value,
          ...mergeProps.value.proFieldProps,
        })
      },
      )
      const style = computed(() => {
        const newStyle = {
          width:
            mergeDefaultProps.value.width && !WIDTH_SIZE_ENUM[mergeDefaultProps.value.width as 'xs']
              ? (Number.isNaN(Number(mergeDefaultProps.value.width))
                  ? mergeDefaultProps.value.width
                  : `${Number(mergeDefaultProps.value.width)}px`)
              : fieldContextProvide.grid
                ? '100%'
                : undefined,
          ...fieldProps.value?.style,
        }
        if (isIgnoreWidth.value)
          Reflect.deleteProperty(newStyle, 'width')
        return omitUndefined(newStyle)
      })
      const className = computed(() => {
        const isSizeEnum
          = mergeDefaultProps.value.width && WIDTH_SIZE_ENUM[mergeDefaultProps.value.width as 'xs']
        return classNames(fieldProps.value?.class, {
            'pro-field': isSizeEnum,
            [`pro-field-${mergeDefaultProps.value.width}`]: isSizeEnum && !isIgnoreWidth.value,
          }) || undefined
        
      })
      const { ColWrapper } = useGridHelpers(rest.value)
      if (!isListField?.value) {
        const prevValue = getValue(fieldContextProvide.modelValue, getNamePath(otherProps.value.name))
        if (prevValue === undefined) {
          if (otherProps.value.initialValue !== undefined) {
            fieldContextProvide.setModelValue?.(set(fieldContextProvide.modelValue, getNamePath(otherProps.value.name), otherProps.value.initialValue))
          }
        }
      }
      return () => {
        const { label, tooltip, placeholder, width, bordered, messageVariables, ignoreFormItem, transform, convertValue, readonly, allowClear, colSize, getValueFromEvent, getValueProps, record, getFormItemProps, getFieldProps, fieldConfig, proFieldProps, ...restProps } = mergeDefaultProps.value
        const { valuePropName = 'value' } = fieldConfigProps.value
        // key={mergeProps.value.proFormFieldKey || mergeProps.value.name}
        const field = (
          <Field
            // ProXxx 上面的 props 透传给 FieldProps，可能包含 Field 自定义的 props，
            // 比如 ProFormSelect 的 request
            {...(restProps as P)}
            fieldProps={{
              allowClear,
              ...fieldProps.value,
              style: style.value,
              class: className.value,
            }}
            proFieldProps={fieldProFieldProps.value}
            v-slots={slots}
          />
        )
        //

        return (
          <ColWrapper>
            <ProFormItem
              // 全局的提供一个 tip 功能，可以减少代码量
              // 轻量模式下不通过 FormItem 显示 label
              label={label && proFieldProps?.light !== true ? label : undefined}
              tooltip={proFieldProps?.light !== true && tooltip}
              valuePropName={valuePropName}
              {...otherProps.value}
              ignoreFormItem={ignoreFormItem}
              transform={transform}
              dataFormat={fieldProps.value.format}
              valueType={valueType.value}
              messageVariables={{
                label: (label as string) || '',
                ...otherProps.value?.messageVariables,
              }}
              convertValue={convertValue}
              lightProps={omitUndefined({
                ...fieldProps.value,
                variant: restProps.variant ?? fieldProps.value?.variant,
                valueType: valueType.value,
                bordered,
                allowClear: field?.props?.allowClear ?? allowClear,
                light: proFieldProps?.light,
                label,
                customLightMode: fieldConfigProps.value?.customLightMode,
                labelFormatter: fieldConfigProps.value?.lightFilterLabelFormatter,
                valuePropName,
                footerRender: field?.props?.footerRender,
                // 使用用户的配置覆盖默认的配置
                ...restProps.lightProps,
                ...otherProps.value.lightProps,
              })}
              v-slots={{
                default: () => field,
              }}
            />
          </ColWrapper>
        )
      }
    },
    {
      name: 'FieldWithContext',
      inheritAttrs: false,
    },
  )
  const DependencyWrapper: FunctionalComponent<
    P
    & ExtendsProps
    & FunctionFieldProps & {
      originDependencies?: NamePath<string | number | boolean>[]
      captchaProps?: any
      fieldProps?: any
    },
    {},
    {
      default?: (values: Record<string, any>, options: Partial<ProFormInstance<any>>) => VueNode
    }
  > = (props, { slots, attrs }) => {
    const { fieldConfig, formItemProps, convertValue, readonly, ignoreFormItem, params, colSize, bordered, allowClear, secondary, getFormItemProps, getFieldProps, originDependencies, ...createFieldProps } = normalizeProps({ ...attrs, ...props }) as P
      & ExtendsProps
      & FunctionFieldProps & {
        originDependencies?: NamePath<string | number | boolean>[]
        captchaProps?: any
        fieldProps?: any
      }
    const newProps = {
      fieldConfig,
      formItemProps,
      convertValue,
      readonly,
      ignoreFormItem,
      params,
      colSize,
      bordered,
      allowClear,
      secondary,
      getFormItemProps,
      getFieldProps,
      originDependencies,
      createFieldProps: createFieldProps as P,
    }
    return createFieldProps.dependencies ? (
      <ProFormDependency
        name={createFieldProps.dependencies}
        originDependencies={newProps?.originDependencies}
        v-slots={{
          default: (values: Record<string, any>) => (
            <FieldWithContext
              {...newProps}
              createFieldProps={
                {
                  ...createFieldProps,
                  dependenciesValues: values,
                } as P
              }
              v-slots={slots}
            />
          ),
        }}
      />
    ) : (
      <FieldWithContext {...newProps} v-slots={slots} />
    )
  }
  return DependencyWrapper as typeof DependencyWrapper & K
}
