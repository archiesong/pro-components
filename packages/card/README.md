# @antdv-next1/pro-card

Flexible card component with split layout, grid support, check cards, and statistics for Pro Components.

## Installation

```bash
npm install @antdv-next1/pro-card
# or
pnpm add @antdv-next1/pro-card
```

## Peer Dependencies

- `vue` >= 3.5.30
- `antdv-next` >= 1.3.4

## Components

| Component | Description |
|-----------|-------------|
| `ProCard` | Main card component with split and grid layout |
| `Statistic` | Statistic display component |
| `StatisticCard` | Card with built-in statistic display |
| `ProCheckCard` | Selectable check card |
| `ProCheckCardGroup` | Group of check cards with single/multi select |

## Usage

```vue
<script setup lang="ts">
import { ProCard } from '@antdv-next1/pro-card'
</script>

<template>
  <ProCard title="Card Title" :bordered="true">
    <ProCard title="Left" split="vertical" :col-span="12">
      Left content
    </ProCard>
    <ProCard title="Right" :col-span="12">
      Right content
    </ProCard>
  </ProCard>
</template>
```

### Statistic Card

```vue
<script setup lang="ts">
import { StatisticCard } from '@antdv-next1/pro-card'
</script>

<template>
  <StatisticCard
    :statistic="{ title: 'Total Sales', value: 126560 }"
  />
</template>
```

### Check Card

```vue
<script setup lang="ts">
import { ProCheckCard, ProCheckCardGroup } from '@antdv-next1/pro-card'
</script>

<template>
  <ProCheckCardGroup v-model="selected" multiple>
    <ProCheckCard title="Option A" value="A" />
    <ProCheckCard title="Option B" value="B" />
  </ProCheckCardGroup>
</template>
```

## Dependencies

- `@antdv-next1/pro-provider` — Theme and configuration context
- `@antdv-next1/pro-utils` — Shared utilities

## License

[MIT](../../LICENSE)
