import type { ComputedRef } from 'vue';
import type { ProAliasToken, GenerateStyle } from '@ant-design-vue/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';
export interface ProLayoutHeaderToken extends ProAliasToken {
  componentCls: string;
  proLayoutCollapsedWidth: number;
}
export function useStylish(
  prefixCls: ComputedRef<string>,
  {
    stylish,
    proLayoutCollapsedWidth,
  }: {
    stylish?: ComputedRef<GenerateStyle<ProLayoutHeaderToken>>;
    proLayoutCollapsedWidth: ComputedRef<number>;
  }
) {
  return useAntdStyle('ProLayoutHeaderStylish', (token) => {
    const stylishToken: ProLayoutHeaderToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
      proLayoutCollapsedWidth: proLayoutCollapsedWidth.value,
    };
    if (!stylish?.value) return [];

    return [
      {
        [`div${token.proComponentsCls}-basicLayout`]: {
          [`${stylishToken.componentCls}`]: stylish.value?.(stylishToken),
        },
      },
    ];
  });
}
