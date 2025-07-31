<template>
  <article>
    <section class="markdown">
      <h1>
        {{ frontmatter.title }}
        <span v-if="isZhCN" class="subtitle">{{ frontmatter.subtitle }}</span>
      </h1>
      <section class="markdown" v-html="description"></section>
    </section>
    <section class="markdown">
      <h2
        :id="
          isZhCN
            ? $t('app.component.examples')
            : $t('app.component.examples').toLocaleLowerCase()
        "
      >
        {{ $t("app.component.examples") }}
        <a
          class="header-anchor"
          :href="`#${isZhCN ? $t('app.component.examples') : $t('app.component.examples').toLocaleLowerCase()}`"
        >
          <span aria-hidden="true" class="anchor">#</span>
        </a>
      </h2>
    </section>
    <slot />
    <section class="markdown api-container" v-html="api"></section>
    <Contributor :is-zn="isZhCN" />
  </article>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import Contributor from "../components/Contributors/index.vue";

export default defineComponent({
  name: "Demo",
  components: {
    Contributor,
  },
  props: ["pageData", "isZhCN"],
  setup(props) {
    const route = useRoute();
    const frontmatter = computed(() => props?.pageData?.frontmatter || {});
    const docHtml = computed(() => {
      return props?.pageData?.html || "";
    });
    const description = computed(() => {
      return !docHtml.value
        ? docHtml.value
        : docHtml.value.split(
            '<h2 id="api">API <a class="header-anchor" href="#api">',
          )[0];
    });
    const api = computed(() => {
      return !docHtml.value
        ? docHtml.value
        : `
      <h2 id="api"><span>API</span><a href="#api" class="anchor">
      ${docHtml.value.split('<h2 id="api">API <a class="header-anchor" href="#api">')[1]}
      `;
    });
    return { frontmatter, description, api, route, docHtml };
  },
});
</script>
<style lang="less" scoped></style>
