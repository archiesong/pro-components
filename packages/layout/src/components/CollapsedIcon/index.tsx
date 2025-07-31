import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import type { FunctionalComponent } from 'vue';

const CollapsedIcon: FunctionalComponent<{
  collapsed: boolean;
  tabIndex?: string | number;
}> = ({ collapsed, tabIndex }) =>
  collapsed ? <MenuUnfoldOutlined tabindex={tabIndex} /> : <MenuFoldOutlined tabindex={tabIndex} />;

export default CollapsedIcon;
