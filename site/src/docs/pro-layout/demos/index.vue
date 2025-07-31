<template>
  <template v-if="iframeName === 'basic'">
    <basic id="basic" />
  </template>
  <template v-else-if="iframeName === 'custom-footer'">
    <custom-footer id="custom-footer" />
  </template>
  <demo-sort v-else :cols="1">
    <basic />
    <custom-footer />
  </demo-sort>
</template>

<script lang="ts">
import {defineComponent, inject, provide } from "vue";
import CN from "../index.zh-CN.md";
import US from "../index.en-US.md";
import Basic from "./basic.vue";
import CustomFooter from "./custom-footer.vue";
import { getLocalizedPathname } from "@/utils/util";
import { GlobalConfig } from "@/App.vue";
import { GLOBAL_CONFIG } from "@/SymbolKey";
export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    CustomFooter,
  },
  props: {
    iframeName: String,
  },
  setup(props) {
    const globalConfig = inject<GlobalConfig>(GLOBAL_CONFIG);
    provide(
      "iframeDemo",
      !props.iframeName
        ? {
            basic: getLocalizedPathname(
              "/iframe/layout",
              globalConfig.isZhCN.value,
              {},
              {
                zhCN: "basic",
                enUS: "basic",
              },
            ).path,
            "custom-footer": getLocalizedPathname(
              "/iframe/layout",
              globalConfig.isZhCN.value,
              {},
              {
                zhCN: "custom-footer",
                enUS: "custom-footer",
              },
            ).path,
          }
        : {},
    );
  },
});
</script>
