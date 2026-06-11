import type { FormInstance } from 'antdv-next'
import type { InjectionKey, Ref, ShallowRef } from 'vue'
import type { ProStepFormProps } from './StepForm'
import type { ProStepsFormProps } from './typing'
import { inject, provide } from 'vue'

export interface ProStepsFormContextProps<T extends Record<string, any>, U extends Record<string, any>> {
  regForm?: (name: string, props: ProStepsFormProps<T, U>) => void
  unRegForm?: (name: string) => void
  onFormFinish?: (name: string, formData: any) => void
  keyArray?: Ref<string[]>
  formArray?: ShallowRef<FormInstance[]>
  setFormArray: (formArray: FormInstance[]) => void
  loading?: Ref<boolean>
  setLoading?: (loading: boolean) => void
  lastStep?: Ref<boolean>
  stepFormPropsMap?: ShallowRef<Map<string, ProStepFormProps<T, U>>>
  next: () => void
}

export const stepsFormContextKey = Symbol('stepsformContext')

export function useProStepsFormContextProvider<T extends Record<string, any>, U extends Record<string, any>>(props: ProStepsFormContextProps<T, U>) {
  return provide(stepsFormContextKey as InjectionKey<ProStepsFormContextProps<T, U>>, props)
}

export function useProStepsFormContextInject<T extends Record<string, any>, U extends Record<string, any>>() {
  return inject(
    stepsFormContextKey as InjectionKey<ProStepsFormContextProps<T, U>>,
    {} as ProStepsFormContextProps<T, U>,
  )
}
