import type { InjectionKey } from 'vue';
import type { TableColumnType } from 'ant-design-vue';
import type { DensitySize } from '../components/ToolBar/DensityIcon';
import type { ProColumns, ActionType } from '../typing';
import type { ProTableProps } from '../proTableProps';
import type { Key } from 'ant-design-vue/es/_util/type';
import { inject, provide, ref, computed } from 'vue';
import { merge } from 'lodash-es';
import useMergedState from 'ant-design-vue/es/_util/hooks/useMergedState';
import { useCallback, useEffect, useMemo, useState } from '@ant-design-vue/pro-utils';
import { genColumnKey } from '../utils/genProColumnToColumn';
import { NamePath } from 'ant-design-vue/es/form/interface';

export type ColumnsState = {
  show?: boolean;
  fixed?: boolean | 'right' | 'left' | undefined;
  order?: number;
  disable?:
    | boolean
    | {
        checkbox: boolean;
      };
};

export type ProTableColumn<T> = ColumnsState & TableColumnType<T>;

export type UseContainerProps<T = any> = {
  onColumnsStateChange?: (map: Record<string, ColumnsState> | undefined) => void;
  size?: DensitySize;
  defaultSize?: DensitySize;
  onSizeChange?: (size: DensitySize) => void;
  columns?: ProTableColumn<T>[] | ProColumns<T, T>[];
  columnsState?: ProTableProps['columnsState'];
};

export const useContainer = (props: UseContainerProps = {} as Record<string, any>) => {
  const action = ref<ActionType>();
  const rootDomRef = ref<HTMLDivElement | null>(null);
  /** 自己 props 的引用 */
  const propsRef = ref<ProTableProps>();
  /** 父 form item 的 name */
  const prefixNameRef = ref<NamePath>();
  // 共享状态比较难，就放到这里了
  const [keyWords, setKeyWords] = useState<string | undefined>('');

  // 用于排序的数组
  const sortKeyColumns = ref<string[]>([]);

  const [tableSize, setTableSize] = useMergedState<DensitySize>(
    () => props.size || props.defaultSize || 'middle',
    {
      value: computed(() => props.size),
      onChange: props.onSizeChange,
    }
  );
  /** 默认全选中 */
  const defaultColumnKeyMap = useMemo(() => {
    if (props?.columnsState?.defaultValue) return props.columnsState.defaultValue;
    const columnKeyMap = {} as Record<string, ColumnsState>;
    props.columns?.forEach(({ key, dataIndex, fixed, disable }, index) => {
      const columnKey = genColumnKey(key ?? (dataIndex as Key), index);
      if (columnKey) {
        columnKeyMap[columnKey] = {
          show: true,
          fixed,
          disable,
        };
      }
    });
    return columnKeyMap;
  }, [() => props.columns, () => props.columnsState?.defaultValue]);

  const [columnsMap, setColumnsMap] = useMergedState(
    () => {
      const { persistenceType, persistenceKey } = props.columnsState || {};

      if (persistenceKey && persistenceType && typeof window !== 'undefined') {
        /** 从持久化中读取数据 */
        const storage = window[persistenceType];
        try {
          const storageValue = storage?.getItem(persistenceKey);
          if (storageValue) {
            if (props?.columnsState?.defaultValue) {
              // 实际生产中，defaultValue往往作为系统方默认配置，则优先级不应高于用户配置的storageValue
              return merge(
                {},
                props?.columnsState?.defaultValue,
                JSON.parse(storageValue)
              ) as Record<string, ColumnsState>;
            }
            return JSON.parse(storageValue) as Record<string, ColumnsState>;
          }
        } catch (error) {
          console.warn(error);
        }
      }
      return (
        props.columnsState?.value || props.columnsState?.defaultValue || defaultColumnKeyMap.value
      );
    },
    {
      value: computed(() => props.columnsState?.value),
      onChange: props.columnsState?.onChange || props.onColumnsStateChange,
    }
  );

  /**  配置或列更改时对columnsMap重新赋值 */
  useEffect(() => {
    const { persistenceType, persistenceKey } = props.columnsState || {};

    if (persistenceKey && persistenceType && typeof window !== 'undefined') {
      /** 从持久化中读取数据 */
      const storage = window[persistenceType];
      try {
        const storageValue = storage?.getItem(persistenceKey);
        if (storageValue) {
          if (props?.columnsState?.defaultValue) {
            setColumnsMap(merge({}, props?.columnsState?.defaultValue, JSON.parse(storageValue)));
          } else {
            setColumnsMap(JSON.parse(storageValue));
          }
        } else {
          setColumnsMap(defaultColumnKeyMap.value);
        }
      } catch (error) {
        console.warn(error);
      }
    }
  }, [
    () => props.columnsState?.persistenceKey,
    () => props.columnsState?.persistenceType,
    () => defaultColumnKeyMap.value,
  ]);

  /** 清空一下当前的 key */
  const clearPersistenceStorage = useCallback(() => {
    const { persistenceType, persistenceKey } = props.columnsState || {};

    if (!persistenceKey || !persistenceType || typeof window === 'undefined') return;

    /** 给持久化中设置数据 */
    const storage = window[persistenceType];
    try {
      storage?.removeItem(persistenceKey);
    } catch (error) {
      console.warn(error);
    }
  }, [() => props.columnsState]);

  useEffect(() => {
    if (!props.columnsState?.persistenceKey || !props.columnsState?.persistenceType) {
      return;
    }
    if (typeof window === 'undefined') return;
    /** 给持久化中设置数据 */
    const { persistenceType, persistenceKey } = props.columnsState;
    const storage = window[persistenceType];
    try {
      storage?.setItem(persistenceKey, JSON.stringify(columnsMap.value));
    } catch (error) {
      console.warn(error);
      clearPersistenceStorage.value();
    }
  }, [
    () => props.columnsState?.persistenceKey,
    () => columnsMap.value,
    () => props.columnsState?.persistenceType,
  ]);
  return {
    action,
    setAction: (newAction?: ActionType) => (action.value = newAction),
    sortKeyColumns,
    setSortKeyColumns: (keys: string[]) => {
      sortKeyColumns.value = keys;
    },
    propsRef,
    tableSize,
    setTableSize,
    prefixName: prefixNameRef,
    setPrefixName: (name?: NamePath) => {
      prefixNameRef.value = name;
    },
    columnsMap,
    setColumnsMap,
    keyWords,
    setKeyWords,
    columns: props.columns,
    clearPersistenceStorage,
    defaultColumnKeyMap,
    rootDomRef,
  };
};

export type ContainerType = typeof useContainer;
type ContainerReturnType = ReturnType<ContainerType>;

export const tableContextKey: InjectionKey<ContainerReturnType> = Symbol('tableContext');

export const useTableContextProvider = (props: ContainerReturnType) =>
  provide(tableContextKey, props);

export const useTableContextInject = () => inject(tableContextKey, {} as ContainerReturnType);
