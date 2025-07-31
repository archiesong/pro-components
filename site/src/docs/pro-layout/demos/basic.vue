<docs>
---
order: 0
iframe: 460
title:
  zh-CN: 基础使用
  en-US: Basic
---

## zh-CN

最简单的用法。

## en-US

Basic usage.

</docs>
<template>
  <ProLayout
    :routes="routes"
    v-bind="state"
    style="min-height: 100vh"
    :bg-layout-img-list="bgLayoutImgList"
    :menu-props="{ onSelect: handleSelect }"

    :avatar-props="{
      src: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      alt: 'avatar',
      size: 'small',
      title: 'Serati Ma',
      render: (_, dom) =>
        h(
          Dropdown,
          {
            placement: 'bottomRight',
          },
          {
            default: () => dom,
            overlay: () =>
              h(Menu, {
                items: [
                  {
                    icon: () => h(UserOutlined),
                    key: 'center',
                    label: '个人中心',
                  },
                  {
                    icon: () => h(SettingOutlined),
                    key: 'setting',
                    label: '个人设置',
                  },
                  {
                    type: 'divider',
                  },
                  {
                    icon: () => h(LogoutOutlined),
                    key: 'logout',
                    label: '退出登录',
                  },
                ],
              }),
          },
        ),
    }"
    :app-list="appList"
    :location="location"
    :item-render="itemRender"
    iconfont-url="//at.alicdn.com/t/font_2804900_nzigh7z84gc.js"
  >
    <GridContent v-if="location.pathname === '/dashboard'">{{
      location.pathname
    }}</GridContent>
    <PageContainer v-else
     :footer="[
       h(Button, { key: 2 }, () => '重置'),
    h(Button, { key: 2, type: 'primary' }, () => '提交'),
     ]"
      ><Card>{{ location.pathname }} </Card></PageContainer
    >
    <SettingDrawer :settings="state" @settingChange="handleSettingChange" />
  </ProLayout>
</template>

<script lang="ts" setup>
import { h, reactive } from "vue";
import  {
  ProLayout,
  MenuDataItem,
  SettingDrawer,
  PageContainer,
  GridContent,
  ProSettings,
} from "@ant-design-vue/pro-layout";
import { Dropdown, Menu, Card, Button } from "ant-design-vue";
import {
  DashboardOutlined,
  AntDesignOutlined,
  UserOutlined,
  TableOutlined,
  LogoutOutlined,
  SolutionOutlined,
  TeamOutlined,
  HomeOutlined,
  BarsOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
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
              icon: SolutionOutlined,
              title: "用户管理",
            },
          },
          {
            path: "role",
            name: "Role",
            meta: {
              icon: TeamOutlined,
              title: "角色管理",
            },
          },
        ],
      },
      {
        path: 'list',
        name: 'List',
        meta: {
          title: "列表管理",
          icon: TableOutlined,
        },
        redirect: "/list/sub-page",
        children: [
          {
            path: "sub-page",
            name: "SubPage",
            meta: {
              icon: BarsOutlined,
              title: "一级列表页",
            },
            redirect: "/list/sub-page/sub-page-1-1",
            children: [
              {
                path: "sub-page-1-1",
                name: "SubPage-1-1",
                meta: {
                  icon: BarsOutlined,
                  title: '一一级列表页面'
                }
              },
              {
                path: "sub-page-1-2",
                name: "SubPage-1-2",
                meta: {
                  icon: BarsOutlined,
                  title: '一二级列表页面'
                }
              }
            ]
          },
          {
            path: 'sub-page-2',
            name: "SubPage-2",
            meta: {
              icon: BarsOutlined,
              title: "二级列表页",
            }
          }
        ]
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

const appList = [
  {
    icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
    title: "Ant Design",
    desc: "杭州市较知名的 UI 设计语言",
  },
  {
    icon: "https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",
    title: "AntV",
    desc: "蚂蚁集团全新一代数据可视化解决方案",
  },
];
const location = reactive({
  pathname: "/system/user",
});
const handleSelect = ({ key }: { key: string | number }) => {
  if ((key as string).startsWith("https")) {
    window.open(key as string);
  } else {
    if(key === '/system'){
      location.pathname = '/system/user';
    } else if (key === '/list' || key === '/list/sub-page'){
      location.pathname = '/list/sub-page/sub-page-1-1';
    }else {
      location.pathname = key as string;
    }
  }
};
const bgLayoutImgList = [
  {
    src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
    left: 85,
    bottom: 100,
    height: "303px",
  },
  {
    src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
    bottom: -68,
    right: -45,
    height: "303px",
  },
  {
    src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
    bottom: 0,
    left: 0,
    width: "331px",
  },
];
const itemRender = ({ route, routes }: { route: { path: string; breadcrumbName: string; }; routes: {path: string}[]  }) => {
  const { breadcrumbName, path } = route;
  const last =
    routes.findIndex((i) => i.path === route.path) === routes.length - 1;
  return last
    ? h("span", null, breadcrumbName)
    : h(
        "a",
        {
          onClick: () => {
            if (path === "/system") {
              location.pathname = "/system/user";
            } else if (path === '/list' || path === '/list/sub-page'){
              location.pathname = '/list/sub-page/sub-page-1-1';
            } else if (path === "/") {
              location.pathname = "/dashboard";
            } else {
              location.pathname = path;
            }
          },
        },
        breadcrumbName,
      );
};

const state = reactive({
  navTheme: "dark",
  colorPrimary: "#1677FF",
  layout: "side",
  compact: false,
  contentWidth: "Fluid",
  splitMenus: false,
  colorWeak: false,
  headerRender: false,
  fixedHeader: true,
  transitionName: "null",
  fixedSiderbar: true,
} as ProSettings);
const handleSettingChange = (config: ProSettings) => {
  Object.keys(config).forEach((key) => (state[key] = config[key]));
};
</script>
