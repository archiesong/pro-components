import type { VueNode } from 'antdv-next/dist/_util/type'
import type { DefineSetupFnComponent } from 'vue'

export type TargetType = '_blank' | '_self' | unknown

// 路由元信息
export interface MetaRecord {
  /** @name hideChildrenInMenu 在菜单中隐藏子节点 */
  hideChildrenInMenu?: boolean
  /** @name hideInMenu 在菜单中隐藏自己和子节点 */
  hideInMenu?: boolean
  /** @name icon 菜单的icon */
  icon?: VueNode | DefineSetupFnComponent<Record<string, any>>
  /** @name title 菜单的名字 */
  title?: string
  /** @name locale 自定义菜单的国际化 key */
  locale?: string | false
  /** @name flatMenu 隐藏自己，并且将子节点提升到与自己平级 */
  flatMenu?: boolean
  /** @name target 指定外链打开形式，同a标签 */
  target?: TargetType
  /**
   * @name tooltip menuItem 的 tooltip 显示的路径
   */
  tooltip?: string
  /**
   * @name disable 菜单选项
   */
  disabled?: boolean
  /**
   * @name disable menu 的 tooltip 菜单选项
   */
  disabledTooltip?: boolean
  [key: string]: any
}

export interface MenuDataItem {
  /** @name children  子菜单 */
  children?: MenuDataItem[]
  /** @name name 菜单的名字 */
  name?: string | symbol
  /** @name meta 路由元信息 */
  meta?: MetaRecord
  /** @name key 用于标定选中的值，默认是 path */
  key?: string
  /** @name path 路径,可以设定为网页链接 */
  path: string
  [key: string]: any
}

export interface RouterTypes {
  route?: MenuDataItem
  location?: { path?: string }
}

export interface MessageDescriptor {
  id: any
  description?: string
  defaultMessage?: string
}
