import type { ConcreteComponent, ExtractPropTypes, PropType } from 'vue';
import type { ItemType, MenuMode, MenuProps } from 'ant-design-vue';
import type { Key, VueNode } from 'ant-design-vue/es/_util/type';
import type { MenuDataItem, MessageDescriptor, WithFalse } from '../../typing';
import type { PureSettings } from '../../defaultSettings';
import type { MenuItemRender, SubMenuItemRender } from '../../RenderTypings';
import type { GenerateStyle, ProTokenType } from '@ant-design-vue/pro-provider';
import type { SiderMenuToken } from './style/stylish';
import { computed, defineComponent, Fragment, h, isVNode, resolveComponent, toRef } from 'vue';
import { Menu } from 'ant-design-vue';
import { menuProps } from 'ant-design-vue/es/menu/src/Menu';
import defaultSettings from '../../defaultSettings';
import {
  classNames,
  isBrowser,
  isImg,
  isUrl,
  useEffect,
  useMemo,
  useMountMergeState,
} from '@ant-design-vue/pro-utils';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import { useStyle } from './style/menu';
import { getOpenKeysFromMenuData } from '../../utils';

export const baseMenuProps = () => ({
  ...menuProps(),
  defaultCollapsed: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  collapsed: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  isMobile: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  onOpenChange: {
    type: Function as PropType<(openKeys?: WithFalse<Key[]>) => void>,
    default: undefined,
  },
  /**
   * @name 当前应用会话的位置信息。如果你的应用创建了自定义的 history，则需要显示指定 location 属性
   */
  location: {
    type: Object as PropType<{
      pathname: string;
    }>,
    default: undefined,
  },
  menuData: Array as PropType<MenuDataItem[]>,
  onCollapse: Function as PropType<(collapsed: boolean) => void>,
  openKeys: {
    type: [Boolean, Array] as PropType<WithFalse<Key[]>>,
    default: undefined,
  },
  mode: {
    type: String as PropType<MenuMode>,
    default: undefined,
  },
  navTheme: {
    type: String as PropType<PureSettings['navTheme']>,
    default: defaultSettings.navTheme,
  },
  layout: {
    type: String as PropType<PureSettings['layout']>,
    default: defaultSettings.layout,
  },
  contentWidth: {
    type: String as PropType<PureSettings['contentWidth']>,
    default: defaultSettings.contentWidth,
  },
  fixedHeader: {
    type: Boolean as PropType<PureSettings['fixedHeader']>,
    default: defaultSettings.fixedHeader,
  },
  fixedSiderbar: {
    type: Boolean as PropType<PureSettings['fixedSiderbar']>,
    default: defaultSettings.fixedSiderbar,
  },
  menu: {
    type: Object as PropType<PureSettings['menu']>,
    default: () => defaultSettings.menu,
  },
  title: {
    type: [String, Boolean] as PropType<PureSettings['title']>,
    default: defaultSettings.title,
  },
  iconfontUrl: {
    type: String as PropType<PureSettings['iconfontUrl']>,
    default: defaultSettings.iconfontUrl,
  },
  colorPrimary: {
    type: String as PropType<PureSettings['colorPrimary']>,
    default: defaultSettings.colorPrimary,
  },
  colorWeak: {
    type: Boolean as PropType<PureSettings['colorWeak']>,
    default: defaultSettings.colorWeak,
  },
  splitMenus: {
    type: Boolean as PropType<PureSettings['splitMenus']>,
    default: defaultSettings.splitMenus,
  },
  suppressSiderWhenMenuEmpty: {
    type: Boolean as PropType<PureSettings['suppressSiderWhenMenuEmpty']>,
    default: defaultSettings.suppressSiderWhenMenuEmpty,
  },
  siderMenuType: {
    type: String as PropType<PureSettings['siderMenuType']>,
    default: defaultSettings.siderMenuType,
  },
  /**
   * @name 要给菜单的props, 参考ant-menu的属性
   */
  menuProps: {
    type: Object as PropType<MenuProps>,
    default: undefined,
  },
  /**
   * @name 处理菜单的 props，可以复写菜单的点击功能，一般结合 VueRouter 框架使用
   * @see 非子级的菜单要使用 subMenuItemRender 来处理
   *
   * @example 使用 a 标签 menuItemRender={(item, defaultDom) => { return <a onClick={()=> router.push(item.path) }>{defaultDom}</a> }}
   * @example 使用 Link 标签 menuItemRender={(item, defaultDom) => { return <RouterLink to={item.path}>{defaultDom}</RouterLink> }}
   */
  menuItemRender: {
    type: [Object, Function, Boolean] as PropType<MenuItemRender>,
    default: undefined,
  },
  /**
   * @name 处理父级菜单的 props，可以复写菜单的点击功能，一般用于埋点
   * @see 子级的菜单要使用 menuItemRender 来处理
   *
   * @example 使用 a 标签跳转到特殊的地址 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> router.push(item.path) }>{defaultDom}</a> }}
   * @example 增加埋点 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> log.click(item.name) }>{defaultDom}</a> }}
   */
  subMenuItemRender: {
    type: [Object, Function, Boolean] as PropType<SubMenuItemRender>,
    default: undefined,
  },
  iconPrefixes: String as PropType<string>,
  formatMessage: Function as PropType<(message: MessageDescriptor) => string>,
  /**
   * @name 处理 menuData 的方法，与 menuDataRender 不同，postMenuData处理完成后会直接渲染，不再进行国际化和拼接处理
   *
   * @example 增加菜单图标 postMenuData={(menuData) => { return menuData.map(item => { return { ...item, icon: <Icon type={item.icon} /> } }) }}
   */
  postMenuData: {
    type: Function as PropType<(menusData?: MenuDataItem[]) => MenuDataItem[]>,
    default: undefined,
  },
  onSelect: Function as PropType<(selectedKeys: Key[]) => void>,
});

export type BaseMenuProps = Partial<ExtractPropTypes<ReturnType<typeof baseMenuProps>>>;

let IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});

// Allow menu.js config icon as string or VueNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,
const getIcon = (
  icon: string | VueNode,
  iconPrefixes: string = 'icon-',
  className: string
): VueNode => {
  if (!icon) {
    return null;
  }
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl(icon) || isImg(icon)) {
      return <img width={16} key={icon} src={icon} alt="icon" class={className} />;
    }
    if (icon.startsWith(iconPrefixes)) {
      return <IconFont type={icon} />;
    }
    const DynamicIcon = resolveComponent(icon as string);
    return typeof DynamicIcon === 'function' && h(DynamicIcon);
  }
  if (isVNode(icon)) {
    return icon;
  }
  return typeof icon === 'function' ? h(icon) : icon;
};

const getMenuTitleSymbol = (title: VueNode) => {
  if (title && typeof title === 'string') {
    return title.substring(0, 1).toUpperCase();
  }
  return null;
};

class MenuUtil {
  props: BaseMenuProps & {
    token?: ProTokenType;
    menuRenderType?: 'header' | 'sider';
    baseClassName: string;
    hashId: string;
  };
  RouterLink: ConcreteComponent;
  constructor(
    props: BaseMenuProps & {
      menuRenderType?: 'header' | 'sider';
      baseClassName: string;
      hashId: string;
    }
  ) {
    this.props = props;
    this.RouterLink = resolveComponent('RouterLink') as ConcreteComponent;
  }
  getNavMenuItems = (
    menusData: MenuDataItem[] = [],
    level: number,
    noGroupLevel: number
  ): ItemType[] =>
    menusData
      .map((item) => this.getSubMenuOrItem(item, level, noGroupLevel))
      .filter((item) => item)
      .flat(1);
  /** Get SubMenu or Item */
  getSubMenuOrItem = (
    item: MenuDataItem,
    level: number,
    noGroupLevel: number
  ): ItemType | ItemType[] => {
    const { baseClassName, collapsed, menu, subMenuItemRender, iconPrefixes, layout } = this.props;

    const isGroup = menu?.type === 'group' && layout !== 'top';

    // if local is true formatMessage all name。
    const intlTitle = this.getIntlTitle(item);

    const children = item?.children;

    const menuType = isGroup && level === 0 ? ('group' as const) : undefined;

    // 如果没有 icon 在收起的时候用首字母代替
    if (Array.isArray(children) && children.length > 0) {
      /** Menu 第一级可以有icon，或者 isGroup 时第二级别也要有 */
      const hasIcon = level === 0 || (isGroup && level === 1);

      const icon = !hasIcon
        ? null
        : getIcon(item.meta?.icon, iconPrefixes, `${baseClassName}-icon ${this.props?.hashId}`);
      const defaultIcon = collapsed && hasIcon ? getMenuTitleSymbol(intlTitle) : null;

      const defaultTitle =
        !isGroup || (isGroup && collapsed) || !menuType
          ? intlTitle
          : h(
              'div',
              {
                class: classNames(`${baseClassName}-item-title`, this.props?.hashId, {
                  [`${baseClassName}-item-title-collapsed`]: collapsed,
                  [`${baseClassName}-item-title-collapsed-level-${noGroupLevel}`]: collapsed,
                  [`${baseClassName}-group-item-title`]: menuType === 'group',
                  [`${baseClassName}-item-collapsed-show-title`]:
                    menu?.collapsedShowTitle && collapsed,
                }),
              },
              [
                h(
                  'span',
                  {
                    class: classNames(`${baseClassName}-item-icon`, this.props?.hashId),
                  },
                  !icon && defaultIcon ? defaultIcon : [icon]
                ),
                h(
                  'span',
                  {
                    class: classNames(`${baseClassName}-item-text`, this.props?.hashId),
                  },
                  intlTitle
                ),
              ]
            );

      const menuItemTitle = subMenuItemRender
        ? subMenuItemRender({ ...item, isUrl: false }, defaultTitle, this.props)
        : defaultTitle;
      // 如果收起来，没有子菜单了，就不需要展示 group，所以 level 不增加
      if (isGroup && level === 0 && collapsed && !menu.collapsedShowGroupTitle) {
        return this.getNavMenuItems(children, level + 1, level);
      }
      const childrenList = this.getNavMenuItems(
        children,
        level + 1,
        isGroup && level === 0 && collapsed ? level : level + 1
      );
      return [
        {
          type: menuType,
          key: item.key! || item.path!,
          ...(isGroup && menuType === 'group' ? {} : { icon: () => icon || defaultIcon }),
          label: menuItemTitle,
          onClick: isGroup ? undefined : item.onTitleClick,
          children: childrenList,
        },
        isGroup && level === 0
          ? {
              type: 'divider',
              class: `${baseClassName}-divider`,
              key: (item.key! || item.path!) + '-group-divider',
            }
          : undefined,
      ].filter(Boolean) as ItemType[];
    }
    return {
      class: `${baseClassName}-menu-item`,
      disabled: item.disabled,
      key: item.key! || item.path!,
      onClick: item.onTitleClick,
      ...this.getMenuItem(item, level, noGroupLevel),
    } as ItemType;
  };
  /**
   *
   * @memberof SiderMenu
   */
  getMenuItem = (item: MenuDataItem, level: number, noGroupLevel: number) => {
    const {
      menuItemRender,
      iconPrefixes,
      baseClassName,
      menu,
      layout,
      collapsed,
      location = { pathname: '/' },
      onCollapse,
      isMobile,
      menuProps,
    } = this.props;
    const menuItemTitle = this.getIntlTitle(item);
    const itemPath = this.conversionPath(item.path || '/');
    const isGroup = menu?.type === 'group' && layout !== 'top';
    /** Menu 第一级可以有icon，或者 isGroup 时第二级别也要有 */
    const hasIcon = level === 0 || (isGroup && level === 1);
    const icon = !hasIcon
      ? null
      : getIcon(item.meta?.icon, iconPrefixes, `${baseClassName}-icon ${this.props?.hashId}`);
    // 如果没有 icon 在收起的时候用首字母代替
    const defaultIcon = collapsed && hasIcon ? getMenuTitleSymbol(menuItemTitle) : null;

    const isHttpUrl = isUrl(itemPath);
    const meta = { ...item.meta };
    const target = (meta.target || null) as string | null;
    const CustomTag = (target && 'a') || this.RouterLink;
    const attrs = isHttpUrl || target ? { href: item.path, target } : {};
    const props = { to: { name: item.name, ...item.meta } };
    let defaultTitle = h(Fragment, null, [
      h(
        'span',
        { class: classNames(`${baseClassName}-item-text`, this.props?.hashId) },
        menuItemTitle
      ),
    ]);
    if (
      ((typeof CustomTag !== 'string' && CustomTag.name === 'RouterLink') ||
        (typeof CustomTag === 'string' && CustomTag === 'a')) &&
      !menuProps?.onSelect
    ) {
      defaultTitle = h(
        CustomTag,
        {
          ...attrs,
          ...(CustomTag === 'a' ? {} : props),
          key: itemPath,
          class: classNames(`${baseClassName}-item-title`, this.props?.hashId, {
            [`${baseClassName}-item-title-collapsed`]: collapsed,
            [`${baseClassName}-item-title-collapsed-level-${noGroupLevel}`]: collapsed,
            [`${baseClassName}-item-collapsed-show-title`]: menu?.collapsedShowTitle && collapsed,
          }),
        },
        typeof CustomTag === 'string' && CustomTag === 'a'
          ? h(
              'span',
              {
                class: classNames(`${baseClassName}-item-text`, this.props?.hashId),
              },
              menuItemTitle
            )
          : () =>
              h(
                'span',
                {
                  class: classNames(`${baseClassName}-item-text`, this.props?.hashId),
                },
                menuItemTitle
              )
      );
    }
    if (menuItemRender) {
      const renderItemProps = {
        ...item,
        isUrl: isHttpUrl,
        itemPath,
        isMobile,
        replace: itemPath === location.pathname,
        onClick: () => onCollapse && onCollapse(true),
        children: undefined,
      };
      const menuItemLabel = menuItemRender(renderItemProps, defaultTitle, this.props);
      return {
        icon: () => icon || defaultIcon,
        label: menuItemLabel,
      };
    }
    return {
      icon: () => icon || defaultIcon,
      label: defaultTitle,
    };
  };
  getIntlTitle = ({ meta }: MenuDataItem) => {
    const { menu, formatMessage } = this.props;
    const { title, locale } = meta!;

    if (locale && menu?.locale !== false) {
      return formatMessage?.({
        id: locale,
        defaultMessage: title,
      });
    }
    return title;
  };
  conversionPath = (path: string) => {
    if (path && path.startsWith('http')) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };
}
/**
 * 生成openKeys 的对象，因为设置了openKeys 就会变成受控，所以需要一个空对象
 *
 * @param BaseMenuProps
 * @param openKeys
 */
const getOpenKeysProps = (
  openKeys: WithFalse<Key[]>,
  { layout, collapsed }: BaseMenuProps
): {
  openKeys?: undefined | Key[];
} => {
  let openKeysProps = {};

  if (openKeys && !collapsed && ['side', 'mix'].includes(layout || 'mix')) {
    openKeysProps = {
      openKeys,
    };
  }
  return openKeysProps;
};

const BaseMenu = defineComponent({
  name: 'BaseMenu',
  inheritAttrs: false,
  props: {
    ...baseMenuProps(),
    matchMenuKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    originCollapsed: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    menuRenderType: {
      type: String as PropType<'header' | 'sider'>,
      default: 'sider',
    },
    stylish: {
      type: Object as PropType<GenerateStyle<SiderMenuToken>>,
      default: () => ({}),
    },
  },
  setup(props, { attrs }) {
    const baseClassName = computed(() => `${props.prefixCls}-base-menu-${props.mode}`);

    const [defaultOpenAll, setDefaultOpenAll] = useMountMergeState(props.menu?.defaultOpenAll, {
      value: toRef(props.menu!, 'defaultOpenAll'),
    });

    const [openKeys, setOpenKeys] = useMountMergeState(
      () => {
        if (props.menu?.defaultOpenAll) {
          return getOpenKeysFromMenuData(props.menuData) || [];
        }
        if (props.openKeys === false) {
          return false;
        }
        return [];
      },
      {
        value: toRef(props, 'openKeys'),
        onChange: props.onOpenChange,
      }
    );

    const [selectedKeys, setSelectedKeys] = useMountMergeState<Key[] | undefined>([], {
      value: toRef(props, 'selectedKeys'),
      onChange: !props.onSelect
        ? props.isMobile
          ? () => props.onCollapse?.(true)
          : undefined
        : (keys) => {
            if (props.onSelect && keys) {
              if (props.isMobile) {
                props.onCollapse?.(true);
              }
              props.onSelect(keys);
            }
          },
    });

    useEffect(() => {
      if (props.menu?.defaultOpenAll || props.openKeys === false) {
        return;
      }
      if (props.matchMenuKeys) {
        setOpenKeys(props.matchMenuKeys);
        setSelectedKeys(props.matchMenuKeys);
      }
    }, [() => props.matchMenuKeys?.join('-')]);

    useEffect(() => {
      if (props.matchMenuKeys) {
        if (props.matchMenuKeys?.join('-') !== (selectedKeys.value || []).join('-')) {
          setSelectedKeys(props.matchMenuKeys);
        }
      }
      if (
        !defaultOpenAll.value &&
        props.openKeys !== false &&
        props.matchMenuKeys?.join('-') !== (openKeys.value || []).join('-')
      ) {
        let newKeys: (string | number)[] | false = props.matchMenuKeys!;
        // 如果不自动关闭，我需要把 openKeys 放进去
        if (props.menu?.autoClose === false) {
          newKeys = Array.from(new Set([...props.matchMenuKeys!, ...(openKeys.value || [])]));
        }
        setOpenKeys(newKeys);
      } else if (props.menu?.ignoreFlatMenu && defaultOpenAll.value) {
        // 忽略用户手动折叠过的菜单状态，折叠按钮切换之后也可实现默认展开所有菜单
        setOpenKeys(getOpenKeysFromMenuData(props.menuData));
      } else {
        setDefaultOpenAll(false);
      }
    }, [() => props.matchMenuKeys?.join('-')]);

    useEffect(() => {
      // reset IconFont
      if (props.iconfontUrl) {
        IconFont = createFromIconfontCN({
          scriptUrl: props.iconfontUrl,
        });
      }
    }, [() => props.iconfontUrl]);

    const openKeysProps = useMemo(
      () => getOpenKeysProps(openKeys.value!, props),
      [() => openKeys.value && openKeys.value.join(','), () => props.layout, () => props.collapsed]
    );
    const { wrapSSR, hashId } = useStyle(baseClassName, props.mode);

    return () => {
      const {
        mode,
        location,
        collapsed,
        theme,
        postMenuData,
        menuData,
        menuProps,
        menuRenderType,
      } = props;

      const menuUtils = new MenuUtil({
        ...props,
        menuRenderType,
        location: isBrowser()
          ? location || {
              pathname: window.location.pathname || '/',
            }
          : undefined,
        baseClassName: baseClassName.value,
        hashId: hashId.value,
      });
      const finallyData = postMenuData ? postMenuData(menuData) : menuData;

      if (!finallyData || (finallyData && finallyData.length < 1)) {
        return null;
      }
      return wrapSSR(
        <Menu
          {...openKeysProps.value}
          {...menuProps}
          key="Menu"
          mode={mode}
          theme={theme}
          inlineIndent={16}
          selectedKeys={selectedKeys.value}
          items={menuUtils.getNavMenuItems(finallyData, 0, 0)}
          class={classNames(attrs.class, hashId.value, baseClassName.value, {
            [`${baseClassName.value}-collapsed`]: collapsed,
          })}
          onOpenChange={(_openKeys) => {
            if (!collapsed) {
              setOpenKeys(_openKeys);
            }
          }}
        />
      );
    };
  },
});
export default BaseMenu;
