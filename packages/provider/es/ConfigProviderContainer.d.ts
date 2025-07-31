import { PropType, ExtractPropTypes } from 'vue';
import { DeepPartial } from './typing/layoutToken';
import { ProAliasToken } from './useStyle';
import { ProRenderFieldPropsType } from './context';
/**
 * 用于判断当前是否需要开启哈希（Hash）模式。
 * 首先也会判断当前是否处于测试环境中（通过 process.env.NODE_ENV === 'TEST' 判断），
 * 如果是，则返回 false。否则，直接返回 true 表示需要打开。
 * @returns
 */
export declare const isNeedOpenHash: () => boolean;
export declare const proConfigProviderProps: () => {
    autoClearCache: PropType<boolean>;
    dark: {
        type: PropType<boolean>;
        default: undefined;
    };
    compact: {
        type: PropType<boolean>;
        default: undefined;
    };
    token: PropType<DeepPartial<ProAliasToken>>;
    prefixCls: PropType<string>;
    valueTypeMap: PropType<Record<string, ProRenderFieldPropsType>>;
    hashed: {
        type: PropType<boolean>;
        default: undefined;
    };
};
export type ProConfigProviderProps = Partial<ExtractPropTypes<ReturnType<typeof proConfigProviderProps>>>;
/**
 * 用于配置 Pro 的组件,分装之后会简单一些
 * @param props
 * @returns
 */
declare const ConfigProviderContainer: import('vue').DefineComponent<ExtractPropTypes<{
    autoClearCache: PropType<boolean>;
    dark: {
        type: PropType<boolean>;
        default: undefined;
    };
    compact: {
        type: PropType<boolean>;
        default: undefined;
    };
    token: PropType<DeepPartial<ProAliasToken>>;
    prefixCls: PropType<string>;
    valueTypeMap: PropType<Record<string, ProRenderFieldPropsType>>;
    hashed: {
        type: PropType<boolean>;
        default: undefined;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ExtractPropTypes<{
    autoClearCache: PropType<boolean>;
    dark: {
        type: PropType<boolean>;
        default: undefined;
    };
    compact: {
        type: PropType<boolean>;
        default: undefined;
    };
    token: PropType<DeepPartial<ProAliasToken>>;
    prefixCls: PropType<string>;
    valueTypeMap: PropType<Record<string, ProRenderFieldPropsType>>;
    hashed: {
        type: PropType<boolean>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    hashed: boolean;
    dark: boolean;
    compact: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default ConfigProviderContainer;
