import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'

export interface ProDragSortTableToken extends ProAliasToken {
  componentCls: string
}

const genProDragSortTableStyle: GenerateStyle<ProDragSortTableToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-icon': {
        marginInlineEnd: 8,
        color: token.colorTextSecondary,
        cursor: 'grab !important',
        padding: 4,
        fontSize: 12,
        borderRadius: token.borderRadius,
        '&:hover': {
          color: token.colorText,
          backgroundColor: token.colorInfoBg,
        },
      },
      [`${token.antCls}-table-wrapper`]: {
        [`${token.antCls}-table`]: {
          '&-tbody': {
            [`${token.antCls}-table-row`]: {
              [`${token.antCls}-table-cell`]: {
                // ['&.']:{
                //   borderBlockEnd: '1px solid #ccc',
                // }
              },
            },
          },
        },
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProDragSortTable', (token) => {
    const proDragSortTableToken: ProDragSortTableToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }
    return [genProDragSortTableStyle(proDragSortTableToken)]
  })
}
