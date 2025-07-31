import { ComputedRef, Plugin, DefineComponent } from 'vue';
import { IntlType } from './intl';
import { DeepPartial, ProTokenType } from './typing/layoutToken';
import { ProConfigProviderProps, isNeedOpenHash } from './ConfigProviderContainer';
import { ProSchemaValueEnumType, ProFieldFCMode, BaseProFieldFC, ProFieldFCRenderProps, ProRenderFieldPropsType, ConfigContextPropsType, useProConfigContextInject } from './context';
/**
 * It returns the intl object from the context if it exists, otherwise it returns the intl object for
 * 获取国际化的方法
 * the current locale
 * @returns The return value of the function is the intl object.
 */
export declare function useIntl(): ComputedRef<IntlType>;
export type { ProTokenType, DeepPartial, ProSchemaValueEnumType, ProFieldFCMode, BaseProFieldFC, ProFieldFCRenderProps, ProRenderFieldPropsType, ConfigContextPropsType, };
export { useProConfigContextInject, isNeedOpenHash };
export * from './intl';
export * from './useStyle';
declare const _default: DefineComponent<ProConfigProviderProps> & Plugin;
export default _default;
