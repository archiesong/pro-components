import { App, ExtractPropTypes, DefineComponent, Plugin } from 'vue';
import { defineComponent } from 'vue';
import { Card } from 'ant-design-vue';
import { cardProps } from 'ant-design-vue/es/card/Card';
export const proCardProps = () => ({
  ...cardProps(),
});

export type ProCardProps = Partial<ExtractPropTypes<ReturnType<typeof proCardProps>>>;

const ProCard = defineComponent({
  name: 'ProCard',
  inheritAttrs: false,
  props: proCardProps(),
  setup(props, { slots, attrs }) {
    return () => {
      return <Card class={attrs.class}>{slots.default?.()}</Card>;
    };
  },
});

ProCard.install = (app: App) => {
  app.component(ProCard.name as string, ProCard);
  return app;
};
export default ProCard as DefineComponent<ProCardProps> & Plugin;
