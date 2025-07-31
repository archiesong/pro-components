import type { PropType, VNode } from 'vue';
import type { RowProps, FormProps, ColProps, FormInstance } from 'ant-design-vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { CollapseRender, OptionRender } from '../../RenderTypings';
import { computed, defineComponent, cloneVNode, isVNode } from 'vue';
import { Row } from 'ant-design-vue';
import useMergedState from 'ant-design-vue/es/_util/hooks/useMergedState';
import { useIntl, useProConfigContextInject } from '@ant-design-vue/pro-provider';

const flatMapItems = (items: VueNode[], ignoreRules?: boolean): VueNode[] => {
  return items?.flatMap((item: any) => {
    if (item?.type?.displayName === 'ProForm-Group' && !item.props?.title) {
      return item.props.children;
    }

    if (ignoreRules && isVNode(item)) {
      return cloneVNode(item, {
        ...item.props,
        formItemProps: {
          ...item.props?.formItemProps,
          rules: [],
        },
      });
    }
    return item;
  });
};

const QueryFilterContent = defineComponent({
  name: 'QueryFilterContent',
  inheritAttrs: false,
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: undefined,
    },
    defaultCollapsed: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    onCollapse: {
      type: Function as PropType<(collapsed: boolean) => void>,
      default: undefined,
    },
    collapsed: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    searchText: {
      type: String as PropType<string>,
      default: undefined,
    },
    resetText: {
      type: String as PropType<string>,
      default: undefined,
    },
    searchGutter: {
      type: [Array, Number] as PropType<RowProps['gutter']>,
      default: 24,
    },
    split: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    items: {
      type: Array as PropType<VueNode[]>,
      default: undefined,
    },
    submitter: {
      type: [Object, Boolean] as PropType<VNode | false>,
      default: undefined,
    },
    showLength: {
      type: Number as PropType<number>,
      default: undefined,
    },
    collapseRender: {
      type: [Function, Boolean] as PropType<CollapseRender>,
      default: undefined,
    },
    spanSize: {
      type: Object as PropType<{
        span: number;
        layout: FormProps['layout'];
      }>,
      default: undefined,
    },
    /**
     * submitterColSpanProps 是一个可选属性，类型为一个对象。
     * 该对象使用 Omit 泛型去除了 ColProps 中的 'span' 属性，并新增了一个 'span' 属性，类型为 number 类型。
     *  也就是说，submitterColSpanProps 对象除了 'span' 属性外，还可以包含 ColProps 中的其他所有属性。
     */
    submitterColSpanProps: {
      type: Object as PropType<
        Omit<ColProps, 'span'> & {
          span: number;
        }
      >,
      default: undefined,
    },
    form: {
      type: Object as PropType<FormInstance>,
      default: undefined,
    },
    optionRender: {
      type: [Function, Boolean] as PropType<OptionRender>,
      default: undefined,
    },
    ignoreRules: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showHiddenNum: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const intl = useIntl();
    const proProvide = useProConfigContextInject();
    const [collapsed, setCollapsed] = useMergedState<boolean>(
      () => props.defaultCollapsed && !!props.submitter,
      {
        value: computed(() => props.collapsed),
        onChange: props.onCollapse,
      }
    );

    return () => {
      const {
        optionRender,
        collapseRender,
        split,
        items,
        spanSize,
        showLength,
        searchGutter,
        showHiddenNum,
      } = props;

      const resetText =
        props.resetText || intl.value.getMessage({ id: 'tableForm.reset', defaultMessage: '重置' });
      const searchText =
        props.searchText ||
        intl.value.getMessage({ id: 'tableForm.search', defaultMessage: '搜索' });
      const submitter =
        !props.submitter || optionRender === false
          ? null
          : cloneVNode(props.submitter, {
              searchConfig: {
                resetText,
                submitText: searchText,
              },
              render: optionRender
                ? (_: any, dom: VueNode[]) =>
                    optionRender(
                      {
                        ...props,
                        resetText,
                        searchText,
                      },
                      props,
                      dom
                    )
                : optionRender,
              ...props.submitter.props,
            });

      // totalSpan 统计控件占的位置，计算 offset 保证查询按钮在最后一列
      let totalSpan = 0;
      let itemLength = 0;
      //首个表单项是否占满第一行
      let firstRowFull = false;
      // totalSize 统计控件占的份数
      let totalSize = 0;

      // for split compute
      let currentSpan = 0;
      // 处理过，包含是否需要隐藏的 数组
      //   const processedList = flatMapItems(props.items!, props.ignoreRules).map(
      //     (item, index): { itemDom: VueNode; hidden: boolean; colSpan: number } => {
      //       // 如果 formItem 自己配置了 hidden，默认使用它自己的
      //       const colSize = isVNode(item) ? (item?.props?.colSize ?? 1) : 1;
      //       const colSpan = Math.min((props.spanSize?.span || 0) * (colSize || 1), 24);
      //       // 计算总的 totalSpan 长度
      //       totalSpan += colSpan;
      //       // 计算总的 colSize 长度
      //       totalSize += colSize;

      //       if (index === 0) {
      //         firstRowFull =
      //           colSpan === 24 && !(item as ReactElement<{ hidden: boolean }>)?.props?.hidden;
      //       }

      //       const hidden: boolean =
      //         (item as ReactElement<{ hidden: boolean }>)?.props?.hidden ||
      //         // 如果收起了
      //         (collapsed &&
      //           (firstRowFull ||
      //             // 如果 超过显示长度 且 总长度超过了 24
      //             totalSize > showLength) &&
      //           !!index);

      //       itemLength += 1;

      //       const itemKey =
      //         (React.isValidElement(item) &&
      //           (item.key || `${(item.props as Record<string, any>)?.name}`)) ||
      //         index;

      //       if (React.isValidElement(item) && hidden) {
      //         if (!props.preserve) {
      //           return {
      //             itemDom: null,
      //             colSpan: 0,
      //             hidden: true,
      //           };
      //         }
      //         return {
      //           itemDom: React.cloneElement(item, {
      //             hidden: true,
      //             key: itemKey || index,
      //           } as Record<string, any>),
      //           hidden: true,
      //           colSpan,
      //         };
      //       }

      //       return {
      //         itemDom: item,
      //         colSpan,
      //         hidden: false,
      //       };
      //     }
      //   );
      return (
        <Row gutter={searchGutter} justify="start" key="resize-observer-row">
          1
        </Row>
      );
    };
  },
});
export default QueryFilterContent;
