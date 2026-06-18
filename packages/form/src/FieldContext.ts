import type { ProFieldProps } from '@antdv-next1/pro-field'
import type { FormItemProps, ProFieldValueType, SearchTransformKeyFn } from '@antdv-next1/pro-utils'
import type { NamePath } from 'antdv-next/dist/form/types'
import type { ComputedRef, InjectionKey, Reactive, ShallowRef } from 'vue'
import type { CommonFormProps } from './BaseForm'
import type { ProFormGroupProps } from './components'
import type { FieldProps } from './typing'
import { inject, provide } from 'vue'

export type FieldContextProps = {
  fieldProps?: FieldProps
  proFieldProps?: ProFieldProps
  formItemProps?: FormItemProps
  groupProps?: ProFormGroupProps
  setFieldValueType?: (
    name: NamePath,
    obj: {
      valueType?: ProFieldValueType
      dateFormat?: string
      /** 数据转化的地方 */
      transform?: SearchTransformKeyFn
    },
  ) => void
  /** Form 组件的类型 */
  formComponentType?: string
  /** 获取表单实例计数器 */
  formKey?: ShallowRef<string>
  modelValue?: Reactive<Record<string, any>>
  setModelValue?: (modelValue: Record<string, any>) => void
  /** 表单的 getPopupContainer 控制 */
  getPopupContainer?: ComputedRef<((e: HTMLElement) => HTMLElement | ParentNode) | undefined>
} & Pick<CommonFormProps, 'formRef' | 'grid'>

export const fieldContextKey = Symbol('fieldContext')

export function useFieldContextProvider(props: FieldContextProps) {
  return provide(fieldContextKey as InjectionKey<FieldContextProps>, props)
}

export function useFieldContextInject() {
  return inject(
    fieldContextKey as InjectionKey<FieldContextProps>,
    {} as FieldContextProps,
  )
}
