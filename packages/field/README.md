# @antdv-next1/pro-field

Rich field rendering component for Pro Components. Supports read-only and edit modes with 30+ built-in value types.

## Installation

```bash
npm install @antdv-next1/pro-field
# or
pnpm add @antdv-next1/pro-field
```

## Peer Dependencies

- `vue` >= 3.5.30
- `antdv-next` >= 1.3.6

## Components

### Main Components

| Component | Description |
|-----------|-------------|
| `ProField` | Unified field renderer with automatic value type mapping |
| `ProPureField` | Pure field renderer without form item wrapper |
| `ValueTypeToComponent` | Automatic value-type to component mapper |

### Field Type Components

| Component | Value Type | Description |
|-----------|------------|-------------|
| `FieldText` | `text` | Plain text display / input |
| `FieldTextArea` | `textarea` | Multi-line text |
| `FieldPassword` | `password` | Password with visibility toggle |
| `FieldSelect` | `select` | Dropdown select |
| `FieldCheckbox` | `checkbox` | Checkbox input |
| `FieldRadio` | `radio` | Radio input |
| `FieldDigit` | `digit` | Numeric input |
| `FieldDigitRange` | `digitRange` | Numeric range input |
| `FieldMoney` | `money` | Currency display / input |
| `FieldPercent` | `percent` | Percentage display / input |
| `FieldProgress` | `progress` | Progress bar |
| `FieldRate` | `rate` | Star rating |
| `FieldSlider` | `slider` | Slider input |
| `FieldSwitch` | `switch` | Toggle switch |
| `FieldDatePicker` | `date` | Date picker |
| `FieldDateRangePicker` | `dateRange` | Date range picker |
| `FieldTimePicker` | `time` | Time picker |
| `FieldTimeRangePicker` | `timeRange` | Time range picker |
| `FieldFromNow` | `fromNow` | Relative time display |
| `FieldSecond` | `second` | Seconds display |
| `FieldCascader` | `cascader` | Cascading select |
| `FieldTreeSelect` | `treeSelect` | Tree select |
| `FieldColorPicker` | `colorPicker` | Color picker |
| `FieldImage` | `image` | Image display |
| `FieldCode` | `code` | Code block display |
| `FieldStatus` | `status` | Status badge |
| `FieldIndexColumn` | `indexColumn` | Index column |
| `FieldSegmented` | `segmented` | Segmented control |
| `FieldOptions` | `options` | Options group |

## Usage

```vue
<script setup lang="ts">
import { ProField } from '@antdv-next1/pro-field'
</script>

<template>
  <!-- Read-only mode -->
  <ProField :text="1000" mode="read" value-type="money" />

  <!-- Edit mode -->
  <ProField v-model:text="value" mode="edit" value-type="select" :field-props="{ options }" />
</template>
```

## Dependencies

- `@antdv-next1/pro-provider` — Theme and configuration context
- `@antdv-next1/pro-utils` — Shared utilities
- `swrv` — Stale-while-revalidate data fetching

## License

[MIT](../../LICENSE)
