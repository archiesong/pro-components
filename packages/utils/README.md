# @antdv-next1/pro-utils

Shared utility functions, composables, and common components for the Pro Components ecosystem.

## Installation

```bash
npm install @antdv-next1/pro-utils
# or
pnpm add @antdv-next1/pro-utils
```

## Peer Dependencies

- `vue` >= 3.5.30
- `antdv-next` >= 1.3.4

## What's Included

### Utility Functions

| Function | Description |
|----------|-------------|
| `isBrowser` | Check if running in browser environment |
| `isImg` | Check if a value is an image URL |
| `isNil` | Check if value is `null` or `undefined` |
| `isUrl` | Check if a value is a valid URL |
| `isDropdownValueType` | Check if value type is dropdown |
| `omitUndefined` | Remove `undefined` values from object |
| `omitBoolean` | Remove boolean values from object |
| `omitUndefinedAndEmptyArr` | Remove `undefined` and empty array values |
| `deepMerge` | Deep merge objects |
| `merge` | Merge objects |
| `nanoid` | Generate unique ID |
| `stringify` | Safe JSON stringify |
| `transformKeySubmitValue` | Transform form key submit values |
| `transformBooleanProps` | Transform boolean props |
| `runFunction` | Safely run a function |
| `normalizeProps` | Normalize component props |
| `pickProProps` | Pick pro-specific props |
| `pickProFormItemProps` | Pick pro form item props |
| `getFieldPropsOrFormItemProps` | Get field or form item props |
| `proFieldParsingText` | Parse pro field text values |

### Composables (Hooks)

| Hook | Description |
|------|-------------|
| `useMountMergeState` | State that merges on mount |
| `useEditableArray` | Manage editable array data |
| `usePrevious` | Track previous value |
| `useRefFunction` | Ref-based callback function |
| `useBreakpoint` | Responsive breakpoint detection (via `useMedia`) |
| `useFormFieldContextInject` / `useFormFieldContextProvider` | Form field context utilities |
| `useProFormContextInject` / `useProFormContextProvider` | Pro form context utilities |

### Components

| Component | Description |
|-----------|-------------|
| `ErrorBoundary` | Error boundary wrapper component |
| `CopyToClipboard` | Copy content to clipboard |
| `FieldLabel` | Field label component |
| `LabelIconTip` | Label with icon tooltip |
| `FormList` | Dynamic form list component |
| `FormItem` | Enhanced form item component |
| `FilterDropdown` | Filter dropdown component |
| `DropdownFooter` | Dropdown footer component |
| `InlineErrorFormItem` | Inline error form item |

### Date Utilities

| Function | Description |
|----------|-------------|
| `parseValueToDay` | Parse value to Day.js object |
| `conversionMomentValue` | Convert moment-compatible values |
| `dateArrayFormatter` | Format date arrays |

## License

[MIT](../../LICENSE)
