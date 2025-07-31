export interface MessageDescriptor {
  id: string;
  description?: string;
  defaultMessage?: string;
}

export interface MetaRecord {
  /** @name 在菜单中隐藏自己和子节点 */
  hideInMenu?: boolean;
  /** @name 在菜单中隐藏子节点 */
  hideChildrenInMenu?: boolean;
  /** @name 菜单的icon */
  icon?: any;
  /** @name 菜单的标题 */
  title?: string;
  /** @name 自定义菜单的国际化 key */
  locale?: string | false;
  pro_layout_parentKeys?: string[];
  parentKeys?: string[];
  [key: string]: any;
}
export interface MenuDataItem {
  children?: MenuDataItem[];
  meta?: MetaRecord;
  path: string;
  key?: string;
  name?: string | symbol;
  [key: string]: any;
}
