import { Ref } from 'vue';
import { FormInstance, FormProps } from 'ant-design-vue';
import { Key, VueNode, AnyObject } from 'ant-design-vue/es/_util/type';
import { GetRowKey } from 'ant-design-vue/es/table/interface';
import { NamePath } from 'ant-design-vue/es/form/interface';
export type RowEditableType = 'single' | 'multiple';
export type RecordKey = Key | Key[];
export declare const recordKeyToString: (rowKey: RecordKey) => Key;
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
export type ActionRenderFunction<T> = (row: T, config: ActionRenderConfig<T, NewLineConfig<T>>, defaultDoms: {
    save: VueNode;
    delete: VueNode;
    cancel: VueNode;
}) => VueNode[];
export type RowEditableConfig<DataType> = {
    /** @name 控制可编辑表格的 From的设置 */
    formProps?: Omit<FormProps & {
        formRef?: Ref<FormInstance | undefined>;
        onInit?: (values: DataType, form: FormInstance) => void;
    }, 'onFinish'>;
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
    record: DataType & {
        index?: number;
    }, 
    /** 原始值，可以用于判断是否修改 */
    originRow: DataType & {
        index?: number;
    }, 
    /** 新建一行的配置，一般无用 */
    newLineConfig?: NewLineConfig<DataType>) => Promise<any | void>;
    /** 行取消编辑的时候 */
    onCancel?: (
    /** 行 id，一般是唯一id */
    key: RecordKey, 
    /** 当前修改的行的值，只有 form 在内的会被设置 */
    record: DataType & {
        index?: number;
    }, 
    /** 原始值，可以用于判断是否修改 */
    originRow: DataType & {
        index?: number;
    }, 
    /** 新建一行的配置，一般无用 */
    newLineConfig?: NewLineConfig<DataType>) => Promise<any | void>;
    /** 行删除的时候 */
    onDelete?: (key: RecordKey, row: DataType & {
        index?: number;
    }) => Promise<any | void>;
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
export declare function editableRowByKey<RecordType>(keyProps: {
    data: RecordType[];
    childrenColumnName: string;
    getRowKey: GetRowKey<RecordType>;
    key: RecordKey;
    row: RecordType;
}, action: 'update' | 'top' | 'delete'): RecordType[];
export type UseEditableUtilType = {
    editableKeys: Ref<Key[] | undefined>;
    setEditableRowKeys: (val: Key[] | undefined) => void;
    isEditable: (row: AnyObject & {
        index: number;
    }) => {
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
declare const useEditableArray: <RecordType extends AnyObject>(props: RowEditableConfig<RecordType> & {
    getRowKey: Ref<GetRowKey<RecordType>>;
    dataSource: Ref<RecordType[]>;
    onValuesChange?: (record: RecordType, dataSource: RecordType[]) => void;
    childrenColumnName: string | undefined;
    setDataSource: (dataSource: RecordType[]) => void;
}) => UseEditableUtilType;
export type UseEditableType = typeof useEditableArray;
export default useEditableArray;
