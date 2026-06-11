# 组件 API 文档结构规范

## 概述

本文档定义了 antdv-next 项目中组件 API 文档的统一结构和格式规范。所有组件文档（中英文）都应遵循此规范。

## 基本原则

1. **移除所有版本号**：所有属性、事件、插槽、方法的版本列统一设置为 `-`
2. **统一锚点格式**：使用 `{#section-name}` 格式，例如 `{#carousel-props}`
3. **通用属性位置**：`Common props ref` 始终放在 `## API` 标题下方
4. **语义化结构**：根据组件是否有子组件采用不同的标题层级

## 文档结构模板

### 单一组件（无子组件）

适用于：Button、Carousel、Input 等独立组件

#### 英文文档

```markdown
## API

Common props ref：[Common props](/docs/vue/common-props)

### Props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| propName | Description | Type | defaultValue | - |

### Events

| Event | Description | Type | Version |
| --- | --- | --- | --- |
| eventName | Description | (params) => void | - |

### Slots

| Slot | Description | Type | Version |
| --- | --- | --- | --- |
| slotName | Description | () => any | - |

### Methods

| Method | Description | Type | Version |
| --- | --- | --- | --- |
| methodName | Description | (params) => void | - |
```

#### 中文文档

```markdown
## API

通用属性参考：[通用属性](/docs/vue/common-props)

### 属性 {#props}

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| propName | 说明 | Type | defaultValue | - |

### 事件 {#events}

| 事件 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| eventName | 说明 | (params) => void | - |

### 插槽 {#slots}

| 插槽 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| slotName | 说明 | () => any | - |

### 方法 {#methods}

| 方法 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| methodName | 说明 | (params) => void | - |
```

**要点**：
- 直接使用三级标题（`###`）
- **英文文档**：标题不加锚点 ID
- **中文文档**：标题使用简化锚点 ID（`{#props}`、`{#events}`、`{#slots}`、`{#methods}`）
- 无需添加组件名称的三级标题

### 带子组件的组件

适用于：Card、Menu、Table 等包含子组件的组件

```markdown
## API

Common props ref：[Common props](/docs/vue/common-props)

### MainComponent

#### Props {#main-component-props}

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| propName | Description | Type | defaultValue | - |

#### Events {#main-component-events}

| Event | Description | Type | Version |
| --- | --- | --- | --- |
| eventName | Description | (params) => void | - |

#### Slots {#main-component-slots}

| Slot | Description | Type | Version |
| --- | --- | --- | --- |
| slotName | Description | () => any | - |

### SubComponent

#### Props {#sub-component-props}

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| propName | Description | Type | defaultValue | - |

#### Slots {#sub-component-slots}

| Slot | Description | Type | Version |
| --- | --- | --- | --- |
| slotName | Description | () => any | - |
```

**要点**：
- 使用三级标题（`###`）区分主组件和子组件
- 使用四级标题（`####`）表示各个部分（Props、Events、Slots）
- 每个组件的锚点 ID 应包含组件名称

### 带类型定义的组件

适用于：Anchor、Breadcrumb 等需要额外类型说明的组件

```markdown
## API

Common props ref：[Common props](/docs/vue/common-props)

### ComponentName

#### Props {#component-props}

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| items | Data items | [ItemType[]](#itemtype) | - | - |

#### Events {#component-events}

...

#### Slots {#component-slots}

...

## Types {#types}

### ItemType {#itemtype}

> type ItemType = ...

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| key | Unique key | string \| number | - | - |

### SubType {#subtype}

...
```

**要点**：
- 类型定义独立为二级标题 `## Types {#types}`
- 每个类型使用三级标题（`###`）
- 在 Props 表格中链接到类型定义：`[ItemType[]](#itemtype)`

## 中英文对照

### 标题翻译

| 中文 | 英文 |
|-----|------|
| 属性 | Props |
| 事件 | Events |
| 插槽 | Slots |
| 方法 | Methods |
| 类型 | Types |

### 表格列名

| 中文 | 英文 |
|-----|------|
| 属性 | Property |
| 说明 | Description |
| 类型 | Type |
| 默认值 | Default |
| 版本 | Version |
| 事件 | Event |
| 插槽 | Slot |
| 方法 | Method |

### 通用属性参考

- 中文：`通用属性参考：[通用属性](/docs/vue/common-props)`
- 英文：`Common props ref：[Common props](/docs/vue/common-props)`

## 版本号处理规则

**统一规则：所有版本号改为 `-`**

需要移除的版本号格式示例：
- `5.24.0` → `-`
- `4.7.0` → `-`
- `dotDuration: 5.24.0` → `-`
- `` `info`: 5.6.0`` → `-`
- `< 5.4.0` → `-`

## 锚点 ID 命名规范

### 单一组件

- **英文文档**：标题不使用锚点 ID
  ```markdown
  ### Props
  ### Events
  ### Slots
  ### Methods
  ```

- **中文文档**：使用简化锚点 ID
  ```markdown
  ### 属性 {#props}
  ### 事件 {#events}
  ### 插槽 {#slots}
  ### 方法 {#methods}
  ```

### 多组件页面

锚点 ID 格式：`{#component-name-section}`

#### 英文文档示例

- Card Props: `{#card-props}`
- CardGrid Props: `{#card-grid-props}`
- CardMeta Props: `{#card-meta-props}`
- CardMeta Slots: `{#card-meta-slots}`

#### 中文文档示例

- Card 属性: `{#card-props}`
- CardGrid 属性: `{#card-grid-props}`
- CardMeta 属性: `{#card-meta-props}`
- CardMeta 插槽: `{#card-meta-slots}`

### 类型定义

始终使用简化锚点 ID（中英文相同）：
- Types: `{#types}`
- ItemType: `{#itemtype}`
- RouteItemType: `{#routeitemtype}`

## 实际案例

### 案例 1：Carousel（单一组件）

#### 英文文档结构：
```
## API
Common props ref
### Props
### Events
### Slots
### Methods
```

#### 中文文档结构：
```
## API
通用属性参考
### 属性 {#props}
### 事件 {#events}
### 插槽 {#slots}
### 方法 {#methods}
```

### 案例 2：Card（带子组件）

**结构：**
```
## API
Common props ref
### Card
#### Props {#card-props}
#### Events {#card-events}
#### Slots {#card-slots}
### CardGrid
#### Props {#card-grid-props}
### CardMeta
#### Props {#card-meta-props}
#### Slots {#card-meta-slots}
```

### 案例 3：Anchor（带类型定义）

**结构：**
```
## API
Common props ref
### Anchor
#### Props {#anchor-props}
#### Events {#anchor-events}
#### Slots {#anchor-slots}
## Types {#types}
### ItemType {#itemtype}
### RouteItemType {#routeitemtype}
### SeparatorType {#separatortype}
```

## 修改检查清单

修改组件文档时，请确保：

- [ ] 移除所有版本号，统一改为 `-`
- [ ] 检查标题层级是否正确（单一组件用三级标题，有子组件用三级+四级标题）
- [ ] 确认锚点 ID 格式正确：
  - 单一组件英文：不使用锚点 ID
  - 单一组件中文：使用简化锚点 ID（`{#props}`）
  - 多组件页面：使用完整锚点 ID（`{#component-name-section}`）
- [ ] 通用属性参考位于 `## API` 下方
- [ ] 中英文文档结构一致
- [ ] 表格列名翻译正确
- [ ] 删除重复的 Events/Slots/Methods 部分
- [ ] 如有类型定义，确保独立为 `## Types` 章节

## 常见问题

### Q: 何时使用三级标题，何时使用四级标题？

A:
- **单一组件**：直接使用三级标题（`### Props`）
- **有子组件**：三级标题区分组件（`### Card`），四级标题表示部分（`#### Props`）

### Q: 版本号列是否可以完全删除？

A: 不可以。保留版本号列，但所有值统一设置为 `-`。

### Q: 锚点 ID 的使用规则是什么？

A:
- **单一组件**：
  - 英文文档不使用锚点 ID
  - 中文文档使用简化锚点 ID（`{#props}`、`{#events}`等）
- **多组件页面**：中英文都使用完整锚点 ID（`{#card-props}`、`{#card-grid-props}`等）
- **类型定义**：始终使用简化锚点 ID（`{#itemtype}`等）

### Q: 如果组件只有 Props 和 Events，没有 Slots，是否仍需保留 Slots 标题？

A: 不需要。只为存在的部分创建标题和表格。

## 更新记录

- 2026-01-20: 初始版本，基于 Anchor、Avatar、Breadcrumb、Calendar、Card、Carousel 组件的调整经验
