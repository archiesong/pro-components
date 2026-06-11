import type { ScrollFocusOptions } from 'antdv-next/dist/form/interface'
import type { NamePath, ValidateOptions } from 'antdv-next/dist/form/types'
import type { ComputedRef, ShallowRef } from 'vue'
import type { ProFormRef } from '../BaseForm'
import { useEffect, useState } from '@antdv-next/pro-utils'
import { computed } from 'vue'

export function useProFormInstanceExpose<T extends Record<string, any>>(formRef:
  | ComputedRef<ProFormRef<T> | undefined | null>
  | ShallowRef<ProFormRef<T> | undefined | null>) {
  return ({
    focus: () => formRef.value?.focus?.(),
    focusField: (fieldName: string) => formRef.value?.focusField(fieldName),
    nativeElement: computed(() => formRef.value?.nativeElement),
    getFieldsValue: (nameList?: true | NamePath<string | number | boolean>[]) => formRef.value?.getFieldsValue(nameList),
    getFieldValue: (name: NamePath<string | number | boolean>) => formRef.value?.getFieldValue(name),
    getFieldError: (name: NamePath<string | number | boolean>[]) => formRef.value?.getFieldError(name),
    getFieldsError: (nameList?: NamePath<string | number | boolean>[]) => formRef.value?.getFieldsError(nameList),
    getFieldWarning: (name: NamePath<string | number | boolean>) => formRef.value?.getFieldWarning(name),
    isFieldsTouched: (nameList?: boolean | NamePath<string | number | boolean>[], allFieldsTouched?: boolean) => formRef.value?.isFieldsTouched(nameList, allFieldsTouched),
    isFieldTouched: (name: NamePath<string | number | boolean>) => formRef.value?.isFieldTouched(name),
    isFieldsValidating: (nameList?: NamePath<string | number | boolean>[]) => formRef.value?.isFieldsValidating(nameList),
    isFieldValidating: (name: NamePath<string | number | boolean>) => formRef.value?.isFieldValidating(name),
    resetFields: (nameList?: NamePath<string | number | boolean>[]) => formRef.value?.resetFields(nameList),
    clearValidate: (nameList?: NamePath<string | number | boolean>[]) => formRef.value?.clearValidate(nameList),
    setFields: (data: any[]) => formRef.value?.setFields(data),
    setFieldValue: (name: NamePath<string | number | boolean>, value: any) => formRef.value?.setFieldValue(name, value),
    setFieldsValue: (values: Record<string, any>) => formRef.value?.setFieldsValue(values),
    validateFields: async (nameList?: NamePath<string | number | boolean>[], options?: ValidateOptions) => await formRef.value?.validateFields(nameList, options),
    validate: async () => await formRef.value?.validate(),
    submit: () => formRef.value?.submit(),
    scrollToField: (fieldName: string, options?: boolean | ScrollFocusOptions) => formRef.value?.scrollToField(fieldName, options),
    getFieldInstance: (name: NamePath<string | number | boolean>) => formRef.value?.getFieldInstance(name),
    getFieldsFormatValue: (allData?: true, omitNilParam?: boolean) => formRef.value?.getFieldsFormatValue?.(allData, omitNilParam),
    getFieldFormatValue: (paramsNameList: NamePath<string | number | boolean> = [], omitNilParam?: boolean) => formRef.value?.getFieldFormatValue?.(paramsNameList, omitNilParam),
    getFieldFormatValueObject: (paramsNameList?: NamePath<string | number | boolean>, omitNilParam?: boolean) => formRef.value?.getFieldFormatValueObject?.(paramsNameList, omitNilParam),
    validateFieldsReturnFormatValue: async (nameList?: NamePath<string | number | boolean>[], omitNilParam?: boolean) => formRef.value?.validateFieldsReturnFormatValue?.(nameList, omitNilParam),
  }) as Omit<ProFormRef<T>, 'nativeElement'> & {
    nativeElement?: ComputedRef<ProFormRef<T>['nativeElement']>
  }
}

const booleanValues = {
  true: true,
  false: false,
}

function setQueryToCurrentUrl(params: Record<string, any>) {
  const { URL } = typeof window !== 'undefined' ? window : ({} as any)
  const url = new URL(window?.location?.href)

  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        url.searchParams.delete(key)
        value.forEach((valueItem) => {
          url.searchParams.append(key, valueItem)
        })
      }
      else if (value instanceof Date) {
        if (!Number.isNaN(value.getTime())) {
          url.searchParams.set(key, value.toISOString())
        }
      }
      else if (typeof value === 'object') {
        url.searchParams.set(key, JSON.stringify(value))
      }
      else {
        url.searchParams.set(key, value)
      }
    }
    else {
      url.searchParams.delete(key)
    }
  })
  return url
}

function parseValue(
  key: string | number,
  _value: any,
  types: Record<string, any>,
  defaultParams: Record<string, any>,
) {
  if (!types)
    return _value
  const type = types[key]
  const value = _value === undefined ? defaultParams[key] : _value

  if (type === Number) {
    return Number(value)
  }
  if (type === Boolean || _value === 'true' || _value === 'false') {
    return booleanValues[value as keyof typeof booleanValues]
  }
  if (Array.isArray(type)) {
    return type.find(item => item === value) || defaultParams[key]
  }
  return value
}
export function useUrlSearchParams(initial: Record<string, string | number> = {}, config: {
  disabled?: boolean
} = { disabled: false }): [
  ComputedRef<Record<string, string | number>>,
  (value: Record<string, string | number>) => void,
] {
  const locationSearch = typeof window !== 'undefined' && window?.location?.search
  const [, forceUpdate] = useState<Record<string, any>>()
  const urlSearchParams = computed(() => {
    if (config.disabled)
      return {}
    return new URLSearchParams(locationSearch || {})
  })
  const params = computed(() => {
    if (config.disabled)
      return {}
    if (typeof window === 'undefined' || !window.URL)
      return {}
    let result: any = [];
    (urlSearchParams.value as InstanceType<typeof URLSearchParams>).forEach((value, key) => {
      result.push({
        key,
        value,
      })
    })
    // group by key
    result = result.reduce((acc: any, val: any) => {
      (acc[val.key] = acc[val.key] || []).push(val)
      return acc
    }, {})

    result = Object.keys(result).map((key) => {
      const valueGroup = result[key]
      if (valueGroup.length === 1) {
        return [key, valueGroup[0].value]
      }
      return [key, valueGroup.map(({ value }: { value: any }) => value)]
    })

    const newParams = { ...initial }

    result.forEach(([key, value]: any[]) => {
      newParams[key] = parseValue(key, value, {}, initial)
    })

    return newParams
  })
  const redirectToNewSearchParams = (newParams: Record<string, any>) => {
    if (typeof window === 'undefined' || !window.URL)
      return
    const url = setQueryToCurrentUrl(newParams)
    if (window.location.search !== url.search) {
      console.log('跳转')
      window.history.replaceState(window.history.state, '', url.toString())
    }
    if (urlSearchParams.value.toString() !== url.searchParams.toString()) {
      forceUpdate({})
    }
  }
  useEffect(() => {
    if (config.disabled)
      return
    if (typeof window === 'undefined' || !window.URL)
      return
    redirectToNewSearchParams({
      ...initial,
      ...params.value,
    })
  }, [() => config.disabled, params])

  const setParams = (newParams: Record<string, string | number>) => {
    redirectToNewSearchParams(newParams)
  }
  useEffect(() => {
    if (config.disabled)
      return () => {}
    if (typeof window === 'undefined' || !window.URL)
      return () => {}

    const onPopState = () => {
      forceUpdate({})
    }
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [() => config.disabled])
  return [params, setParams]
}
