---
category: Components
subtitle: Advanced Layout
type: Layout
cols: 2
title: ProLayout
---

ProLayout provides a standard, yet flexible, middle and backend layout, with one-click layout switching and automatic menu generation. It can be used with PageContainer to automatically generate breadcrumbs, page headers, and provide a low-cost solution to access the footer toolbar.

## When to use

ProLayout can be used to reduce layout costs when content needs to be carried on a page.

## API

### ProLayout

> All methods suffixed with `Render` can be made not to render by passing `false`.

### 2323


| Parameters | Description                 | Type                        | Default              |
| ---------- | --------------------------- | --------------------------- | -------------------- |
| title      | layout 的左上角的 title     | `VueNode`                   | `Ant Design Vue Pro` |
| logo       | layout 的左上角 logo 的 url | `VueNode` \| `()=> VueNode` | -                    |
