import { VueNode } from 'ant-design-vue/lib/_util/type';
export type AppItemProps = {
    title: VueNode;
    desc?: VueNode;
    icon?: VueNode | (() => VueNode);
    url?: string;
    target?: string;
    children?: Omit<AppItemProps, 'children'>[];
};
export type AppListProps = AppItemProps[];
