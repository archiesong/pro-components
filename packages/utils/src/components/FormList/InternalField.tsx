import type { FormInstance } from 'antdv-next'
import type { EventArgs, Meta, Rule, TriggerType } from 'antdv-next/dist/form/types'
import type { ComputedRef, SlotsType } from 'vue'
import type { InternalNamePath, NamePath, Store, StoreValue } from './interface'
import { useFormContext } from 'antdv-next/dist/form/context'
import { getNamePath as antGetNamePath, getValue, setValue } from 'antdv-next/dist/form/utils/valueUtil'
import { defineComponent } from 'vue'
import { useProFormContextInject } from '../ProFormContext'
import { defaultGetValueFromEvent } from './utils'

export type MetaEvent = Meta & { destroy?: boolean }

export interface InternalFieldProps {
  dependencies?: NamePath<string | number | boolean>[]
  name?: NamePath<string | number | boolean>
  rules?: Rule[]
  messageVariables?: Record<string, string>
  initialValue?: any
  valuePropName?: 'checked' | 'value' | 'fileList'
  validateTrigger?: string | string[] | false
  getValueProps?: (value: StoreValue) => Record<string, unknown>
  getValueFromEvent?: (...args: any[]) => StoreValue
  trigger?: TriggerType | TriggerType[]
  /** @private Passed by Form.List props. Do not use since it will break by path check. */
  isList?: boolean
  isListField?: boolean
  /**
   * Trigger will after configured milliseconds.
   */
  validateDebounce?: number
  validateFirst?: boolean | 'parallel'
  normalize?: (value: StoreValue, prevValue: StoreValue, allValues: Store) => StoreValue
  fieldContext?: Omit<Partial<FormInstance>, 'nativeElement'> & {
    nativeElement?: ComputedRef<FormInstance['nativeElement']>
    prefixName?: ComputedRef<InternalNamePath>
    initialValue?: any[]
  } | null
  preserve?: boolean
  onReset?: () => void
  onMetaChange?: (meta: MetaEvent) => void
}

export interface ChildProps {
  value?: any[]
  onChange?: (...restParms: any[]) => void
  [key: string]: any
}

const triggerKey = {
  'change': 'onChange',
  'blur': 'onBlur',
  'focus': 'onFocus',
} as const

type TriggerTypeFn<T extends TriggerType = TriggerType> = {
  [P in typeof triggerKey[T] ]?: (...args: EventArgs) => void;
}

const InternalField = defineComponent<InternalFieldProps, {}, string, SlotsType<{
  default?: (
    control: ChildProps,
    meta: Meta,
    form?: (Omit<Partial<FormInstance>, 'nativeElement'> & {
      nativeElement?: ComputedRef<FormInstance['nativeElement']>
      prefixName?: ComputedRef<InternalNamePath>
      initialValue?: any[]
    } | null),
  ) => any
}>>(
  (props, { slots }) => {
    const { formRef } = useProFormContextInject()
    const formContext = useFormContext()
    const getNamePath = () => {
      const { name } = props
      return name !== undefined ? [...(props.fieldContext?.prefixName?.value || []), ...antGetNamePath(name)] : []
    }
    const getFieldValue = (store?: Store) => {
      const namePath = getNamePath()
      return getValue(store || formContext.value.model, namePath)
    }

    if (props.initialValue !== undefined) {
      const namePath = getNamePath()
      if (namePath.length) {
        const prevValue = getValue(formContext.value.model, namePath)
        if (prevValue === undefined && namePath.length && formRef?.value) {
          formRef.value.setFieldsValue(setValue(formContext.value.model, namePath, props.initialValue))
        }
      }
    }
    const triggerFn = (...args: EventArgs) => {
      const { getValueFromEvent, normalize, valuePropName = 'value' } = props
      const value = getFieldValue()
      let newValue
      const namePath = getNamePath()
      if (getValueFromEvent) {
        newValue = getValueFromEvent(...args)
      }
      else {
        newValue = defaultGetValueFromEvent(valuePropName, ...args)
      }
      if (normalize) {
        newValue = normalize(newValue, value, formContext.value.model!)
      }
      if (newValue !== value && formRef?.value) {
        formRef.value.setFieldValue(namePath, newValue)
      }
    }
    const mergedGetValueProps
      = props.getValueProps
        || ((val: StoreValue) => {
          const { valuePropName = 'value' } = props
          return {
            [valuePropName]: val,
            [`onUpdate:${valuePropName}`]: triggerFn,
          }
        })
    return () => {
      const { trigger = 'change', fieldContext } = props
      const value = getFieldValue()
      const meta = {
        touched: false,
        validated: false,
        validating: false,
        name: getNamePath(),
        errors: [] as string[],
        warnings: [] as string[],
      } as Meta
      const valueProps = props.name !== undefined ? mergedGetValueProps(value) : {}
      const control = {
        ...valueProps,
      } as ChildProps & TriggerTypeFn<TriggerType>
      const triggers = Array.isArray(trigger) ? trigger : [trigger]
      triggers.forEach((key) => {
        control[triggerKey[key as keyof typeof triggerKey]] = triggerFn
      })
      return slots.default?.(control, meta, fieldContext)
    }
  },
  {
    name: 'InternalField',
    inheritAttrs: false,
  },
)

export default InternalField
