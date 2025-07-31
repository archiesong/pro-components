import type { PropType } from 'vue';
import type { AvatarProps } from 'ant-design-vue';
import type { VueNode, WithFalse } from '../../typing';
import type { SiderMenuProps } from '../SiderMenu/SiderMenu';
import type { ActionsRender } from '../../RenderTypings';
import { computed, defineComponent, isVNode } from 'vue';
import { Avatar } from 'ant-design-vue';
import ResizeObserver from 'ant-design-vue/es/vc-resize-observer';
import { useStyle } from './style/rightContentStyle';
import { useDebounceFn, useState, useMemo, classNames } from '@ant-design-vue/pro-utils';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';

export type AvatarPropsType = WithFalse<
  AvatarProps & {
    title?: VueNode;
    render?: (avatarProps: AvatarProps, defaultDom: VueNode, props: SiderMenuProps) => VueNode;
  }
>;

const ActionsContent = defineComponent({
  name: 'ActionsContent',
  inheritAttrs: false,
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: undefined,
    },
    /** 头像的设置 */
    avatarProps: {
      type: [Object, Boolean] as PropType<AvatarPropsType>,
      default: undefined,
    },
    /**
     * @name Layout的操作功能列表，不同的 layout 会放到不同的位置
     */
    actionsRender: {
      type: [Function, Object, Boolean] as PropType<ActionsRender>,
      default: undefined,
    },
  },
  setup(props) {
    const { getPrefixCls } = useConfigContextInject();
    const prefixCls = computed(() => props.prefixCls || `${getPrefixCls()}-pro-global-header`);
    const { wrapSSR, hashId } = useStyle(prefixCls);
    const [rightSize, setRightSize] = useState<number | string>('auto');
    const avatarDom = useMemo(() => {
      if (!props.avatarProps) return null;
      const { title, render, ...rest } = props.avatarProps;
      const domList = (
        <>
          {rest?.src || rest?.srcset || rest.icon ? (
            <Avatar {...rest} size={28} key="avatar" />
          ) : null}
          {title && (
            <span
              key="name"
              style={{
                marginInlineStart: '8px',
              }}
            >
              {title}
            </span>
          )}
        </>
      );
      if (render) {
        return render(props.avatarProps, <span>{domList}</span>, props);
      }
      return <span>{domList}</span>;
    }, [() => props.avatarProps]);
    /** 减少一下渲染的次数 */
    const setRightSizeDebounceFn = useDebounceFn(async (width: number) => setRightSize(width), 160);

    return () => {
      const contentRender =
        props.actionsRender || avatarDom.value
          ? (restParams: any) => {
              const doms = props.actionsRender && props.actionsRender?.(restParams);
              if (!doms && !avatarDom.value) return null;
              if (!Array.isArray(doms)) {
                let hideHover = false;
                // 如果配置了 hideHover 就不展示 hover 效果了
                if (isVNode(doms)) {
                  hideHover = !!doms?.props?.['aria-hidden'];
                }
                return wrapSSR(
                  <div class={classNames(`${prefixCls.value}-actions`, hashId.value)}>
                    <div
                      class={classNames(`${prefixCls.value}-actions-item`, hashId.value, {
                        [`${prefixCls.value}-actions-hover`]: !hideHover,
                      })}
                    >
                      {doms}
                    </div>
                    {avatarDom.value && (
                      <div class={classNames(`${prefixCls.value}-actions-avatar`, hashId.value)}>
                        {avatarDom.value}
                      </div>
                    )}
                  </div>
                );
              }
              return wrapSSR(
                <div class={classNames(`${prefixCls.value}-actions`, hashId.value)}>
                  {doms.filter(Boolean).map((dom, index) => {
                    let hideHover = false;
                    // 如果配置了 hideHover 就不展示 hover 效果了
                    if (isVNode(dom)) {
                      hideHover = !!dom?.props?.['aria-hidden'];
                    }
                    return (
                      <div
                        key={index}
                        class={classNames(`${prefixCls.value}-actions-item`, hashId.value, {
                          [`${prefixCls.value}-actions-hover`]: !hideHover,
                        })}
                      >
                        {dom}
                      </div>
                    );
                  })}
                  {avatarDom.value && (
                    <div class={classNames(`${prefixCls.value}-actions-avatar`, hashId.value)}>
                      {avatarDom.value}
                    </div>
                  )}
                </div>
              );
            }
          : undefined;
      return (
        <div
          class={classNames(`${prefixCls.value}-right-content`, hashId.value)}
          style={{
            minWidth: rightSize.value,
            height: '100%',
          }}
        >
          <ResizeObserver
            onResize={({ width }: { width: number }) => {
              setRightSizeDebounceFn.run(width);
            }}
          >
            {contentRender && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                {contentRender({
                  ...props,
                  // 测试专用
                  rightContentSize: rightSize.value,
                })}
              </div>
            )}
          </ResizeObserver>
        </div>
      );
    };
  },
});
export default ActionsContent;
