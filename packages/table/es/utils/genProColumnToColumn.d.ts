import { TableProps } from 'ant-design-vue';
import { Key } from 'ant-design-vue/es/_util/type';
import { ProColumns } from '../typing';
type ColumnToColumnParams<T> = {
    columns: ProColumns<T>[];
} & Pick<TableProps<T>, 'rowKey' | 'childrenColumnName'>;
/**
 * 根据 key 和 dataIndex 生成唯一 id
 *
 * @param key 用户设置的 key
 * @param index 序列号，理论上唯一
 */
export declare const genColumnKey: (key?: Key, index?: Key) => string;
/**
 * 转化 columns 到 pro 的格式 主要是 render 方法的自行实现
 *
 */
declare const genProColumnToColumn: <T>(params: ColumnToColumnParams<T>, parents?: ProColumns<T, any>) => ProColumns<T>[];
export default genProColumnToColumn;
