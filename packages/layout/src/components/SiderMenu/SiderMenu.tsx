import type { CSSProperties, Events, ExtractPropTypes, PropType, Ref, VNode } from 'vue';
import type { AvatarProps, ItemType, MenuTheme, SiderProps } from 'ant-design-vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { GenerateStyle } from '@ant-design-vue/pro-provider';
import type {
  ActionsRender,
  AppListRender,
  CollapsedButtonRender,
  HeaderRender,
  MenuContentRender,
  MenuExtraRender,
  MenuFooterRender,
  MenuHeaderRender,
} from '../../RenderTypings';
import type { SiderMenuToken } from './style/stylish';
import type { WithFalse } from '../../typing';
import type { AppItemProps, AppListProps } from '../AppsLogoComponents/typing';
import type { Breakpoint } from 'ant-design-vue/es/_util/responsiveObserve';
import { computed, defineComponent, isVNode } from 'vue';
import { Avatar, Layout, Menu, Space } from 'ant-design-vue';
import { useProConfigContextInject } from '@ant-design-vue/pro-provider';
import BaseMenu, { baseMenuProps } from './BaseMenu';
import AppsLogoComponents, { defaultRenderLogo } from '../AppsLogoComponents';
import { classNames, useMemo } from '@ant-design-vue/pro-utils';
import CollapsedIcon from '../CollapsedIcon';
import { useStylish } from './style/stylish';

const { Sider } = Layout;

type AvatarPropsType = WithFalse<
  AvatarProps & {
    title?: VueNode;
    render?: (avatarProps: AvatarProps, defaultDom: VueNode, props: SiderMenuProps) => VueNode;
  }
>;
export const siderMenuProps = () => ({
  ...baseMenuProps(),
  prefixCls: String as PropType<string>,
  collapsedWidth: Number as PropType<number>,
  /** 品牌logo的标识 */
  logo: {
    type: [String, Function, Array, Boolean, Number, Object] as PropType<VueNode>,
    default: undefined,
  },
  /** 相关品牌的列表 */
  appList: Array as PropType<AppListProps>,
  /** 相关品牌的列表自定义渲染 */
  appListRender: [Function, Object, Boolean] as PropType<AppListRender>,
  /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
  itemClick: Function as PropType<
    (item: AppItemProps, popoverRef: Ref<HTMLSpanElement | null>) => void
  >,
  /**
   * @name 侧边菜单底部的一些快捷链接
   *
   * @example links={[<a href="ant.design"> 访问官网 </a>,<a href="help.ant.design"> 帮助 </a>]}
   */
  links: {
    type: [Array, Boolean] as PropType<
      WithFalse<
        | {
            icon?: VNode;
            title?: string;
            label?: VNode;
          }[]
        | VueNode[]
      >
    >,
    default: undefined,
  },
  /** 菜单的宽度 */
  siderWidth: Number as PropType<number>,
  /**
   * @name  菜单 logo 和 title 区域的渲染
   *
   * @example 不要logo : menuHeaderRender={(logo,title)=> title}
   * @example 不要title : menuHeaderRender={(logo,title)=> logo}
   * @example 展开的时候显示title,收起显示 logo： menuHeaderRender={(logo,title,props)=> props.collapsed ? logo : title}
   * @example 不要这个区域了 : menuHeaderRender={false}
   */
  menuHeaderRender: {
    type: [Boolean, Object, Function] as PropType<MenuHeaderRender>,
    default: undefined,
  },
  /**
   * @name  侧边菜单，菜单区域的处理,可以单独处理菜单的dom
   *
   * @example 增加菜单区域的背景颜色 menuContentRender={(props,defaultDom)=><div style={{backgroundColor:"red"}}>{defaultDom}</div>}
   * @example 某些情况下不显示菜单 menuContentRender={(props)=> return <div>不显示菜单</div>}
   */
  menuContentRender: {
    type: [Function, Object, Boolean] as PropType<MenuContentRender>,
    default: undefined,
  },
  /**
   * @name 侧边菜单底部的配置，可以增加一些底部操作
   *
   * @example 底部增加超链接 menuFooterRender={()=><a href="https://pro.ant.design">pro.ant.design</a>}
   * @example 根据收起展开配置不同的 dom  menuFooterRender={()=>collapsed? null :<a href="https://pro.ant.design">pro.ant.design</a>}
   */
  menuFooterRender: {
    type: [Function, Object, Boolean] as PropType<MenuFooterRender>,
    default: undefined,
  },
  /**
   * @name 自定义展开收起按钮的渲染
   *
   * @example 使用文字渲染 collapsedButtonRender={(collapsed)=>collapsed?"展开":"收起"})}
   * @example 使用icon渲染 collapsedButtonRender={(collapsed)=>collapsed?<MenuUnfoldOutlined />:<MenuFoldOutlined />}
   * @example 不渲染按钮 collapsedButtonRender={false}
   */
  collapsedButtonRender: {
    type: [Function, Object, Boolean] as PropType<CollapsedButtonRender>,
    default: undefined,
  },
  siderProps: Object as PropType<SiderProps>,
  /**
   * @name 菜单是否收起的断点，设置成false 可以禁用
   *
   * @example 禁用断点  breakpoint={false}
   * @example 最小的屏幕再收起 breakpoint={"xs"}
   */
  breakpoint: {
    type: [String, Boolean] as PropType<WithFalse<Breakpoint>>,
    default: 'lg',
  },
  hide: {
    type: Boolean as PropType<boolean>,
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
  /**
   * @name 侧边菜单 title 和 logo 下面区域的渲染，一般会增加个搜索框
   *
   * @example  增加一个搜索框 menuExtraRender={()=>(<Search placeholder="请输入" />)}
   * @example  根据收起展开配置不同的 dom： menuExtraRender={()=>collapsed? null : <Search placeholder="请输入" />}
   */
  menuExtraRender: {
    type: [Function, Object, Boolean] as PropType<MenuExtraRender>,
    default: undefined,
  },
  /**
   * @name 菜单顶部logo 和 title 区域的点击事件
   *
   * @example 点击跳转到首页 onMenuHeaderClick={()=>{ router.push('/') }}
   */
  onMenuHeaderClick: {
    type: Function as PropType<(e: Events['onClick']) => void>,
    default: undefined,
  },
  /**
   * @name 侧边菜单的logo的样式，可以调整下大小
   *
   * @example 设置logo的大小为 42px logoStyle={{width: '42px', height: '42px'}}
   */
  logoStyle: {
    type: [Object, String] as PropType<CSSProperties>,
    default: undefined,
  },
  headerRender: {
    type: [Function, Boolean] as PropType<HeaderRender>,
    default: undefined,
  },
});

export const privateSiderMenuProps = () => ({
  matchMenuKeys: Array as PropType<string[]>,
  originCollapsed: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  menuRenderType: String as PropType<'header' | 'sider'>,
  stylish: Object as PropType<GenerateStyle<SiderMenuToken>>,
});

export type SiderMenuProps = Partial<ExtractPropTypes<ReturnType<typeof siderMenuProps>>>;

export type PrivateSiderMenuProps = Partial<
  ExtractPropTypes<ReturnType<typeof privateSiderMenuProps>>
>;
export type HeaderRenderKey = 'menuHeaderRender' | 'headerTitleRender';
/**
 * 渲染 title 和 logo
 *
 * @param props
 * @param renderKey
 * @returns
 */
export const renderLogoAndTitle = (
  props: SiderMenuProps,
  renderKey: HeaderRenderKey = 'menuHeaderRender'
): VueNode => {
  const { logo, title, layout } = props;
  const renderFunction = props[renderKey as 'menuHeaderRender'];
  if (renderFunction === false) {
    return null;
  }
  const logoDom = defaultRenderLogo(logo);
  const titleDom = <h1>{title ?? 'Ant Design Vue Pro'}</h1>;

  if (renderFunction) {
    // when collapsed, no render title
    return renderFunction(logoDom, props.collapsed ? null : titleDom, props);
  }
  if (layout === 'mix' && renderKey === 'menuHeaderRender' && !props.isMobile) return false;
  if (props.collapsed) {
    return <a key="title">{logoDom}</a>;
  }
  return (
    <a key="title">
      {logoDom}
      {titleDom}
    </a>
  );
};
/**
 *  默认渲染菜单折叠切换按钮
 * @param collapsed
 * @param tabIndex
 * @returns
 */

const SiderMenu = defineComponent({
  name: 'SiderMenu',
  inheritAttrs: false,
  props: {
    ...siderMenuProps(),
    ...privateSiderMenuProps(),
  },
  setup(props, { attrs }) {
    const proProvide = useProConfigContextInject();
    const baseClassName = computed(() => `${props.prefixCls}-sider`);
    const prefixCls = computed(() => `${baseClassName.value}.${baseClassName.value}-stylish`);
    /* Using the useMemo hook to create a CSS class that will hide the menu when the menu is collapsed. */
    const hideMenuWhenCollapsedClassName = useMemo(() => {
      // 收起时完全隐藏菜单
      if (props?.menu?.hideMenuWhenCollapsed && props.collapsed) {
        return `${baseClassName.value}-hide-menu-collapsed`;
      }
      return null;
    }, [
      () => baseClassName.value,
      () => props.collapsed,
      () => props?.menu?.hideMenuWhenCollapsed,
    ]);

    const showSiderExtraDom = useMemo(() => {
      if (props.isMobile) return false;
      return props.layout !== 'mix';
    }, [() => props.isMobile, () => props.layout]);

    // 收起的宽度
    const collapsedWidth = computed(() => props.collapsedWidth || 64);
    const appsDom = useMemo(
      () => (
        <AppsLogoComponents
          onItemClick={props.itemClick}
          appListRender={props.appListRender}
          appList={props.appList}
          prefixCls={props.prefixCls}
        />
      ),
      [() => props.appList, () => props.layout, () => props.appListRender, () => props.prefixCls]
    );
    // 之所以这样写是为了提升样式优先级，不然会被sider 自带的覆盖掉
    const stylishClassName = useStylish(prefixCls, {
      stylish: props.stylish,
      proLayoutCollapsedWidth: collapsedWidth.value,
    });

    const avatarDom = useMemo(() => {
      if (!props.avatarProps) return null;
      const { title, render, ...rest } = props.avatarProps;
      const dom = (
        <div class={`${baseClassName.value}-actions-avatar ${proProvide.value.hashId}`}>
          {rest?.src || rest?.srcset || rest.icon ? <Avatar size={28} {...rest} /> : null}
          {props.avatarProps.title && !props.collapsed && <span>{title}</span>}
        </div>
      );
      if (render) {
        return render(props.avatarProps, dom, props);
      }
      return dom;
    }, [() => props.avatarProps, () => baseClassName.value, () => props.collapsed]);

    const actionsDom = useMemo(() => {
      if (!props.actionsRender) return null;
      return (
        <Space
          align="center"
          size={4}
          direction={props.collapsed ? 'vertical' : 'horizontal'}
          class={classNames([
            `${baseClassName.value}-actions-list`,
            props.collapsed && `${baseClassName.value}-actions-list-collapsed`,
            proProvide.value.hashId,
          ])}
        >
          {[props.actionsRender?.(props)].flat(1).map((item, index) => {
            return (
              <div
                key={index}
                class={classNames(
                  `${baseClassName.value}-actions-list-item`,
                  proProvide.value.hashId
                )}
              >
                {item}
              </div>
            );
          })}
        </Space>
      );
    }, [() => props.actionsRender, () => baseClassName.value, () => props.collapsed]);

    /** 操作区域的dom */
    const actionAreaDom = useMemo(() => {
      if (!avatarDom.value && !actionsDom.value) return null;
      return (
        <div
          class={classNames(
            `${baseClassName.value}-actions`,
            proProvide.value.hashId,
            props.collapsed && `${baseClassName.value}-actions-collapsed`
          )}
        >
          {avatarDom.value}
          {actionsDom.value}
        </div>
      );
    }, [
      () => actionsDom.value,
      () => avatarDom.value,
      () => baseClassName.value,
      () => props.collapsed,
      () => proProvide.value.hashId,
    ]);
    const theme = useMemo(() => {
      if (props.layout === 'mix' && !props.isMobile) {
        return 'light';
      }
      if (props.navTheme === 'realDark') {
        return 'dark';
      }
      return props.navTheme;
    }, [() => props.navTheme, () => props.isMobile, () => props.layout]);
    const collapsedDom = useMemo(() => {
      // if (props.isMobile || !props.headerRender || props.layout !== 'mix') {
      //   return null;
      // }
      if (props.collapsedButtonRender === false) return null;
      const collapsedButton = {
        class: `${baseClassName.value}-collapsed-button-menu-icon`,
        key: 'collapsed-button-icon',
        title: '',
        label: <>&#8203;</>,
        icon: <CollapsedIcon collapsed={props.collapsed as boolean} />,
      };
      if (props.collapsedButtonRender) {
        return props.collapsedButtonRender(
          props.collapsed,
          <CollapsedIcon collapsed={props.collapsed as boolean} />
        );
      }
      return (
        <Menu
          inlineIndent={16}
          class={classNames(
            `${baseClassName.value}-collapsed-button-menu`,
            proProvide.value.hashId
          )}
          selectedKeys={[]}
          openKeys={[]}
          theme={theme.value}
          mode="inline"
          onClick={() => props.onCollapse?.(!props.collapsed)}
          items={[collapsedButton]}
        />
      );
    }, [
      () => props.collapsedButtonRender,
      () => props.isMobile,
      () => props.layout,
      () => props.originCollapsed,
      () => baseClassName.value,
      () => props.collapsed,
      () => theme.value,
      () => props.onCollapse,
    ]);
    return () => {
      const {
        breakpoint = 'lg',
        stylish,
        navTheme,
        layout,
        siderProps,
        collapsed,
        siderWidth,
        onMenuHeaderClick,
        links,
        fixedSiderbar,
        logoStyle,
        menuExtraRender,
        menuFooterRender,
        menuContentRender,
        isMobile,
        onCollapse,
      } = props;
      const siderClassName = classNames(attrs.class, proProvide.value.hashId, {
        [`${baseClassName.value}-fixed`]: fixedSiderbar,
        [`${baseClassName.value}-fixed-mix`]: layout === 'mix' && !isMobile && fixedSiderbar,
        [`${baseClassName.value}-collapsed`]: collapsed,
        [`${baseClassName.value}-${layout}`]: layout && !isMobile,
        [`${baseClassName.value}-${layout === 'mix' && !isMobile ? 'light' : navTheme}`]: true,
        [`${baseClassName.value}-mix`]: layout === 'mix' && !isMobile,
        [`${baseClassName.value}-stylish`]: !!stylish,
      });
      const headerDom = renderLogoAndTitle(props);
      const extraDom = menuExtraRender && menuExtraRender(props);
      const menuFooterDom = menuFooterRender && menuFooterRender?.(props);
      // Comment
      const menuDom = menuContentRender !== false && (
        <BaseMenu
          {...props}
          key={`base-menu-${collapsed && !isMobile ? 'vertical' : 'inline'}`}
          mode={collapsed && !isMobile ? 'vertical' : 'inline'}
          theme={theme.value}
          class={classNames(`${baseClassName.value}-menu`, proProvide.value.hashId)}
        />
      );
      const menuRenderDom = menuContentRender ? menuContentRender(props, menuDom) : menuDom;

      const linksMenuItems: ItemType[] = (links || []).map((node, key) => {
        const menuItem: ItemType = {
          class: `${baseClassName.value}-link`,
          key,
        };
        if (isVNode(node) && Array.isArray(node.children) && node.children.length > 0) {
          if (((node as VNode).children as VNode[])?.length >= 2) {
            menuItem.title = ((node.children as VNode[])[1].children as VNode[])[0]
              .children as string;
            menuItem.label = (node.children as VNode[])[1];
            menuItem.icon = (node.children as VNode[])[0];
          } else {
            const children = node.children as VNode[];
            const title = children[0].children as string;
            const label = title.substring(1);
            const icon = (
              <span
                class={`${proProvide.value.token?.antCls}icon ${proProvide.value.token?.antCls}-menu-item-icon`}
              >
                {title.trim().charAt(0).toUpperCase()}
              </span>
            );
            menuItem.title = title;
            menuItem.icon = icon;
            menuItem.label = label;
          }
        } else {
          const link = node as {
            icon?: VNode;
            title?: string;
            label?: VNode;
          };
          menuItem.label = link.label;
          menuItem.title = link.title;
          menuItem.icon = link.icon;
        }
        return menuItem;
      });
      const menuDomItems = (
        <>
          {headerDom && (
            <div
              class={classNames(`${baseClassName.value}-logo`, proProvide.value.hashId, {
                [`${baseClassName.value}-logo-collapsed`]: collapsed,
              })}
              onClick={showSiderExtraDom ? onMenuHeaderClick : undefined}
              id="logo"
              style={logoStyle}
            >
              {headerDom}
              {!isMobile && appsDom.value}
            </div>
          )}
          {extraDom && (
            <div
              class={classNames([
                `${baseClassName.value}-extra`,
                !headerDom && `${baseClassName.value}-extra-no-logo`,
                proProvide.value.hashId,
              ])}
            >
              {extraDom}
            </div>
          )}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {menuRenderDom}
          </div>
          {links ? (
            <div class={classNames(`${baseClassName.value}-links`, proProvide.value.hashId)}>
              <Menu
                inlineIndent={16}
                class={classNames(`${baseClassName.value}-link-menu`, proProvide.value.hashId)}
                selectedKeys={[]}
                openKeys={[]}
                theme={props.theme as MenuTheme}
                mode="inline"
                items={linksMenuItems}
              />
            </div>
          ) : null}
          {showSiderExtraDom.value && props.headerRender === false && actionAreaDom.value}
          {menuFooterDom && (
            <div
              class={classNames([
                `${baseClassName.value}-footer`,
                proProvide.value.hashId,
                { [`${baseClassName.value}-footer-collapsed`]: collapsed },
              ])}
            >
              {menuFooterDom}
            </div>
          )}
        </>
      );
      return stylishClassName.wrapSSR(
        <>
          {fixedSiderbar && !isMobile && !hideMenuWhenCollapsedClassName.value && (
            <div
              style={{
                width: `${collapsed ? collapsedWidth.value : siderWidth}px`,
                overflow: 'hidden',
                flex: `0 0 ${collapsed ? collapsedWidth.value : siderWidth}px`,
                maxWidth: `${collapsed ? collapsedWidth.value : siderWidth}px`,
                minWidth: `${collapsed ? collapsedWidth.value : siderWidth}px`,
                transition: 'all 0.2s ease 0s',
              }}
            />
          )}
          <Sider
            class={classNames(
              siderClassName,
              proProvide.value.hashId,
              hideMenuWhenCollapsedClassName.value
            )}
            style={attrs.style}
            collapsed={collapsed}
            collapsedWidth={collapsedWidth.value}
            collapsible
            trigger={null}
            breakpoint={breakpoint === false ? undefined : breakpoint}
            theme={theme.value}
            onCollapse={(collapse: boolean) => {
              if (isMobile) return;
              onCollapse?.(collapse);
            }}
            width={siderWidth}
            {...siderProps}
          >
            {hideMenuWhenCollapsedClassName.value ? (
              <div
                class={classNames(
                  `${baseClassName.value}-hide-when-collapsed`,
                  proProvide.value.hashId
                )}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: hideMenuWhenCollapsedClassName.value ? 0 : 1,
                }}
              >
                {menuDomItems}
              </div>
            ) : (
              menuDomItems
            )}
            {collapsedDom.value ? (
              <div
                class={classNames(
                  `${baseClassName.value}-collapsed-button`,
                  proProvide.value.hashId
                )}
              >
                {collapsedDom.value}
              </div>
            ) : null}
          </Sider>
        </>
      );
    };
  },
});

export default SiderMenu;
