import type { ComputedRef } from 'vue';
import type { MenuMode } from 'ant-design-vue';
import type { GenerateStyle, ProAliasToken } from '@ant-design-vue/pro-provider';
import { useStyle as useAntdStyle } from '@ant-design-vue/pro-provider';

export interface ProLayoutBaseMenuToken extends ProAliasToken {
  componentCls: string;
}

const genProLayoutBaseMenuStyle: GenerateStyle<ProLayoutBaseMenuToken> = (
  token,
  mode: MenuMode
) => {
  return {
    [`${token.componentCls}${token.antCls}-menu`]: {
      [`${token.antCls}-menu-item-group`]: {
        '&-title': {
          paddingInlineStart: 8,
          [`${token.iconCls}`]: {
            marginInlineEnd: 10,
          },
        },
      },
    },
    [`${token.proComponentsCls}-drawer-sider`]: {
      [`${token.componentCls}${token.proComponentsCls}-sider-menu${token.antCls}-menu-light${token.antCls}-menu-root`]:
        {
          borderInlineEnd: 'none',
        },
    },
    ...(mode.includes('horizontal')
      ? {
          [`${token.componentCls}${token.antCls}-menu-light`]: {
            borderBlockEnd: 'none',
          },
        }
      : {
          [`${token.componentCls}${token.proComponentsCls}-sider-menu${token.antCls}-menu-light${token.antCls}-menu-root`]:
            {
              borderInlineEnd: 'none',
            },
        }),
  };
};

export function useStyle(prefixCls: ComputedRef<string>, mode?: MenuMode) {
  return useAntdStyle(
    'ProLayoutBaseMenu' + (mode || 'inline').charAt(0).toUpperCase() + (mode || 'inline').slice(1),
    (token) => {
      const proLayoutMenuToken: ProLayoutBaseMenuToken = {
        ...token,
        componentCls: `.${prefixCls.value}`,
      };
      return [genProLayoutBaseMenuStyle(proLayoutMenuToken, mode || 'inline')];
    }
  );
}
