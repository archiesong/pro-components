# @antdv-next1/pro-form

Advanced form components with multiple layouts, schema-driven forms, and rich form field bindings for Pro Components.

## Installation

```bash
npm install @antdv-next1/pro-form
# or
pnpm add @antdv-next1/pro-form
```

## Peer Dependencies

- `vue` >= 3.5.30
- `antdv-next` >= 1.3.6

## Form Layouts

| Component | Description |
|-----------|-------------|
| `ProForm` | Standard pro form with submit/reset |
| `ProQueryFilter` | Query filter form (collapsed/expanded) |
| `ProLightFilter` | Lightweight inline filter |
| `ProModalForm` | Form inside a modal dialog |
| `ProDrawerForm` | Form inside a drawer |
| `ProStepsForm` | Multi-step form wizard |
| `ProStepForm` | Individual step in a steps form |
| `ProLoginForm` | Login form |
| `ProLoginFormPage` | Full-page login form |

## Form Field Components

| Component | Description |
|-----------|-------------|
| `ProFormText` | Text input field |
| `ProFormTextArea` | Textarea field |
| `ProFormPassword` | Password input field |
| `ProFormSelect` | Select dropdown field |
| `ProFormSearchSelect` | Select with search capability |
| `ProFormTreeSelect` | Tree select field |
| `ProFormCascader` | Cascader field |
| `ProFormDigit` | Numeric input field |
| `ProFormDigitRange` | Numeric range field |
| `ProFormMoney` | Currency input field |
| `ProFormCheckbox` | Checkbox field |
| `ProFormCheckboxGroup` | Checkbox group field |
| `ProFormRadio` | Radio field |
| `ProFormRadioGroup` | Radio group field |
| `ProFormSwitch` | Switch field |
| `ProFormRate` | Rating field |
| `ProFormSlider` | Slider field |
| `ProFormSegmented` | Segmented control field |
| `ProFormDatePicker` | Date picker field |
| `ProFormDateRangePicker` | Date range picker field |
| `ProFormTimePicker` | Time picker field |
| `ProFormTimeRangePicker` | Time range picker field |
| `ProFormColorPicker` | Color picker field |
| `ProFormUploadButton` | Upload button field |
| `ProFormUploadDragger` | Drag-and-drop upload field |
| `ProFormCaptcha` | Captcha input field |
| `ProFormDependency` | Conditional dependency wrapper |
| `ProFormGroup` | Field group layout |
| `ProFormList` | Dynamic form list |
| `ProFormFieldSet` | Field set |
| `ProFormField` | Generic field wrapper |
| `ProFormItem` | Enhanced form item |
| `SchemaForm` | Schema-driven form generation |

## Usage

### Basic Form

```vue
<script setup lang="ts">
import { ProForm, ProFormText } from '@antdv-next1/pro-form'

function handleSubmit(values: Record<string, any>) {
  console.log(values)
}
</script>

<template>
  <ProForm @finish="handleSubmit">
    <ProFormText name="name" label="Name" :rules="[{ required: true }]" />
    <ProFormText name="email" label="Email" />
  </ProForm>
</template>
```

### Modal Form

```vue
<script setup lang="ts">
import { ProModalForm, ProFormText } from '@antdv-next1/pro-form'
</script>

<template>
  <ProModalForm v-model:open="visible" title="Edit User" @finish="onSubmit">
    <ProFormText name="name" label="Name" />
  </ProModalForm>
</template>
```

### Steps Form

```vue
<script setup lang="ts">
import { ProStepsForm, ProStepForm, ProFormText } from '@antdv-next1/pro-form'
</script>

<template>
  <ProStepsForm @finish="onFinish">
    <ProStepForm title="Step 1">
      <ProFormText name="name" label="Name" />
    </ProStepForm>
    <ProStepForm title="Step 2">
      <ProFormText name="phone" label="Phone" />
    </ProStepForm>
  </ProStepsForm>
</template>
```

## Dependencies

- `@antdv-next1/pro-field` — Field rendering components
- `@antdv-next1/pro-provider` — Theme and configuration context
- `@antdv-next1/pro-utils` — Shared utilities

## License

[MIT](../../LICENSE)
