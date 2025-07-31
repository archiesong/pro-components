import type { TableProps } from 'ant-design-vue';
import type { AnyObject, Key, VueNode } from 'ant-design-vue/es/_util/type';
import type { ProColumns } from '../typing';
import type { ContainerType } from '../Store/Provide';
import type { ProFieldEmptyText } from '@ant-design-vue/pro-field';
import type { ProSchemaComponentTypes, UseEditableUtilType } from '@ant-design-vue/pro-utils';
import { Table } from 'ant-design-vue';
import { omitBoolean, omitUndefinedAndEmptyArr, runFunction } from '@ant-design-vue/pro-utils';
import { proFieldParsingValueEnumToArray } from '@ant-design-vue/pro-field';
import columnRender, { defaultOnFilter, renderColumnsTitle } from './columnRender';

type ColumnToColumnParams<T> = {
  columns: ProColumns<T>[];
  counter: ReturnType<ContainerType>;
  columnEmptyText: ProFieldEmptyText;
  type: ProSchemaComponentTypes;
  editableUtils: UseEditableUtilType;
} & Pick<TableProps<T>, 'rowKey' | 'childrenColumnName'>;

/**
 * 根据 key 和 dataIndex 生成唯一 id
 *
 * @param key 用户设置的 key
 * @param index 序列号，理论上唯一
 */
export const genColumnKey = (key?: Key, index?: Key): string => {
  if (key) {
    return Array.isArray(key) ? key.join('-') : key.toString();
  }
  return `${index}`;
};

/**
 * 转化 columns 到 pro 的格式 主要是 render 方法的自行实现
 *
 */
const genProColumnToColumn = <T extends AnyObject>(
  params: ColumnToColumnParams<T> & { marginSM: number },
  parents?: ProColumns<T, any>
) => {
  const {
    columns,
    counter,
    columnEmptyText,
    type,
    editableUtils,
    marginSM,
    rowKey = 'id',
    childrenColumnName = 'children',
  } = params;
  const subNameRecord = new Map<Key, any>();
  return columns
    .map((columnProps, columnsIndex) => {
      if (columnProps === Table.EXPAND_COLUMN) return columnProps;
      if (columnProps === Table.SELECTION_COLUMN) return columnProps;
      const {
        key,
        dataIndex,
        valueEnum,
        valueType = 'text',
        children,
        onFilter,
        filters = [],
      } = columnProps;
      const columnKey = genColumnKey(
        key || dataIndex?.toString(),
        [parents?.key, columnsIndex].filter(Boolean).join('-')
      );
      // 这些都没有，说明是普通的表格不需要 pro 管理
      const noNeedPro = !valueEnum && !valueType && !children;
      if (noNeedPro) {
        return {
          index: columnsIndex,
          ...columnProps,
        };
      }
      const config = counter.columnsMap.value![columnKey] || {
        fixed: columnProps.fixed,
      };
      const genOnFilter = () => {
        if (onFilter === true) {
          return (value: string, row: T) => defaultOnFilter(value, row, dataIndex as string[]);
        }
        return omitBoolean(onFilter);
      };
      let keyName: string | number | symbol = rowKey as string;
      const tempColumns = {
        index: columnsIndex,
        key: columnKey,
        ...columnProps,
        title: renderColumnsTitle(columnProps),
        valueEnum,
        filters:
          filters === true
            ? proFieldParsingValueEnumToArray(runFunction(valueEnum, undefined)).filter(
                (valueItem) => valueItem && valueItem.value !== 'all'
              )
            : filters,
        onFilter: genOnFilter(),
        fixed: config.fixed,
        width: columnProps.width || (columnProps.fixed ? 200 : undefined),
        children: columnProps.children
          ? genProColumnToColumn(
              {
                ...params,
                columns: columnProps.children || [],
              },
              { ...columnProps, key: columnKey }
            )
          : undefined,
        customRender: ({ text, record, index }: { text: VueNode; record: T; index: number }) => {
          if (typeof rowKey === 'function') {
            keyName = rowKey(record, index) as string;
          }
          let uniqueKey: Key = '';
          if (typeof record === 'object' && record !== null && Reflect.has(record, keyName)) {
            uniqueKey = record[keyName as string];
            const parentInfo = subNameRecord.get(uniqueKey) || [];
            record[childrenColumnName]?.forEach((item: Record<Key | symbol, any>) => {
              const itemUniqueKey = item[keyName];
              if (!subNameRecord.has(itemUniqueKey)) {
                subNameRecord.set(itemUniqueKey, parentInfo.concat([index, childrenColumnName]));
              }
            });
          }
          const renderProps = {
            columnProps,
            text,
            record,
            index,
            columnEmptyText,
            counter,
            type,
            marginSM,
            subName: subNameRecord.get(uniqueKey),
            editableUtils,
          };
          return columnRender<T>(renderProps);
        },
      } as ProColumns<any>;
      return omitUndefinedAndEmptyArr(tempColumns);
    })
    ?.filter((item) => !item.hideInTable);
};
export default genProColumnToColumn;
