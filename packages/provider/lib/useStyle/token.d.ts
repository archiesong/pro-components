import { GlobalToken } from 'ant-design-vue/lib/theme';
export declare const defaultToken: GlobalToken;
export declare const hashCode: (str: string, seed?: number) => number;
export declare const emptyTheme: import('ant-design-vue').Theme<any, any>;
export declare const token: {
    theme: import('ant-design-vue').Theme<any, any>;
    token: GlobalToken;
    hashId: string;
};
export declare const useToken: () => {
    theme: import('ant-design-vue').Theme<any, any>;
    token: GlobalToken;
    hashId: string;
};
