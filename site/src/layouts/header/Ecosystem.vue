<template>
  <a-menu class="ecosystem">
    <a-menu-item key="design">
      <router-link :to="getLocalizedPathname('/docs/vue/download/', isZhCN)">
        {{ isZhCN ? '设计资源' : 'Design Resources' }}
      </router-link>
    </a-menu-item>
    <a-menu-item key="vscode">
      <a
        target="_blank"
        href="https://marketplace.visualstudio.com/items?itemName=ant-design-vue.vscode-ant-design-vue-helper"
      >
        VS Code Extension
      </a>
    </a-menu-item>
    <a-menu-item key="awesome">
      <a target="_blank" href="https://github.com/vueComponent/ant-design-vue-awesome">Awesome</a>
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import type { GlobalConfig } from '../../App.vue';
import { GLOBAL_CONFIG } from '../../SymbolKey';
import { getLocalizedPathname } from '../../utils/util';

export default defineComponent({
  props: {
    isRTL: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const downstyle = computed(() => (props.isRTL ? '-1px 2px 0 0' : '-1px 0 0 2px'));
    return {
      downstyle,
      isZhCN: inject<GlobalConfig>(GLOBAL_CONFIG).isZhCN.value,
      getLocalizedPathname,
    };
  },
});
</script>
<style scoped>
.ecosystem a {
  color: rgba(0, 0, 0, 0.65);
}
</style>
