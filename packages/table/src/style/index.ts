import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { cssinjs } from 'ant-design-vue';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}
const { Keyframes } = cssinjs;

export const turn = new Keyframes('turn', {
  '0%': { transform: 'rotate(0deg)' },
  '25%': { transform: 'rotate(90deg)' },
  '50%': { transform: 'rotate(180deg)' },
  '75%': { transform: 'rotate(270deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const genProListStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      zIndex: 1,
      '& &-search': {
        marginBlockEnd: '16px',
        background: token.colorBgContainer,
      },
    },
  };
};
export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProTable', (token) => {
    const proListToken: ProListToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    };

    return [genProListStyle(proListToken)];
  });
}
