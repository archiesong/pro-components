import { ColumnType, CompareFn } from 'ant-design-vue/es/table/interface';
import { ProSchema, ProSchemaComponentTypes, SearchTransformKeyFn } from '@ant-design-vue/pro-utils';
export type RequestData<T> = {
    data: T[] | undefined;
    success?: boolean;
    total?: number;
} & Record<string, any>;
export type ExtraProColumnType<T> = Omit<ColumnType<T>, 'render' | 'children' | 'title' | 'filters' | 'onFilter' | 'sorter'> & {
    sorter?: string | boolean | CompareFn<T> | {
        compare?: CompareFn<T>;
        /** Config multiple sorter order priority */
        multiple?: number;
    };
};
export type ProColumnType<T = unknown, ValueType = 'text'> = ProSchema<T, ExtraProColumnType<T> & {
    children?: ProColumns<T>[];
    index?: number;
    /**
     * 每个表单占据的格子大小
     *
     * @param 总宽度 = span* colSize
     * @param 默认为 1
     */
    colSize?: number;
    /** @description 是否缩略 */
    ellipsis?: ColumnType<T>['ellipsis'];
    /** @description 是否拷贝 */
    copyable?: boolean;
    /** 在查询表单中隐藏 */
    search?: boolean | {
        /**
         * Transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
         *
         * @name 转化值的key, 一般用于事件区间的转化
         */
        transform: SearchTransformKeyFn;
    };
    /** @description 在 table 中隐藏 */
    hideInTable?: boolean;
    /** @description 列设置的 disabled */
    disable?: boolean | {
        checkbox: boolean;
    };
}, ProSchemaComponentTypes, ValueType, {
    lightProps?: any;
}>;
export type ProColumns<T = any, ValueType = 'text'> = ProColumnType<T, ValueType>;
export type ActionType = any;
export type WithFalse<T> = T | false;
