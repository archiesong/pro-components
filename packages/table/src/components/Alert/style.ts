import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { setAlpha, useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';

export interface ProToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ProToken> = (token) => {
  return {
    [token.componentCls]: {
      marginBlockEnd: 16,
      backgroundColor: setAlpha(token.colorTextBase, 0.02),
      borderRadius: token.borderRadius,
      border: 'none',
      '&-container': {
        paddingBlock: token.paddingSM,
        paddingInline: token.paddingLG,
      },
      '&-info': {
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s',
        color: token.colorTextTertiary,
        '&-content': {
          flex: 1,
        },
        '&-option': {
          minWidth: 48,
          paddingInlineStart: 16,
        },
      },
    },
  };
};

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProTableAlert', (token) => {
    const proToken: ProToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    };

    return [genProStyle(proToken)];
  });
}
