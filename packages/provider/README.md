# @antdv-next1/pro-provider

Global configuration provider, internationalization (i18n), and theme context for Pro Components.

## Installation

```bash
npm install @antdv-next1/pro-provider
# or
pnpm add @antdv-next1/pro-provider
```

## Peer Dependencies

- `vue` >= 3.5.30
- `antdv-next` >= 1.3.6

## What's Included

### Components

| Component | Description |
|-----------|-------------|
| `ProConfigProvider` | Global configuration provider for Pro Components |

### Exports

| Export | Description |
|--------|-------------|
| `ProConfigProvider` | Global config provider wrapper component |
| `useIntl` | Composable to access current internationalization instance |
| `intlMap` | Built-in i18n language map |
| Context utilities | Shared context providers and consumers |
| `useStyle` | CSS-in-JS style composition utilities |
| Layout token types | Type definitions for layout design tokens |

### ProConfigProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dark` | `boolean` | `false` | Enable dark theme |
| `compact` | `boolean` | `false` | Enable compact mode |
| `needDeps` | `boolean` | — | Whether dependencies are needed |
| `token` | `DeepPartial<ProAliasToken>` | — | Custom design tokens |
| `prefixCls` | `string` | — | CSS class prefix |
| `valueTypeMap` | `Record<string, ProRenderFieldPropsType>` | — | Custom value type renderers |
| `hashed` | `boolean` | — | Enable CSS-in-JS hash |
| `intl` | `IntlType` | — | Custom internationalization instance |

### Core Types

| Type | Description |
|------|-------------|
| `ProSchemaValueEnumType` | Value enum configuration (text, status, color, disabled) |
| `ProSchemaValueEnumMap` | Map-based value enum |
| `ProSchemaValueEnumObj` | Object-based value enum |
| `ProFieldFCMode` | Field render mode: `'read' \| 'edit' \| 'update'` |
| `BaseProFieldFC` | Base field component type |
| `ProFieldFCRenderProps` | Field render props |
| `ProRenderFieldPropsType` | Custom field renderer type |
| `ParamsType` | General params type |

## Usage

```vue
<script setup lang="ts">
import { ProConfigProvider } from '@antdv-next1/pro-provider'
</script>

<template>
  <ProConfigProvider :dark="false" :compact="false">
    <YourApp />
  </ProConfigProvider>
</template>
```

## License

[MIT](../../LICENSE)
