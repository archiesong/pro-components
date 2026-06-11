---
category: Components
title: Modal/Drawer
subtitle: 浮层表单
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YSm4RI3iOJ8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*03dxS64LxeQAAAAAAAAAAAAADrJ8AQ/original
group: 数据录入
---

包含弹窗（ModalForm）/抽屉（DrawerForm）封装的高级表单。

## 何时使用 {#when-to-use}

ModalForm 和 DrawerForm 是 ProForm 的一个变体，本质上仍然是个表单。所以无法通过 footer 来自定义页脚，如果要定义页脚需要使用 submitter.render 来进行自定义。这两个表单的表现与 ProForm 相同，可以从 ProForm 直接修改而来。

ModalForm 和 DrawerForm 都提供了 trigger 来减少 state 的使用，如果你需要使用 state 来控制可以使用 open 和 onOpenChange 来控制打开与关闭。

## 代码演示 {#examples}

<demo-group>
    <demo src="./demo/modal-form.vue">弹窗表单</demo>
    <demo src="./demo/drawer-form.vue">抽屉表单</demo>
    <demo src="./demo/modal-form-submitter.vue">自定义 Modal 表单按钮</demo>
</demo-group>

## API

### 属性 {#props}

通用属性参考：[通用属性](/docs/vue/common-props)

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number | 0 | - |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number | - | - |
| target | 设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () =&gt; Window \| HTMLElement \| null | () =&gt; window | - |

### 事件 {#events}

| 事件名 | 说明 | 类型 | 版本 |
| ----- | --- | --- | --- |
| change | 固定状态改变时触发的回调函数 | (affixed?: boolean) =&gt; void | - |

### 方法 {#methods}

| 方法 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| updatePosition | - | ReturnType&lt;typeof throttleByAnimationFrame&gt; | - |

**注意：**`Affix` 内的元素不要使用绝对定位，如需要绝对定位的效果，可以直接设置 `Affix` 为绝对定位：

```html
<a-affix style="position: absolute;top: y; left: x">...</a-affix>
```

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="Affix"></ComponentTokenTable>

查看 [定制主题](/docs/vue/customize-theme) 了解如何使用主题变量。

## FAQ

### Affix 使用 `target` 绑定容器时，元素会跑到容器外。 {#faq-target-container}

从性能角度考虑，我们只监听容器滚动事件。如果希望任意滚动，你可以在窗体添加滚动监听：<https://codesandbox.io/s/stupefied-maxwell-ophqnm?file=/index.js>

相关 issue：[#3938](https://github.com/ant-design/ant-design/issues/3938) [#5642](https://github.com/ant-design/ant-design/issues/5642) [#16120](https://github.com/ant-design/ant-design/issues/16120)

### Affix 在水平滚动容器中使用时， 元素 `left` 位置不正确。 {#faq-horizontal-scroll}

Affix 一般只适用于单向滚动的区域，只支持在垂直滚动容器中使用。如果希望在水平容器中使用，你可以考虑使用 原生 `position: sticky` 实现。

相关 issue: [#29108](https://github.com/ant-design/ant-design/issues/29108)
