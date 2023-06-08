import type { App, DefineComponent, Plugin } from 'vue';
import { defineComponent } from 'vue';

export type ProLayoutProps = {
  isMobile: boolean;
};
const ProLayout = defineComponent({
  name: 'ProLayout',
  inheritAttrs: false,
  setup(props) {
    console.log(props);
    return () => {
      return <>sadsa</>;
    };
  },
});

ProLayout.install = (app: App) => {
  app.component(ProLayout.name, ProLayout);
  return app;
};

export default ProLayout as DefineComponent<ProLayoutProps> & Plugin;
