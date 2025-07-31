import type { FunctionalComponent } from 'vue';
import type { SpinProps } from 'ant-design-vue';
import { Spin } from 'ant-design-vue';
const PageLoading: FunctionalComponent<
  SpinProps & {
    [key: string]: any;
  }
> = ({ isLoading, pastDelay, timedOut, error, retry, ...reset }) => {
  return (
    <div style={{ paddingBlockStart: '100px', textAlign: 'center' }}>
      <Spin size="large" {...reset} />
    </div>
  );
};
PageLoading.displayName = 'PageLoading';
PageLoading.inheritAttrs = false;
export default PageLoading;
