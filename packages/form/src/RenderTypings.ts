import type { FormInstance } from 'ant-design-vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { BaseQueryFilterProps } from './layouts';
import type { ActionsProps } from './layouts/QueryFilter/Actions';
import type { IntlType } from '@ant-design-vue/pro-provider';
import type { WithFalse } from './typing';
import type { SubmitterProps } from './components';

export type OptionRender = WithFalse<
  (
    searchConfig: Omit<BaseQueryFilterProps, 'submitter' | 'isForm'>,
    props: Omit<BaseQueryFilterProps, 'searchConfig'>,
    dom: VueNode[]
  ) => VueNode[]
>;

export type CollapseRender = WithFalse<
  (
    collapsed: boolean,
    /** 是否应该展示，有两种情况 列只有三列，不需要收起 form 模式 不需要收起 */
    props: ActionsProps,
    intl: IntlType,
    hiddenNum?: false | number
  ) => VueNode
>;

export type SubmitterrRender = WithFalse<
  (
    props: SubmitterProps & { form?: FormInstance } & {
      submit: (e: MouseEvent) => void;
      reset: () => void;
    },
    dom: VueNode[]
  ) => VueNode[] | VueNode | false
>;
