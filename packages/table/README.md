# @antdv-next1/pro-table

Enhanced table component with search form, toolbar, drag-and-drop sorting, and editable rows for Pro Components.

## Installation

```bash
npm install @antdv-next1/pro-table
# or
pnpm add @antdv-next1/pro-table
```

## Peer Dependencies

- `vue` >= 3.5.30
- `antdv-next` >= 1.3.6

## Components

| Component | Description |
|-----------|-------------|
| `ProTable` | Main table with search form, toolbar, and data fetching |
| `DragSortTable` | Table with drag-and-drop row sorting |
| `EditableTable` | Table with inline editable rows |
| `TableDropdown` | Dropdown actions for table toolbar |
| `TableDropdownButton` | Dropdown button for table actions |

## Usage

### Basic Table

```vue
<script setup lang="ts">
import { ProTable } from '@antdv-next1/pro-table'
import type { ProColumns } from '@antdv-next1/pro-table'

const columns: ProColumns[] = [
  { title: 'Name', dataIndex: 'name', valueType: 'text' },
  { title: 'Age', dataIndex: 'age', valueType: 'digit' },
  { title: 'Status', dataIndex: 'status', valueType: 'select', valueEnum: statusEnum },
  { title: 'Created At', dataIndex: 'createdAt', valueType: 'date' },
  {
    title: 'Actions',
    valueType: 'option',
    render: (_, record) => [
      <a key="edit" onClick={() => handleEdit(record)}>Edit</a>,
      <a key="delete" onClick={() => handleDelete(record)}>Delete</a>,
    ],
  },
]

async function fetchData(params: any) {
  const res = await api.getList(params)
  return { data: res.data, total: res.total, success: true }
}
</script>

<template>
  <ProTable :columns="columns" :request="fetchData" row-key="id" />
</template>
```

### Drag Sort Table

```vue
<script setup lang="ts">
import { DragSortTable } from '@antdv-next1/pro-table'
</script>

<template>
  <DragSortTable
    :columns="columns"
    :data-source="dataSource"
    :drag-sort-key="sortKey"
    @drag-sort-end="onDragEnd"
  />
</template>
```

### Editable Table

```vue
<script setup lang="ts">
import { EditableTable } from '@antdv-next1/pro-table'
</script>

<template>
  <EditableTable
    v-model="dataSource"
    :columns="columns"
    :controlled="true"
  />
</template>
```

## Dependencies

- `@antdv-next1/pro-card` — Card wrapper component
- `@antdv-next1/pro-field` — Field rendering components
- `@antdv-next1/pro-form` — Search form components
- `@antdv-next1/pro-provider` — Theme and configuration context
- `@antdv-next1/pro-utils` — Shared utilities
- `@dnd-kit/vue` — Drag-and-drop library

## License

[MIT](../../LICENSE)
