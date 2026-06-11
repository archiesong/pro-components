import type { CSSProperties, FunctionalComponent, VNode } from 'vue'
import type { WithFalse } from '../../typing'
import { CopyrightOutlined } from '@antdv-next/icons'
import { LayoutFooter } from 'antdv-next'
import GlobalFooter from '../GlobalFooter'

export interface FooterProps {
  links?: WithFalse<
    {
      key?: string
      title: VNode
      href: string
      blankTarget?: boolean
    }[]
  >
  copyright?: WithFalse<string>
  style?: CSSProperties
  class?: string
  prefixCls?: string
}

const FooterView: FunctionalComponent<FooterProps> = ({ class: className, style, links, prefixCls, copyright }) => (
  <LayoutFooter class={className} style={{ padding: 0, zIndex: 7, ...style }}>
    <GlobalFooter
      links={links}
      prefixCls={prefixCls}
      copyright={
        copyright !== false && (
          <>
            <CopyrightOutlined />
            {' '}
            {copyright}
          </>
        )
      }
    />
  </LayoutFooter>
)
FooterView.displayName = 'Footer'
FooterView.inheritAttrs = false

export default FooterView
