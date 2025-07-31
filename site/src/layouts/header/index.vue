<template>
  <header id="header" :class="headerClassName">
    <a-row :style="{ flexFlow: 'nowrap', height: 64, position: 'relative' }">
      <a-col v-bind="colProps[0]">
        <Logo />
      </a-col>
      <a-col v-bind="colProps[1]" class="menu-row">
        <SearchBox
          key="search"
          :is-zh-c-n="isZhCN"
          :responsive="responsive"
          @triggerFocus="onTriggerSearching"
        />
        <Menu v-if="!isMobile" />
      </a-col>
      <a-popover
        v-model:open="menuOpen"
        overlay-class-name="popover-menu"
        placement="bottomRight"
        trigger="click"
        arrow-point-at-center
      >
        <UnorderedListOutlined class="nav-phone-icon" />
        <template #content>
          <Menu :is-mobile="isMobile" />
        </template>
      </a-popover>
    </a-row>
  </header>
</template>
<script lang="ts">
import type { GlobalConfig } from "../../App.vue";
import { GLOBAL_CONFIG } from "../../SymbolKey";
import { getLocalizedPathname } from "../../utils/util";
import { computed, defineComponent, inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Logo from "./Logo.vue";
import Menu from "./Menu.vue";
import { UnorderedListOutlined } from "@ant-design/icons-vue";
import SearchBox from "./SearchBox.vue";
export default defineComponent({
  components: {
    Logo,
    Menu,
    UnorderedListOutlined,
    SearchBox,
    // CloseOutlined,
  },
  setup() {
    const route = useRoute();
    const cancelButtonProps: any = {
      style: { display: "none" },
    };
    const globalConfig = inject<GlobalConfig>(GLOBAL_CONFIG);
    const isHome = computed(() => {
      return ["", "index", "index-cn"].includes(route.path);
    });

    const menuOpen = ref(false);
    const colProps = isHome.value
      ? [{ flex: "none" }, { flex: "auto" }]
      : [
          {
            xxxl: 4,
            xxl: 4,
            xl: 5,
            lg: 6,
            md: 6,
            sm: 24,
            xs: 24,
          },
          {
            xxxl: 20,
            xxl: 20,
            xl: 19,
            lg: 18,
            md: 18,
            sm: 0,
            xs: 0,
          },
        ];
    const searching = ref(false);
    const onTriggerSearching = (value: boolean) => {
      searching.value = value;
    };
    const initDocSearch = () => {
      window.docsearch({
        apiKey: "92003c1d1d07beef165b08446f4224a3",
        indexName: "antdv",
        inputSelector: "#search-box input",
        algoliaOptions: {
          facetFilters: [`tags:${globalConfig.isZhCN.value ? "cn" : "en"}`],
        },
        transformData(hits: any[]) {
          hits.forEach((hit) => {
            hit.url = hit.url.replace("www.antdv.com", window.location.host);
            hit.url = hit.url.replace("https:", window.location.protocol);
          });
          return hits;
        },
        debug: false, // Set debug to true if you want to inspect the dropdown
      });
    };
    onMounted(() => {
      setTimeout(() => {
        initDocSearch();
      });
    });

    return {
      isZhCN: globalConfig.isZhCN,
      isMobile: globalConfig.isMobile,
      responsive: globalConfig.responsive,
      getLocalizedPathname,
      headerClassName: {
        clearfix: true,
        "home-header": isHome.value,
      },
      colProps,
      menuOpen,
      onTriggerSearching,
      cancelButtonProps,
    };
  },
});
</script>
<style lang="less" src="./index.less"></style>
<style scope>
.close-icon {
  position: absolute;
  top: 15px;
  right: 15px;
}
.alert-list-item {
  padding: 8px 0;
}
</style>
