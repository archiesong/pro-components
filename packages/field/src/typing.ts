import type {
  BaseProFieldFC,
  ProFieldFCRenderProps,
  ProRenderFieldPropsType,
} from '@antdv-next/pro-provider'
import type { ProFieldRequestData } from '@antdv-next/pro-utils'
import type { VueNode } from '@v-c/util/dist/type'
import type { Ref } from 'vue'
// import type { FieldTextExpose } from './components/Text'
// import type { FieldTextAreaExpose } from './components/TextArea'

// 定义所有字符串类型的映射
// interface ProFieldStringValueTypeMap {
//   text: FieldTextExpose
//   textarea: FieldTextAreaExpose
//   // select: FieldSelectExpose;
//   // password: FieldPasswordExpose;
//   // ... 其他类型
//   // 可以添加默认类型处理
// }

// // 处理对象类型的映射
// interface ProFieldObjectValueTypeMap {
//   // progress: FieldProgressExpose
//   // money: FieldMoneyExpose
//   // percent: FieldPercentExpose
//   // image: FieldImageExpose
// }

// export type ProFieldExpose<T> = T extends keyof ProFieldStringValueTypeMap
//   ? ProFieldStringValueTypeMap[T]
//   : T extends ProFieldValueObjectType
//     ? T['type'] extends keyof ProFieldObjectValueTypeMap
//       ? ProFieldObjectValueTypeMap[T['type']]
//       : never
//     : never

/** 默认的 Field 需要实现的功能 */
export type ProFieldFC<T = any, K = any> = BaseProFieldFC<K>
  & ProRenderFieldPropsType<K>
  & T & {
    id?: string
  }

export type ProFieldEmptyText = string | false

/** 轻量筛选的field属性 */
export interface ProFieldLightProps {
  // label和clear图标的ref
  lightLabel?: Ref<{
    labelRef: Ref<HTMLElement>
    clearRef: Ref<HTMLElement>
  }>
  // 是否点击了label
  labelTrigger?: boolean
}

export type RenderProps = Omit<ProFieldFCRenderProps, 'text' | 'placeholder'> & ProRenderFieldPropsType & {
  id?: string
  /** 从服务器读取选项 */
  request?: ProFieldRequestData
  emptyText?: VueNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}
