import type { PropType, ExtractPropTypes } from 'vue';
import type { ButtonProps, FormInstance } from 'ant-design-vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { WithFalse } from '../../typing';
import type { SubmitterrRender } from '../../RenderTypings';
import { defineComponent } from 'vue';
import { Button, Space } from 'ant-design-vue';
import { omit } from '@ant-design-vue/pro-utils';
import { useIntl } from '@ant-design-vue/pro-provider';

/** @name 用于配置操作栏 */
export type SearchConfig = {
  /** @name 重置按钮的文本 */
  resetText?: VueNode;
  /** @name 提交按钮的文本 */
  submitText?: VueNode;
};

const submitterProps = () => ({
  /** @name 提交方法 */
  onSubmit: {
    type: Function as PropType<(value?: any) => void>,
    default: undefined,
  },
  /** @name 重置方法 */
  onReset: {
    type: Function as PropType<(value?: any) => void>,
    default: undefined,
  },
  /** @name 搜索的配置，一般用来配置文本 */
  searchConfig: {
    type: Object as PropType<SearchConfig>,
    default: undefined,
  },
  /** @name 提交按钮的 props */
  submitButtonProps: {
    type: [Boolean, Object] as PropType<WithFalse<ButtonProps & { preventDefault?: boolean }>>,
    default: undefined,
  },
  /** @name 重置按钮的 props */
  resetButtonProps: {
    type: [Boolean, Object] as PropType<WithFalse<ButtonProps & { preventDefault?: boolean }>>,
    default: undefined,
  },
  /** @name 自定义操作的渲染 */
  render: {
    type: [Boolean, Function] as PropType<SubmitterrRender>,
    default: undefined,
  },
  form: {
    type: Object as PropType<FormInstance>,
    default: undefined,
  },
});

export type SubmitterProps = Partial<ExtractPropTypes<ReturnType<typeof submitterProps>>>;

const Submitter = defineComponent({
  name: 'Submitter',
  inheritAttrs: false,
  props: submitterProps(),
  setup(props) {
    const intl = useIntl();
    const submit = (e: MouseEvent) => {
      // props.form?.onSubmit?.(e);
      props.onSubmit?.();
    };

    const reset = () => {
      // props.form?.resetFields();
      props.onReset?.();
    };
    return () => {
      const { render, searchConfig = {}, submitButtonProps, resetButtonProps } = props;
      if (render === false) {
        return null;
      }
      const {
        submitText = intl.value.getMessage({ id: 'tableForm.submit', defaultMessage: '提交' }),
        resetText = intl.value.getMessage({ id: 'tableForm.reset', defaultMessage: '重置' }),
      } = searchConfig;
      /** 默认的操作的逻辑 */
      const dom = [];
      if (resetButtonProps !== false) {
        dom.push(
          <Button
            {...omit(resetButtonProps ?? {}, ['preventDefault'] as any)}
            key="rest"
            onClick={(e) => {
              if (!resetButtonProps?.preventDefault) reset();
              if (typeof resetButtonProps?.onClick === 'function') {
                resetButtonProps.onClick(e);
              } else if (Array.isArray(resetButtonProps?.onClick)) {
                resetButtonProps.onClick.forEach((handler) => {
                  if (typeof handler === 'function') handler(e);
                });
              }
            }}
          >
            {resetText}
          </Button>
        );
      }
      if (submitButtonProps !== false) {
        dom.push(
          <Button
            type="primary"
            {...omit(submitButtonProps || {}, ['preventDefault'])}
            key="submit"
            onClick={(e) => {
              if (!submitButtonProps?.preventDefault) submit(e);
              if (typeof submitButtonProps?.onClick === 'function') {
                submitButtonProps.onClick(e);
              } else if (Array.isArray(submitButtonProps?.onClick)) {
                submitButtonProps.onClick.forEach((handler) => {
                  if (typeof handler === 'function') handler(e);
                });
              }
            }}
          >
            {submitText}
          </Button>
        );
      }
      const renderDom = render ? render({ ...props, submit, reset }, dom) : dom;

      if (Array.isArray(renderDom)) {
        if (renderDom?.length < 1) {
          return null;
        }
        if (renderDom?.length === 1) {
          return renderDom[0];
        }
        return <Space>{renderDom}</Space>;
      }
      if (!renderDom) {
        return null;
      }

      return renderDom;
    };
  },
});
export default Submitter;
