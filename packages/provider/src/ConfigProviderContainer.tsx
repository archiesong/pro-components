import type { PropType, UnwrapRef, ExtractPropTypes } from 'vue';
import type { Theme } from 'ant-design-vue/es/_util/cssinjs';
import type { DeepPartial } from './typing/layoutToken';
import type { ProAliasToken } from './useStyle';
import type { ProRenderFieldPropsType } from './context';
import { defineComponent, isRef, computed, watch } from 'vue';
import { cssinjs, ConfigProvider as AntdConfigProvider } from 'ant-design-vue';
import { getLayoutDesignToken } from './typing/layoutToken';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import useMemo from 'ant-design-vue/es/_util/hooks/useMemo';
import { useProConfigContextInject, useProConfigContextProvider } from './context';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { proTheme } from './useStyle';
import { findIntlKeyByAntdLocaleKey, intlMap, zhCNIntl } from './intl';
import { merge } from './utils/merge';
import { defaultToken } from './useStyle/token';
import CacheClean from './CacheClean';
const { useCacheToken } = cssinjs;

/**
 * 用于判断当前是否需要开启哈希（Hash）模式。
 * 首先也会判断当前是否处于测试环境中（通过 process.env.NODE_ENV === 'TEST' 判断），
 * 如果是，则返回 false。否则，直接返回 true 表示需要打开。
 * @returns
 */
export const isNeedOpenHash = () => {
  if (
    (typeof process !== 'undefined' &&
      (process.env.NODE_ENV?.toUpperCase() === 'TEST' ||
        process.env.NODE_ENV?.toUpperCase() === 'DEV')) ||
    (typeof import.meta.env !== 'undefined' &&
      import.meta.env.MODE &&
      (import.meta.env.MODE.toUpperCase() === 'TEST' ||
        import.meta.env.MODE.toUpperCase() === 'DEV'))
  ) {
    return false;
  }
  return true;
};

export const proConfigProviderProps = () => ({
  autoClearCache: Boolean as PropType<boolean>,
  dark: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  compact: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  token: Object as PropType<DeepPartial<ProAliasToken>>,
  prefixCls: String as PropType<string>,
  valueTypeMap: Object as PropType<Record<string, ProRenderFieldPropsType>>,
  hashed: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
});

export type ProConfigProviderProps = Partial<
  ExtractPropTypes<ReturnType<typeof proConfigProviderProps>>
>;

/**
 * 用于配置 Pro 的组件,分装之后会简单一些
 * @param props
 * @returns
 */
const ConfigProviderContainer = defineComponent({
  name: 'ConfigProviderContainer',
  props: proConfigProviderProps(),
  setup(props, { slots }) {
    const { locale, getPrefixCls, ...restConfig } = useConfigContextInject();
    const tokenContext = proTheme.useToken?.();
    const proProvide = useProConfigContextInject();
    /**
     * pro 的 类
     * @example ref('.ant-pro')
     */
    const proComponentsCls = computed(() =>
      props.prefixCls ? `.${props.prefixCls}` : `.${getPrefixCls()}-pro`
    );

    const antCls = computed(() => '.' + getPrefixCls());

    const salt = computed(() => `${proComponentsCls.value}`);

    /**
     * 合并一下token，不然导致嵌套 token 失效
     */
    const proLayoutTokenMerge = useMemo(() => {
      return getLayoutDesignToken(props.token || {}, tokenContext.token.value || defaultToken);
    }, [() => props.token, () => tokenContext.token.value]);

    const proProvideValue = useMemo(() => {
      const localeName = locale?.value?.locale;
      const key = findIntlKeyByAntdLocaleKey(localeName);
      // antd 的 key 存在的时候以 antd 的为主
      const intl =
        localeName && proProvide.value.intl?.locale === 'default'
          ? intlMap[key! as 'zh-CN']
          : proProvide.value.intl || intlMap[key! as 'zh-CN'];
      return {
        ...proProvide.value,
        dark: props.dark ?? proProvide.value.dark,
        compact: props.compact ?? proProvide.value.compact,
        token: merge(proProvide.value.token, tokenContext.token.value, {
          proComponentsCls: proComponentsCls.value,
          antCls: antCls.value,
          themeId: tokenContext.theme.value.id,
          layout: proLayoutTokenMerge.value,
        }),
        intl: intl || zhCNIntl,
      };
    }, [
      () => locale?.value,
      () => proProvide.value,
      () => props.dark,
      () => props.compact,
      () => tokenContext.token.value,
      () => tokenContext.theme.value.id,
      () => proComponentsCls.value,
      () => antCls.value,
      () => proLayoutTokenMerge.value,
    ]);
    const finalToken = computed(() => ({
      ...(proProvideValue.value?.token || {}),
      proComponentsCls: proComponentsCls.value,
    }));
    const cacheToken = useCacheToken<ProAliasToken>(
      tokenContext.theme,
      computed(() => [tokenContext.token.value, finalToken.value ?? {}]),
      computed(() => ({
        salt: salt.value,
        override: finalToken.value,
      }))
    );
    const hashId = useMemo(() => {
      if (props.hashed === false) {
        return '';
      }
      if (proProvide.value.hashed === false) return '';
      if (!isNeedOpenHash()) {
        return '';
      } else {
        // 生产环境或其他环境
        return cacheToken.value[1];
      }
    }, [() => cacheToken.value[1], () => proProvide.value.hashed, () => props.hashed]);

    const proConfigContextValue = useMemo(() => {
      return {
        ...proProvideValue.value!,
        valueTypeMap: props.valueTypeMap || proProvide.value.valueTypeMap,
        token: cacheToken.value[0],
        theme: tokenContext.theme.value as unknown as Theme<any, any>,
        hashed: props.hashed,
        hashId: hashId.value,
      };
    }, [
      () => proProvideValue.value,
      () => props.valueTypeMap,
      () => cacheToken.value[0],
      () => tokenContext.theme.value,
      () => props.hashed,
      () => hashId.value,
    ]);
    watch(
      () => locale?.value.locale,
      () => {
        dayjs.locale(locale?.value?.locale);
      },
      {
        immediate: true,
      }
    );

    const themeConfig = useMemo(() => {
      return {
        ...restConfig.theme?.value,
        hashed: props.hashed !== false && proProvide.value.hashed !== false && isNeedOpenHash(),
        hashId: hashId.value,
      };
    }, [
      () => restConfig.theme?.value,
      () => hashId.value,
      () => props.hashed,
      () => proProvide.value.hashed,
      () => isNeedOpenHash(),
    ]);
    useProConfigContextProvider(proConfigContextValue);
    return () => {
      const configProviderProps = {
        ...((Object.keys(restConfig) as Array<keyof typeof restConfig>).reduce(
          (prev, key) => {
            const temp = restConfig[key];
            if (isRef(temp)) {
              prev[key] = temp.value;
            } else {
              prev[key] = temp;
            }
            return prev;
          },
          {} as Record<keyof typeof restConfig, any>
        ) as UnwrapRef<typeof restConfig>),
        theme: themeConfig.value,
        prefixCls: getPrefixCls(),
      };
      return (
        <AntdConfigProvider {...configProviderProps}>
          {props.autoClearCache && <CacheClean />}
          {slots.default?.()}
        </AntdConfigProvider>
      );
    };
  },
});

export default ConfigProviderContainer;
