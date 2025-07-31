import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';

export interface ProFormToken extends ProAliasToken {
  componentCls: string;
}

const genProFormStyle: GenerateStyle<ProFormToken> = (token) => {
  return {
    [token.componentCls]: {
      [`> div:not(${token.proComponentsCls}-form-light-filter)`]: {
        '.pro-field': {
          maxWidth: '100%',
          '@media screen and (max-width: 575px)': {
            // 减少了 form 的 padding
            maxWidth: 'calc(93vw - 48px)',
          },
          // 适用于短数字，短文本或者选项
          '&-xs': {
            width: 104,
          },
          '&-s': {
            width: 216,
          },
          // 适用于较短字段录入、如姓名、电话、ID 等。
          '&-sm': {
            width: 216,
          },
          '&-m': {
            width: 328,
          },
          // 标准宽度，适用于大部分字段长度
          '&-md': {
            width: 328,
          },
          '&-l': {
            width: 440,
          },
          // 适用于较长字段录入，如长网址、标签组、文件路径等。
          '&-lg': {
            width: 440,
          },
          // 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
          '&-xl': {
            width: 552,
          },
        },
      },
    },
  };
};

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProForm', (token) => {
    const proFormToken: ProFormToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    };

    return [genProFormStyle(proFormToken)];
  });
}
