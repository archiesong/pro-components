import { VueNode } from 'ant-design-vue/es/_util/type';
import { CellEllipsisType } from 'ant-design-vue/es/vc-table/interface';
import { LabelTooltipType } from '../typing';
/**
 * 生成 Copyable 或 Ellipsis 的 dom
 *
 * @param dom
 * @param item
 * @param text
 */
declare const genCopyable: (dom: VueNode, item: {
    copyable?: boolean;
    ellipsis?: CellEllipsisType;
    tooltip?: LabelTooltipType;
}, text: string) => VueNode;
export default genCopyable;
