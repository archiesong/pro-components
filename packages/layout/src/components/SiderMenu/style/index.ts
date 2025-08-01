import type { ComputedRef } from 'vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { Keyframes } from 'ant-design-vue';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';

export interface SiderMenuToken extends ProAliasToken {
  componentCls: string;
  proLayoutCollapsedWidth: number;
}
export const proLayoutTitleHide = new Keyframes('antBadgeLoadingCircle', {
  '0%': { display: 'none', opacity: 0, overflow: 'hidden' },
  '80%': {
    overflow: 'hidden',
  },
  '100%': {
    display: 'unset',
    opacity: 1,
  },
});
const genSiderMenuStyle: GenerateStyle<SiderMenuToken> = (token) => {
  return {
    [token.componentCls]: {
      [`&${token.antCls}-layout-sider`]: {
        zIndex: 10,
        [`&${token.componentCls}-light`]: {
          boxShadow: '2px 0 8px rgba(29, 35, 41, .05)',
          [`&${token.componentCls}-mix`]: {
            zIndex: 9,
          },
          [`& ${token.antCls}-layout-sider-children`]: {
            '& ::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,.12)',
              borderRadius: 3,
              boxShadow: 'inset 0 0 5px rgba(0,21,41,.05)',
            },
            '& ::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(0,0,0,.06)',
              borderRadius: 3,
              boxShadow: 'inset 0 0 5px rgba(0,21,41,.05)',
            },
          },
        },
        [`&${token.componentCls}-dark`]: {
          [`${token.componentCls}-logo`]: {
            color: 'rgba(255,255,255,0.85)',
            '> a': {
              '> h1': {
                color: 'rgba(255,255,255,0.85)',
              },
            },
          },
          [`${token.componentCls}-actions`]: {
            color: 'rgba(255,255,255,0.85)',
          },
        },
      },
      [`& ${token.antCls}-layout-sider-children`]: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '& ::-webkit-scrollbar': {
          width: 6,
          height: 6,
        },
        '& ::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: 3,
          boxShadow: 'inset 0 0 5px rgba(255,255,255,.05)',
        },
        '& ::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: 3,
          boxShadow: 'inset 0 0 5px rgba(37,37,37,.05)',
        },
        [`${token.componentCls}-collapsed-button`]: {
          [`& ${token.antCls}-menu-light`]: {
            borderInlineEnd: 'none',
          },
        },
      },
      '&-logo': {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: 8,
        paddingBlock: 16,
        color: token.layout?.sider?.colorTextMenu,
        cursor: 'pointer',
        '> a': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 32,
          fontSize: 32,
          '> img': {
            display: 'inline-block',
            height: 32,
            verticalAlign: 'middle',
            transition: 'height 0.2s',
          },
          '> svg': {
            fontSize: 32,
          },
          '> img + h1, > svg+ h1': {
            marginInlineStart: 10,
          },
          '> h1': {
            display: 'inline-block',
            height: 32,
            marginBlock: 0,
            marginInlineEnd: 0,
            color: token.layout?.sider?.colorTextMenuTitle,
            animationName: proLayoutTitleHide,
            animationDuration: '.4s',
            animationTimingFunction: 'ease',
            fontWeight: 600,
            fontSize: 18,
            lineHeight: '32px',
            verticalAlign: 'middle',
          },
        },
        '&-collapsed': {
          flexDirection: 'column-reverse',
          margin: 0,
          padding: 12,
          [`${token.proComponentsCls}-layout-apps-icon`]: {
            marginBlockEnd: 8,
            fontSize: 16,
            transition: 'font-size 0.2s ease-in-out,color 0.2s ease-in-out',
          },
        },
      },
      '&-actions': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBlock: 4,
        marginInline: 0,
        color: token.layout?.sider?.colorTextMenu,
        '&-collapsed': {
          flexDirection: 'column-reverse',
          paddingBlock: 0,
          paddingInline: 8,
          fontSize: 16,
          transition: 'font-size 0.3s ease-in-out',
        },
        '&-list': {
          color: token.layout?.sider?.colorTextMenuSecondary,
          '&-collapsed': {
            marginBlockEnd: 8,
            animationName: 'none',
          },
          '&-item': {
            paddingInline: 6,
            paddingBlock: 6,
            lineHeight: '16px',
            fontSize: 16,
            cursor: 'pointer',
            borderRadius: token.borderRadius,
            '&:hover': {
              background: token.colorBgTextHover,
            },
          },
        },
        '&-avatar': {
          fontSize: 14,
          paddingInline: 8,
          paddingBlock: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          borderRadius: token.borderRadius,
          '& *': {
            cursor: 'pointer',
          },
          '&:hover': {
            background: token.colorBgTextHover,
          },
        },
      },
      '&-extra': {
        marginBlockEnd: 16,
        marginBlock: 0,
        marginInline: 16,
        '&-no-logo': {
          marginBlockStart: 16,
        },
      },
      '&-links': {
        width: '100%',
      },
      '&-footer': {
        color: token.layout?.sider?.colorTextMenuSecondary,
        paddingBlockEnd: 16,
        fontSize: token.fontSize,
        animationName: proLayoutTitleHide,
        animationDuration: '.3s',
        animationTimingFunction: 'ease',
      },
      [`&&-mix${token.antCls}-layout-sider`]: {
        insetBlockStart: `${token.layout?.header?.heightLayoutHeader || 56}px`,
      },
    },
    [`${token.componentCls}${token.componentCls}-fixed`]: {
      position: 'fixed',
      insetBlockStart: 0,
      insetInlineStart: 0,
      zIndex: 99,
      height: '100%',
      '&-mix': {
        height: `calc(100% - ${token.layout?.header?.heightLayoutHeader || 56}px)`,
      },
    },
  };
};

export function useStyle(
  prefixCls: ComputedRef<string>,
  {
    proLayoutCollapsedWidth,
  }: {
    proLayoutCollapsedWidth: number;
  }
) {
  return useAntdStyle('ProLayoutSiderMenu', (token) => {
    const siderMenuToken: SiderMenuToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
      proLayoutCollapsedWidth,
    };

    return [genSiderMenuStyle(siderMenuToken)];
  });
}
