import type { PropType, CSSProperties, ExtractPropTypes } from 'vue';
import type { ColProps, RowProps } from 'ant-design-vue';
import type { FormItemProps, FormProps } from 'ant-design-vue/es/form';
import type { OptionRender } from '../../RenderTypings';
import { defineComponent, computed } from 'vue';
import { formProps } from 'ant-design-vue/es/form';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import ResizeObserver from 'ant-design-vue/es/vc-resize-observer';
import {
  classNames,
  isBrowser,
  omit,
  useMemo,
  useMountMergeState,
} from '@ant-design-vue/pro-utils';
import { BaseForm } from '../../BaseForm';
import { commonFormProps } from '../../BaseForm';
import { actionsProps } from './Actions';
import { useStyle } from './style';
import QueryFilterContent from './QueryFilterContent';

const CONFIG_SPAN_BREAKPOINTS = {
  xs: 513,
  sm: 513,
  md: 785,
  lg: 992,
  xl: 1057,
  xxl: Infinity,
};
/** 配置表单列变化的容器宽度断点 */
const BREAKPOINTS = {
  vertical: [
    // [breakpoint, cols, layout]
    [513, 1, 'vertical'],
    [785, 2, 'vertical'],
    [1057, 3, 'vertical'],
    [Infinity, 4, 'vertical'],
  ],
  default: [
    [513, 1, 'vertical'],
    [701, 2, 'vertical'],
    [1062, 3, 'horizontal'],
    [1352, 3, 'horizontal'],
    [Infinity, 4, 'horizontal'],
  ],
};

/**
 * 合并用户和默认的配置
 *
 * @param layout
 * @param width
 */
const getSpanConfig = (
  layout: FormProps['layout'],
  width: number,
  span?: SpanConfig
): { span: number; layout: FormProps['layout'] } => {
  if (span && typeof span === 'number') {
    return {
      span,
      layout,
    };
  }

  const spanConfig: (string | number)[][] = span
    ? ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map((key) => [
        CONFIG_SPAN_BREAKPOINTS[key as 'xs'],
        24 / (span as any)[key as 'sm'],
        'horizontal',
      ])
    : BREAKPOINTS[(layout as 'default') || 'default'];

  const breakPoint = (spanConfig || BREAKPOINTS.default).find(
    (item) => width < (item[0] as number) + 16 // 16 = 2 * (ant-row -8px margin)
  );

  if (!breakPoint) {
    return {
      span: 8,
      layout: 'horizontal',
    };
  }
  return {
    span: 24 / (breakPoint[1] as number),
    layout: breakPoint?.[2] as 'horizontal',
  };
};

export type SpanConfig =
  | number
  | {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };

export const baseQueryFilterProps = () => ({
  ...omit(actionsProps(), ['submitter', 'setCollapsed', 'isForm']),
  defaultCollapsed: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /**
   * @name layout 的布局设置
   * @type 'horizontal' | 'inline' | 'vertical';
   */
  layout: {
    type: String as PropType<FormProps['layout']>,
    default: undefined,
  },
  /**
   * @name 默认一行显示几个表单项
   */
  defaultColsNumber: {
    type: Number as PropType<number>,
    default: undefined,
  },
  /**
   * @name 默认展示几个表单项
   */
  defaultFormItemsNumber: {
    type: Number as PropType<number>,
    default: undefined,
  },
  /**
   * @name 文字标签的宽度
   *
   * @example 文字标签宽 80 ，一般用于只有两个字
   * labelWidth={80}
   * @example 文字标签宽 140 ，一般用于有四个字
   * labelWidth={140}
   * @example 自动计算，会导致不整齐
   * labelWidth="auto"
   */
  labelWidth: {
    type: [Number, String] as PropType<number | 'auto'>,
    default: '80',
  },
  /**
   * @name 每一行之前要不要有分割线
   * @description 只有在 `layout` 为 `vertical` 时生效
   */
  split: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /**
   * @name 配置列数，一般而言是 8 的倍数
   *
   * @example 配置一行4个
   * span={6}
   *
   * @example 配置一行3个
   * span={8}
   *
   * @example 根据屏幕宽度配置
   * span={xs: 24, sm: 12, md: 8, lg: 6, xl: 6, xxl: 6}
   * */
  span: {
    type: [Number, Object] as PropType<SpanConfig>,
    default: undefined,
  },
  /**
   * @name 查询按钮的文本
   *  */
  searchText: {
    type: String as PropType<string>,
    default: undefined,
  },
  /**
   * @name 重置按钮的文本
   */
  resetText: {
    type: String as PropType<string>,
    default: undefined,
  },
  /**
   * @name 查询表单栅格间隔
   *
   * @example searchGutter={24}
   * */
  searchGutter: {
    type: [Array, Number] as PropType<RowProps['gutter']>,
    default: 24,
  },
  /**
   * @param searchConfig 基础的配置
   * @param props 更加详细的配置 {
   *     type?: 'form' | 'list' | 'table' | 'cardList' | undefined;
   *     form: FormInstance;
   *     submit: () => void;
   *     collapse: boolean;
   *     setCollapse: (collapse: boolean) => void;
   *     showCollapseButton: boolean; }
   * @name 底部操作栏的 render
   *
   *
   * @example 增加一个清空按钮
   * optionRender={(searchConfig, props, dom) =>[ <a key="clear">清空</a>,...dom]}
   *
   * @example 增自定义提交
   *
   * optionRender={(searchConfig) => [<a key="submit" onClick={()=> searchConfig?.form?.submit()}>提交</a>]}
   */
  optionRender: {
    type: [Function, Boolean] as PropType<OptionRender>,
    default: undefined,
  },
  /**
   * @name 忽略 Form.Item rule规则配置
   */
  ignoreRules: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /**
   * @name 是否显示 collapse 隐藏个数
   */
  showHiddenNum: {
    type: Boolean as PropType<boolean>,
    default: false,
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
});
export type BaseQueryFilterProps = Partial<
  ExtractPropTypes<ReturnType<typeof baseQueryFilterProps>>
>;

const defaultWidth = isBrowser() ? document?.body?.clientWidth : 1024;

export const queryFilterProps = () => ({
  ...omit(formProps(), ['onFinish']),
  ...commonFormProps(),
  ...baseQueryFilterProps(),
  onReset: {
    type: Function as PropType<(values: any) => void>,
    default: undefined,
  },
});

export type QueryFilterProps = Partial<ExtractPropTypes<ReturnType<typeof queryFilterProps>>>;

const QueryFilter = defineComponent({
  name: 'QueryFilter',
  inheritAttrs: false,
  props: queryFilterProps(),
  setup(props, { attrs }) {
    const { getPrefixCls } = useConfigContextInject();
    const prefixCls = computed(() => props.prefixCls || getPrefixCls('pro'));
    const baseClassName = computed(() => `${prefixCls.value}-query-filter`);
    const { wrapSSR, hashId } = useStyle(baseClassName);
    const [width, setWidth] = useMountMergeState(
      () =>
        (typeof (attrs.style as CSSProperties)?.width === 'number'
          ? (attrs.style as CSSProperties)?.width
          : defaultWidth) as number
    );
    const spanSize = useMemo(
      () => getSpanConfig(props.layout, width.value + 16, props.span),
      [() => props.layout, () => width.value, () => props.span]
    );
    const showLength = useMemo(() => {
      if (props.defaultFormItemsNumber !== undefined) {
        return props.defaultFormItemsNumber;
      }
      if (props.defaultColsNumber !== undefined) {
        // 折叠为一行，需要处理多行的情况请使用 defaultFormItemsNumber
        const oneRowControlsNumber = 24 / spanSize.value.span - 1;
        return props.defaultColsNumber > oneRowControlsNumber
          ? oneRowControlsNumber
          : props.defaultColsNumber;
      }
      return Math.max(1, 24 / spanSize.value.span - 1);
    }, [
      () => props.defaultColsNumber,
      () => props.defaultFormItemsNumber,
      () => spanSize.value.span,
    ]);

    /** 计算最大宽度防止溢出换行 */
    const formItemFixStyle = useMemo<FormItemProps | undefined>(() => {
      if (props.labelWidth && spanSize.value.layout !== 'vertical' && props.labelWidth !== 'auto') {
        return {
          labelCol: {
            flex: `0 0 ${props.labelWidth}px`,
          },
          wrapperCol: {
            style: {
              maxWidth: `calc(100% - ${props.labelWidth}px)`,
            },
          },
          style: {
            flexWrap: 'nowrap',
          },
        };
      }
      return undefined;
    }, [() => spanSize.value.layout, () => props.labelWidth]);

    return () => {
      const {
        collapsed: controlCollapsed,
        layout,
        defaultCollapsed,
        defaultColsNumber,
        defaultFormItemsNumber,
        span,
        searchGutter,
        searchText,
        resetText,
        optionRender,
        collapseRender,
        onReset,
        onCollapse,
        labelWidth,
        split,
        ignoreRules,
        showHiddenNum,
        submitterColSpanProps,
        ...rest
      } = props;
      return wrapSSR(
        <ResizeObserver
          key="resize-observer"
          onResize={(offset: { width: number }) => {
            if (width.value !== offset.width && offset.width > 17) {
              setWidth(offset.width);
            }
          }}
        >
          <BaseForm
            {...rest}
            isKeyPressSubmit
            class={classNames(baseClassName.value, hashId.value, attrs.class)}
            style={attrs.style as CSSProperties}
            layout={spanSize.value.layout}
            formItemProps={formItemFixStyle.value}
            groupProps={{
              titleStyle: {
                display: 'inline-block',
                marginInlineEnd: 16,
              },
            }}
            contentRender={(items, renderSubmitter, form) => (
              <QueryFilterContent
                spanSize={spanSize.value}
                collapsed={controlCollapsed}
                form={form}
                submitterColSpanProps={submitterColSpanProps}
                collapseRender={collapseRender}
                defaultCollapsed={defaultCollapsed}
                onCollapse={onCollapse}
                optionRender={optionRender}
                submitter={renderSubmitter}
                items={items}
                split={split}
                prefixCls={baseClassName.value}
                resetText={props.resetText}
                searchText={props.searchText}
                searchGutter={searchGutter}
                ignoreRules={ignoreRules}
                showLength={showLength.value}
                showHiddenNum={showHiddenNum}
              />
            )}
          />
        </ResizeObserver>
      );
    };
  },
});

export default QueryFilter;
