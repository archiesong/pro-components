<template>
  <div class="container">
    <Header />

    <div class="main-wrapper">
      <a-row>
        <template v-if="isMobile">
          <a-drawer
            key="mobile-menu"
            v-model:open="visible"
            :closable="false"
            placement="left"
            class="drawer drawer-left"
            wrapper-class-name="drawer-wrapper"
            width="60%"
          >
            <Menu :menus="dataSource" :active-menu-item="activeMenuItem" :is-zh-c-n="isZhCN" />
          </a-drawer>
          <div class="drawer-handle" @click="handleClickShowButton">
            <close-outlined v-if="visible" :style="iconStyle" />
            <MenuOutlined v-else :style="iconStyle" />
          </div>
        </template>
        <template v-else>
          <a-col :xxxl="4" :xxl="4" :xl="5" :lg="6" :md="6" :sm="24" :xs="24" class="main-menu">
            <a-affix>
              <section class="main-menu-inner">
                <Menu :menus="dataSource" :active-menu-item="activeMenuItem" :is-zh-c-n="isZhCN" />
              </section>
            </a-affix>
          </a-col>
        </template>
        <a-col :xxxl="20" :xxl="20" :xl="19" :lg="18" :md="18" :sm="24" :xs="24">
          <div v-if="headers.length">
            <section class="toc-affix" :style="y > 102 ? 'position:fixed; top: 16px;' : ''">
              <a-anchor :items="headers">
                <template #customTitle="item">
                  <LinkOutlined v-if="item.target" />
                  {{ item.title }}
                </template>
              </a-anchor>
            </section>
          </div>
          <section :class="mainContainerClass">
            <Demo v-if="isDemo" :page-data="pageData" :is-zh-c-n="isZhCN">
              <component :is="matchCom" />
            </Demo>
            <router-view v-else />
          </section>
          <PrevAndNext :menus="menus" :current-menu-index="currentMenuIndex" :is-zh-c-n="isZhCN" />
          <Footer />
        </a-col>
      </a-row>
    </div>
  </div>
  <a-float-button-group trigger="click">
    <template #icon>
      <ThemeIcon />
    </template>
    <a-float-button
      :tooltip="$t('app.floatButton.dark-theme')"
      :type="themeMode.theme.value === 'dark' ? 'primary' : 'default'"
      @click="
        themeMode.changeTheme(
          themeMode.theme.value === 'dark' ? 'light' : 'dark',
        )
      "
    >
      <template #icon>
        <DarkIcon />
      </template>
    </a-float-button>
    <a-float-button
      :tooltip="$t('app.floatButton.compact-theme')"
      :type="themeMode.compactTheme.value === 'compact' ? 'primary' : 'default'"
      @click="
        themeMode.changeCompactTheme(
          themeMode.compactTheme.value === 'compact' ? '' : 'compact',
        )
      "
    >
      <template #icon>
        <CompactIcon />
      </template>
    </a-float-button>
  </a-float-button-group>
</template>
<script lang="ts">
import type { GlobalConfig } from "../App.vue";
import { GLOBAL_CONFIG } from "../SymbolKey";
import { defineComponent, inject, computed, ref, provide, watch } from "vue";
import { useRoute } from "vue-router";
import Header from "./header/index.vue";
import Footer from "./Footer.vue";
import Menu from "./Menu.vue";
import PrevAndNext from "./PrevAndNext.vue";
import Demo from "./Demo.vue";
import useMenus from "../hooks/useMenus";
import {
  CloseOutlined,
  MenuOutlined,
  LinkOutlined,
} from "@ant-design/icons-vue";
import ThemeIcon from "./icons/ThemeIcon.vue";
import ThemeEditorIcon from "./icons/ThemeEditorIcon";
import DarkIcon from "./icons/Dark";
import CompactIcon from "./icons/Compact";
import { useWindowScroll } from "@vueuse/core";
import { useI18n } from "vue-i18n";
const rControl = /[\u0000-\u001f]/g;
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g;

export default defineComponent({
  name: "Layout",
  components: {
    Demo,
    Header,
    Footer,
    Menu,
    PrevAndNext,
    CloseOutlined,
    MenuOutlined,
    ThemeIcon,
    ThemeEditorIcon,
    DarkIcon,
    CompactIcon,
    LinkOutlined,
  },
  setup() {
    const { y } = useWindowScroll();
    const visible = ref(false);
    const route = useRoute();
    const { t } = useI18n();
    const globalConfig = inject<GlobalConfig>(GLOBAL_CONFIG);
    const { menus, activeMenuItem, currentMenuIndex, dataSource } = useMenus();

    const demos = ref<any[]>([]);
    const vueDocs = ref<any[]>([]);
    provide("addDemosInfo", (info: any) => {
      if (!demos.value.find((d) => d.href === info.href)) {
        demos.value.push(info);
      }
    });
    provide("addVueDocsInfo", (info: any) => {
      if (!vueDocs.value.find((d) => d.href === info.href)) {
        vueDocs.value.push(info);
      }
    });

    const themeMode = inject("themeMode", {
      theme: ref("light"),
      compactTheme: ref("light"),
      changeTheme: (_key: any) => void 0,
      changeCompactTheme: (_key: any) => void 0,
    });

    watch(
      () => route.path,
      () => {
        demos.value.length = 0;
        vueDocs.value.length = 0;
      },
    );

    const isDemo = computed(() => {
      return (
        route.path.indexOf("/components") === 0 &&
        route.path.indexOf("/components/design") !== 0
      );
    });
    const matchCom = computed(() => {
      return route.matched[route.matched.length - 1]?.components?.default;
    });
    const isZhCN = globalConfig.isZhCN;
    const pageData = computed(() =>
      isDemo.value
        ? matchCom.value[isZhCN.value ? "CN" : "US"]?.pageData
        : (matchCom.value as any)?.pageData,
    );
    const slugifyTitle = (str: string) => {
      return (
        str
          // Remove control characters
          .replace(rControl, "")
          // Replace special characters
          .replace(rSpecial, "-")
          // Remove continuos separators
          .replace(/\-{2,}/g, "-")
          // Remove prefixing and trailing separtors
          .replace(/^\-+|\-+$/g, "")
          // ensure it doesn't start with a number (#121)
          .replace(/^(\d)/, "_$1")
      );
    };
    const headers = computed(() => {
      if (!pageData.value?.header && !demos.value.length) {
        if (vueDocs.value.length) {
          return vueDocs.value.map((item) => ({
            ...item,
            key: item.title,
            title: isZhCN.value ? item.title : item.enTitle || item.title,
            href: (
              item.href ||
              `#${slugifyTitle(isZhCN.value ? item.title : item.enTitle || item.title)}`
            ).toLocaleLowerCase(),
          }));
        }
        return [];
      }
      if (
        !(pageData.value?.headers || []).find(
          (item: Header) => item.slug === t("app.component.examples"),
        )
      ) {
        const apiIndex: number = (pageData.value?.headers || []).findIndex(
          (item: Header) => item.slug === "api",
        );
        const examplesIndex = apiIndex;
        (pageData.value?.headers || []).splice(
          examplesIndex,
          0,
          !isDemo.value
            ? {
                level: 2,
                title: t("app.component.examples"),
                slug: t("app.component.examples"),
                content: "",
              }
            : {
                level: 2,
                title: t("app.component.examples"),
                slug: t("app.component.examples"),
                content: "",
                children: demos.value,
              },
        );
      }
      const result = [];
      let lastLevel2 = null;
      (pageData.value?.headers || []).forEach((e: Header) => {
        if (e.level === 2) {
          result.push(e);
          lastLevel2 = e;
        } else if (e.level === 3 && lastLevel2) {
          if (!lastLevel2.children) {
            lastLevel2.children = [];
          }
          if (
            lastLevel2.children.filter((item) => item.slug === e.slug)
              .length !== 0
          ) {
            return;
          }
          lastLevel2.children.push({
            ...e,
            href: (e.href || `#${slugifyTitle(e.title)}`).toLocaleLowerCase(),
          });
        }
      });
      return result.map((header) => ({
        ...header,
        key: header.title,
        title: isZhCN.value ? header.title : header.enTitle || header.title,
        href: (
          header.href || `#${slugifyTitle(header.title)}`
        ).toLocaleLowerCase(),
      }));
    });

    const mainContainerClass = computed(() => {
      return {
        "main-container": true,
        "main-container-component": isDemo.value,
      };
    });
    const handleClickShowButton = () => {
      visible.value = !visible.value;
    };
    return {
      themeMode,
      visible,
      isMobile: globalConfig.isMobile,
      isZhCN,
      mainContainerClass,
      menus,
      currentMenuIndex,
      activeMenuItem,
      headers,
      isDemo,
      matchCom,
      pageData,
      dataSource,
      handleClickShowButton,
      iconStyle: {
        // color: '#fff',
        fontSize: "20px",
      },
      y,
    };
  },
});
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.toc-affix {
  background-color: rgba(0, 0, 0, 0);
  backdrop-filter: blur(10px);
}

.toc-affix :deep(.ant-anchor) {
  font-size: 12px;
  max-width: 150px;

  .ant-anchor-ink::before {
    display: none;
  }

  .ant-anchor-ink-ball {
    display: none;
  }
}
</style>
