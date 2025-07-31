---
category: Components
subtitle: 高级表单
type: 数据录入
cols: 2
title: ProForm
cover: https://gw.alipayobjects.com/zos/alicdn/qtJm4yt45/AutoComplete.svg
---

## API

### ProForm

| Property          | Description                                                                                                  | Type                         | Default Value |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------- | ------------- |
| formProps         | antd 基础表单 props                                                                                          | object                       |               |
| searchGutter      | 表单 gutter                                                                                                  | number                       | 24            |
| style             | 自定义样式                                                                                                   | object                       | undefined     |
| defaultColsNumber | 自定义折叠状态下默认显示的表单控件数量，没有设置或小于 0，则显示一行控件; 数量大于等于控件数量则隐藏展开按钮 | Number                       | undefined     |
| collapsed         | 是否折叠超出的表单项，用于受控模式                                                                           | Boolean                      | undefined     |
| defaultCollapsed  | 默认状态下是否折叠超出的表单项                                                                               | Boolean                      | true          |
| preserve          | 是否能够查询收起的数据，如果设置为 false，收起后的表单数据将会丢失                                           | Boolean                      | true          |
| split             | 每一行是否有分割线                                                                                           | Boolean                      | undefined     |
| submitButtonProps | 提交按钮的 props                                                                                             | Object                       | undefined     |
| submitter         | 重置、查询、展开收起按钮 props                                                                               | SubmitterProps               | undefined     |
| onCollapsed       | 切换表单折叠状态时的回调                                                                                     | (collapsed: boolean) => void | undefined     |
| onFinish          | 表单提交                                                                                                     | (fromModel: any) => void     | undefined     |
| onSubmit          | 表单提交                                                                                                     | (fromModel: any) => void     | undefined     |
| onReset           | 重置表单                                                                                                     | (fromModel: any) => void     | undefined     |
