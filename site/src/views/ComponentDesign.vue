<template>
  <section class="markdown">
    <h1>{{ isZhCN ? '组件设计' : 'Component Design' }}</h1>
   <section class="markdown">
      <p>
        <code> ProComponents  Vue</code>
        {{
          isZhCN
            ? '是基于 Ant Design Vue 而开发的模板组件，提供了更高级别的抽象支持，开箱即用。可以显著地提升制作 CRUD 页面的效率，更加专注于页面。'
            : 'Is a template component developed based on Ant Design Vue that provides a higher level of abstraction support, right out of the box. Can significantly improve the efficiency of making CRUD pages, more focused on the page。'
        }}
      </p>
      <ul>
        <li>
          <router-link :to="getLocalizedPathname('/components/layout', isZhCN)">ProLayout</router-link>
          {{ isZhCN ?  '解决布局的问题，提供开箱即用的菜单和面包屑功能' : 'solves the layout problem and provides out-of-the-box menu and breadcrumb functionality' }}
        </li>
        <li>
          <router-link :to="getLocalizedPathname('/components/table', isZhCN)">ProTable</router-link>
          {{ isZhCN? '表格模板组件，抽象网络请求和表格格式化': 'solves table issues, abstracts web requests and table formatting' }}
        </li>
      </ul>
    </section>
  </section>
  <section class="markdown">
    <h2 :id="isZhCN ? '与网络请求库配置使用' :'configuring-use-with-the-web-request-library'">{{ isZhCN ? '与网络请求库配置使用' : 'Configuring Use with the Web Request Library' }}
      <a class="header-anchor" :href="`#${isZhCN ? '与网络请求库配置使用' :'configuring-use-with-the-web-request-library'}`">
        <span aria-hidden="true" class="anchor">#</span>
      </a>
    </h2>
    <section class="markdown">
      <p v-if="isZhCN">
        <code>ProTable</code> 和 <code>ProList</code> 使用了新的数据结构，如果你使用了我们约定的参数使用起来会非常简单。</p>
        <p v-else><code>ProTable</code>, <code>ProList</code>  uses a new data structure which is very easy to use if you use the parameters we have agreed upon.</p>
      <pre class="language-ts"><code>const msg: { 
  data: T[]; 
  page: number; 
  success: boolean;
  total: number;
} = {
  data: [],
  page: 1,
  success: true,
  total: 0
};</code></pre>
    </section>
  </section>
</template>
<script lang="ts">
import type { GlobalConfig } from '../App.vue';
import {  inject, defineComponent, onMounted  } from 'vue';
import { GLOBAL_CONFIG } from '../SymbolKey';
import { getLocalizedPathname } from '../utils/util';
export default defineComponent({
  name: 'ComponentDesign',
  setup() {
    const globalConfig = inject<GlobalConfig>(GLOBAL_CONFIG);

    const addVueDocsInfo: any = inject("addVueDocsInfo", () => {});
    onMounted(()=>{
      addVueDocsInfo({
        title: '与网络请求库配置使用',
        enTitle: 'Configuring Use with the Web Request Library'
      })
    })
    return {
      globalConfig,
      isZhCN: globalConfig?.isZhCN,
      getLocalizedPathname
    }
  }
})
</script>
<style lang="less" scoped></style>
