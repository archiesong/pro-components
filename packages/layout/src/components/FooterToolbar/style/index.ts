import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';

export interface FooterToolBarToken extends ProAliasToken {
  componentCls: string;
}

const genFooterToolBarStyle: GenerateStyle<FooterToolBarToken> = (token) => {
  return {
    [token.componentCls]: {
      position: 'fixed',
      insetInlineEnd: 0,
      bottom: 0,
      zIndex: 8,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      paddingInline: 24,
      paddingBlock: 0,
      boxSizing: 'border-box',
      lineHeight: '44px',
      backgroundColor: token.colorBgElevated,
      borderBlockStart: `1px solid ${token.colorSplit}`,
      boxShadow: token.boxShadowSecondary,
      transition: 'width 0.2s',
      '&-left': {
        flex: 1,
      },
      '&-right': {
        '> *': {
          marginInlineEnd: 8,
          '&:last-child': {
            marginBlock: 0,
            marginInline: 0,
          },
        },
      },
    },
  };
};

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProLayoutFooterToolbar', (token) => {
    const proCardToken: FooterToolBarToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    };

    return [genFooterToolBarStyle(proCardToken)];
  });
}
