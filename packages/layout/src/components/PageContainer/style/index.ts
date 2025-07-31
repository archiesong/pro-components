import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';
export interface PageContainerToken extends ProAliasToken {
  componentCls: string;
}
const [sm, md, lg, xl] = [576, 768, 992, 1200].map((bp) => `@media (max-width: ${bp}px)`);

const genPageContainerStyle: GenerateStyle<PageContainerToken> = (token) => {
  return {
    // [`${token.proComponentsCls}-basicLayout-realDark`]: {
    //   [token.componentCls]: {
    //     '&-wrap': {
    //       backgroundColor: '#242525',
    //     },
    //   },
    // },
    [token.componentCls]: {
      position: 'relative',
      '&-wrap': {
        backgroundColor: token.colorBgContainer,
        '&-page-header': {
          [`&-wide${token.antCls}-page-header`]: {
            maxWidth: 1152,
            margin: '0 auto',
          },
        },
      },
      '&-children-content': {
        paddingBlockStart: token.layout?.pageContainer?.paddingBlockPageContainerContent,
        paddingBlockEnd: token.layout?.pageContainer?.paddingBlockPageContainerContent,
        paddingInline: token.layout?.pageContainer?.paddingInlinePageContainerContent,
      },
      '&-affix': {
        [`${token.antCls}-affix`]: {
          [`${token.componentCls}-warp`]: {
            backgroundColor: token.layout?.pageContainer?.colorBgPageContainerFixed,
            transition: 'background-color 0.3s',
            boxShadow: '0 2px 8px #f0f1f2',
          },
        },
      },
      '&-detail': {
        display: 'flex',
        [sm]: {
          display: 'block',
        },
      },
      '&-main': {
        width: '100%',
      },
      '&-row': {
        display: 'flex',
        width: '100%',
        [md]: {
          display: 'block',
        },
      },
      '&-content': {
        flex: 'auto',
        width: '100%',
      },
      '&-extraContent': {
        flex: '0 1 auto',
        minWidth: 242,
        marginInlineStart: 88,
        textAlign: 'end',
        [xl]: {
          marginInlineStart: 44,
        },
        [lg]: {
          marginInlineStart: 20,
        },
        [md]: {
          marginInlineStart: 0,
          textAlign: 'start',
        },
        [sm]: {
          marginInlineStart: 0,
        },
      },
    },
  };
};

export type pageContainerToken = {
  paddingInlinePageContainerContent?: number;
  paddingBlockPageContainerContent?: number;
};

export function useStyle(
  prefixCls: ComputedRef<string>,
  componentsToken: ComputedRef<pageContainerToken | undefined>
) {
  return useAntdStyle('ProLayoutPageContainer', (token) => {
    const proCardToken: PageContainerToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
      layout: {
        ...token?.layout,
        pageContainer: {
          ...token?.layout?.pageContainer,
          ...componentsToken.value,
        },
      },
    };
    return [genPageContainerStyle(proCardToken)];
  });
}
