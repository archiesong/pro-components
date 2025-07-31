import Layout from "../layouts/index.vue";
import Iframe from "../layouts/Iframe.vue";
// import Iframe from '../components/iframe.jsx';
import demoRoutes from "./demoRoutes";
// import otherRoutes from './otherRoutes';
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes = [
  // ...otherRoutes,
  {
    path: "/components",
    component: Layout,
    children: [
      {
        path: "design:lang(.*)",
        component: () => import("../views/ComponentDesign.vue"),
      },
      ...demoRoutes,
    ],
  },
  {
    path: "/iframe",
    component: Iframe,
    children: [
      {
        path: 'layout:lang(.*)',
        meta: {
          category: "Components",
          subtitle: "布局",
          type: "布局",
          cols: 1,
          title: "Layout",
          cover: "https://gw.alipayobjects.com/zos/alicdn/hzEndUVEx/Layout.svg",
        },
        props: (route) => {
          const hash = route.hash.replace("#", "");
          return { iframeName: hash };
        },
        component: () => import("../docs/pro-layout/demos/index.vue"),
      },
    ],
  },
  {
    path: "/docs",
    component: Layout,
    // props: route => {
    //   const name = route.path.split('/docs/vue/')[1].split('/')[0];
    //   return { name, showApi: true };
    // },
    children: [
      {
        path: "vue/introduce-cn",
        meta: {
          enTitle: "ProComponents of Vue",
          title: "ProComponents of Vue",
          category: "docs",
        },
        component: () => import("../vueDocs/introduce.zh-CN.md"),
      },
      {
        path: "vue/introduce",
        meta: {
          enTitle: "ProComponents of Vue",
          title: "ProComponents of Vue",
          category: "docs",
        },
        component: () => import("../vueDocs/introduce.en-US.md"),
      },
      {
        path: "vue/getting-started-cn",
        meta: {
          enTitle: "Getting Started",
          title: "快速上手",
          category: "docs",
        },
        component: () => import("../vueDocs/getting-started.zh-CN.md"),
      },
      {
        path: "vue/getting-started",
        meta: {
          enTitle: "Getting Started",
          title: "快速上手",
          category: "docs",
        },
        component: () => import("../vueDocs/getting-started.en-US.md"),
      },
      { path: "", redirect: "/docs/vue/introduce/" },
    ],
  },
  // { path: '/debugger', component: () => import('../../debugger') },
  { path: "/:lang(.*)", redirect: "/components/design" },
] as RouteRecordRaw[];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to) => {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: "auto" };
    }
  },
});
