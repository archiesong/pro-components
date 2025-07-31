import { VueNode } from 'ant-design-vue/es/_util/type';
import { WithFalse } from './typing';
export type ErrorBoundaryRender = WithFalse<(error: Error, info: string) => VueNode>;
