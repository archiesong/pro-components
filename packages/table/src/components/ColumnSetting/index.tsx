import type { ExtractPropTypes, PropType } from 'vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { ProColumns } from '../../typing';
import type { CheckboxChangeEvent } from 'ant-design-vue/es/checkbox/interface';
import { defineComponent, computed, ref } from 'vue';
import { Popover, Tooltip, Checkbox, Space } from 'ant-design-vue';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import { useIntl } from '@ant-design-vue/pro-provider';
import { useStyle } from './style';
import { SettingOutlined } from '@ant-design/icons-vue';
import { classNames, useEffect } from '@ant-design-vue/pro-utils';
import GroupCheckboxList from './GroupCheckboxList';
import { useTableContextInject } from '../../Store/Provide';
import { genColumnKey } from '../../utils/genProColumnToColumn';

export const settingOptionProps = () => ({
  prefixCls: {
    type: String as PropType<string>,
    default: undefined,
  },
  draggable: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  checkable: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  showListItemOption: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  checkedReset: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  listHeight: {
    type: Number as PropType<number>,
    default: undefined,
  },
  extra: {
    type: [Object, String, Function] as PropType<VueNode>,
    default: undefined,
  },
  settingIcon: {
    type: [Object, String, Function] as PropType<VueNode>,
    default: undefined,
  },
  children: {
    type: [Object, String, Function] as PropType<VueNode>,
    default: undefined,
  },
});
export type SettingOptionProps = Partial<ExtractPropTypes<ReturnType<typeof settingOptionProps>>>;

const ColumnSetting = defineComponent({
  name: 'ColumnSetting',
  inheritAttrs: false,
  props: {
    ...settingOptionProps(),
    columns: {
      type: Array as PropType<ProColumns[]>,
      default: undefined,
    },
  },
  setup(props) {
    const intl = useIntl();
    const { getPrefixCls } = useConfigContextInject();
    const prefixCls = computed(() => props.prefixCls || getPrefixCls('pro'));
    const baseClassName = computed(() => `${prefixCls.value}-table-column-setting`);
    const { wrapSSR, hashId } = useStyle(baseClassName);
    const counter = useTableContextInject();
    const columnRef = ref(null);
    /**
     * 设置全部选中，或全部未选中
     *
     * @param show
     */
    const setAllSelectAction = (show: boolean = true) => {
      const columnKeyMap = {} as Record<string, any>;
      const loopColumns = (columns?: ProColumns[]) => {
        columns?.forEach(({ key, fixed, index, children, disable }) => {
          const columnKey = genColumnKey(key, index);
          if (columnKey) {
            columnKeyMap[columnKey] = {
              // 子节点 disable 时，不修改节点显示状态
              show: disable ? counter.columnsMap.value?.[columnKey]?.show : show,
              fixed,
              disable,
              order: counter.columnsMap.value?.[columnKey]?.order,
            };
          }
          if (children) {
            loopColumns(children);
          }
        });
      };
      loopColumns(props.columns);
      counter.setColumnsMap(columnKeyMap);
    };
    /** 全选和反选 */
    const checkedAll = (e: CheckboxChangeEvent) => {
      if (e.target.checked) {
        setAllSelectAction();
      } else {
        setAllSelectAction(false);
      }
    };

    useEffect(() => {
      if (counter.propsRef.value?.columnsState?.value) {
        columnRef.value = JSON.parse(
          JSON.stringify(counter.propsRef.value?.columnsState?.value || {})
        );
      }
    }, [() => counter.propsRef.value?.columnsState?.value]);

    /** 重置项目 */
    const clearClick = () => {
      counter.clearPersistenceStorage.value();
      counter.setColumnsMap(
        counter.propsRef.value?.columnsState?.defaultValue ||
          columnRef.value ||
          counter.defaultColumnKeyMap.value!
      );
    };

    return () => {
      const {
        settingIcon,
        checkable,
        draggable,
        checkedReset = true,
        children,
        extra,
        listHeight,
        showListItemOption,
        columns = [],
      } = props;
      // 未选中的 key 列表
      const unCheckedKeys = Object.values(counter.columnsMap.value!).filter(
        (value) => !value || value.show === false
      );

      // 是否已经选中
      const indeterminate = unCheckedKeys.length > 0 && unCheckedKeys.length !== columns.length;

      return wrapSSR(
        <Popover
          arrow={false}
          trigger="click"
          placement="bottomRight"
          title={
            <div class={classNames(`${baseClassName.value}-title`, hashId.value)}>
              {checkable === false ? null : (
                <Checkbox
                  indeterminate={indeterminate}
                  checked={unCheckedKeys.length === 0 && unCheckedKeys.length !== columns.length}
                  onChange={(e) => checkedAll(e)}
                >
                  {intl.value.getMessage({
                    id: 'tableToolBar.columnDisplay',
                    defaultMessage: '列展示',
                  })}
                </Checkbox>
              )}
              {checkedReset ? (
                <a
                  class={classNames(`${baseClassName.value}-action-rest-button`, hashId.value)}
                  onClick={clearClick}
                >
                  {intl.value.getMessage({ id: 'tableToolBar.reset', defaultMessage: '重置' })}
                </a>
              ) : null}
              {!extra ? null : (
                <Space size={12} align="center">
                  {extra}
                </Space>
              )}
            </div>
          }
          overlayClassName={classNames(`${baseClassName.value}-overlay`, hashId.value)}
          content={
            <GroupCheckboxList
              class={baseClassName.value}
              checkable={checkable ?? true}
              draggable={draggable ?? true}
              showListItemOption={showListItemOption ?? true}
              columns={columns}
              listHeight={listHeight}
            />
          }
        >
          {children || (
            <Tooltip
              title={intl.value.getMessage({
                id: 'tableToolBar.columnSetting',
                defaultMessage: '列设置',
              })}
            >
              {settingIcon ?? <SettingOutlined />}
            </Tooltip>
          )}
        </Popover>
      );
    };
  },
});
export default ColumnSetting;
