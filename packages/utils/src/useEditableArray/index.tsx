import type { Ref } from 'vue';
import type { FormInstance, FormProps } from 'ant-design-vue';
import type { Key, VueNode, AnyObject } from 'ant-design-vue/es/_util/type';
import type { GetRowKey } from 'ant-design-vue/es/table/interface';
import type { NamePath } from 'ant-design-vue/es/form/interface';
import { computed, ref } from 'vue';
import useLazyKVMap from 'ant-design-vue/es/table/hooks/useLazyKVMap';
import useMergedState from 'ant-design-vue/es/_util/hooks/useMergedState';
// import { useIntl } from '@ant-design-vue/pro-provider';
import useState from '../useState';
import useMemo from '../useMemo';
import useEffect from '../useEffect';
import usePrevious from '../usePrevious';

export type RowEditableType = 'single' | 'multiple';

export type RecordKey = Key | Key[];

export const recordKeyToString = (rowKey: RecordKey): Key => {
  if (Array.isArray(rowKey)) return rowKey.join(',');
  return rowKey;
};

export type AddLineOptions = {
  position?: 'top' | 'bottom';
  recordKey?: RecordKey;
  newRecordType?: 'dataSource' | 'cache';
  /** 要增加到哪个节点下，一般用于多重嵌套表格 */
  parentKey?: RecordKey;
};

export type NewLineConfig<T> = {
  defaultValue?: T;
  options: AddLineOptions;
};

export type ActionRenderFunction<T> = (
  row: T,
  config: ActionRenderConfig<T, NewLineConfig<T>>,
  defaultDoms: {
    save: VueNode;
    delete: VueNode;
    cancel: VueNode;
  }
) => VueNode[];

export type RowEditableConfig<DataType> = {
  /** @name 控制可编辑表格的 From的设置 */
  formProps?: Omit<
    FormProps & {
      formRef?: Ref<FormInstance | undefined>;
      onInit?: (values: DataType, form: FormInstance) => void;
    },
    'onFinish'
  >;
  /** @name 控制可编辑表格的 form */
  form?: FormInstance;
  /**
   * @name 编辑的类型，支持单选和多选
   */
  type?: RowEditableType;
  /** @name 正在编辑的列 */
  editableKeys?: Key[];
  /** 正在编辑的列修改的时候 */
  onChange?: (editableKeys: Key[], editableRows: DataType[] | DataType) => void;
  /** 正在编辑的列修改的时候 */
  onValuesChange?: (record: DataType, dataSource: DataType[]) => void;
  /** @name 自定义编辑的操作 */
  actionRender?: ActionRenderFunction<DataType>;
  /** 行保存的时候 */
  onSave?: (
    /** 行 id，一般是唯一id */
    key: RecordKey,
    /** 当前修改的行的值，只有 form 在内的会被设置 */
    record: DataType & { index?: number },
    /** 原始值，可以用于判断是否修改 */
    originRow: DataType & { index?: number },
    /** 新建一行的配置，一般无用 */
    newLineConfig?: NewLineConfig<DataType>
  ) => Promise<any | void>;
  /** 行取消编辑的时候 */
  onCancel?: (
    /** 行 id，一般是唯一id */
    key: RecordKey,
    /** 当前修改的行的值，只有 form 在内的会被设置 */
    record: DataType & { index?: number },
    /** 原始值，可以用于判断是否修改 */
    originRow: DataType & { index?: number },
    /** 新建一行的配置，一般无用 */
    newLineConfig?: NewLineConfig<DataType>
  ) => Promise<any | void>;
  /** 行删除的时候 */
  onDelete?: (key: RecordKey, row: DataType & { index?: number }) => Promise<any | void>;
  /** 删除行时的确认消息 */
  deletePopconfirmMessage?: VueNode;
  /** 只能编辑一行的的提示 */
  onlyOneLineEditorAlertMessage?: VueNode;
  /** 同时只能新增一行的提示 */
  onlyAddOneLineAlertMessage?: VueNode;
  /** Table 上设置的name，用于拼接name来获取数据 */
  tableName?: NamePath;
  /** 保存一行的文字 */
  saveText?: VueNode;
  /** 取消编辑一行的文字 */
  cancelText?: VueNode;
  /** 删除一行的文字 */
  deleteText?: VueNode;
  getRealIndex?: (record: DataType) => number;
};

export type ActionTypeText<T> = {
  deleteText?: VueNode;
  cancelText?: VueNode;
  saveText?: VueNode;
  editorType?: 'Array' | 'Map';
  addEditRecord?: (row: T, options?: AddLineOptions) => boolean;
};

export type ActionRenderConfig<T, LineConfig = NewLineConfig<T>> = {
  editableKeys?: RowEditableConfig<T>['editableKeys'];
  recordKey: RecordKey;
  preEditRowRef: Ref<T | null>;
  index?: number;
  cancelEditable: (key: RecordKey) => void;
  onSave: RowEditableConfig<T>['onSave'];
  onCancel: RowEditableConfig<T>['onCancel'];
  onDelete?: RowEditableConfig<T>['onDelete'];
  deletePopconfirmMessage: RowEditableConfig<T>['deletePopconfirmMessage'];
  setEditableRowKeys: (value: Key[]) => void;
  newLineConfig?: LineConfig;
  tableName?: NamePath;
  children?: VueNode;
} & ActionTypeText<T>;

/**
 * 使用map 来删除数据，性能一般 但是准确率比较高
 *
 * @param keyProps
 * @param action
 */
export function editableRowByKey<RecordType>(
  keyProps: {
    data: RecordType[];
    childrenColumnName: string;
    getRowKey: GetRowKey<RecordType>;
    key: RecordKey;
    row: RecordType;
  },
  action: 'update' | 'top' | 'delete'
) {
  const { getRowKey, row, data, childrenColumnName = 'children' } = keyProps;
  const key = recordKeyToString(keyProps.key)?.toString();

  const kvMap = new Map<string, RecordType & { parentKey?: Key }>();

  /**
   * 打平这个数组
   *
   * @param records
   * @param parentKey
   */
  function dig(records: RecordType[], map_row_parentKey?: Key, map_row_index?: number) {
    records.forEach((record, index) => {
      const eachIndex = (map_row_index || 0) * 10 + index;
      const recordKey = getRowKey(record, eachIndex).toString();
      // children 取在前面方便拼的时候按照反顺序放回去
      if (record && typeof record === 'object' && childrenColumnName in record) {
        dig((record as any)[childrenColumnName] || [], recordKey, eachIndex);
      }
      const newRecord = {
        ...record,
        map_row_key: recordKey,
        children: undefined,
        map_row_parentKey,
      };
      delete newRecord.children;
      if (!map_row_parentKey) {
        delete newRecord.map_row_parentKey;
      }
      kvMap.set(recordKey, newRecord);
    });
  }

  if (action === 'top') {
    kvMap.set(key, {
      ...kvMap.get(key),
      ...row,
    });
  }

  dig(data);

  if (action === 'update') {
    kvMap.set(key, {
      ...kvMap.get(key),
      ...row,
    });
  }

  if (action === 'delete') {
    kvMap.delete(key);
  }

  const fill = (
    map: Map<string, RecordType & { map_row_parentKey?: string; map_row_key?: string }>
  ) => {
    const kvArrayMap = new Map<string, RecordType[]>();
    const kvSource: RecordType[] = [];
    const fillNewRecord = (fillChildren: boolean = false) => {
      map.forEach((value) => {
        if (value.map_row_parentKey && !value.map_row_key) {
          const { map_row_parentKey, ...rest } = value;
          if (!kvArrayMap.has(map_row_parentKey)) {
            kvArrayMap.set(map_row_parentKey, []);
          }
          if (fillChildren) {
            kvArrayMap.get(map_row_parentKey)?.push(rest as unknown as RecordType);
          }
        }
      });
    };

    fillNewRecord(action === 'top');

    map.forEach((value) => {
      if (value.map_row_parentKey && value.map_row_key) {
        const { map_row_parentKey, map_row_key, ...rest } = value;
        if (kvArrayMap.has(map_row_key)) {
          (rest as any)[childrenColumnName] = kvArrayMap.get(map_row_key);
        }
        if (!kvArrayMap.has(map_row_parentKey)) {
          kvArrayMap.set(map_row_parentKey, []);
        }
        kvArrayMap.get(map_row_parentKey)?.push(rest as unknown as RecordType);
      }
    });

    fillNewRecord(action === 'update');

    map.forEach((value) => {
      if (!value.map_row_parentKey) {
        const { map_row_key, ...rest } = value;
        if (map_row_key && kvArrayMap.has(map_row_key)) {
          const item = {
            ...rest,
            [childrenColumnName]: kvArrayMap.get(map_row_key),
          };
          kvSource.push(item as RecordType);
          return;
        }
        kvSource.push(rest as RecordType);
      }
    });
    return kvSource;
  };
  return fill(kvMap);
}
export type UseEditableUtilType = {
  editableKeys: Ref<Key[] | undefined>;
  setEditableRowKeys: (val: Key[] | undefined) => void;
  isEditable: (
    row: AnyObject & {
      index: number;
    }
  ) => {
    recordKey: string;
    isEditable: any;
    preIsEditable: any;
  };
  newLineRecord: Ref<NewLineConfig<AnyObject> | undefined>;
  getRealIndex?: (record: AnyObject) => number;
};

/**
 * 一个方便的hooks 用于维护编辑的状态
 *
 * @param props
 */
const useEditableArray = <RecordType extends AnyObject>(
  props: RowEditableConfig<RecordType> & {
    getRowKey: Ref<GetRowKey<RecordType>>;
    dataSource: Ref<RecordType[]>;
    onValuesChange?: (record: RecordType, dataSource: RecordType[]) => void;
    childrenColumnName: string | undefined;
    setDataSource: (dataSource: RecordType[]) => void;
  }
): UseEditableUtilType => {
  // Internationalization
  // const intl = useIntl();
  /**
   * 点击开始编辑之前的保存数据用的
   */
  // const preEditRow = ref<RecordType | null>(null);

  const [newLineRecordCache] = useState<NewLineConfig<RecordType> | undefined>(undefined);

  const resetMapRef = () => {
    const map = new Map<Key, Key>();
    //存在children时会覆盖Map的key,导致使用数组索引查找key错误
    const loopGetKey = (dataSource: RecordType[], parentKey?: string) => {
      dataSource?.forEach((record, index) => {
        const key =
          parentKey === undefined || parentKey === null
            ? index.toString()
            : parentKey + '_' + index.toString();
        map.set(key, recordKeyToString(props.getRowKey.value(record, -1)));
        map.set(recordKeyToString(props.getRowKey.value(record, -1))?.toString(), key);
        if (props.childrenColumnName && (record as any)?.[props.childrenColumnName]) {
          loopGetKey((record as any)[props.childrenColumnName], key);
        }
      });
    };
    loopGetKey(props.dataSource.value);
    return map;
  };
  const initDataSourceKeyIndexMap = useMemo(() => resetMapRef(), []);
  const dataSourceKeyIndexMapRef = ref<Map<Key, Key>>(initDataSourceKeyIndexMap.value);
  // const newLineRecordRef = ref<NewLineConfig<RecordType> | undefined>(undefined);

  useEffect(() => {
    dataSourceKeyIndexMapRef.value = resetMapRef();
  }, [() => props.dataSource.value]);

  // 这里这么做是为了存上次的状态，不然每次存一下再拿
  // newLineRecordRef.value = newLineRecordCache.value;

  // const editableType = props.type || 'single';

  const [getRecordByKey] = useLazyKVMap(props.dataSource, ref('children'), props.getRowKey);

  const [editableKeys, setEditableRowKeys] = useMergedState([], {
    value: computed(() => props.editableKeys),
    onChange: props.onChange
      ? (keys) => {
          props?.onChange?.(
            // 计算编辑的key
            keys?.filter((key) => key !== undefined) ?? [],
            // 计算编辑的行
            keys?.map((key) => getRecordByKey(key)).filter((key) => key !== undefined) ?? []
          );
        }
      : undefined,
  });

  /** 一个用来标志的set 提供了方便的 api 来去重什么的 */
  // const editableKeysSet = useMemo(() => {
  //   const keys = editableType === 'single' ? editableKeys.value?.slice(0, 1) : editableKeys.value;
  //   return new Set(keys);
  // }, [() => (editableKeys.value || []).join(','), () => editableType]);
  const editableKeysRef = usePrevious(editableKeys);
  /** 这行是不是编辑状态 */
  const isEditable = (row: RecordType & { index: number }) => {
    // 为了兼容一下name 模式的 indexKey，所以需要判断两次，一次是index，一次是没有 index 的
    const recordKeyOrIndex = props.getRowKey.value(row, row.index)?.toString?.();
    // 这里是不设置 index 的地方
    const recordKey = props.getRowKey.value(row, -1)?.toString?.();
    // 都转化为了字符串，不然 number 和 string
    const stringEditableKeys = editableKeys.value?.map((key) => key?.toString());
    const stringEditableKeysRef = editableKeysRef.value?.map((key) => key?.toString()) || [];
    const preIsEditable =
      (props.tableName && !!stringEditableKeysRef?.includes(recordKey)) ||
      !!stringEditableKeysRef?.includes(recordKeyOrIndex);
    return {
      recordKey,
      isEditable:
        (props.tableName && stringEditableKeys?.includes(recordKey)) ||
        stringEditableKeys?.includes(recordKeyOrIndex),
      preIsEditable,
    };
  };
  return {
    editableKeys,
    setEditableRowKeys,
    isEditable,
    newLineRecord: newLineRecordCache,
    getRealIndex: props.getRealIndex,
  };
};

export type UseEditableType = typeof useEditableArray;

export default useEditableArray;
