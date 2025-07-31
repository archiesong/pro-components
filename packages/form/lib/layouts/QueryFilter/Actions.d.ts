import { VueNode } from 'ant-design-vue/lib/_util/type';
export type ActionsProps = {
    submitter: VueNode;
    setCollapsed: (collapse: boolean) => void;
    isForm?: boolean;
    /** 是否收起 */
    collapsed?: boolean;
    /** 隐藏个数 */
    hiddenNum?: false | number;
};
