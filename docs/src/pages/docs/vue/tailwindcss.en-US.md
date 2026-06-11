---
title: Tailwind CSS
---

Before anything else, wrap the `App.vue` entry with `a-app` so the runtime has a parent style container:

```vue
<template>
  <a-app>
    <router-view />
  </a-app>
</template>
```

If you want to keep using Tailwind CSS in an `antdv-next` project while aligning utility classes with Ant Design design tokens, use `@antdv-next/tailwind`.

This plugin maps Ant Design CSS variables into Tailwind's theme system, so utilities like `bg-primary`, `shadow-card`, and `text-h1` can still follow `antdv-next` runtime theming.

## Package Info

- Package: `@antdv-next/tailwind`
- `peerDependencies`: `tailwindcss >= 3.0.0`

## Installation

```bash
pnpm add -D tailwindcss @antdv-next/tailwind
```

## When to use it

This package is a good fit when:

- your project already uses Tailwind CSS
- you want utilities aligned with Ant Design design tokens
- you want to keep the Tailwind workflow while integrating `antdv-next` theme variables
- you need runtime theme switching instead of fixed build-time colors

If you prefer an UnoCSS-based approach, see the [UnoCSS](/docs/vue/unocss) guide.

## Tailwind CSS v4 (Recommended)

For Tailwind CSS v4, the recommended approach is to wire the theme through the `@theme` mechanism.

### Option 1: Import the theme file directly

In your CSS entry:

```css
@import "tailwindcss";
@import "@antdv-next/tailwind/theme.css";
```

This is the simplest approach and works for most projects.

### Option 2: Generate theme CSS dynamically

If you need a custom CSS variable prefix, use the `v4` generator:

```ts
import { generateThemeCSS } from '@antdv-next/tailwind/v4'

const css = generateThemeCSS()

const customCss = generateThemeCSS({
  antPrefix: 'my-app',
})
```

## Tailwind CSS v3

If you are still on Tailwind CSS v3, use the plugin form.

### Basic setup

```ts
import antdPlugin from '@antdv-next/tailwind'

export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [antdPlugin],
}
```

### Custom setup

```ts
import { createAntdPlugin } from '@antdv-next/tailwind'

export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [
    createAntdPlugin({
      antPrefix: 'ant',
    }),
  ],
}
```

## Usage Example

```vue
<template>
  <div class="bg-primary text-white p-lg rounded-lg shadow-card">
    <h1 class="text-h1 text-primary">Hello Antdv Next</h1>
    <p class="text-text-secondary mt-sm">
      Tailwind CSS utilities powered by Ant Design theme variables
    </p>
    <button class="bg-success hover:bg-success-hover px-md py-sm rounded-sm">
      Success Button
    </button>
  </div>
</template>
```

Common utility groups include:

- colors: `bg-primary`, `text-primary`, `border-primary`
- status colors: `bg-success`, `bg-warning`, `bg-error`
- palette colors: `bg-blue-1`, `text-red-6`
- spacing: `p-lg`, `px-sm`, `m-md`
- radius: `rounded-xs`, `rounded-lg`
- typography: `text-sm`, `text-lg`, `text-h1`
- shadows: `shadow-card`, `shadow-sec`

## Common Utility Reference

### Colors and Backgrounds

| Class | Description | Typical Use |
| --- | --- | --- |
| `bg-primary` | Primary background color | Primary buttons, emphasis blocks, brand areas |
| `text-primary` | Primary accent text color | Links, highlighted copy, emphasized headings |
| `bg-success` | Success background color | Success messages and state tags |
| `text-text-secondary` | Secondary text color | Helper text and notes |
| `bg-container` | Container background color | Cards, panels, popup content areas |
| `border-border` | Default border color | Borders, dividers, input wrappers |

### Spacing and Layout

| Class | Description | Typical Use |
| --- | --- | --- |
| `p-lg` | Large padding | Cards, popups, grouped containers |
| `px-md` | Medium horizontal padding | Buttons, tags, inputs |
| `py-sm` | Small vertical padding | Compact blocks |
| `m-md` | Medium margin | Spacing between modules |
| `mt-sm` | Small top margin | Space between headings and content |
| `rounded-lg` | Large border radius | Cards, dialogs, outer containers |

### Typography and Shadows

| Class | Description | Typical Use |
| --- | --- | --- |
| `text-h1` | H1 title size | Main page headings |
| `text-lg` | Large text size | Section titles and emphasis text |
| `text-sm` | Small text size | Supporting text and secondary content |
| `shadow-card` | Card shadow | Elevating card surfaces |
| `shadow-sec` | Secondary shadow | Light floating surfaces |
| `shadow-ter` | Tertiary shadow | Even lighter elevation layers |

## Relation to Theming

This plugin relies on Ant Design CSS variables, so your app should already be wrapped with `ConfigProvider`, and you can combine it with [Customize Theme](/docs/vue/customize-theme) when you need to adjust tokens.

```vue
<script setup lang="ts">
import { ConfigProvider } from 'antdv-next'
</script>

<template>
  <ConfigProvider>
    <RouterView />
  </ConfigProvider>
</template>
```

## Notes

- For v4, importing `theme.css` directly is the lowest-friction setup.
- Both v3 and v4 keep Tailwind global spacing behavior intact, so classes like `gap-*` and `max-w-*` still follow Tailwind defaults.
- If you change the CSS variable prefix, keep `antPrefix` aligned in the plugin config.
