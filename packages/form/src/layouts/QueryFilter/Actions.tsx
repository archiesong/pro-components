import type { ExtractPropTypes, PropType } from 'vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { CollapseRender } from '../../RenderTypings';

export const actionsProps = () => ({
  submitter: {
    type: [Object, String] as PropType<VueNode>,
    default: undefined,
  },
  setCollapsed: {
    type: Function as PropType<(collapse: boolean) => void>,
    default: undefined,
  },
  isForm: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 是否收起 */
  collapsed: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 收起按钮的事件 */
  onCollapse: {
    type: Function as PropType<(collapsed: boolean) => void>,
    default: undefined,
  },
  /** 收起按钮的 render */
  collapseRender: {
    type: [Boolean, Function] as PropType<CollapseRender>,
    default: undefined,
  },
  /** 隐藏个数 */
  hiddenNum: {
    type: [Boolean, Number] as PropType<false | number>,
    default: undefined,
  },
});
export type ActionsProps = Partial<ExtractPropTypes<ReturnType<typeof actionsProps>>>;
