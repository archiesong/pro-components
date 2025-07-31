import { VueNode } from 'ant-design-vue/lib/_util/type';
import { WithFalse } from './typing';
export type ErrorBoundaryRender = WithFalse<(error: Error, info: string) => VueNode>;
