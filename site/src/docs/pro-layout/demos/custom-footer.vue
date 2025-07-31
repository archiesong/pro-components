<docs>
---
order: 1
iframe: 460
title:
  zh-CN: 自定义页脚
  en-US: Custom footer
---

## zh-CN

ProLayout 默认不提供页脚，要是和 Pro 官网相同的样式，需要自己引入一下页脚。

## en-US

ProLayout does not provide footer by default, if you want to have the same style as Pro official website, you need to introduce a footer by yourself.

</docs>
<template>
  <ProLayout
    style="min-height: 100vh"
    :routes="routes"
    :menu-props="{ onSelect: handleSelect }"
    :location="location"
    >asa</ProLayout
  >
</template>
<script lang="ts" setup>
import ProLayout, { MenuDataItem } from "@ant-design-vue/pro-layout";
import {
  AntDesignOutlined,
  DashboardOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { reactive } from "vue";
const routes = [
  {
    path: "/",
    name: "Index",
    redirect: "/dashboard",
    meta: {
      title: "首页",
      icon: HomeOutlined,
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        meta: {
          title: "仪表盘",
          lock: true,
          icon: DashboardOutlined,
        },
      },
      {
        path: "system",
        name: "System",
        meta: {
          title: "系统管理",
          icon: SettingOutlined,
        },
        redirect: "/system/user",
        children: [
          {
            path: "user",
            name: "User",
            meta: {
              icon: SettingOutlined,
              title: "用户管理",
            },
          },
          {
            path: "role",
            name: "Role",
            meta: {
              icon: SettingOutlined,
              title: "角色管理",
            },
          },
        ],
      },
      {
        path: "https://ant.design",
        name: "AntDesign",
        meta: {
          title: "Ant Design",
          target: "_blank",
          icon: AntDesignOutlined,
        },
      },
    ],
  },
] as unknown as MenuDataItem[];
const location = reactive({
  pathname: "/dashboard",
});
const handleSelect = ({ key }: { key: string | number }) => {
  if ((key as string).startsWith("https")) {
    window.open(key as string);
  } else {
    location.pathname = key as string;
  }
};
</script>
