# @antdv-next1/route-utils

Route transformation, menu data generation, and path matching utilities for Pro Layout.

## Installation

```bash
npm install @antdv-next1/route-utils
# or
pnpm add @antdv-next1/route-utils
```

## What's Included

| Export | Description |
|--------|-------------|
| `transformRoute` | Transform route configuration into menu data |
| `getFlatMenus` | Flatten nested menu structure |
| `getMatchMenu` | Get matched menu items by path |
| `path-to-regexp` | Path pattern matching utilities |
| `sha265` | SHA-256 hashing utility |

## Core Types

### MenuDataItem

```ts
interface MenuDataItem {
  children?: MenuDataItem[]
  meta?: MetaRecord
  path: string
  key?: string
  name?: string | symbol
  [key: string]: any
}
```

### MetaRecord

```ts
interface MetaRecord {
  hideInMenu?: boolean         // Hide this item and children from menu
  hideChildrenInMenu?: boolean // Hide children from menu
  icon?: any                   // Menu icon
  title?: string               // Menu title
  locale?: string | false      // Custom i18n key
  [key: string]: any
}
```

## Usage

```ts
import { transformRoute, getFlatMenus, getMatchMenu } from '@antdv-next1/route-utils'

// Transform route config to menu data
const { menuData } = transformRoute(routes)

// Flatten menus
const flatMenus = getFlatMenus(menuData)

// Match current path
const matched = getMatchMenu('/dashboard', menuData)
```

## License

[MIT](../../LICENSE)
