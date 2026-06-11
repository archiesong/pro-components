import type { ProFieldValueObjectType, ProFieldValueType } from '@antdv-next/pro-utils'
import type { ProFormGridConfig } from '../../../typing'
import type { ProFormPropsType, SchemaFormProps } from '../typing'
import { defineComponent } from 'vue'
import { ProStepsForm } from '../../../layouts'
import SchemaForm from '../index'

export type StepsFormProps<T extends Record<string, any>, U extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType)> = ProFormPropsType<T, U, ValueType>
  & Pick<SchemaFormProps<T, U, ValueType>, 'steps'> & {
    layoutType: 'StepsForm'
  } & Pick<ProFormGridConfig, 'grid'>

const StepsForm = defineComponent(<T extends Record<string, any>, U extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType)>(props: StepsFormProps<T, U, ValueType>) => {
  return () => {
    const { steps, columns, grid } = props
    return (
      <ProStepsForm {...props}>
        {steps?.map((step, index) => (
          <SchemaForm<T, U, ValueType>
            grid={grid}
            {...step}
            layoutType="StepForm"
            columns={columns[index]!}
          />
        ))}
      </ProStepsForm>
    )
  }
}, {
  name: 'StepsForm',
  inheritAttrs: false,
  props: ['columns', 'containerStyle', 'current', 'formMap', 'formProps', 'grid', 'layoutRender', 'layoutType', 'onCurrentChange', 'onFinish', 'onUpdate:formMap', 'prefixCls', 'stepFormRender', 'steps', 'stepsFormRender', 'stepsProps', 'stepsRender', 'submitter'],
})

export default StepsForm
