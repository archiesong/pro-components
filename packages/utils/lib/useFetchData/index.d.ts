import { Key } from 'ant-design-vue/lib/_util/type';
export type ProRequestData<T, U = Record<string, any>> = (params: U, props: any) => Promise<T>;
declare const useFetchData: <T, U = Record<string, any>>(props: {
    proFieldKey?: Key;
    params?: U;
    request?: ProRequestData<T, U>;
}) => Readonly<import('vue').Ref<T | undefined, T | undefined>>[];
export default useFetchData;
