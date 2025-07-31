import type { ExtractPropTypes, PropType, CSSProperties } from 'vue';
import type { ListToolBarHeaderMenuProps } from './HeaderMenu';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface';
import type { SearchProps } from '../../typing';
import type { LabelTooltipType } from '@ant-design-vue/pro-utils';
import { defineComponent, computed, isVNode, Fragment, cloneVNode } from 'vue';
import { InputSearch, Tooltip } from 'ant-design-vue';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import ResizeObserver from 'ant-design-vue/es/vc-resize-observer';
import { useStyle } from './style';
import { classNames, LabelIconTip, useMemo, useState } from '@ant-design-vue/pro-utils';
import { proTheme, useIntl } from '@ant-design-vue/pro-provider';

export type ListToolBarSetting = {
  icon: VueNode;
  tooltip?: LabelTooltipType | string;
  key?: string;
  onClick?: (key?: string) => void;
};

export type ListToolBarMenu = ListToolBarHeaderMenuProps;

export type SearchPropType =
  | (SearchProps & {
      onSearch: (
        searchValue: string,
        event?: ChangeEvent | MouseEvent | KeyboardEvent
      ) => Promise<false | void> | false | void;
    })
  | VueNode
  | boolean;

type SettingPropType = VueNode | ListToolBarSetting;

export const listToolBarProps = () => ({
  prefixCls: {
    type: String as PropType<string>,
    default: undefined,
  },
  /** 标题 */
  title: {
    type: [String, Object, Function] as PropType<VueNode>,
    default: undefined,
  },
  /** 副标题 */
  subTitle: {
    type: [String, Object, Function] as PropType<VueNode>,
    default: undefined,
  },
  /** 标题提示 */
  tooltip: {
    type: [String, Object, Function] as PropType<string | LabelTooltipType>,
    default: undefined,
  },
  /** 搜索输入栏相关配置 */
  search: {
    type: [Object, Boolean, Function, Array] as PropType<SearchPropType>,
    default: undefined,
  },
  /** 搜索回调 */
  onSearch: {
    type: Function as PropType<(keyWords: string) => void>,
    default: undefined,
  },
  /** 工具栏右侧操作区 */
  actions: {
    type: Array as PropType<VueNode[]>,
    default: () => [],
  },
  /** 工作栏右侧设置区 */
  settings: {
    type: Array as PropType<SettingPropType[]>,
    default: undefined,
  },
  /** 是否多行展示 */
  multipleLine: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 过滤区，通常配合 LightFilter 使用 */
  filter: {
    type: [Function, Object, Array] as PropType<VueNode>,
    default: undefined,
  },
  /** 菜单配置 */
  menu: {
    type: Object as PropType<ListToolBarMenu>,
    default: undefined,
  },
});
export type ListToolBarProps = Partial<ExtractPropTypes<ReturnType<typeof listToolBarProps>>>;

/**
 * 获取配置区域 DOM Item
 *
 * @param setting 配置项
 */
const getSettingItem = (setting: SettingPropType) => {
  if (isVNode(setting)) {
    return setting;
  }
  if (setting) {
    const settingConfig: ListToolBarSetting = setting as ListToolBarSetting;
    const { icon, tooltip, onClick, key } = settingConfig;
    if (icon && tooltip) {
      return (
        <Tooltip title={tooltip as VueNode}>
          <span
            key={key}
            onClick={() => {
              if (onClick) {
                onClick(key);
              }
            }}
          >
            {icon}
          </span>
        </Tooltip>
      );
    }
    return (
      <span
        key={key}
        onClick={() => {
          if (onClick) {
            onClick(key);
          }
        }}
      >
        {icon}
      </span>
    );
  }
  return null;
};

const ListToolBar = defineComponent({
  name: 'ListToolBar',
  inheritAttrs: false,
  props: listToolBarProps(),
  setup(props, { attrs }) {
    const { getPrefixCls } = useConfigContextInject();
    const prefixCls = computed(() => props.prefixCls || getPrefixCls('pro'));
    const baseClassName = computed(() => `${prefixCls.value}-table-list-toolbar`);
    const { token } = proTheme.useToken();
    const { wrapSSR, hashId } = useStyle(baseClassName);
    const [isMobile, setIsMobile] = useState(false);
    const intl = useIntl();
    /**
     * 获取搜索栏 DOM
     *
     * @param search 搜索框相关配置
     */
    const searchNode = useMemo(() => {
      if (!props.search) {
        return null;
      }
      if (isVNode(props.search)) {
        return props.search;
      }
      return (
        <InputSearch
          style={{ width: 200 }}
          placeholder={intl.value.getMessage({
            id: 'tableForm.inputPlaceholder',
            defaultMessage: '请输入',
          })}
          {...(props.search as SearchProps)}
          onSearch={async (...restParams) => {
            const success = await (
              props.search as {
                onSearch: (
                  searchValue: string,
                  event?: ChangeEvent | MouseEvent | KeyboardEvent
                ) => Promise<false | void> | false | void;
              }
            )?.onSearch?.(...restParams);
            if (success !== false) {
              props.onSearch?.(restParams?.[0]);
            }
          }}
        />
      );
    }, [() => intl.value, () => props.onSearch, () => props.search]);

    /** 轻量筛选组件 */
    const filtersNode = useMemo(() => {
      if (props.filter)
        return (
          <div class={classNames(`${baseClassName.value}-filter`, hashId.value)}>
            {props.filter}
          </div>
        );
      return null;
    }, [() => props.filter, () => hashId.value, () => baseClassName.value]);

    /** 有没有 title，需要结合多个场景判断 */
    const hasTitle = useMemo(
      () => props.menu || props.title || props.subTitle || props.tooltip,
      [() => props.menu, () => props.subTitle, () => props.title, () => props.tooltip]
    );
    const actionDom = useMemo(() => {
      if (!Array.isArray(props.actions)) {
        return props.actions;
      }
      if (props.actions.length < 1) {
        return null;
      }
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: token.value.marginXS,
          }}
        >
          {props.actions.map((action, index) => {
            if (!isVNode(action)) {
              return <Fragment key={index}>{action}</Fragment>;
            }
            return cloneVNode(action, {
              key: index,
              ...action?.props,
            });
          })}
        </div>
      );
    }, [() => props.actions]);

    const hasRight = useMemo(() => {
      return !!(
        (hasTitle.value && searchNode.value) ||
        (!props.multipleLine && filtersNode.value) ||
        actionDom.value ||
        props.settings?.length
      );
    }, [
      () => actionDom.value,
      () => filtersNode.value,
      () => hasTitle.value,
      () => props.multipleLine,
      () => searchNode.value,
      () => props.settings?.length,
    ]);

    const hasLeft = useMemo(
      () =>
        props.tooltip ||
        props.title ||
        props.subTitle ||
        props.menu ||
        (!hasTitle.value && searchNode.value),
      [
        () => hasTitle.value,
        () => props.menu,
        () => searchNode.value,
        () => props.subTitle,
        () => props.title,
        () => props.tooltip,
      ]
    );
    const leftTitleDom = useMemo(() => {
      // 保留dom是为了占位，不然 right 就变到左边了
      if (!hasLeft.value && hasRight.value) {
        return <div class={classNames(`${baseClassName.value}-left`, hashId.value)} />;
      }
      // 减少 space 的dom，渲染的时候能节省点性能
      if (!props.menu && (hasTitle.value || !searchNode.value)) {
        return (
          <div class={classNames(`${baseClassName.value}-left`, hashId.value)}>
            <div class={classNames(`${baseClassName.value}-title`, hashId.value)}>
              <LabelIconTip tooltip={props.tooltip} label={props.title} subTitle={props.subTitle} />
            </div>
          </div>
        );
      }
      return (
        <div
          class={classNames(`${baseClassName.value}-left`, hashId.value, {
            [`${baseClassName.value}-left-has-tabs`]: props.menu?.type === 'tab',
            [`${baseClassName.value}-left-has-dropdown`]: props.menu?.type === 'dropdown',
            [`${baseClassName.value}-left-has-inline-menu`]: props.menu?.type === 'inline',
          })}
        >
          {hasTitle.value && !props.menu && (
            <div class={classNames(`${baseClassName.value}-title`, hashId.value)}>
              <LabelIconTip tooltip={props.tooltip} label={props.title} subTitle={props.subTitle} />
            </div>
          )}
          {/* {menu && (
            // 这里面实现了 tabs 的逻辑
            <HeaderMenu {...menu} prefixCls={prefixCls} />
          )} */}
          {/* {!hasTitle && searchNode ? (
            <div className={`${prefixCls}-search ${hashId}`.trim()}>
              {searchNode}
            </div>
          ) : null} */}
        </div>
      );
    }, [
      () => hasLeft.value,
      () => hasRight.value,
      () => hasTitle.value,
      () => hashId.value,
      () => props.menu,
      () => baseClassName.value,
      () => searchNode.value,
      () => props.subTitle,
      () => props.title,
      () => props.tooltip,
    ]);
    const rightTitleDom = useMemo(() => {
      if (!hasRight.value) return null;
      return (
        <div
          class={classNames(`${baseClassName.value}-right`, hashId.value)}
          style={isMobile.value ? {} : { alignItems: 'center' }}
        >
          {!props.multipleLine ? filtersNode.value : null}
          {hasTitle.value && searchNode.value ? (
            <div class={classNames(`${baseClassName.value}-search`, hashId.value)}>
              {searchNode.value}
            </div>
          ) : null}
          {actionDom.value}
          {props.settings?.length ? (
            <div class={classNames(`${baseClassName.value}-setting-items`, hashId.value)}>
              {props.settings.map((setting, index) => {
                const settingItem = getSettingItem(setting);
                return (
                  <div
                    key={index}
                    class={classNames(`${baseClassName.value}-setting-item`, hashId.value)}
                  >
                    {settingItem}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      );
    }, [
      () => hasRight.value,
      () => baseClassName.value,
      () => hashId.value,
      () => isMobile.value,
      () => hasTitle.value,
      () => searchNode.value,
      () => props.multipleLine,
      () => filtersNode.value,
      () => actionDom.value,
      () => props.settings,
    ]);
    const titleNode = useMemo(() => {
      if (!hasRight.value && !hasLeft.value) return null;
      const containerClassName = classNames(`${baseClassName.value}-container`, hashId.value, {
        [`${baseClassName.value}-container-mobile`]: isMobile.value,
      });
      return (
        <div class={containerClassName}>
          {leftTitleDom.value}
          {rightTitleDom.value}
        </div>
      );
    }, [
      () => hasLeft.value,
      () => hasRight.value,
      () => hashId.value,
      () => isMobile.value,
      () => leftTitleDom.value,
      () => baseClassName.value,
      () => rightTitleDom.value,
    ]);
    return () => {
      return wrapSSR(
        <ResizeObserver
          onResize={({ width }: { width: number }) => {
            if (width < 375 !== isMobile.value) {
              setIsMobile(width < 375);
            }
          }}
        >
          <div
            class={classNames(baseClassName.value, hashId.value, attrs.class)}
            style={attrs.style as CSSProperties}
          >
            {titleNode.value}
          </div>
        </ResizeObserver>
      );
    };
  },
});

export default ListToolBar;
