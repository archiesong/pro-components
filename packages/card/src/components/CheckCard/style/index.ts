import type { GenerateStyle, ProAliasToken } from '@antdv-next1/pro-provider'
import type { ComputedRef } from 'vue'
import { useStyle as useAntdStyle } from '@antdv-next1/pro-provider'
import { Keyframes } from '@antdv-next/cssinjs'

export interface ProCheckCardToken extends ProAliasToken {
  componentCls: string
}

function proCheckCardActive(token: ProCheckCardToken) {
  return {
    backgroundColor: token.colorPrimaryBg,
    borderColor: token.colorPrimary,
  }
}
function proCheckCardDisabled(token: ProCheckCardToken) {
  return {
    backgroundColor: token.colorBgContainerDisabled,
    borderColor: token.colorBorder,
    cursor: 'not-allowed',
    [`${token.componentCls}-meta`]: {
      [`&${token.antCls}-card-meta`]: {
        [`${token.antCls}-card-meta-detail`]: {
          [`${token.antCls}-card-meta-description`]: {
            color: token.colorTextDisabled,
          },
          [`${token.antCls}-card-meta-title`]: {
            color: token.colorTextDisabled,
          },
        },
        [`${token.antCls}-card-meta-avatar`]: {
          opacity: '0.25',
        },
      },
    },
  }
}

export const cardLoading = new Keyframes('card-loading', {
  '0%': { backgroundPosition: '0 50%' },
  '50%': { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0 50%' },
})

const genProCheckCardStyle: GenerateStyle<ProCheckCardToken> = (token) => {
  return {
    [token.componentCls]: {
      width: 320,
      boxSizing: 'border-box',
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
      transition: 'all 0.3s',
      verticalAlign: 'top',
      '&:not(:last-child)': {
        marginInlineEnd: token.margin,
        marginBlockEnd: token.margin,
      },
      '&-lg': {
        width: 440,
      },
      '&-sm': {
        width: 212,
      },
      '&&-checked': {
        [`&${token.antCls}-card`]: {
          ...proCheckCardActive(token),
          [`${token.antCls}-card-cover`]: {
            '&:after': {
              opacity: 1,
              border: `${token.borderRadius + 4}px solid ${token.colorPrimary}`,
              borderBlockEnd: `${token.borderRadius + 4}px  solid transparent`,
              borderInlineStart: `${token.borderRadius + 4}px  solid transparent`,
              borderStartEndRadius: `${token.borderRadius}px`,
            },
          },
          [`${token.antCls}-card-body`]: {
            '&:after': {
              opacity: 1,
              border: `${token.borderRadius + 4}px solid ${token.colorPrimary}`,
              borderBlockEnd: `${token.borderRadius + 4}px  solid transparent`,
              borderInlineStart: `${token.borderRadius + 4}px  solid transparent`,
              borderStartEndRadius: `${token.borderRadius}px`,
            },
          },
        },
      },
      [`&${token.antCls}-card`]: {
        boxSizing: 'border-box',
        [`${token.antCls}-card-cover`]: {
          paddingInline: token.paddingXXS,
          paddingBlock: token.paddingXXS,
          img: {
            display: 'flex',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: token.borderRadius,
          },
          '&:after': {
            content: '\'\'',
            position: 'absolute',
            insetBlockStart: 2,
            insetInlineEnd: 2,
            width: 0,
            height: 0,
            opacity: 0,
            transition: `all 0.3s ${token.motionEaseInOut}`,
            borderBlockEnd: `${token.borderRadius + 4}px  solid transparent`,
            borderInlineStart: `${token.borderRadius + 4}px  solid transparent`,
            borderStartEndRadius: `${token.borderRadius}px`,
          },
        },
        [`${token.antCls}-card-body`]: {
          paddingBlock: token.paddingMD,
          paddingInline: token.paddingSM,
          [`${token.componentCls}-meta`]: {
            [`&${token.antCls}-card-meta`]: {
              margin: 0,
              [`${token.antCls}-card-meta-avatar`]: {
                paddingInlineEnd: token.paddingXS,
              },
              [`${token.antCls}-card-meta-section`]: {
                '&>div:not(:last-child)': {
                  marginBottom: token.marginXXS,
                },
                [`${token.antCls}-card-meta-title`]: {
                  fontSize: token.fontSize,
                  fontWeight: 500,
                  [`${token.componentCls}-meta-header`]: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    lineHeight: token.lineHeight,
                    [`${token.componentCls}-meta-title`]: {
                      fontSize: token.fontSize,
                      fontWeight: 500,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      '&-with-ellipsis': {
                        display: 'inline-block',
                      },
                    },
                  },
                },
              },
              [`&${token.componentCls}-meta-avatar-header`]: {
                alignItems: 'center',
              },
              [`&${token.componentCls}-meta-extra-header`]: {
                [`${token.antCls}-card-meta-section`]: {
                  [`${token.antCls}-card-meta-title`]: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    overflow: 'unset',
                    fontSize: 'unset',
                    whiteSpace: 'normal',
                    textOverflow: 'unset',
                    lineHeight: token.lineHeight,
                    [`${token.componentCls}-meta-header`]: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: token.sizeSM,
                      minWidth: 0,
                      // [`${token.componentCls}-meta-title`]: {
                      //   display: 'inline-block',
                      //   overflow: 'hidden',
                      //   textOverflow: 'ellipsis',
                      //   whiteSpace: 'nowrap',
                      //   alignItems: 'center',
                      // },
                    },
                    [`${token.componentCls}-meta-title-extra`]: {
                      fontWeight: 'normal',
                    },
                  },
                },
              },
            },
          },
          '&:after': {
            content: '\'\'',
            position: 'absolute',
            insetBlockStart: 2,
            insetInlineEnd: 2,
            width: 0,
            height: 0,
            opacity: 0,
            transition: `all 0.3s ${token.motionEaseInOut}`,
            borderBlockEnd: `${token.borderRadius + 4}px  solid transparent`,
            borderInlineStart: `${token.borderRadius + 4}px  solid transparent`,
            borderStartEndRadius: `${token.borderRadius}px`,
          },
        },
      },
      '&:focus': proCheckCardActive(token),
      '&&-disabled,&&-checked&-disabled': proCheckCardDisabled(token),
      '&&[disabled]': proCheckCardDisabled(token),
      '&&-checked&&-disabled': {
        [`${token.antCls}-card-body`]: {
          '&:after': {
            position: 'absolute',
            insetBlockStart: 2,
            insetInlineEnd: 2,
            width: 0,
            height: 0,
            border: `${token.borderRadius + 4}px solid ${token.colorTextDisabled}`,
            borderBlockEnd: `${token.borderRadius + 4}px  solid transparent`,
            borderInlineStart: `${token.borderRadius + 4}px  solid transparent`,
            borderStartEndRadius: `${token.borderRadius}px`,
          },
        },
      },
      [`&&:not(${token.componentCls}-disabled)`]: {
        '&:hover': {
          borderColor: token.colorPrimary,
        },
      },
    },
  }
}

export function useStyle(prefixCls: ComputedRef<string>) {
  return useAntdStyle('ProCheckCard', (token) => {
    const proCheckCardToken: ProCheckCardToken = {
      ...token,
      componentCls: `.${prefixCls.value}`,
    }

    return [genProCheckCardStyle(proCheckCardToken)]
  })
}
