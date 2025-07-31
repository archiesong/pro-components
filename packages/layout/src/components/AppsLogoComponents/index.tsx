import type { PropType, Ref, ExtractPropTypes } from 'vue';
import type { AppItemProps, AppListProps } from './typing';
import type { AppListRender } from '../../RenderTypings';
import { defineComponent, ref, computed } from 'vue';
import { Popover } from 'ant-design-vue';
import { useStyle } from './style';
import { classNames, useMemo, useState } from '@ant-design-vue/pro-utils';
import { AppsLogo } from './AppsLogo';
import SimpleContent from './SimpleContent';
import DefaultContent, { defaultRenderLogo } from './DefaultContent';

export const appsLogoComponentsProps = () => ({
  prefixCls: String as PropType<string>,
  /** 相关品牌的列表 */
  appList: Array as PropType<AppListProps>,
  appListRender: [Function, Boolean] as PropType<AppListRender>,
  /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
  onItemClick: Function as PropType<
    (item: AppItemProps, popoverRef: Ref<HTMLSpanElement | null>) => void
  >,
});

export type AppsLogoComponentsProps = Partial<
  ExtractPropTypes<ReturnType<typeof appsLogoComponentsProps>>
>;

const AppsLogoComponents = defineComponent({
  name: 'AppsLogoComponents',
  inheritAttrs: false,
  props: appsLogoComponentsProps(),
  setup(props) {
    const elRef = ref<HTMLDivElement | null>(null);

    const popoverRef = ref<HTMLSpanElement | null>(null);

    const baseClassName = computed(() => `${props.prefixCls}-layout-apps`);
    const { wrapSSR, hashId } = useStyle(baseClassName);
    const [open, setOpen] = useState(false);
    const cloneItemClick = (app: AppItemProps) => {
      props.onItemClick?.(app, popoverRef);
    };
    const defaultDomContent = useMemo(() => {
      const isSimple = props.appList?.some((app) => {
        return !app?.desc;
      });
      if (isSimple) {
        return (
          <SimpleContent
            hashId={hashId.value}
            appList={props.appList}
            itemClick={props.onItemClick ? cloneItemClick : void 0}
            baseClassName={`${baseClassName.value}-simple`}
          />
        );
      }
      return (
        <DefaultContent
          hashId={hashId.value}
          appList={props.appList}
          itemClick={props.onItemClick ? cloneItemClick : void 0}
          baseClassName={`${baseClassName.value}-default`}
        />
      );
    }, [() => props.appList, () => baseClassName.value, () => hashId.value]);

    const popoverContent = computed(() =>
      props.appListRender
        ? props.appListRender(props?.appList || [], defaultDomContent.value)
        : defaultDomContent.value
    );
    return () => {
      const { appList } = props;
      if (!appList?.length) return null;
      return wrapSSR(
        <div
          ref={elRef}
          class={classNames(baseClassName.value, hashId.value)}
          onClick={(e) => e.stopPropagation()}
        >
          <Popover
            placement="bottomRight"
            trigger={['click']}
            open={open.value}
            onOpenChange={(visible: boolean) => setOpen(visible)}
            overlayClassName={classNames(`${baseClassName.value}-popover`, hashId.value)}
            content={popoverContent.value}
            getPopupContainer={() => elRef.value || document.body}
          >
            <div
              ref={popoverRef}
              onClick={(e) => e.stopPropagation()}
              class={classNames(`${baseClassName.value}-wrapper`)}
            >
              <span
                class={classNames(`${baseClassName.value}-icon`, hashId.value, {
                  [`${baseClassName.value}-icon-active`]: open.value,
                })}
              >
                <AppsLogo />
              </span>
            </div>
          </Popover>
        </div>
      );
    };
  },
});

export { defaultRenderLogo };

export default AppsLogoComponents;
