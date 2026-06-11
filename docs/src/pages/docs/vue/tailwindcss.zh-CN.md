---
title: Tailwind CSS
---

首先需要在 `App.vue` 的入口处增加一层 `a-app` 包裹，确保组件运行时有父级样式容器：

```vue
<template>
  <a-app>
    <router-view />
  </a-app>
</template>
```

如果你希望在 `antdv-next` 项目中继续使用 Tailwind CSS，同时让工具类和 Ant Design 的设计 Token 保持一致，可以使用 `@antdv-next/tailwind`。

这个插件会把 Ant Design 的 CSS 变量映射到 Tailwind 的主题系统中，让你在使用 `bg-primary`、`shadow-card`、`text-h1` 这类类名时，仍然能跟随 `antdv-next` 的运行时主题变化。

## 包信息

- 包名：`@antdv-next/tailwind`
- `peerDependencies`：`tailwindcss >= 3.0.0`

## 安装

```bash
pnpm add -D tailwindcss @antdv-next/tailwind
```

## 什么时候用它

适合以下场景：

- 你的项目已经在使用 Tailwind CSS
- 你希望工具类与 Ant Design 设计 Token 对齐
- 你希望保留 Tailwind 的开发体验，同时接入 `antdv-next` 主题变量
- 你需要运行时主题切换，而不是把颜色写死在构建产物里

如果你更偏向 UnoCSS 方案，可以查看 [UnoCSS](/docs/vue/unocss) 文档。

## Tailwind CSS v4（推荐）

Tailwind CSS v4 推荐直接通过 `@theme` 机制接入主题变量。

### 方式 1：直接引入主题文件

在你的 CSS 入口文件中：

```css
@import "tailwindcss";
@import "@antdv-next/tailwind/theme.css";
```

这是最简单的方式，适合大多数项目。

### 方式 2：动态生成主题 CSS

如果你需要自定义 CSS 变量前缀，可以使用 `v4` 导出的生成函数：

```ts
import { generateThemeCSS } from '@antdv-next/tailwind/v4'

const css = generateThemeCSS()

const customCss = generateThemeCSS({
  antPrefix: 'my-app',
})
```

## Tailwind CSS v3

如果你仍在使用 Tailwind CSS v3，可以通过插件方式接入。

### 基础配置

```ts
import antdPlugin from '@antdv-next/tailwind'

export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [antdPlugin],
}
```

### 自定义配置

```ts
import { createAntdPlugin } from '@antdv-next/tailwind'

export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [
    createAntdPlugin({
      antPrefix: 'ant',
    }),
  ],
}
```

## 使用示例

```vue
<template>
  <div class="bg-primary text-white p-lg rounded-lg shadow-card">
    <h1 class="text-h1 text-primary">Hello Antdv Next</h1>
    <p class="text-text-secondary mt-sm">
      使用 Tailwind CSS 工具类和 Ant Design 设计变量
    </p>
    <button class="bg-success hover:bg-success-hover px-md py-sm rounded-sm">
      Success Button
    </button>
  </div>
</template>
```

常见工具类包括：

- 颜色：`bg-primary`、`text-primary`、`border-primary`
- 状态色：`bg-success`、`bg-warning`、`bg-error`
- 调色板：`bg-blue-1`、`text-red-6`
- 间距：`p-lg`、`px-sm`、`m-md`
- 圆角：`rounded-xs`、`rounded-lg`
- 文字：`text-sm`、`text-lg`、`text-h1`
- 阴影：`shadow-card`、`shadow-sec`

## 常用类名示例

### 颜色与背景

| 类名 | 说明 | 用途 |
| --- | --- | --- |
| `bg-primary` | 主色背景 | 用于主按钮、强调块、品牌区域 |
| `text-primary` | 主色文字 | 用于链接、重点文案、标题强调 |
| `bg-success` | 成功状态背景 | 用于成功提示、状态标签 |
| `text-text-secondary` | 次级文本颜色 | 用于辅助说明、备注信息 |
| `bg-container` | 容器背景色 | 用于卡片、面板、弹层内容区 |
| `border-border` | 默认边框颜色 | 用于边框、分割线、输入容器 |

### 间距与布局

| 类名 | 说明 | 用途 |
| --- | --- | --- |
| `p-lg` | 大内边距 | 用于卡片、弹层、分组容器 |
| `px-md` | 水平中等内边距 | 用于按钮、标签、输入框 |
| `py-sm` | 垂直小内边距 | 用于紧凑布局块 |
| `m-md` | 中等外边距 | 用于模块间距 |
| `mt-sm` | 顶部小外边距 | 用于标题与正文之间 |
| `rounded-lg` | 大圆角 | 用于卡片、弹窗、容器包裹层 |

### 文字与阴影

| 类名 | 说明 | 用途 |
| --- | --- | --- |
| `text-h1` | 一级标题字号 | 用于页面主标题 |
| `text-lg` | 大号文字 | 用于模块标题、重点信息 |
| `text-sm` | 小号文字 | 用于辅助说明与次要内容 |
| `shadow-card` | 卡片阴影 | 用于提升卡片层级 |
| `shadow-sec` | 次级阴影 | 用于轻量浮层 |
| `shadow-ter` | 第三级阴影 | 用于更弱的层级表达 |

## 与主题系统的关系

该插件依赖 Ant Design 的 CSS 变量体系，所以建议确保应用已正确包裹 `ConfigProvider`，并按需结合 [定制主题](/docs/vue/customize-theme) 调整 Token。

```vue
<script setup lang="ts">
import { ConfigProvider } from 'antdv-next'
</script>

<template>
  <ConfigProvider>
    <RouterView />
  </ConfigProvider>
</template>
```

## 注意事项

- v4 推荐直接引入 `theme.css`，接入成本最低。
- v3 和 v4 都不会覆盖 Tailwind 全局 spacing 规则，所以 `gap-*`、`max-w-*` 等类仍保持 Tailwind 默认行为。
- 如果你修改了 CSS 变量前缀，需要同步配置 `antPrefix`。
