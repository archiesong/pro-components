import type { VueNode } from '@v-c/util'
import type { FormInstance, StepsProps } from 'antdv-next'
import type { CSSProperties, VNode } from 'vue'
import type { SubmitterProps } from '../../BaseForm'
import type { ProFormProps } from '../ProForm'

export interface ProStepsFormProps<T, U> {
  prefixCls?: string
  /**
   * 返回 true 会重置步数，并且清空表单
   *
   * @name onFinish 提交方法
   */
  onFinish?: (values: T) => void | Promise<boolean | void>
  current?: number
  stepsProps?: StepsProps
  formProps?: ProFormProps<T, U>
  onCurrentChange?: (current: number) => void
  /** 自定义步骤器 */
  stepsRender?: (
    steps: {
      key: string
      title?: VueNode
    }[],
    defaultDom: VueNode,
  ) => VueNode
  /** @name formMap 所有表单的 formMap */
  formMap?: FormInstance[]
  'onUpdate:formMap'?: (formMap: FormInstance[]) => void
  /**
   * 自定义单个表单
   *
   *  From 的 dom，可以放置到别的位置
   */
  stepFormRender?: (from: VueNode) => VueNode

  /**
   * 自定义整个表单区域
   *
   * From 的 dom，可以放置到别的位置
   * submitter 操作按钮
   */
  stepsFormRender?: (
    from: VueNode,
    submitter: VueNode,
  ) => VueNode
  /** 按钮的统一配置，优先级低于分步表单的配置 */
  submitter?:
    | SubmitterProps<{
      step: number
      onPre: () => void
      form?: FormInstance
    }>
    | false

  containerStyle?: CSSProperties
  /**
   * 自定義整個佈局。
   *
   * layoutDom stepsDom 和 formDom 元素可以放置在任何地方。
   */
  layoutRender?: (layoutDom: {
    stepsDom: VNode
    formDom: VNode
  }) => VueNode
}
