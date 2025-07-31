import { InjectionKey } from 'vue';
import { TableColumnType } from 'ant-design-vue';
import { DensitySize } from '../components/ToolBar/DensityIcon';
import { ProColumns } from '../typing';
export type ColumnsState = {
    show?: boolean;
    fixed?: 'right' | 'left' | undefined;
    order?: number;
    disable?: boolean | {
        checkbox: boolean;
    };
};
export type ProTableColumn<T> = ColumnsState & TableColumnType<T>;
export type UseContainerProps<T = any> = {
    columnsStateMap?: Record<string, ColumnsState>;
    onColumnsStateChange?: (map: Record<string, ColumnsState>) => void;
    size?: DensitySize;
    defaultSize?: DensitySize;
    onSizeChange?: (size: DensitySize) => void;
    columns?: ProTableColumn<T>[] | ProColumns<T, T>[];
};
export declare const useContainer: (props?: UseContainerProps) => {
    action: any;
};
export type ContainerType = typeof useContainer;
type ContainerReturnType = ReturnType<ContainerType>;
export declare const tableContextKey: InjectionKey<ContainerReturnType>;
export declare const useTableContextProvider: (props: ContainerReturnType) => void;
export declare const useTableContextInject: () => {
    action: any;
};
export {};
