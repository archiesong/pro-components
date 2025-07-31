import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';

export interface ProLayoutHeaderToken extends ProAliasToken {
  componentCls: string;
}

const genProLayoutHeaderStyle: GenerateStyle<ProLayoutHeaderToken> = (token) => {
  return {
    [`${token.componentCls}`]: {
      [`&${token.antCls}-layout-header`]: {
        height: token?.layout?.header?.heightLayoutHeader || 56,
        lineHeight: `${token?.layout?.header?.heightLayoutHeader || 56}px`,
        zIndex: 9,
        paddingBlock: 0,
        paddingInline: 0,
        transition: 'width .2s',
      },
      [`&-fixed${token.antCls}-layout-header`]: {
        position: 'fixed',
        insetBlockStart: 0,
        insetInlineEnd: 0,
      },
      '&-actions': {
        display: 'flex',
        alignItems: 'center',
        fontSize: 16,
        cursor: 'pointer',
        '& &-item': {
          paddingBlock: 0,
          paddingInline: 8,
          '&:hover': {
            color: token.colorText,
          },
        },
      },
    },
    '&-mix': {
      [`${token.componentCls}`]: {
        [`&${token.antCls}-layout-header`]: {
          zIndex: 99,
        },
      },
    },
  };
};

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProLayoutHeader', (token) => {
    const ProLayoutHeaderToken: ProLayoutHeaderToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    };
    return [genProLayoutHeaderStyle(ProLayoutHeaderToken)];
  });
}
