import type { App, DefineComponent, Plugin } from 'vue';
import type { ProTableProps } from './proTableProps';
import type { ErrorBoundaryRender } from './RenderTypings';
import type { ProColumnType, ProColumns } from './typing';
import { defineComponent, Fragment } from 'vue';
import { TableSummary } from 'ant-design-vue';
import { proTableProps } from './proTableProps';
import ProTable from './Table';
import { useTableContextProvider, useContainer } from './Store/Provide';
import { ErrorBoundary, getSlot } from '@ant-design-vue/pro-utils';
import ProConfigProvider from '@ant-design-vue/pro-provider';
/**
 * 🏆 Use Ant Design Vue Table like a Pro! 更快 更好 更方便
 *
 */
const ProviderTableContainer = defineComponent({
  name: 'ProviderTableContainer',
  inheritAttrs: false,
  props: proTableProps(),
  setup(props, { slots, attrs }) {
    useTableContextProvider(useContainer(props));
    return () => {
      const errorBoundaryRender = getSlot<ErrorBoundaryRender>(slots, props, 'errorBoundaryRender');
      const ErrorComponent = (
        props.errorBoundaryRender === false ? Fragment : errorBoundaryRender || ErrorBoundary
      ) as typeof Fragment;
      return (
        <ProConfigProvider>
          <ErrorComponent>
            <ProTable {...props} {...attrs} v-slots={slots} />
          </ErrorComponent>
        </ProConfigProvider>
      );
    };
  },
});

ProviderTableContainer.Summary = TableSummary;

ProviderTableContainer.install = (app: App) => {
  app.component(TableSummary.name, TableSummary);
  app.component(ProviderTableContainer.name as string, ProviderTableContainer);
  return app;
};

export { proTableProps };

export type { ProTableProps, ProColumnType, ProColumns };

export default ProviderTableContainer as DefineComponent<ProTableProps> & Plugin;
