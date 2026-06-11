---
category: Components
title: ProFormFields
subtitle: 表单项
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YSm4RI3iOJ8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*03dxS64LxeQAAAAAAAAAAAAADrJ8AQ/original
group: 数据录入
---

一个表单除了 Form 之外还是需要一系列的表单项，ProForm 自带了数量可观的表单项，这些组件本质上是 Form.Item 和 组件的结合，我们可以把他们当成一个 FormItem 来使用，并且支持各种 props。每个表单项都支持 fieldProps 属性来支持设置输入组件的props。 我们支持了 placeholder 的透传，你可以直接在组件上设置 placeholder。

每个表单项同时也支持了 readonly ，不同的组件会有不同的只读样式，与 disable 相比 readonly 展示更加友好。生成的 dom 也更小，比如 ProFormDigit 会自动格式化小数位数。

ProFormText 是 FormItem + Input 的产物，可以类比于以下的代码：

```tsx
const ProFormText = (props) => {
  return (
    <ProFormItem {...props}>
      <Input placeholder={props.placeholder} {...props.fieldProps} />
    </ProFormItem>
  );
};
```

## 何时使用 {#when-to-use}

一个表单除了 Form 之外还是需要一系列的表单项，ProForm 自带了数量可观的表单项，这些组件本质上是 Form.Item 和 组件的结合，我们可以把他们当成一个 FormItem 来使用，并且支持各种 props。每个表单项都支持 fieldProps 属性来支持设置输入组件的props。 我们支持了 placeholder 的透传，你可以直接在组件上设置 placeholder。

## 代码演示 {#examples}

<demo-group>
    <demo src="./demo/components-other.vue">表单项</demo>
</demo-group>

## API

### 属性 {#props}

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |

### 事件 {#events}

| 事件名 | 说明 | 类型 | 版本 |
| ----- | --- | --- | --- |

### 方法 {#methods}

| 方法 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
