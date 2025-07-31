import type { ExtractPropTypes, PropType } from 'vue';
import type { Key, VueNode } from 'ant-design-vue/es/_util/type';
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface';
import type { IntlType } from '@ant-design-vue/pro-provider';
import type { ListToolBarProps } from '../ListToolBar';
import type { OptionsRender } from '../../RenderTypings';
import type { SettingOptionProps } from '../ColumnSetting';
import type { SearchPropType } from '../ListToolBar';
import type { ActionType, OptionSearchProps, ProColumns, WithFalse } from '../../typing';
import type { LabelTooltipType } from '@ant-design-vue/pro-utils';
import { defineComponent } from 'vue';
import { Tooltip } from 'ant-design-vue';
import { useTableContextInject } from '../../Store/Provide';
import { ReloadOutlined } from '@ant-design/icons-vue';
import { omitUndefined, useEffect, useMemo } from '@ant-design-vue/pro-utils';
import { useIntl } from '@ant-design-vue/pro-provider';
import ListToolBar from '../ListToolBar';
import DensityIcon from './DensityIcon';
import FullScreenIcon from './FullScreenIcon';
import ColumnSetting from '../ColumnSetting';

export type OptionsFunctionType = (e: MouseEvent, action?: ActionType) => void;

export type OptionsType = OptionsFunctionType | boolean;

export type OptionConfig = {
  density?: boolean;
  fullScreen?: OptionsType;
  reload?: OptionsType;
  setting?: boolean | SettingOptionProps;
  search?: (OptionSearchProps & { name?: string }) | boolean;
  reloadIcon?: VueNode;
  densityIcon?: VueNode;
};

const getButtonText = (
  {
    intl,
  }: OptionConfig & {
    intl: IntlType;
  },
  options: OptionConfig
) => {
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
  };
};

/**
 * 渲染默认的 工具栏
 *
 * @param options
 * @param className
 */
const renderDefaultOption = (
  options: OptionConfig,
  defaultOptions: OptionConfig & {
    intl: IntlType;
  },
  actions: ActionType,
  columns: ProColumns[]
) =>
  Object.keys(options)
    .filter((item) => item)
    .map((key) => {
      const value = options[key as 'fullScreen'];
      if (!value) {
        return null;
      }

      let onClick =
        value === true
          ? defaultOptions[key as keyof OptionConfig]
          : (event: MouseEvent) => value?.(event, actions);

      if (typeof onClick !== 'function') {
        onClick = () => {};
      }

      if (key === 'setting') {
        return (
          <ColumnSetting {...(options[key] as SettingOptionProps)} columns={columns} key={key} />
        );
      }
      if (key === 'fullScreen') {
        return (
          <span key={key} onClick={onClick}>
            <FullScreenIcon />
          </span>
        );
      }
      const optionItem = getButtonText(defaultOptions, options)[key as 'fullScreen'];
      if (optionItem) {
        return (
          <span key={key} onClick={onClick}>
            <Tooltip title={optionItem.text}>{optionItem.icon}</Tooltip>
          </span>
        );
      }
      return null;
    })
    .filter((item) => item);

export const toolBarProps = () => ({
  headerTitle: {
    type: [String, Object, Function] as PropType<VueNode>,
    default: undefined,
  },
  tooltip: {
    type: [String, Object, Function] as PropType<string | LabelTooltipType>,
    default: undefined,
  },
  toolbar: {
    type: Object as PropType<ListToolBarProps>,
    default: undefined,
  },
  toolBarRender: {
    type: Function as PropType<
      (
        action: ActionType | undefined,
        rows: {
          selectedRowKeys?: Key[];
          selectedRows?: any[];
        }
      ) => VueNode[]
    >,
    default: undefined,
  },
  optionsRender: {
    type: Function as PropType<OptionsRender>,
    default: undefined,
  },
  selectedRowKeys: {
    type: Array as PropType<Key[]>,
    default: undefined,
  },
  selectedRows: {
    type: Array as PropType<any[]>,
    default: undefined,
  },
  onSearch: {
    type: Function as PropType<(keyWords: string) => void>,
    default: undefined,
  },
  columns: {
    type: Array as PropType<ProColumns[]>,
    default: undefined,
  },
  hideToolbar: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  action: {
    type: Object as PropType<ActionType>,
    default: undefined,
  },
  options: {
    type: [Object, Boolean] as PropType<WithFalse<OptionConfig>>,
    default: undefined,
  },
  onFormSearchSubmit: {
    type: Function as PropType<(params: Record<string, any>) => void>,
    default: undefined,
  },
  searchNode: {
    type: [String, Object, Function, Array] as PropType<VueNode>,
    default: undefined,
  },
});

export type ToolBarProps = Partial<ExtractPropTypes<ReturnType<typeof toolBarProps>>>;

const Toolbar = defineComponent({
  name: 'Toolbar',
  inheritAttrs: false,
  props: toolBarProps(),
  setup(props) {
    const counter = useTableContextInject();
    const intl = useIntl();
    const onSearch = (keyword: string) => {
      const { options, onFormSearchSubmit, action } = props;
      if (!options || !options.search) {
        return;
      }
      const { name = 'keyword' } = options.search === true ? {} : options.search;
      /** 如果传入的 onSearch 返回值为 false，应该直接拦截请求 */
      const success = (options.search as OptionSearchProps)?.onSearch?.(keyword);
      if (success === false) return;
      // 查询的时候的回到第一页
      action?.setPageInfo?.({
        current: 1,
      });
      onFormSearchSubmit?.(
        omitUndefined({
          _timestamp: Date.now(),
          [name]: keyword,
        })
      );
    };
    const optionDom = useMemo(() => {
      const defaultOptions = {
        reload: () => props.action?.reload(),
        density: true,
        setting: true,
        search: false,
        fullScreen: () => props.action?.fullScreen?.(),
      };
      if (props.options === false) {
        return [];
      }
      const options = {
        ...defaultOptions,
        fullScreen: false,
        ...props.options,
      };
      const settings = renderDefaultOption(
        options,
        {
          ...defaultOptions,
          intl: intl.value,
        },
        props.action!,
        props.columns!
      );
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
          settings
        );
      }
      return settings;
    }, [
      () => props.action,
      () => props.columns,
      () => props.headerTitle,
      () => intl.value,
      () => props.optionsRender,
      () => props.options,
      () => props.selectedRowKeys,
      () => props.selectedRows,
      () => props.toolBarRender,
      () => props.toolbar,
      () => props.searchNode,
      () => props.tooltip,
    ]);
    const searchConfig = useMemo(() => {
      if (!props.options) {
        return false;
      }
      if (!props.options.search) return false;
      /** 受控的value 和 onChange */
      const defaultSearchConfig = {
        value: counter.keyWords.value,
        onChange: (e: ChangeEvent) => counter.setKeyWords(e.target.value),
      };
      if (props.options.search === true) return defaultSearchConfig as SearchPropType;
      return {
        ...defaultSearchConfig,
        ...props.options.search,
      } as SearchPropType;
    }, [() => counter.keyWords.value, () => props.options]);

    useEffect(() => {
      if (counter.keyWords.value === undefined) {
        onSearch?.('');
      }
    }, [() => counter.keyWords.value]);

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
      } = props;
      // 操作列表
      const actions = toolBarRender ? toolBarRender(action, { selectedRowKeys, selectedRows }) : [];

      if (hideToolbar) {
        return null;
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
          settings={optionDom.value}
        />
      );
    };
  },
});

export default Toolbar;
