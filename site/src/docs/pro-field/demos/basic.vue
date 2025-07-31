<docs>
---
order: 0
iframe: 400
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

基本使用方式

## en-US

Basic usage methods
</docs>

<template>
  <Space>
    <RadioGroup @change="handleRadioGroup" :value="state">
      <Radio value="read">只读</Radio>
      <Radio value="edit">编辑</Radio>
    </RadioGroup>
    简约模式
    <Switch :checked="plain" @change="handleSwitch" />
  </Space>
  <br />
  <br />
  <Descriptions :column="2">
    <DescriptionsItem label="空字符串">
      <ProField text="" mode="read" />
    </DescriptionsItem>
    <DescriptionsItem label="头像">
      <ProField text="https://avatars2.githubusercontent.com/u/8186664?s=60&v=4" mode="read" valueType="avatar" />
    </DescriptionsItem>
    <DescriptionsItem label="文本">
      <ProField text="这是一段文本" valueType="text" :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="图片">
      <ProField text="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" valueType="image"
        :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="金额">
      <ProField text="100" valueType="money" :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="颜色">
      <ProField text="blue" valueType="color" :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="数字">
      <ProField text="19897979797979" valueType="digit" :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="数字范围">
      <ProField :text="[123, 456]" valueType="digitRange" :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="秒格式化">
      <ProField :text="2000000" valueType="second" :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="百分比">
      <ProField text="100" valueType="percent" :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="评分">
      <ProField :text="3.5" valueType="rate" :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="选择框">
      <ProField text="open" :mode="state" :valueEnum="selectValueEnum" />
    </DescriptionsItem>
    <DescriptionsItem label="多选">
      <ProField :text="['open', 'closed']" :mode="state" valueType="checkbox" :valueEnum="checkboxValueEnum" />
    </DescriptionsItem>
    <DescriptionsItem label="多选 labelInValue">
      <ProField :text="[{ value: 'open1', label: '打开', }, { value: 'closed2', label: '关闭', },]" :mode="state"
        valueType="checkbox" :valueEnum="checkboxsValueEnum" />
    </DescriptionsItem>
    <DescriptionsItem label="单选">
      <ProField text="open" :mode="state" valueType="radio" :valueEnum="radioValueEnum" />
    </DescriptionsItem>
    <DescriptionsItem label="单选按钮">
      <ProField text="open" :mode="state" valueType="radioButton" :valueEnum="redioButton" />
    </DescriptionsItem>
    <DescriptionsItem label="远程选择框">
      <ProField text="open" :mode="state" valueType="select" :request="selectRequest" />
    </DescriptionsItem>
    <DescriptionsItem label="级联选择框">
      <ProField :text="['zhejiang', 'hangzhou', 'xihu']" :mode="state" valueType="cascader"
        :fieldProps="{ fieldNames: { label: 'name', }, }" :request="cascaderRequest" />
    </DescriptionsItem>
    <DescriptionsItem label="进度条">
      <ProField text="40" valueType="progress" :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="slider">
      <ProField text="40" valueType="slider" :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="百分比">
      <Space>
        <ProField :text="10" :valueType="{ type: 'percent', showSymbol: true, showColor: true, }" mode="read" />
        <ProField :text="0" :valueType="{ type: 'percent', showSymbol: true, showColor: true, }" mode="read" />
        <ProField :text="-10" :valueType="{ type: 'percent', showSymbol: true, showColor: true, }" mode="read" />
      </Space>
    </DescriptionsItem>
    <DescriptionsItem label="日期时间">
      <ProField :text="dayjs('2019-11-16 12:50:26').valueOf()" valueType="dateTime" :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="相对于当前时间">
      <Space>
        <ProField :text="dayjs('2019-11-16 12:50:26').valueOf()" valueType="fromNow" :mode="state" :plain="plain" />
        <ProField :text="dayjs('2020-11-16 12:50:26').valueOf()" valueType="fromNow" :mode="state" :plain="plain" />
      </Space>
    </DescriptionsItem>
    <DescriptionsItem label="日期">
      <ProField :text="dayjs('2019-11-16 12:50:26').valueOf()" valueType="date" :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="日期区间">
      <ProField :text="[dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(), dayjs('2019-11-16 12:50:26').valueOf(),]"
        :plain="plain" valueType="dateRange" :mode="state" />
    </DescriptionsItem>
    <DescriptionsItem label="日期时间区间">
      <ProField :text="[dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(), dayjs('2019-11-16 12:50:26').valueOf(),]"
        :plain="plain" valueType="dateTimeRange" :mode="state" />
    </DescriptionsItem>
    <DescriptionsItem label="时间">
      <ProField :text="dayjs('2019-11-16 12:50:26').valueOf()" :plain="plain" valueType="time" :mode="state" />
    </DescriptionsItem>
    <DescriptionsItem label="时间区间">
      <ProField :text="[dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(), dayjs('2019-11-16 12:50:26').valueOf(),]"
        :plain="plain" valueType="timeRange" :mode="state" />
    </DescriptionsItem>
    <DescriptionsItem label="密码">
      <ProField text="password" :plain="plain" valueType="password" :mode="state" />
    </DescriptionsItem>
    <DescriptionsItem label="代码块">
      <ProField :text="codeText" valueType="code" :mode="state" :plain="plain" />
    </DescriptionsItem>
    <DescriptionsItem label="JSON 代码块">
      <ProField :text="jsonCodeText" valueType="jsonCode" :mode="state" :plain="plain" />
    </DescriptionsItem>
  </Descriptions>
</template>

<script lang="ts" setup>
import { Descriptions, DescriptionsItem, Radio, RadioGroup, Space, Switch } from 'ant-design-vue';
import type { ProFieldFCMode } from '@ant-design-vue/pro-utils';
import ProField from '@ant-design-vue/pro-field';
import dayjs from 'dayjs';
import { ref } from 'vue';
const state = ref<ProFieldFCMode>('read');
const plain = ref<boolean>(false);
const handleRadioGroup = (event) => {
  state.value = event.target.value as ProFieldFCMode
}
const handleSwitch = (checked: boolean) => {
  plain.value = checked
}
const selectValueEnum = { all: { text: '全部', disabled: true, status: 'Default' }, open: { text: '未解决', status: 'Error', }, closed: { text: '已解决', status: 'Success', }, processing: { text: '解决中', status: 'Processing', }, }
const checkboxValueEnum = { all: { text: '全部', disabled: true, status: 'Default' }, open: { text: '未解决', status: 'Error', }, closed: { text: '已解决', status: 'Success', }, processing: { text: '解决中', status: 'Processing', }, }
const checkboxsValueEnum = { all: { text: '全部', disabled: true, status: 'Default' }, open: { text: '未解决', status: 'Error', }, closed: { text: '已解决', status: 'Success', }, processing: { text: '解决中', status: 'Processing', }, }
const radioValueEnum = { all: { text: '全部', disabled: true, status: 'Default' }, open: { text: '未解决', status: 'Error', }, closed: { text: '已解决', status: 'Success', }, processing: { text: '解决中', status: 'Processing', }, }
const redioButton = { all: { text: '全部', disabled: true, status: 'Default' }, open: { text: '未解决', status: 'Error', }, closed: { text: '已解决', status: 'Success', }, processing: { text: '解决中', status: 'Processing', }, }
const selectRequest = async () => [
  { label: '全部', value: 'all' },
  { label: '未解决', value: 'open' },
  { label: '已解决', value: 'closed' },
  { label: '解决中', value: 'processing' },
  {
    label: '特殊选项',
    value: 'optGroup',
    optionType: 'optGroup',
    options: [
      { label: '不解决', value: 'no' },
      { label: '已废弃', value: 'clear' },
    ],
  },
]
const cascaderRequest = async () => [
  {
    value: 'zhejiang',
    name: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        name: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            name: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    name: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        name: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            name: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
]
const codeText = `
yarn run v1.22.0            
$ eslint --format=pretty ./packages
Done in 9.70s.
          `
const jsonCodeText = `{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "suppressImplicitAnyIndexErrors": true,
    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["**/src", "**/docs", "scripts", "**/demo", ".eslintrc.js"]
}
`
</script>