import type { FormInstance } from 'antdv-next'
import type { Meta } from 'antdv-next/dist/form/types'
import type { ComputedRef, SlotsType } from 'vue'
import type { InternalNamePath, NamePath } from './interface'
import type { InternalFieldProps } from './InternalField'
import { getNamePath } from 'antdv-next/dist/form/utils/valueUtil'
import { computed, defineComponent } from 'vue'
import { useProFormContextInject } from '../ProFormContext'
import { useFormFieldContextInject } from './FieldContext'
import InternalField from './InternalField'
import { useFormListContextInject } from './ListContext'

export type MetaEvent = Meta & { destroy?: boolean }
export type FormListFieldProps = Omit<InternalFieldProps, 'name' | 'fieldContext'> & {
  name?: NamePath<string | number | boolean>
}
export interface ChildProps {
  value?: any[]
  onChange?: (...restParms: any[]) => void
  [key: string]: any
}

const FormListField = defineComponent<FormListFieldProps, {}, string, SlotsType<{
  default?: (
    control: ChildProps,
    meta: Meta,
    form?: FormInstance & {
      prefixName?: ComputedRef<InternalNamePath>
      initialValue: any[]
    },
  ) => any
}>>((props, { slots }) => {
  const fieldContext = useFormFieldContextInject()
  const listContext = useFormListContextInject()
  const { formRef } = useProFormContextInject()
  const namePath = computed(() => props.name !== undefined ? getNamePath(props.name) : undefined)
  return () => {
    const { name, ...restProps } = props
    const isMergedListField = restProps.isListField ?? !!listContext
    let key: string = 'keep'
    if (!isMergedListField) {
      key = `_${(namePath.value || []).join('_')}`
    }
    return (
      <InternalField
        key={key}
        {...restProps}
        isListField={isMergedListField}
        name={namePath.value}
        fieldContext={Object.keys(fieldContext).length ? fieldContext : formRef?.value}
        v-slots={slots}
      />
    )
  }
}, {
  name: 'FormListField',
  inheritAttrs: false,
})

export default FormListField
