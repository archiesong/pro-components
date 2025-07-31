import type { CSSProperties, FunctionalComponent, VNode } from 'vue';
import type { WithFalse } from '../../typing';
import { Layout } from 'ant-design-vue';
import { CopyrightOutlined } from '@ant-design/icons-vue';
import GlobalFooter from '../GlobalFooter';

const { Footer } = Layout;

const FooterView: FunctionalComponent<{
  links?: WithFalse<
    {
      key?: string;
      title: VNode;
      href: string;
      blankTarget?: boolean;
    }[]
  >;
  copyright?: WithFalse<string>;
  style?: CSSProperties;
  class?: string;
  prefixCls?: string;
}> = ({ class: className, style, links, prefixCls, copyright }) => {
  return (
    <Footer class={className} style={{ padding: 0, zIndex: 7, ...style }}>
      <GlobalFooter
        links={links}
        prefixCls={prefixCls}
        copyright={
          copyright !== false && (
            <>
              <CopyrightOutlined /> {copyright}
            </>
          )
        }
      />
    </Footer>
  );
};

export default FooterView;
