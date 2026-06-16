import type { IntlType } from '@antdv-next1/pro-provider'
import type { ProFieldValueObjectType, ProFieldValueType, VueNode } from '@antdv-next1/pro-utils'
import type { ChangeEvent } from '@v-c/util/dist/EventInterface'
import type { FormItemTooltipType } from 'antdv-next/dist/form/FormItemLabel'
import type { VNode } from 'vue'
import type { OptionsRender, ToolBarRender } from '../../RenderTypings'
import type { ActionType, OptionSearchProps, ProColumns } from '../../typing'
import type { ColumnSettingProps } from '../ColumnSetting'
import type { ListToolBarProps, SearchPropType } from '../ListToolBar'
import { ReloadOutlined } from '@antdv-next/icons'
import { useIntl } from '@antdv-next1/pro-provider'
import { omitUndefined, useEffect } from '@antdv-next1/pro-utils'
import { Tooltip } from 'antdv-next'
import { computed, defineComponent } from 'vue'
import { useTableContextInject } from '../../Store/Provide'
import ColumnSetting from '../ColumnSetting'
import ListToolBar from '../ListToolBar'
import DensityIcon from './DensityIcon'
import FullScreenIcon from './FullScreenIcon'

export type OptionsFunctionType<T> = (e: MouseEvent, action?: ActionType<any, T>) => void

export type OptionsType<T> = OptionsFunctionType<T> | boolean

export interface OptionConfig<T, ValueType> {
  density?: boolean
  fullScreen?: OptionsType<T>
  reload?: OptionsType<T>
  setting?: boolean | ColumnSettingProps<T, ValueType>
  search?: (OptionSearchProps & { name?: string }) | boolean
  reloadIcon?: VNode | string | number | boolean | VNode[] | (() => VNode | VNode[])
  densityIcon?: VNode | string | number | boolean | VNode[] | (() => VNode | VNode[])
}

export interface ToolBarProps<T, ValueType> {
  headerTitle?: VueNode
  tooltip?: string | FormItemTooltipType
  toolbar?: ListToolBarProps
  toolBarRender?: ToolBarRender<T>
  action?: ActionType<Record<string, any>, T>
  options?: OptionConfig<T, ValueType> | false
  optionsRender?: OptionsRender<T, ValueType>
  selectedRowKeys?: (string | number)[]
  selectedRows?: (T | undefined)[]
  onSearch?: (keyWords: string) => void
  columns?: ProColumns<T, ValueType>[]
  onFormSearchSubmit?: (params: Record<string, any>) => void
  searchNode?: VueNode
  hideToolbar?: boolean
}

function getButtonText<T extends Record<string, any>, U extends (ProFieldValueType | ProFieldValueObjectType)>({
  intl,
}: OptionConfig<T, U> & {
  intl: IntlType
}, options: OptionConfig<T, U>) {
  return {
    reload: {
      text: intl.getMessage({ id: 'tableToolBar.reload', defaultMessage: '刷新' }),
      icon: options.reloadIcon ?? <ReloadOutlined />,
    },
    density: {
      text: intl.getMessage({ id: 'tableToolBar.density', defaultMessage: '表格密度' }),
      icon: <DensityIcon icon={options.densityIcon} />,
    },
    fullScreen: {
      text: intl.getMessage({ id: 'tableToolBar.fullScreen', defaultMessage: '全屏' }),
      icon: <FullScreenIcon />,
    },
  }
}

/**
 * 渲染默认的 工具栏
 *
 * @param options
 * @param defaultOptions
 * @param actions
 * @param columns
 */
function renderDefaultOption<T extends Record<string, any>, U extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType)>(options: OptionConfig<T, ValueType>, defaultOptions: OptionConfig<T, ValueType> & {
  intl: IntlType
}, actions: ActionType<Record<string, any>, T>, columns: ProColumns<T, ValueType>[]) {
  return Object.keys(options)
    .filter(item => item)
    .map((key) => {
      const value = options[key as 'fullScreen']
      if (!value) {
        return null
      }

      let onClick
        = value === true
          ? defaultOptions[key as keyof OptionConfig<T, ValueType>]
          : (event: MouseEvent) => value?.(event, actions)

      if (typeof onClick !== 'function') {
        onClick = () => {}
      }

      if (key === 'setting') {
        // if (typeof options[key] !== 'boolean') {
        return (
          <ColumnSetting<T, U, ValueType> {...(options[key] as ColumnSettingProps<T, ValueType>)} columns={columns} key={key} />
        )
        // }
      }
      if (key === 'fullScreen') {
        return (
          <span key={key} onClick={onClick}>
            <FullScreenIcon />
          </span>
        )
      }
      const optionItem = getButtonText(defaultOptions, options)[key as 'fullScreen']
      if (optionItem) {
        return (
          <span key={key} onClick={onClick}>
            <Tooltip title={optionItem.text}>{optionItem.icon}</Tooltip>
          </span>
        )
      }
      return null
    })
    .filter(item => item)
}

const Toolbar = defineComponent(<T extends Record<string, any>, U extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType) = 'text'>(props: ToolBarProps<T, ValueType>) => {
  const counter = useTableContextInject<T, U, ValueType>()
  const intl = useIntl()
  const onSearch = async (keyword: string) => {
    const { options, onFormSearchSubmit, action } = props
    if (!options || !options.search) {
      return
    }
    const { name = 'keyword' } = options.search === true ? {} : options.search
    /** 如果传入的 onSearch 返回值为 false，应该直接拦截请求 */
    const success = await (options.search as OptionSearchProps)?.onSearch?.(keyword)
    if (success === false)
      return
      // 查询的时候的回到第一页
    action?.setPageInfo?.({
      current: 1,
    })
    onFormSearchSubmit?.(
      omitUndefined({
        _timestamp: Date.now(),
        [name]: keyword,
      }),
    )
  }
  const optionDom = computed(() => {
    const defaultOptions = {
      reload: () => props.action?.reload?.(),
      density: true,
      setting: true,
      search: false,
      fullScreen: () => props.action?.fullScreen?.(),
    }
    if (props.options === false) {
      return []
    }
    const options = {
      ...defaultOptions,
      fullScreen: false,
      ...props.options,
    }
    const settings = renderDefaultOption<T, U, ValueType>(
      options,
      {
        ...defaultOptions,
        intl: intl.value,
      },
      props.action!,
      props.columns!,
    )
    if (props.optionsRender) {
      return props.optionsRender(
        {
          headerTitle: props.headerTitle,
          tooltip: props.tooltip,
          toolBarRender: props.toolBarRender,
          action: props.action,
          options: props.options,
          selectedRowKeys: props.selectedRowKeys,
          selectedRows: props.selectedRows,
          toolbar: {
            filter: props.searchNode,
            ...props.toolbar,
          },
          onSearch,
          columns: props.columns,
          optionsRender: props.optionsRender,
        },
        settings,
      )
    }
    return settings
  })
  const searchConfig = computed(() => {
    if (!props.options) {
      return false
    }
    if (!props.options.search)
      return false
      /** 受控的value 和 onChange */
    const defaultSearchConfig = {
      value: counter.keyWords?.value,
      onChange: (e: ChangeEvent) => counter.setKeyWords?.(e.target.value),
    }
    if (props.options.search === true)
      return defaultSearchConfig as SearchPropType
    return {
      ...defaultSearchConfig,
      ...props.options.search,
    } as SearchPropType
  })

  useEffect(() => {
    if (counter.keyWords?.value === undefined) {
      onSearch?.('')
    }
  }, [() => counter.keyWords?.value])

  return () => {
    const {
      hideToolbar,
      headerTitle,
      tooltip,
      searchNode,
      action,
      toolBarRender,
      selectedRowKeys,
      selectedRows,
      toolbar,
    } = props
    // 操作列表
    const actions = toolBarRender ? toolBarRender(action, { selectedRowKeys, selectedRows: selectedRows! }) : []

    if (hideToolbar) {
      return null
    }
    return (
      <ListToolBar
        {...toolbar}
        title={headerTitle}
        tooltip={tooltip}
        search={searchConfig.value}
        onSearch={onSearch}
        filter={searchNode}
        actions={actions}
        settings={optionDom.value as unknown as VNode[]}
      />
    )
  }
}, {
  name: 'Toolbar',
  inheritAttrs: false,
  props: ['action', 'columns', 'headerTitle', 'onSearch', 'options', 'optionsRender', 'selectedRowKeys', 'selectedRows', 'toolBarRender', 'toolbar', 'tooltip', 'searchNode', 'hideToolbar'],

})

export default Toolbar
