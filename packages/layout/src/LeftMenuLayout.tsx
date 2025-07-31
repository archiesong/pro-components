import { defineComponent } from 'vue';
import { proLayoutProps } from './proLayoutProps';

const LeftMenuLayout = defineComponent({
  name: 'LeftMenuLayout',
  inheritAttrs: false,
  props: proLayoutProps(),
  setup(props, { slots, attrs }) {
    return () => {
      return <div>LeftMenuLayout</div>;
    };
  },
});
export default LeftMenuLayout;
