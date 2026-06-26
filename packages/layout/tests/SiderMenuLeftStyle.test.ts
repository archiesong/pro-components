import { describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import { LEFT_MENU_SUB_WIDTH } from '../src/components/SiderMenu/leftMenu'
import { useStyle } from '../src/components/SiderMenu/style'

const capturedStyles = vi.hoisted(() => ({
  value: undefined as any,
}))

vi.mock('@antdv-next1/pro-provider', () => ({
  useStyle: (_name: string, styleFn: (token: Record<string, any>) => any) => {
    capturedStyles.value = styleFn({
      antCls: '.ant',
      proComponentsCls: '.ant-pro',
      colorBgContainer: '#fff',
      colorBgTextActive: 'rgba(0, 0, 0, 0.15)',
      colorBgTextHover: 'rgba(0, 0, 0, 0.06)',
      colorPrimary: '#1677ff',
      colorSplit: 'rgba(0, 0, 0, 0.06)',
      colorTextHeading: 'rgba(0, 0, 0, 0.88)',
      colorTextLightSolid: '#fff',
      colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
      borderRadius: 6,
      borderRadiusLG: 8,
      boxShadowSecondary: '0 6px 16px rgba(0, 0, 0, 0.08)',
      fontSize: 14,
      layout: {},
      opacityLoading: 0.45,
    })
    return {
      hashId: computed(() => 'layout-style-test-hash'),
      wrapSSR: (node: any) => node,
    }
  },
}))

describe('SiderMenu left layout styles', () => {
  it('hides unfixed secondary menu with width transition instead of translating into the primary rail', () => {
    useStyle(computed(() => 'ant-pro-sider'), {
      proLayoutCollapsedWidth: 64,
    })

    const siderStyle = capturedStyles.value[0]['.ant-pro-sider']
    const unfixedSubStyle = siderStyle['&-left-layout-sub-unfixed']['.ant-pro-sider-left-sub']
    const unfixedHoverSubStyle
      = siderStyle['&-left-layout-sub-unfixed']['&:has(.ant-pro-sider-left-primary-item-selected:hover) .ant-pro-sider-left-sub, & .ant-pro-sider-left-sub:hover']

    expect(unfixedSubStyle.width).toBe(0)
    expect(unfixedSubStyle.flexBasis).toBe(0)
    expect(unfixedSubStyle.paddingInline).toBe(0)
    expect(unfixedSubStyle.transform).toBeUndefined()
    expect(unfixedSubStyle.transition).toContain('width .3s')
    expect(unfixedHoverSubStyle.width).toBe(LEFT_MENU_SUB_WIDTH)
    expect(unfixedHoverSubStyle.flexBasis).toBe(LEFT_MENU_SUB_WIDTH)
  })
})
