import type { PropType, ExtractPropTypes } from 'vue';
import type { ErrorBoundaryRender } from './RenderTypings';
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import { useProConfigContextInject } from '@ant-design-vue/pro-provider';
import { classNames, ErrorBoundary } from '@ant-design-vue/pro-utils';
const { Content } = Layout;

export const wrapContentProps = () => ({
  hasPageContainer: {
    type: Number as PropType<number>,
    default: undefined,
  },
  isChildrenLayout: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  prefixCls: String as PropType<string>,
  location: {
    type: Object as PropType<{ pathname: string }>,
    default: undefined,
  },
  contentHeight: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  errorBoundaryRender: {
    type: [Object, Function, Boolean] as PropType<ErrorBoundaryRender>,
    default: undefined,
  },
  hasHeader: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
});

export type WrapContentProps = ExtractPropTypes<ReturnType<typeof wrapContentProps>>;

const WrapContent = defineComponent({
  name: 'WrapContent',
  inheritAttrs: false,
  props: wrapContentProps(),
  setup(props, { slots, attrs }) {
    const proProvide = useProConfigContextInject();

    const handleError = (args: any) => {
      console.log(args.error);
    };
    return () => {
      const { errorBoundaryRender } = props;
      const contentClassName = classNames(`${props.prefixCls}-content`, proProvide.value.hashId, {
        [`${props.prefixCls}-has-header`]: props.hasHeader,
        [`${props.prefixCls}-content-has-page-container`]: (props.hasPageContainer || 0) > 0,
      });
      return errorBoundaryRender === false ? (
        <Content class={contentClassName} style={attrs.style}>
          {slots.default?.()}
        </Content>
      ) : (
        <ErrorBoundary fallback={errorBoundaryRender} onError={handleError}>
          <Content class={contentClassName} style={attrs.style}>
            {slots.default?.()}
          </Content>
        </ErrorBoundary>
      );
    };
  },
});
export default WrapContent;
