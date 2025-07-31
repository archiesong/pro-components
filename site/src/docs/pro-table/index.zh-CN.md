---
category: Components
subtitle: 高级表格
type: 数据展示
cols: 2
title: ProTable
cover: https://gw.alipayobjects.com/zos/antfincdn/Hw%26ryTueTW/bianzu%2525204.png
---

ProTable 的诞生是为了解决项目中需要写很多 table 的样板代码的问题，所以在其中封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。


依托于 ProForm 的能力，ProForm 拥有多种形态，可以切换查询表单类型，设置变形成为一个简单的 Form 表单，执行新建等功能。

  <img src="https://gw.alipayobjects.com/zos/antfincdn/Hw%26ryTueTW/bianzu%2525204.png" width="100%" />

## 何时使用

当你的表格需要与服务端进行交互或者需要多种单元格样式时，ProTable 是不二选择。


## API
ProTable 在 antd 的 Table 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 antd Table 不同的 API。

### request

`request` 是 ProTable 最重要的 API，`request` 会接收一个对象。对象中必须要有 `data` 和 `success`，如果需要手动分页 `total` 也是必需的。`request` 会接管 `loading` 的设置，同时在查询表单查询时和 `params` 参数发生修改时重新执行。同时查询表单的值和 `params` 参数也会带入。以下是一个例子：

```tsx
<ProTable 
  // params 是需要自带的参数
  // 这个参数优先级更高，会覆盖查询表单的参数
  params={params}
  request={async (
    // 第一个参数 params 查询表单和 params 参数的结合
    // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
    params: T & {
      pageSize: number;
      current: number;
    },
    sort,
    filter,
  ) => {
    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
    // 如果需要转化参数可以在这里进行修改
    const msg = await myQuery({
      page: params.current,
      pageSize: params.pageSize,
    });
    return {
      data: msg.result,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: boolean,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: number,
    };
  }}
/>
```

列配置中也支持 `request`，但是只有几种 [valueType](/components/schema#valuetype) 支持。


### ProTable

| 属性   | 描述                        | 类型                        | 默认值               |
| ----- | --------------------------- | --------------------------- | -------------------- |
| request | 获取 `dataSource` 的方法       | `(params?: {pageSize,current},sort,filter) => {data,success,total}` | - |


### Columns 列定义

> 请求远程数据比较复杂，详细可以看 [这里](/components/schema#request-和-params)

| 属性   | 描述                        | 类型                        | 默认值               |
| ----- | --------------------------- | --------------------------- | -------------------- |
| title |  与 antd 中基本相同，但是支持通过传入一个方法 | `VueNode | ((config: ProColumnType<T>, type: ProTableTypes) => VueNode)` | - |