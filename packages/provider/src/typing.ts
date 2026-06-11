import type { VueNode } from '@v-c/util/dist/type'
import type { Key } from 'antdv-next/dist/table/interface'
import type { IntlType } from './intl'
import type { DeepPartial } from './typing/layoutToken'
import type { ProAliasToken } from './useStyle'

export interface ProConfigProviderProps {
  dark?: boolean
  compact?: boolean
  needDeps?: boolean
  token?: DeepPartial<ProAliasToken>
  prefixCls?: string
  valueTypeMap?: Record<string, ProRenderFieldPropsType>
  hashed?: boolean
  intl?: IntlType
}

/**
 * 用于配置 ValueEnum 的通用配置
 */
export interface ProSchemaValueEnumType {
  /** @name text 演示的文案 */
  text: VueNode
  /** @name status 预定的颜色 */
  status?: string
  /** @name  color 自定义的颜色 */
  color?: string
  /** @name disabled  是否禁用 */
  disabled?: boolean
}
/**
 * 支持 Map 和 Object
 *
 * @name ProSchemaValueEnumMap ValueEnum 的类型
 */
type ProSchemaValueEnumMap = Map<string | number | boolean, ProSchemaValueEnumType | VueNode>

/**
 * 支持 Map 和 Object
 */
type ProSchemaValueEnumObj = Record<string, ProSchemaValueEnumType | VueNode>

export type ProFieldFCMode = 'read' | 'edit' | 'update'

/**
 * BaseProFieldFC 的类型设置
 */
export interface BaseProFieldFC<T = any> {
  /** 值的类型 */
  text?: VueNode
  'onUpdate:text'?: (text: VueNode) => void
  /** 放置到组件上 props */
  fieldProps?: T
  /**
   * 组件的渲染模式类型
   * @option read 渲染只读模式
   * @option edit 渲染编辑模式
   * @option update 渲染更新模式
   */
  mode?: ProFieldFCMode
  /** 轻量模式 */
  light?: boolean

  /** Label */
  label?: VueNode

  /** 映射值的类型 */
  valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap
  /** 唯一的key，用于网络请求 */
  proFieldKey?: Key
}

/** Render 第二个参数，里面包含了一些常用的参数 */
export type ProFieldFCRenderProps<T = any> = {
  mode?: ProFieldFCMode
  readonly?: boolean
  placeholder?: string | string[]
  value?: any
  'onUpdate:value'?: (value: any) => void
  onChange?: (...rest: any[]) => void
} & BaseProFieldFC<T>

export interface ProRenderFieldPropsType<T = any> {
  /**
   * 自定义只读模式的渲染器
   * @params props 关于dom的配置
   * @params dom 默认的 dom
   * @return 返回一个用于读的 dom
   */
  render?:
    | ((
      text: any,
      props: Omit<ProFieldFCRenderProps<T>, 'value' | 'onUpdate:value' | 'onChange'> & { [key: string]: any },
      dom: VueNode,
    ) => VueNode)
  /**
   * 一个自定义的编辑渲染器。
   * @params text 默认的值类型
   * @params props 关于dom的配置
   * @params dom 默认的 dom
   * @return 返回一个用于编辑的dom
   */
  formItemRender?: ((text: any, props: ProFieldFCRenderProps<T> & { [key: string]: any }, dom: VueNode) => VueNode)
}

export type ParamsType = Record<string, any>
