---
title: Secondary Development
---

If you want to build your own business component library, documentation site, and demo system on top of `antdv-next`, we provide a ready-to-use starter repository: [docs-base](https://github.com/antdv-next/docs-base).

This template is more than a basic scaffold. It combines component source code, documentation pages, a Markdown demo pipeline, and library build outputs in one project, making it suitable for teams that want to evolve and publish internal or public component libraries continuously.

## Template Repository

- GitHub: [https://github.com/antdv-next/docs-base](https://github.com/antdv-next/docs-base)
- Chinese README: [README.zh-CN.md](https://github.com/antdv-next/docs-base/blob/main/README.zh-CN.md)
- English README: [README.md](https://github.com/antdv-next/docs-base/blob/main/README.md)

## When to use it

Use this template when you want to:

- build a business-oriented component library based on `antdv-next`
- keep component source, demos, and documentation in one place
- ship typed Vue 3 components
- write docs in Markdown while embedding real Vue demos
- maintain Chinese and English docs with the same structure
- create your own theme system instead of inheriting a fixed visual style

## What is included

- Vue 3 + TypeScript + Vite
- `antdv-next` as the UI foundation
- preserved module output, bundled ESM, and UMD builds
- generated type declarations
- a custom Markdown-to-Vue docs pipeline
- live demo rendering, source extraction, and hot updates
- UnoCSS, Vue Router, Pinia, and Vue I18n integration
- sample components and documentation pages that you can extend directly

## One thing to do before you start

The template uses `@org/components` as a placeholder package name. Before secondary development, do a global search and replace for `@org/components` and switch it to your actual package name.

## Quick Start

### 1. Clone the template

```bash
git clone https://github.com/antdv-next/docs-base.git
cd docs-base
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the docs app

```bash
pnpm docs:dev
```

The local development site runs at [http://localhost:6878](http://localhost:6878) by default.

### 4. Build the library

```bash
pnpm build
```

Other useful commands:

```bash
pnpm docs:build
pnpm docs:preview
pnpm type-check
pnpm test:unit
```

## Recommended Workflow

### 1. Rename the package and publishing metadata

- replace `@org/components` globally
- update the package name and publish metadata in `package.json`

### 2. Build your business components

Create or adapt components under `components/`, and export them from `components/index.ts` so the public API stays explicit and stable.

### 3. Write documentation pages

Add Markdown pages under `docs/src/pages/`. The template auto-registers `.md` files as routes through `import.meta.glob`.

Recommended locale naming:

- `*.zh-CN.md`
- `*.en-US.md`

### 4. Add demos next to docs pages

Place demo files in a sibling `demo/` directory and reference them like this:

```md
<demo-group>
  <demo src="./demo/basic.vue">Basic example</demo>
</demo-group>
```

The docs pipeline will automatically:

- render the live Vue demo
- extract the source code
- generate highlighted code blocks
- hot-update demo metadata during development

## Project Structure

```text
.
├─ components/                 # Business component source
├─ docs/                       # Documentation app
│  ├─ src/pages/               # Markdown pages and home page
│  ├─ src/components/demo/     # Demo renderer and source viewer
│  └─ plugins/markdown/        # Markdown / demo transform pipeline
├─ vite.build.config.ts        # Preserve-module build
├─ vite.esm.config.ts          # Bundled ESM build
├─ vite.umd.config.ts          # UMD build
└─ global.d.ts                 # Global component typings
```

## Theme Notes

The template is intentionally theme-neutral. You can build your own brand style, design tokens, and component appearance on top of it. For the theming side, see [Customize Theme](/docs/vue/customize-theme).

## Who this template is for

If you do not want to maintain demos in a separate repo and prefer to keep:

- component implementation
- documentation pages
- live examples
- multilingual content
- build outputs

in a single codebase, `docs-base` is a practical starting point.
