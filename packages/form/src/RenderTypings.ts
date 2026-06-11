import type { IntlType } from '@antdv-next/pro-provider'
import type { VueNode } from '@antdv-next/pro-utils'
import type { FormInstance } from 'antdv-next'
import type { VNode } from 'vue'
import type { SubmitterProps } from './BaseForm/Submitter'
import type { ProFormFieldSetProps } from './components/FieldSet'
import type { BaseProQueryFilterProps } from './layouts/QueryFilter'
import type { ActionsProps } from './layouts/QueryFilter/Actions'
import type { WithFalse } from './typing'

export type LightFilterFooterRender = WithFalse<
  (
    /**
     * @name onConfirm 确认选择的值
     */
    onConfirm?: (e?: MouseEvent) => void,
    /**
     * @name onClear 清除选择
     */
    onClear?: (e?: MouseEvent) => void,
  ) => WithFalse<VNode>
>

export type OptionRender = WithFalse<
  (
    searchConfig: Omit<BaseProQueryFilterProps, 'submitter' | 'isForm'>,
    props: Omit<BaseProQueryFilterProps, 'searchConfig'>,
    dom: VueNode[],
  ) => VueNode[]
>

export type CollapseRender = WithFalse<
  (
    collapsed: boolean,
    /** 是否应该展示，有两种情况 列只有三列，不需要收起 form 模式 不需要收起 */
    props: ActionsProps,
    intl: IntlType,
    hiddenNum?: WithFalse<number>,
  ) => VueNode
>

export type SubmitterRender<T extends Record<string, any>> = WithFalse<
  (
    props: SubmitterProps<T> & {
      submit?: () => void
      reset?: () => void
    },
    dom: VueNode[],
  ) => WithFalse<VueNode[] | VueNode>
>

export type ContentRender<T extends Record<string, any>> = (
  items: VueNode | VueNode[],
  submitter: VNode<any, any, SubmitterProps<T>> | null,
  form: FormInstance,
) => VueNode

export type FieldSetRender = (value?: any[], props?: ProFormFieldSetProps) => VueNode
