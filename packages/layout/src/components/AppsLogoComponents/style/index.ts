import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';
import { genAppsLogoComponentsDefaultListStyle } from './default';
import { genAppsLogoComponentsSimpleListStyle } from './simple';
export interface AppsLogoComponentsToken extends ProAliasToken {
  componentCls: string;
}

const genAppsLogoComponentsStyle: GenerateStyle<AppsLogoComponentsToken> = (token) => {
  return {
    [`${token.antCls}-layout-sider, ${token.proComponentsCls}-top-nav-header, ${token.proComponentsCls}-global-header`]:
      {
        '&-dark': {
          [token.componentCls]: {
            '&-icon': {
              color: 'rgba(255, 255, 255, 0.85)',
              '&:hover': {
                color: 'rgba(255, 255, 255, 1)',
                backgroundColor: 'rgba(255,255,255, 0.05)',
              },
              '&-active': {
                color: 'rgba(255, 255, 255, 1)',
                backgroundColor: 'rgba(255,255,255, 0.05)',
              },
            },
            '&-item-title': {
              color: 'rgba(255, 255, 255, 0.88)',
            },
          },
        },
      },
    [token.componentCls]: {
      '&-wrapper': {

      },
      '&-icon': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInline: 4,
        paddingBlock: 0,
        fontSize: 14,
        lineHeight: '14px',
        height: 28,
        width: 28,
        cursor: 'pointer',
        color: token.layout?.colorTextAppListIcon,
        borderRadius: token.borderRadius,
        boxSizing: 'border-box',
        '&:hover': {
          color: token.layout?.colorTextAppListIconHover,
          backgroundColor: token.layout?.colorBgAppListIconHover,
        },
        '&-active': {
          color: token.layout?.colorTextAppListIconHover,
          backgroundColor: token.layout?.colorBgAppListIconHover,
        },
      },
      '&-item-title': {
        marginInlineStart: '16px',
        marginInlineEnd: '8px',
        marginBlockStart: 0,
        marginBlockEnd: '12px',
        fontWeight: 600,
        color: 'rgba(0, 0, 0, 0.88)',
        fontSize: 16,
        opacity: 0.85,
        lineHeight: 1.5,
        '&:first-child': {
          marginBlockStart: 12,
        },
      },
      '&-popover': {
        [`${token.antCls}-popover-arrow`]: {
          display: 'none',
        },
      },
      '&-simple': genAppsLogoComponentsSimpleListStyle(token),
      '&-default': genAppsLogoComponentsDefaultListStyle(token),
    },
  };
};

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('AppsLogoComponents', (token) => {
    const proCardToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    } as AppsLogoComponentsToken;

    return [genAppsLogoComponentsStyle(proCardToken)];
  });
}
