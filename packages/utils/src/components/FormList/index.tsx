import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { Meta, NamePath, ValidatorRule } from 'antdv-next/dist/form/types'
import type { ChildProps } from './Field'
import type { InternalNamePath, StoreValue } from './interface'
import warning from 'antdv-next/dist/_util/warning'
import { getNamePath } from 'antdv-next/dist/form/utils/valueUtil'
import { computed, defineComponent, reactive } from 'vue'
import { useProFormContextInject } from '../ProFormContext'
import FormListField from './Field'
import { useFormFieldContextInject, useFormFieldContextProvider } from './FieldContext'
import { useFormListContextInject, useFormListContextProvider } from './ListContext'
import { move } from './utils'

export interface FormListFieldData {
  name?: number
  key: number
  isListField: boolean
  [key: string]: any
}

export interface FormListOperation {
  add: (defaultValue?: StoreValue, insertIndex?: number) => void
  remove: (index: number | number[]) => void
  move: (from: number, to: number) => void
}

export interface FormListProps {
  prefixCls?: string
  name?: NamePath<string | number | boolean>
  rules?: ValidatorRule[]
  initialValue?: any[]
  isListField?: boolean
}

const FormList = defineComponent<FormListProps & {
  validateTrigger?: string | string[] | false
}, {}, string, CustomSlotsType<{
  default?: (
    fields: FormListFieldData[],
    operation: FormListOperation,
    meta: { errors: VueNode[], warnings: VueNode[] },
  ) => VueNode
}>>((props, { slots }) => {
  const { formRef } = useProFormContextInject()
  const fieldContext = useFormFieldContextInject()
  const wrapperListContext = useFormListContextInject()
  const keyManager = reactive<{
    keys: (string | number | undefined)[]
    id: number
  }>({ keys: [], id: 0 })
  const prefixName = computed<InternalNamePath>(() => {
    const parentPrefixName = getNamePath(fieldContext.prefixName?.value) || []
    return [...parentPrefixName, ...getNamePath(props.name)]
  })
  useFormFieldContextProvider({
    ...formRef?.value,
    get nativeElement() {
      return formRef!.value?.nativeElement
    },
    get el() {
      return formRef!.value?.nativeElement
    },
    ...fieldContext,
    prefixName,
    initialValue: props.initialValue || [],
  })
  useFormListContextProvider({
    getKey: (namePath: InternalNamePath) => {
      const len = prefixName.value.length
      const pathName = namePath[len]!
      return [keyManager.keys[pathName as keyof typeof keyManager.keys] as string, namePath.slice(len + 1)]
    },
  })
  return () => {
    const { rules, validateTrigger, isListField, initialValue } = props
    return (
      <FormListField
        name={[]}
        rules={rules}
        validateTrigger={validateTrigger}
        initialValue={initialValue}
        isList
        isListField={isListField ?? !!wrapperListContext}
        v-slots={{
          default: (
            { value = [], onChange }: ChildProps,
            meta: Meta,
          ) => {
            const getNewValue = () => {
              const values = formRef?.value?.getFieldValue(prefixName.value || []) as StoreValue[]
              return values || []
            }
            /**
             * Always get latsest value in case user update fields by `form` api.
             */
            const operations: FormListOperation = {
              add: (defaultValue, index = 0) => {
                // // Mapping keys
                const newValue = getNewValue()
                if (index >= 0 && index <= newValue.length) {
                  keyManager.keys = [
                    ...keyManager.keys.slice(0, index),
                    keyManager.id,
                    ...keyManager.keys.slice(index),
                  ]
                  onChange?.([...newValue.slice(0, index), defaultValue, ...newValue.slice(index)])
                }
                else {
                  if (
                    process.env.NODE_ENV !== 'production'
                    && (index < 0 || index > newValue.length)
                  ) {
                    warning(
                      false,
                      'The second parameter of the add function should be a valid positive number.',
                    )
                  }
                  keyManager.keys = [...keyManager.keys, keyManager.id]
                  onChange?.([...newValue, defaultValue])
                }
                keyManager.id += 1
              },
              remove: (index) => {
                const newValue = getNewValue()
                const indexSet = new Set(Array.isArray(index) ? index : [index])
                if (indexSet.size <= 0) {
                  return
                }
                keyManager.keys = keyManager.keys.filter(
                  (_, keysIndex) => !indexSet.has(keysIndex),
                )
                // Trigger store change
                onChange?.(newValue.filter((_, valueIndex) => !indexSet.has(valueIndex)))
              },
              move(from: number, to: number) {
                if (from === to) {
                  return
                }
                const newValue = getNewValue()
                // Do not handle out of range
                if (from < 0 || from >= newValue.length || to < 0 || to >= newValue.length) {
                  return
                }
                keyManager.keys = move(keyManager.keys, from, to)
                // Trigger store change
                onChange?.(move(newValue, from, to))
              },
            }
            let listValue = value || []
            if (!Array.isArray(listValue)) {
              listValue = []
              if (process.env.NODE_ENV !== 'production') {
                warning(
                  false,
                  `Current value of '${prefixName.value.join(' > ')}' is not an array type.`,
                )
              }
            }
            return slots.default?.(
              (listValue as StoreValue[]).map((__, index): FormListFieldData => {
                let key = keyManager.keys[index] as number
                if (key === undefined) {
                  keyManager.keys[index] = keyManager.id
                  key = keyManager.keys[index]
                  keyManager.id += 1
                }
                return {
                  name: index,
                  key,
                  fieldKey: key,
                  isListField: true,
                }
              }),
              operations,
              meta,
            )
          },
        }}
      />
    )
  }
}, {
  name: 'FormList',
  inheritAttrs: false,
})
export default FormList
