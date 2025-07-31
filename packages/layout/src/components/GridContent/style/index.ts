import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';

export interface GridContentToken extends ProAliasToken {
  componentCls: string;
}

const genGridContentStyle: GenerateStyle<GridContentToken> = (token) => {
  return {
    [token.componentCls]: {
      width: '100%',
      '&-wide': {
        maxWidth: 1152,
        margin: '0 auto',
      },
    },
  };
};

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProLayoutGridContent', (token) => {
    const GridContentToken: GridContentToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    };

    return [genGridContentStyle(GridContentToken)];
  });
}
