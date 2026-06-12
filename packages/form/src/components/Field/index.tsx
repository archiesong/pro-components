import type { FormItemProps, ProSchema } from '@antdv-next1/pro-utils'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { NamePath } from 'antdv-next/dist/form/types'
import type { SetupContext, VNode } from 'vue'
import type { ProFormFieldItemProps } from '../../typing'
import { ProPureField } from '@antdv-next1/pro-field'
import { childrenToArray, isSpecialNode, normalizeProps, omitUndefined, runFunction } from '@antdv-next1/pro-utils'
import { omit } from '@v-c/util'
import { cloneVNode, defineComponent, isVNode } from 'vue'
import { createField } from '../../BaseForm/createField'
import { useEditOrReadOnlyContextInject } from '../../BaseForm/EditOrReadOnlyContext'

export type ProFormFieldProps<T = Record<string, any>> = Omit<ProSchema<
  T,
  FormItemProps & {
    fieldProps?: ProFormFieldItemProps<T>['fieldProps']
    placeholder?: ProFormFieldItemProps<T>['placeholder']
    secondary?: ProFormFieldItemProps<T>['secondary']
    emptyText?: ProFormFieldItemProps<T>['emptyText']
    disabled?: ProFormFieldItemProps<T>['disabled']
    width?: ProFormFieldItemProps<T>['width']
    proFieldProps?: ProFormFieldItemProps<T>['proFieldProps']
    footerRender?: ProFormFieldItemProps<T>['footerRender']
    colProps?: ProFormFieldItemProps<T>['colProps']
    addonBefore?: ProFormFieldItemProps<T>['addonBefore']
    allowClear?: ProFormFieldItemProps<T>['allowClear']
    bordered?: ProFormFieldItemProps<T>['bordered']
    colSize?: ProFormFieldItemProps<T>['colSize']
    params?: ProFormFieldItemProps<T>['params']
    ignoreFormItem?: ProFormFieldItemProps<T>['ignoreFormItem']
    readonly?: ProFormFieldItemProps<T>['readonly']
    convertValue?: ProFormFieldItemProps<T>['convertValue']
    formItemProps?: ProFormFieldItemProps<T>['formItemProps']
    fieldConfig?: ProFormFieldItemProps<T>['fieldConfig']
    transform?: ProFormFieldItemProps<T>['transform']
    dataFormat?: ProFormFieldItemProps<T>['dataFormat']
    proFormFieldKey?: ProFormFieldItemProps<T>['proFormFieldKey']
    addonAfter?: ProFormFieldItemProps<T>['addonAfter']
    record?: ProFormFieldItemProps<T>['record']
    addonWarpStyle?: ProFormFieldItemProps<T>['addonWarpStyle']
    valuePropName?: ProFormFieldItemProps<T>['valuePropName']
    help?: ProFormFieldItemProps<T>['help']
    lightProps?: ProFormFieldItemProps<T>['lightProps']
    mode?: 'edit' | 'read' | 'update'
    // 用来判断是不是被嵌套渲染的 dom
    isDefaultDom?: boolean
    text?: any
    'onUpdate:text'?: (text: any) => void
    getFieldProps?: () => Record<string, any>
    getFormItemProps?: () => Record<string, any>
    /**
     * dependencies value
     */
    dependenciesValues?: NamePath<string | number | boolean>[]
    originDependencies?: NamePath<string | number | boolean>[]
  },
  'form',
  {}
>, 'key'>
export const BaseProFormField = defineComponent(
  <T extends Record<string, any>>(props: ProFormFieldProps<T> & {
    onChange?: (...args: any[]) => any
    onFocus?: (...args: any[]) => any
    onBlur?: (...args: any[]) => any
    autoFocus?: boolean
  }, { slots, attrs }: SetupContext<{}, CustomSlotsType<{
      default?: () => VNode[]
    }>>) => {
    const editOrReadOnlyContextProvide = useEditOrReadOnlyContextInject()
    return () => {
      const {
        _internalItemRender,
        addonWarpStyle,
        fieldProps,
        colProps,
        colSize,
        labelCol,
        label,
        autoFocus,
        isDefaultDom,
        render,
        proFieldProps,
        formItemRender,
        valueType,
        initialValue,
        convertValue,
        colon,
        addonAfter,
        addonBefore,
        dependencies,
        editable,
        extra,
        fieldId,
        footerRender,
        formItemProps,
        getFieldProps,
        getFormItemProps,
        hasFeedback,
        help,
        hidden,
        hideInDescriptions,
        hideInForm,
        hideInTable,
        htmlFor,
        ignoreFormItem,
        isListField,
        labelAlign,
        layout,
        onChange,
        messageVariables,
        noStyle,
        originDependencies,
        proFormFieldKey,
        renderText,
        required,
        rootClass,
        rules,
        status,
        title,
        tooltip,
        transform,
        trigger,
        validateDebounce,
        validateFirst,
        validateStatus,
        validateTrigger,
        vertical,
        wrapperCol,
        width,
        valueEnum,
        params,
        name,
        dependenciesValues,
        valuePropName = 'value',
        ...restProps
      } = props
      const children: VNode[] = childrenToArray(slots.default?.(), true)
      if (children && children.length) {
        return children.map((vnode) => {
          if (isVNode(vnode) && !isSpecialNode(vnode)) {
            vnode.props = normalizeProps(vnode.props || {})
            return cloneVNode(vnode, {
              ...restProps,
              ...vnode.props,
              onChange: (...restParams: any[]) => {
                if (fieldProps?.onChange) {
                  fieldProps?.onChange?.(...restParams)
                }
                onChange?.(...restParams)
                vnode.props?.onChange?.(...restParams)
              },
            })
          }
          return vnode
        })
      }
      return (
        <ProPureField
          {...attrs}
          text={fieldProps?.[valuePropName]}
          valueType={(valueType as 'text') || 'text'}
          fieldProps={{
            autoFocus,
            ...(fieldProps || {}),
            // onChange: (...restParams: any) => {
            //   console.log(fieldProps, 'as')
            //   if (fieldProps?.onChange) {
            //     fieldProps?.onChange?.(...restParams)
            //   }
            // },
          }}
          valueEnum={runFunction(valueEnum)}
          {...omitUndefined(proFieldProps || {})}
          {...omitUndefined(restProps || {})}
          mode={proFieldProps?.mode || editOrReadOnlyContextProvide.mode.value || 'edit'}
        />
      )
    }
  },
  {
    name: 'BaseProFormField',
    inheritAttrs: false,
    props: ['_internalItemRender', 'colProps', 'colSize', 'addonWarpStyle', 'addonAfter', 'addonBefore', 'allowClear', 'autoFocus', 'bordered', 'colon', 'convertValue', 'dataFormat', 'dataIndex', 'debounceTime', 'dependencies', 'dependenciesValues', 'disabled', 'editable', 'emptyText', 'extra', 'fieldConfig', 'fieldId', 'fieldProps', 'footerRender', 'formItemProps', 'formItemRender', 'getFieldProps', 'getFormItemProps', 'hasFeedback', 'help', 'hidden', 'hideInDescriptions', 'hideInForm', 'hideInTable', 'htmlFor', 'id', 'ignoreFormItem', 'initialValue', 'isDefaultDom', 'isListField', 'label', 'labelAlign', 'labelCol', 'layout', 'lightProps', 'messageVariables', 'mode', 'name', 'noStyle', 'onChange', 'onBlur', 'onFocus', 'onUpdate:text', 'originDependencies', 'params', 'placeholder', 'prefixCls', 'proFieldProps', 'proFormFieldKey', 'readonly', 'render', 'renderText', 'request', 'required', 'rootClass', 'rules', 'secondary', 'status', 'text', 'title', 'tooltip', 'transform', 'trigger', 'validateDebounce', 'validateFirst', 'validateStatus', 'validateTrigger', 'valueEnum', 'valuePropName', 'valueType', 'vertical', 'width', 'wrapperCol'],
  },
)

const ProFormField = createField<ProFormFieldProps>(BaseProFormField)
ProFormField.inheritAttrs = false
ProFormField.displayName = 'ProFormField'
export default ProFormField
