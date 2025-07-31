import { VueNode } from 'ant-design-vue/es/_util/type';
export type TargetType = '_blank' | '_self' | unknown;
export type MetaRecord = {
    /** @name 在菜单中隐藏子节点 */
    hideChildrenInMenu?: boolean;
    /** @name 在菜单中隐藏自己和子节点 */
    hideInMenu?: boolean;
    /** @name 菜单的icon */
    icon?: VueNode;
    /** @name 菜单的名字 */
    title?: string;
    /** @name 自定义菜单的国际化 key */
    locale?: string | false;
    /** @name 隐藏自己，并且将子节点提升到与自己平级 */
    flatMenu?: boolean;
    /** @name 指定外链打开形式，同a标签 */
    target?: TargetType;
    /**
     * @name menuItem 的 tooltip 显示的路径
     */
    tooltip?: string;
    /** @name disable 菜单选项 */
    disabled?: boolean;
    /** @name disable menu 的 tooltip 菜单选项 */
    disabledTooltip?: boolean;
    [key: string]: any;
};
export type MenuDataItem = {
    /** @name 子菜单 */
    children?: MenuDataItem[];
    /** @name 菜单的名字 */
    name?: string | symbol;
    /**@name 路由元信息 */
    meta?: MetaRecord;
    /** @name 用于标定选中的值，默认是 path */
    key?: string;
    /** @name 路径,可以设定为网页链接 */
    path: string;
    [key: string]: any;
};
export type MessageDescriptor = {
    id: any;
    description?: string;
    defaultMessage?: string;
};
export { VueNode };
export type WithFalse<T> = T | false;
