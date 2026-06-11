import type { Key, VueNode } from '@antdv-next/pro-utils'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { TabPaneProps } from 'antdv-next'
import type { FormItemTooltipType } from 'antdv-next/dist/form/FormItemLabel'
import type { FunctionalComponent, VNode } from 'vue'
import type { SearchProps, WithFalse } from '../../typing'
import type { ListToolBarHeaderMenuProps } from './HeaderMenu'
import { unit } from '@antdv-next/cssinjs'
import { proTheme, useIntl } from '@antdv-next/pro-provider'
import {
  isSpecialNode,
  LabelIconTip,
  useState,
} from '@antdv-next/pro-utils'
import ResizeObserver from '@v-c/resize-observer'
import { classNames } from '@v-c/util'
import { InputSearch, Tabs, Tooltip } from 'antdv-next'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { cloneVNode, computed, defineComponent, Fragment, isVNode } from 'vue'
import HeaderMenu from './HeaderMenu'
import { useStyle } from './style'

export interface ListToolBarSetting {
  icon: VueNode
  tooltip?: FormItemTooltipType | string
  key?: string
  onClick?: (key?: string) => void
}
/** Antd 默认直接导出了 rc 组件中的 Tab.Pane 组件。 */
type TabPane = TabPaneProps & {
  key?: string
}

export interface ListToolBarTabs {
  activeKey?: string
  defaultActiveKey?: string
  onChange?: (activeKey: Key) => void
  items?: TabPane[]
}

export type ListToolBarMenu = ListToolBarHeaderMenuProps

export type SearchPropType
  = WithFalse<(SearchProps & {
    onSearch: (
      searchValue: string,
      event?: Event | MouseEvent | KeyboardEvent,
      info?: {
        source?: 'clear' | 'input'
      },
    ) => Promise<false | void> | false | void
  })
  | VNode>

type SettingPropType = VNode | ListToolBarSetting

export interface ListToolBarProps {
  prefixCls?: string
  /** 标题 */
  title?: VueNode
  /** 副标题 */
  subTitle?: VueNode
  /** 标题提示 */
  tooltip?: string | FormItemTooltipType
  /** 搜索输入栏相关配置 */
  search?: SearchPropType
  /** 搜索回调 */
  onSearch?: (keyWords: string) => void
  /** 工具栏右侧操作区 */
  actions?: VueNode[]
  /** 工作栏右侧设置区 */
  settings?: SettingPropType[]
  /** 是否多行展示 */
  multipleLine?: boolean
  /** 过滤区，通常配合 LightFilter 使用 */
  filter?: VueNode
  /** 标签页配置，仅当 `multipleLine` 为 true 时有效 */
  tabs?: ListToolBarTabs
  /** 菜单配置 */
  menu?: ListToolBarMenu
}

/**
 * 获取配置区域 DOM Item
 *
 * @param setting 配置项
 */
function getSettingItem(setting: SettingPropType) {
  if (isVNode(setting)) {
    return setting
  }
  if (setting) {
    const { icon, tooltip, onClick, key } = setting
    if (icon && tooltip) {
      if (!(isVNode(tooltip) || typeof tooltip === 'string' || typeof tooltip === 'number' || typeof tooltip === 'boolean' || typeof tooltip === 'function')) {
        return tooltip
      }
      return (
        <Tooltip title={tooltip}>
          <span
            key={key}
            onClick={() => {
              if (onClick) {
                onClick(key)
              }
            }}
          >
            {icon}
          </span>
        </Tooltip>
      )
    }
    return (
      <span
        key={key}
        onClick={() => {
          if (onClick) {
            onClick(key)
          }
        }}
      >
        {icon}
      </span>
    )
  }
  return null
}

const ListToolBarTabBar: FunctionalComponent<{
  prefixCls: string
  hashId?: string
  filtersNode: VueNode
  multipleLine: boolean
  tabs: ListToolBarProps['tabs']
}> = ({ prefixCls, hashId, tabs, multipleLine, filtersNode }) => {
  if (!multipleLine)
    return null
  return (
    <div class={classNames(`${prefixCls}-extra-line`, hashId)}>
      {tabs?.items && tabs?.items.length ? (
        <Tabs
          style={{
            width: '100%',
          }}
          defaultActiveKey={tabs.defaultActiveKey}
          activeKey={tabs.activeKey}
          items={tabs.items?.map((item, index) => (
            {
              label: item.tab,
              ...item,
              key: item.key?.toString() || index?.toString(),
            }
          ))}
          onChange={tabs.onChange}
          tabBarExtraContent={filtersNode}
        />

      ) : (
        filtersNode
      )}
    </div>
  )
}

const ListToolBar = defineComponent<ListToolBarProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props, { attrs }) => {
    const config = useConfig()
    const prefixCls = computed(() => props.prefixCls || config.value.getPrefixCls('pro'))
    const baseClassName = computed(() => `${prefixCls.value}-table-list-toolbar`)
    const { token } = proTheme.useToken()
    const { wrapSSR, hashId } = useStyle(baseClassName)
    const [isMobile, setIsMobile] = useState(false)
    const intl = useIntl()
    /**
     * 获取搜索栏 DOM
     *
     */
    const searchNode = computed(() => {
      if (!props.search) {
        return null
      }
      if (isVNode(props.search)) {
        return props.search
      }
      return (
        <InputSearch
          {...props.search}
          style={{ width: unit(200) }}
          placeholder={intl.value.getMessage({
            id: 'tableForm.inputPlaceholder',
            defaultMessage: '请输入',
          })}
          onSearch={async (...restParams) => {
            if (props.search && !isVNode(props.search)) {
              const success = await props.search?.onSearch(...restParams)
              if (success !== false) {
                props.onSearch?.(restParams?.[0])
              }
            }
          }}
        />
      )
    })

    /** 轻量筛选组件 */
    const filtersNode = computed(() => {
      if (props.filter) {
        return (
          <div class={classNames(`${baseClassName.value}-filter`, hashId.value)}>
            {props.filter}
          </div>
        )
      }
      return null
    })

    /** 有没有 title，需要结合多个场景判断 */
    const hasTitle = computed(
      () => props.menu || props.title || props.subTitle || props.tooltip,
    )
    const actionDom = computed(() => {
      if (!Array.isArray(props.actions)) {
        return props.actions
      }
      if (props.actions.length < 1) {
        return null
      }
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: `${token.value.marginXS}px`,
          }}
        >
          {props.actions.map((action, index) => {
            if (!isVNode(action) || (isVNode(action) && isSpecialNode(action))) {
              return <Fragment key={index}>{action}</Fragment>
            }
            return cloneVNode(action, {
              // key: index,
              ...action?.props,
            })
          })}
        </div>
      )
    })
    const hasEnd = computed(() => !!(
      (hasTitle.value && searchNode.value)
      || (!props.multipleLine && filtersNode.value)
      || actionDom.value
      || props.settings?.length
    ))

    const hasStart = computed(
      () =>
        props.tooltip
        || props.title
        || props.subTitle
        || props.menu
        || (!hasTitle.value && searchNode.value),
    )
    const startTitleDom = computed(() => {
      // 保留dom是为了占位，不然 right 就变到左边了
      if (!hasStart.value && hasEnd.value) {
        return <div class={classNames(`${baseClassName.value}-left`, hashId.value)} />
      }
      // 减少 space 的dom，渲染的时候能节省点性能
      if (!props.menu && (hasTitle.value || !searchNode.value)) {
        return (
          <div class={classNames(`${baseClassName.value}-left`, hashId.value)}>
            <div class={classNames(`${baseClassName.value}-title`, hashId.value)}>
              <LabelIconTip tooltip={props.tooltip} label={props.title} subTitle={props.subTitle} />
            </div>
          </div>
        )
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
          {props.menu && (
            // 这里面实现了 tabs 的逻辑
            <HeaderMenu {...props.menu} prefixCls={prefixCls.value} hashId={hashId.value} />
          )}
          {!hasTitle.value && searchNode.value ? (
            <div class={classNames(`${prefixCls.value}-search`, hashId.value)}>{searchNode.value}</div>
          ) : null}
        </div>
      )
    })
    const endTitleDom = computed(() => {
      if (!hasEnd.value)
        return null
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
                const settingItem = getSettingItem(setting)
                return (
                  <div
                    key={index}
                    class={classNames(`${baseClassName.value}-setting-item`, hashId.value)}
                  >
                    {settingItem}
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
      )
    })
    const titleNode = computed(() => {
      if (!hasEnd.value && !hasStart.value)
        return null
      const containerClassName = classNames(`${baseClassName.value}-container`, hashId.value, {
        [`${baseClassName.value}-container-mobile`]: isMobile.value,
      })
      return (
        <div class={containerClassName}>
          {startTitleDom.value}
          {endTitleDom.value}
        </div>
      )
    })
    return () => {
      const { multipleLine = false, tabs } = props
      return wrapSSR(
        <ResizeObserver
          onResize={({ width }) => {
            if ((width < 375) !== isMobile.value) {
              setIsMobile(width < 375)
            }
          }}
        >
          <div
            class={classNames(baseClassName.value, hashId.value, attrs.class)}
            style={attrs.style}
          >
            {titleNode.value}
            <ListToolBarTabBar
              filtersNode={filtersNode.value}
              hashId={hashId.value}
              prefixCls={prefixCls.value}
              tabs={tabs}
              multipleLine={multipleLine}
            />
          </div>
        </ResizeObserver>,
      )
    }
  },
  {
    name: 'ListToolBar',
    inheritAttrs: false,
  },
)

export default ListToolBar
