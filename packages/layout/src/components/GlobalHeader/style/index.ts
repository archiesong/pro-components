import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';
export interface GlobalHeaderToken extends ProAliasToken {
  componentCls: string;
}

const genGlobalHeaderStyle: GenerateStyle<GlobalHeaderToken> = (token) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      paddingBlock: 0,
      paddingInline: 16,
      height: token.layout?.header?.heightLayoutHeader || 56,
      boxSizing: 'border-box',
      '&-light': {
        backgroundColor: token.layout?.header?.colorBgHeader || token.colorBgContainer,
        boxShadow: '0 1px 4px rgba(0, 21, 41, 0.12)',
      },
      '&-dark': {
        [`${token.componentCls}-logo`]: {
          h1: {
            color: 'rgba(255,255,255,0.85)',
          },
        },
      },
      '&-realDark': {
        backgroundColor: token.layout?.header?.colorBgHeader || token.colorBgContainer,
      },
      '> a': {
        height: '100%',
      },
      [`${token.proComponentsCls}-layout-apps-icon`]: {
        marginInlineEnd: 16,
      },
      '&-collapsed-button': {
        minHeight: 22,
        color: token?.layout?.header?.colorHeaderTitle,
        fontSize: 18,
      },
      '&-logo': {
        position: 'relative',
        marginInlineEnd: 16,
        a: {
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          minHeight: 22,
          fontSize: 20,
        },
        svg: {
          fontSize: 28,
        },
        img: { height: 28 },
        h1: {
          marginBlock: 0,
          marginInlineEnd: 0,
          marginInlineStart: 12,
          fontWeight: '600',
          color: token.layout?.header?.colorHeaderTitle || token.colorTextHeading,
          fontSize: 16,
          lineHeight: '24px',
        },
        '&-mix': {
          display: 'flex',
          alignItems: 'center',
        },
      },
      '&-logo-mobile': {
        minWidth: 24,
        marginInlineEnd: 0,
      },
    },
  };
};

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProLayoutGlobalHeader', (token) => {
    const GlobalHeaderToken: GlobalHeaderToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    };

    return [genGlobalHeaderStyle(GlobalHeaderToken)];
  });
}
