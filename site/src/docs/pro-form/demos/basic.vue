<docs>
---
order: 0
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
  <div>dasdas</div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
 // import { QueryFilter } from "@ant-design-vue/pro-form";
import dayjs, { type Dayjs } from "dayjs";
import {
  FormItem,
  Input,
  Select,
  SelectOption,
  RangePicker,
  DatePicker,
} from "ant-design-vue";

const formModel = reactive({
  name: "123",
  creater: "11",
  sex: "男",
  status: "",
  startDate: "",
  create: [
    dayjs("2015/01/01", "YYYY/MM/DD"),
    dayjs("2016/01/01", "YYYY/MM/DD"),
  ] as [Dayjs, Dayjs],
});
const sex = ref([
  {
    value: "男",
    label: "男",
  },
  {
    value: "女",
    label: "女",
  },
]);

function handleSubmit(params: any) {
  console.log(params);
}
function onCollapsed(collapsed: boolean) {
  console.log(collapsed);
}
</script>
