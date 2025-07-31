import { VueNode } from 'ant-design-vue/es/_util/type';

export type SizeType = 'small' | 'middle' | 'large' | undefined;

export type LightWrapperProps = {
  label?: VueNode;
  disabled?: boolean;
  placeholder?: VueNode;
  size?: SizeType;
  light?: boolean;
};
