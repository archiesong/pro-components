import type { UnwrapRef, ComputedRef, Plugin, App, DefineComponent } from 'vue';
import type { IntlType } from './intl';
import type { DeepPartial, ProTokenType } from './typing/layoutToken';
import type { ProConfigProviderProps } from './ConfigProviderContainer';
import type {
  ProSchemaValueEnumType,
  ProFieldFCMode,
  BaseProFieldFC,
  ProFieldFCRenderProps,
  ProRenderFieldPropsType,
  ConfigContextPropsType,
} from './context';
import { defineComponent, isRef, computed } from 'vue';
import { ConfigProvider as AntdConfigProvider } from 'ant-design-vue';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import { proTheme } from './useStyle';
import { useProConfigContextInject } from './context';
import { findIntlKeyByAntdLocaleKey, intlMap, zhCNIntl } from './intl';
import ConfigProviderContainer, {
  proConfigProviderProps,
  isNeedOpenHash,
} from './ConfigProviderContainer';

type OmitUndefined<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

const omitUndefined = <T extends Record<string, any>>(obj: T): OmitUndefined<T> => {
  const newObj = {} as Record<string, any> as T;
  Object.keys(obj || {}).forEach((key) => {
    if (obj[key] !== void 0) {
      (newObj as any)[key] = obj[key];
    }
  });
  if (Object.keys(newObj as Record<string, any>).length < 1) {
    return void 0 as any;
  }
  return newObj as OmitUndefined<T>;
};

const ProConfigProvider = defineComponent({
  name: 'ProConfigProvider',
  inheritAttrs: false,
  props: proConfigProviderProps(),
  setup(props, { slots }) {
    const { locale, theme, ...rest } = useConfigContextInject();
    const proProvide = useProConfigContextInject();
    const mergeAlgorithm = () => {
      const algorithm = theme?.value?.algorithm;
      const isDark = props.dark ?? proProvide.value.dark;
      const isCompact = props.compact ?? proProvide.value.compact;
      if (algorithm) {
        if (!Array.isArray(algorithm)) {
          if (isDark && !isCompact) {
            return [algorithm, proTheme.darkAlgorithm].filter(Boolean);
          } else if (!isDark && isCompact) {
            return [algorithm, proTheme.compactAlgorithm].filter(Boolean);
          } else if (isDark && isCompact) {
            return [algorithm, proTheme.darkAlgorithm, proTheme.compactAlgorithm].filter(Boolean);
          }
        } else {
          if (isDark && !isCompact) {
            return [...(algorithm || []), proTheme.darkAlgorithm].filter(Boolean);
          } else if (!isDark && isCompact) {
            return [...(algorithm || []), proTheme.compactAlgorithm].filter(Boolean);
          } else if (isDark && isCompact) {
            return [...(algorithm || []), proTheme.darkAlgorithm, proTheme.compactAlgorithm].filter(
              Boolean
            );
          }
        }
      } else {
        if (isDark && !isCompact) {
          return [proTheme.darkAlgorithm];
        } else if (!isDark && isCompact) {
          return [proTheme.compactAlgorithm];
        } else if (isDark && isCompact) {
          return [proTheme.darkAlgorithm, proTheme.compactAlgorithm];
        }
      }
      return algorithm;
    };
    return () => {
      const resetConfig = (Object.keys(rest) as Array<keyof typeof rest>).reduce(
        (prev, key) => {
          const temp = rest[key];
          if (isRef(temp)) {
            prev[key] = temp.value;
          } else {
            prev[key] = temp;
          }
          return prev;
        },
        {} as Record<keyof typeof rest, any>
      ) as UnwrapRef<typeof rest>;

      const configProviderProps = {
        ...resetConfig,
        theme: omitUndefined({
          ...theme?.value,
          algorithm: mergeAlgorithm(),
        }),
        locale: locale?.value || zh_CN,
        prefixCls: resetConfig.getPrefixCls(),
      };
      return (
        <AntdConfigProvider {...configProviderProps}>
          <ConfigProviderContainer {...props}>{slots.default?.()}</ConfigProviderContainer>
        </AntdConfigProvider>
      );
    };
  },
});

/**
 * It returns the intl object from the context if it exists, otherwise it returns the intl object for
 * 获取国际化的方法
 * the current locale
 * @returns The return value of the function is the intl object.
 */
export function useIntl(): ComputedRef<IntlType> {
  const { locale } = useConfigContextInject();
  const proProvide = useProConfigContextInject();
  if (proProvide.value.intl?.locale !== 'default') {
    return computed(() => proProvide.value.intl || zhCNIntl);
  }
  if (locale?.value?.locale) {
    return computed(
      () => intlMap[findIntlKeyByAntdLocaleKey(locale.value.locale) as 'zh-CN'] || zhCNIntl
    );
  }
  return computed(() => zhCNIntl);
}

ProConfigProvider.install = (app: App) => {
  app.component(ProConfigProvider.name as string, ProConfigProvider);
  return app;
};

export type {
  ProTokenType,
  DeepPartial,
  ProSchemaValueEnumType,
  ProFieldFCMode,
  BaseProFieldFC,
  ProFieldFCRenderProps,
  ProRenderFieldPropsType,
  ConfigContextPropsType,
};

export { useProConfigContextInject, isNeedOpenHash };

export * from './intl';

export * from './useStyle';

export default ProConfigProvider as DefineComponent<ProConfigProviderProps> & Plugin;
