export default [
  {
    path: 'page-container:lang(-cn)?',
    meta: {
      category: 'Components',
      type: '布局',
      title: 'PageContainer',
      subtitle: '页容器',
    },
    component: () => import('../docs/pro-layout/components/page-container/demos/index.vue'),
  },
  {
    path: 'layout:lang(-cn)?',
    meta: {
      category: 'Components',
      type: '布局',
      title: 'ProLayout',
      subtitle: '高级布局',
    },
    component: () => import('../docs/pro-layout/demos/index.vue'),
  },
  {
    path: 'form:lang(-cn)?',
    meta: {
      category: 'Components',
      subtitle: '高级表单',
      type: '数据录入',
      cols: 2,
      title: 'ProForm',
    },
    component: () => import('../docs/pro-form/demos/index.vue'),
  },
  {
    path: 'schema-form:lang(-cn)?',
    meta: {
      category: 'Components',
      subtitle: 'JSON 表单',
      type: '数据录入',
      cols: 2,
      title: 'Schema Form',
    },
    component: () => import('../docs/pro-form/components/schema-form/demos/index.vue'),
  },
  {
    path: 'table:lang(-cn)?',
    meta:{
      category: 'Components',
      subtitle: '高级表格',
      type: '数据展示',
      cols: 2,
      title: 'ProTable',
    },
    component: ()=> import('../docs/pro-table/demos/index.vue')
  }
];
