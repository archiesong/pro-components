# @antdv-next1/pro-components

Meta package that bundles all Pro Components into a single import for convenience.

## Installation

```bash
npm install @antdv-next1/pro-components
# or
pnpm add @antdv-next1/pro-components
```

## Peer Dependencies

- `vue` >= 3.5.30
- `antdv-next` >= 1.3.6

## Included Packages

This package re-exports everything from the following packages:

| Package | Description |
|---------|-------------|
| `@antdv-next1/pro-layout` | Advanced page layout components |
| `@antdv-next1/pro-table` | Enhanced table with search and toolbar |
| `@antdv-next1/pro-form` | Advanced form components |
| `@antdv-next1/pro-card` | Card and statistic components |
| `@antdv-next1/pro-field` | Rich field rendering components |
| `@antdv-next1/pro-listy` | Advanced list component |
| `@antdv-next1/pro-provider` | Global config provider and i18n |
| `@antdv-next1/pro-utils` | Shared utilities and composables |

## Usage

Instead of importing from individual packages:

```ts
// Import from individual packages
import { ProLayout } from '@antdv-next1/pro-layout'
import { ProTable } from '@antdv-next1/pro-table'
import { ProForm, ProFormText } from '@antdv-next1/pro-form'
```

Import everything from this meta package:

```ts
import { ProLayout, ProTable, ProForm, ProFormText } from '@antdv-next1/pro-components'
```

### Quick Start

```vue
<script setup lang="ts">
import {
  ProLayout,
  PageContainer,
  ProTable,
  ProConfigProvider,
} from '@antdv-next1/pro-components'
</script>

<template>
  <ProConfigProvider>
    <ProLayout :route="route" title="Admin">
      <PageContainer title="Dashboard">
        <ProTable :columns="columns" :request="fetchData" />
      </PageContainer>
    </ProLayout>
  </ProConfigProvider>
</template>
```

## When to Use This Package

- **Use this meta package** when you need multiple Pro Components and want a single import source.
- **Use individual packages** when you only need one or two components and want to minimize bundle size (with tree-shaking, this meta package also works well).

## License

[MIT](../../LICENSE)
