import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';

export interface GlobalFooterToken extends ProAliasToken {
  componentCls: string;
  probgLayout?: string;
}
const genGlobalFooterStyle: GenerateStyle<GlobalFooterToken> = (token) => {
  return {
    [token.componentCls]: {
      marginBlock: 0,
      marginBlockStart: 48,
      marginBlockEnd: 24,
      marginInline: 0,
      paddingBlock: 0,
      paddingInline: 16,
      textAlign: 'center',
      '&-list': {
        marginBlockEnd: 8,
        color: token.colorTextSecondary,
        '&-link': {
          color: token.colorTextSecondary,
          textDecoration: token.linkDecoration,
        },
        '*:not(:last-child)': {
          marginInlineEnd: 8,
        },
        '&:hover': {
          color: token.colorPrimary,
        },
      },
      '&-copyright': { fontSize: '14px', color: token.colorText },
    },
  };
};
export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProLayoutGlobalFooter', (token) => {
    const globalFooterToken: GlobalFooterToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    };
    return [genGlobalFooterStyle(globalFooterToken)];
  });
}
