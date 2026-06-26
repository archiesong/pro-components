import type { ConfigComponentProps as AntdConfigComponentProps } from 'antdv-next/dist/config-provider/context'
import type { CSSProperties, Ref } from 'vue'
import { useComponentBaseConfig as AntdUseComponentBaseConfig } from 'antdv-next/dist/config-provider/context'

interface ComponentBaseProps {
  rootClass?: string
  prefixCls?: string
}

interface ConfigComponentProps extends AntdConfigComponentProps {
  listy?: {
    class?: string
    style?: CSSProperties
  }
}
type UseComponentBaseConfigReturn<
  T extends keyof ConfigComponentProps,
>
  = ConfigComponentProps[T] extends infer P
    ? {
        [K in keyof P]-?: Ref<P[K]>
      }
    : never
export function useComponentBaseConfig<
  T extends keyof ConfigComponentProps,
  K extends keyof NonNullable<ConfigComponentProps[T]> = keyof NonNullable<ConfigComponentProps[T]>,
>(propName: T, props?: ComponentBaseProps, keys?: readonly K[], suffixCls?: string): UseComponentBaseConfigReturn<T> {
  const config = AntdUseComponentBaseConfig(propName as keyof AntdConfigComponentProps, props, keys as keyof NonNullable<AntdConfigComponentProps[keyof AntdConfigComponentProps]>, suffixCls)

  return config as typeof config & UseComponentBaseConfigReturn<T>
}
