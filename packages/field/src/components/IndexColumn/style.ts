import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';

export interface FieldIndexColumnToken extends ProAliasToken {
  componentCls: string;
}
export const genFieldIndexColumnStyle: GenerateStyle<FieldIndexColumnToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 18,
      height: 18,
      '&-border': {
        color: '#fff',
        fontSize: 12,
        lineHeight: '12px',
        backgroundColor: '#314659',
        borderRadius: 9,
        '&.top-three': {
          backgroundColor: '#979797',
        },
      },
    },
  };
};
export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('FieldIndexColumn', (token) => {
    const fieldIndexColumnToken: FieldIndexColumnToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    };

    return [genFieldIndexColumnStyle(fieldIndexColumnToken)];
  });
}
