import type { ProFieldValueType, ProFormInstanceType } from '@antdv-next1/pro-utils'
import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { FormInstance } from 'antdv-next'
import type { NamePath } from 'antdv-next/dist/form/types'
import type { SetupContext, VNode } from 'vue'
import type { BaseFormProps, ProFormRef } from './BaseForm'
import type { SubmitterProps } from './Submitter'
import {
  autoFocusToFirstChild,

  runFunction,
  useProFormContextProvider,
} from '@antdv-next1/pro-utils'
import { ConfigProvider, Form, useConfig } from 'antdv-next'
import { computed, defineComponent, shallowRef } from 'vue'
import { useGridContextProvider, useGridHelpers } from '../helpers'
import { useProFormInstanceExpose } from '../utils'
import Submitter from './Submitter'

export function genParams<T extends Record<string, any>, U extends Record<string, any>>(
  syncUrl: BaseFormProps<T, U>['syncToUrl'],
  params: Record<string, any>,
  type: 'get' | 'set',
) {
  if (syncUrl === true) {
    return params
  }
  return runFunction(syncUrl, params, type)
}

const BaseFormComponents = defineComponent(
  <T extends Record<string, any>, U extends Record<string, any>>(
    props: BaseFormProps<T, U> & {
      loading: boolean
      formatValues?: ProFormInstanceType<T>
      onUrlSearchChange?: (value: Record<string, string | number>) => void
      form?: ProFormRef<T> | null
      fieldsValueType?: Record<
        string,
        {
          valueType: ProFieldValueType
          dateFormat: string
        }
      >
      transformKey: (values: any, omit: boolean, parentKey?: NamePath) => any
    },
    {
      expose,
      slots,
    }: SetupContext<
      {},
      CustomSlotsType<{
        default?: () => VNode[]
      }>
    >,
  ) => {
    /**
     * 获取 form 实例
     */
    const formInstance = (
      Form as unknown as { useFormInstance: () => FormInstance }
    ).useFormInstance()

    const { componentSize } = useConfig()
    const gridProps = computed(() => ({
      grid: props.grid,
      rowProps: props.rowProps,
    }))
    const formRef = shallowRef<ProFormRef<T>>((props.form || formInstance))
    /**
     * 获取布局
     */
    const { RowWrapper } = useGridHelpers({ grid: props.grid, rowProps: props.rowProps })
    useGridContextProvider(gridProps)
    useProFormContextProvider({
      ...props.formatValues,
      formRef,
    })
    expose(useProFormInstanceExpose(computed(() => ({ ...formRef.value, ...props.formatValues }))))
    return () => {
      const {
        contentRender,
        submitter,
        fieldProps,
        formItemProps,
        groupProps,
        transformKey,
        form,
        onInit,
        loading,
        formComponentType,
        onReset,
        syncToUrl,
        onUrlSearchChange,
        syncToModel,
        syncToUrlAsImportant,
        extraUrlParams,
        omitNil = true,
        isKeyPressSubmit,
        autoFocusFirstInput = true,
        model,
        grid,
        rowProps,
        colProps,
        ...rest
      } = props
      const items = autoFocusToFirstChild(
        slots.default?.()!,
        typeof autoFocusFirstInput === 'string' ? true : autoFocusFirstInput,
      )
      /** 计算 submitter props 的对象 */
      const submitterProps: SubmitterProps
        = typeof submitter === 'boolean' || !submitter ? {} : submitter
      /** 渲染提交按钮与重置按钮 */
      const submitterNode
        = submitter === false ? null : (
          <Submitter
            key="submitter"
            {...submitterProps}
            onReset={() => {
              const finalValues = transformKey?.(formRef.value?.getFieldsValue(), omitNil)
              submitterProps?.onReset?.(finalValues)
              onReset?.(finalValues)
              if (syncToUrl) {
                // 把没有的值设置为未定义可以删掉 url 的参数
                const params = Object.keys(transformKey?.(formRef.value?.getFieldsValue(), false)).reduce(
                  (pre, next) => {
                    return {
                      ...pre,
                      [next]: finalValues[next] || undefined,
                    }
                  },
                  extraUrlParams,
                )
                /** 在同步到 url 上时对参数进行转化 */
                onUrlSearchChange?.(genParams(syncToUrl, params || {}, 'set'))
              }
            }}
            submitButtonProps={{
              loading,
              ...(typeof submitterProps.submitButtonProps === 'boolean'
                ? {}
                : submitterProps.submitButtonProps),
            }}
          />
        )
      let content = grid ? <RowWrapper>{items}</RowWrapper> : (items as VueNode | VueNode[])
      if (contentRender) {
        content = <>{contentRender(content, submitterNode, form!)}</>
      }
      return (
        <ConfigProvider componentSize={rest.size || componentSize.value || 'middle'}>
          {content}
        </ConfigProvider>
      )
    }
  },
  {
    name: 'BaseFormComponents',
    inheritAttrs: false,
    props: [
      'autoComplete',
      'syncToUrl',
      'onUrlSearchChange',
      'extraUrlParams',
      'fieldsValueType',
      'formatValues',
      'syncToModel',
      'syncToUrlAsImportant',
      'form',
      'transformKey',
      'autoFocusFirstInput',
      'classes',
      'clearOnDestroy',
      'colProps',
      'colon',
      'disabled',
      'feedbackIcons',
      'formComponentType',
      'formKey',
      'grid',
      'isKeyPressSubmit',
      'labelAlign',
      'labelCol',
      'labelWrap',
      'layout',
      'model',
      'formRef',
      'name',
      'onFieldsChange',
      'onFinish',
      'onFinishFailed',
      'onInit',
      'onReset',
      'onSubmit',
      'onValidate',
      'onValuesChange',
      'params',
      'prefixCls',
      'preserve',
      'proFieldProps',
      'readonly',
      'request',
      'requiredMark',
      'rootClass',
      'rowProps',
      'rules',
      'scrollToFirstError',
      'size',
      'styles',
      'submitter',
      'tooltip',
      'validateMessages',
      'validateOnRuleChange',
      'validateTrigger',
      'variant',
      'wrapperCol',
      'contentRender',
      'dateFormatter',
      'omitNil',
      'onLoadingChange',
      'loading',
    ],
  },
)

export default BaseFormComponents
