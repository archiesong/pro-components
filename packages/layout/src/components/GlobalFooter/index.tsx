import type { PropType, VNode, CSSProperties, ExtractPropTypes } from 'vue';
import { defineComponent, computed } from 'vue';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import { classNames } from '@ant-design-vue/pro-utils';
import { useStyle } from './style';

export const globalFooterProps = () => ({
  links: {
    type: [Boolean, Array] as PropType<
      | boolean
      | {
          key?: string;
          title: VNode;
          href: string;
          blankTarget?: boolean;
        }[]
    >,
    default: void 0,
  },
  copyright: {
    type: [Object, Boolean] as PropType<VNode | boolean>,
    default: void 0,
  },
  style: {
    type: Object as PropType<CSSProperties>,
    default: void 0,
  },
  prefixCls: {
    type: String,
    default: void 0,
  },
  class: {
    type: String,
    default: void 0,
  },
});

export type GlobalFooterProps = Partial<ExtractPropTypes<ReturnType<typeof globalFooterProps>>>;

const GlobalFooter = defineComponent({
  name: 'GlobalFooter',
  inheritAttrs: false,
  props: globalFooterProps(),
  setup(props) {
    const { getPrefixCls } = useConfigContextInject();
    const baseClassName = computed(() => getPrefixCls(props.prefixCls || 'pro-global-footer'));
    const { wrapSSR, hashId } = useStyle(baseClassName);
    return () => {
      const { links, copyright, class: className, style } = props;
      if (
        (links == null || links === false || (Array.isArray(links) && links.length === 0)) &&
        (copyright == null || copyright === false)
      ) {
        return null;
      }
      return wrapSSR(
        <div class={classNames(baseClassName.value, hashId.value, className)} style={style}>
          {links && Array.isArray(links) && links.length > 0 && (
            <div class={classNames(`${baseClassName.value}-list`, hashId.value)}>
              {links?.map((link) => (
                <a
                  class={classNames(`${baseClassName.value}-list-link`, hashId.value)}
                  key={link.key}
                  title={link.key}
                  target={link.blankTarget ? '_blank' : '_self'}
                  href={link.href}
                  rel="noreferrer"
                >
                  {link.title}
                </a>
              ))}
            </div>
          )}
          {copyright && (
            <div class={classNames(`${baseClassName.value}-copyright`, hashId.value)}>
              {copyright}
            </div>
          )}
        </div>
      );
    };
  },
});
export default GlobalFooter;
