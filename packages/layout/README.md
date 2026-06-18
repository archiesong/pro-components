# @antdv-next1/pro-layout

Advanced page layout components for Pro Components, including ProLayout, PageContainer, SettingDrawer, and more.

## Installation

```bash
npm install @antdv-next1/pro-layout
# or
pnpm add @antdv-next1/pro-layout
```

## Peer Dependencies

- `vue` >= 3.5.30
- `antdv-next` >= 1.3.4

## Components

| Component | Description |
|-----------|-------------|
| `ProLayout` | Main page layout with sidebar, header, and content area |
| `PageContainer` | Page container with breadcrumb, tab, and extra actions |
| `PageHeader` | Page header component |
| `SettingDrawer` | Visual settings drawer for layout configuration |
| `GridContent` | Grid-based responsive content wrapper |
| `DefaultHeader` | Default header component |
| `DefaultFooter` | Default footer component |
| `FooterToolbar` | Fixed bottom toolbar |
| `PageLoading` | Page loading skeleton |
| `ProHelp` | Help component |
| `ProHelpPanel` | Help panel component |

## Utilities

| Export | Description |
|--------|-------------|
| `getMenuData` | Extract menu data from route configuration |
| `getPageTitle` | Generate page title from route and menu data |
| `RouteContext` | Route context provider |

## Usage

### Basic Layout

```vue
<script setup lang="ts">
import { ProLayout } from '@antdv-next1/pro-layout'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <ProLayout
    :route="route"
    title="My Application"
    :logo="logoUrl"
  >
    <template #default>
      <router-view />
    </template>
    <template #footer>
      <DefaultFooter />
    </template>
  </ProLayout>
</template>
```

### Page Container

```vue
<script setup lang="ts">
import { PageContainer } from '@antdv-next1/pro-layout'
</script>

<template>
  <PageContainer title="Dashboard" :tab-list="tabs" @tab-change="onTabChange">
    <template #extra>
      <a-button type="primary">Create</a-button>
    </template>
    <YourContent />
  </PageContainer>
</template>
```

### Settings Drawer

```vue
<script setup lang="ts">
import { SettingDrawer } from '@antdv-next1/pro-layout'
</script>

<template>
  <SettingDrawer v-model:open="showSettings" :settings="settings" />
</template>
```

## Dependencies

- `@antdv-next1/pro-listy` — List component
- `@antdv-next1/pro-provider` — Theme and configuration context
- `@antdv-next1/pro-utils` — Shared utilities
- `@antdv-next1/route-utils` — Route transformation utilities
- `swrv` — Stale-while-revalidate data fetching

## License

[MIT](../../LICENSE)
