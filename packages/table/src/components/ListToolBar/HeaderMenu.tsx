import { Key, VueNode } from 'ant-design-vue/es/_util/type';

export type ListToolBarMenuItem = {
  key: Key;
  label: VueNode;
  disabled?: boolean;
};
export type ListToolBarHeaderMenuProps = {
  type?: 'inline' | 'dropdown' | 'tab';
  activeKey?: Key;
  defaultActiveKey?: Key;
  items?: ListToolBarMenuItem[];
  onChange?: (activeKey?: Key) => void;
  prefixCls?: string;
};
