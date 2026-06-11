import type { FormInstance } from 'antdv-next'
import type { NamePath } from 'antdv-next/dist/form/types'
import type { ComputedRef, InjectionKey, Reactive } from 'vue'
import { inject, provide } from 'vue'

export interface ProFormInstanceType<T> {
  /**
   * 获取被 ProForm 格式化后的所有数据
   * @param nameList boolean
   * @returns T
   *
   * @example  getFieldsFormatValue() ->返回所有数据
   * @example  getFieldsFormatValue(true) ->返回所有数据，即使没有被 form 托管的
   */
  getFieldsFormatValue?: (nameList?: true, omitNil?: boolean) => T
  /**
   * 获取被 ProForm 格式化后的单个数据
   * @param nameList (string|number)[]
   * @returns T
   *
   * @example {a:{b:value}} -> getFieldFormatValue(['a', 'b']) -> value
   */
  getFieldFormatValue?: (nameList?: NamePath<string | number | boolean>, omitNilParam?: boolean) => T
  /**
   * 获取被 ProForm 格式化后的单个数据, 包含他的 name
   * @param nameList (string|number)[]
   * @returns T
   *
   * @example {a:{b:value}}->getFieldFormatValueObject(['a','b'])->{a:{b:value}}
   */
  getFieldFormatValueObject?: (nameList?: NamePath<string | number | boolean>, omitNilParam?: boolean) => T
  /**
   *验字段后返回格式化之后的所有数据
   * @param nameList (string|number)[]
   * @returns T
   *
   * @example validateFieldsReturnFormatValue -> {a:{b:value}}
   */
  validateFieldsReturnFormatValue?: (nameList?: NamePath<string | number | boolean>[], omitNilParam?: boolean) => Promise<T>
}

export const proFormContextKey: InjectionKey<
  ProFormInstanceType<any> & {
    formRef?: ComputedRef<(Omit<FormInstance, 'nativeElement'> & {
      nativeElement?: ComputedRef<FormInstance['nativeElement']>
    }) | null>
    modelValue?: Reactive<Record<string, any>>
    setModelValue?: (modelValue: Record<string, any>) => void
  }
> = Symbol('proFormContext')

export function useProFormContextProvider(props:
  ProFormInstanceType<any> & {
    formRef?: ComputedRef<(Omit<FormInstance, 'nativeElement'> & {
      nativeElement?: ComputedRef<FormInstance['nativeElement']>
    }) | null>
    modelValue?: Reactive<Record<string, any>>
    setModelValue?: (modelValue: Record<string, any>) => void
  }) {
  return provide(proFormContextKey, props)
}

export function useProFormContextInject() {
  return inject(
    proFormContextKey,
    ({}) as ProFormInstanceType<any> & {
      formRef?: ComputedRef<(Omit<FormInstance, 'nativeElement'> & {
        nativeElement?: ComputedRef<FormInstance['nativeElement']>
      }) | null>
      modelValue?: Reactive<Record<string, any>>
      setModelValue?: (modelValue: Record<string, any>) => void
    },
  )
}
