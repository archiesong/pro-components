import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';

export interface ProQueryFilterToken extends ProAliasToken {
  componentCls: string;
}

const genProQueryFilterStyle: GenerateStyle<ProQueryFilterToken> = (token) => {
  return {
    [token.componentCls]: {
      '&&': {
        padding: 24,
      },
      [`${token.antCls}-form-item`]: {
        marginBlock: 0,
      },
      [`${token.proComponentsCls}-form-group-title`]: {
        marginBlock: 0,
      },
      '&-row': {
        rowGap: 24,
        '&-split': {
          [`${token.proComponentsCls}-form-group`]: {
            display: 'flex',
            alignItems: 'center',
            gap: token.marginXS,
          },
          '&:last-child': {
            marginBlockEnd: 12,
          },
        },
        '&-split-line': {
          '&:after': {
            position: 'absolute',
            width: '100%',
            content: '""',
            height: 1,
            insetBlockEnd: -12,
            borderBlockEnd: `1px dashed ${token.colorSplit}`,
          },
        },
      },
      '&-collapse-button': {
        display: 'flex',
        alignItems: 'center',
        color: token.colorPrimary,
      },
    },
  };
};

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('QueryFilter', (token) => {
    const proQueryFilterToken: ProQueryFilterToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    };

    return [genProQueryFilterStyle(proQueryFilterToken)];
  });
}
