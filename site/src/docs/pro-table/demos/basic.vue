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
  <ProTable
            rowKey="id"
            :columns="columns"
            ref="table"
            :request="request"
            :editable="{
              type: 'multiple',
            }"
            v-model:formRef="formRef"
            :form="form"
            dateFormatter="string"
            :pagination="{
              pageSize: 5,
            }"
            :options="settingOption"
            headerTitle="Advanced Table">
    <!-- <template #headerCell="{ title, column }">
      <template v-if="column.key === 'title'">
        <component :is="title" />
      </template>
</template> -->
  </ProTable>
</template>

<script lang="ts" setup>
import { onMounted, useTemplateRef, reactive, h, ref } from 'vue'
import { Button, Tag, Space } from 'ant-design-vue'
import ProTable, { type ProColumns, type ProTableProps } from '@ant-design-vue/pro-table';
import type { ProFormInstance } from '@ant-design-vue/pro-form';
import requestService from 'umi-request';
type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};
const formRef = ref<ProFormInstance>();
const table = useTemplateRef('table')
const form = reactive({
  model: {
    state: 'open',
    title: '123'
  }
})
const settingOption = reactive({
  setting: {
    // children: h('span', null, 'sd'),
    listsHeight: 400,
  },
})
onMounted(() => {
  console.log(formRef, 'formRef')
})

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tooltip: 'The title will shrink automatically if it is too long',
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
  },
  {
    disable: true,
    title: 'Status',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: 'All' },
      open: {
        text: 'Unresolved',
        status: 'Error',
      },
      closed: {
        text: 'Resolved',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: 'In Progress',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: 'Labels',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    customRender: (opt) => {
      return h(Space, null, () => opt.record.labels.map(({ name, color }) => h(Tag, { color, key: name }, () => name)))
    },
  },
  {
    title: 'Creation Time',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: 'Creation Time',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: 'Actions',
    valueType: 'option',
    key: 'option',
    customRender: (opt, action) => {
      return [
        h('a', { key: 'editable', onClick: () => { } }, 'Edit'),
        h('a', { href: opt.record.url, target: '_blank', rel: 'noopener noreferrer', key: 'view' }, 'View'),
      ]
    }
  },
];

const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};
const request: ProTableProps['request'] = async (params, sort, filter) => {
  await waitTime(2000);
  return requestService<{
    data: GithubIssueItem[];
  }>('https://proapi.azurewebsites.net/github/issues', {
    params,
  });
}
</script>
