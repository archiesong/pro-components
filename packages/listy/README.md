# @antdv-next1/pro-listy

Advanced list component for Pro Components, providing flexible list rendering with item and meta support.

## Installation

```bash
npm install @antdv-next1/pro-listy
# or
pnpm add @antdv-next1/pro-listy
```

## Peer Dependencies

- `vue` >= 3.5.30
- `antdv-next` >= 1.3.4

## Components

| Component | Description |
|-----------|-------------|
| `ProListy` | Main list component with advanced features |
| `ProListyItem` | Individual list item component |
| `ProListyItemMeta` | Item meta information (title, description, avatar, etc.) |

## Usage

```vue
<script setup lang="ts">
import { ProListy, ProListyItem, ProListyItemMeta } from '@antdv-next1/pro-listy'
</script>

<template>
  <ProListy>
    <ProListyItem>
      <ProListyItemMeta title="Item Title" description="Item description" />
    </ProListyItem>
  </ProListy>
</template>
```

## Dependencies

- `@antdv-next1/pro-provider` — Theme and configuration context

## License

[MIT](../../LICENSE)
