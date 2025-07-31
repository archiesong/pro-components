import path from 'path';
import vue from '@vitejs/plugin-vue';
import md from './plugin/md';
import docs from './plugin/docs';
import vueJsx from '@vitejs/plugin-vue-jsx';

/**
 * @type {import('vite').UserConfig}
 */
export default {
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
  },
  resolve: {
    alias: {
      vue:
        process.env.NODE_ENV === 'production'
          ? 'vue/dist/vue.runtime.esm-browser.prod.js'
          : 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, './src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      '@ant-design-vue/pro-layout': path.resolve(__dirname, '../packages/layout/src'),
      '@ant-design-vue/pro-card': path.resolve(__dirname, '../packages/card/src'),
      '@ant-design-vue/pro-field': path.resolve(__dirname, '../packages/field/src'),
      '@ant-design-vue/pro-form': path.resolve(__dirname, '../packages/form/src'),
      '@ant-design-vue/route-utils': path.resolve(__dirname, '../packages/route-utils/src'),
      '@ant-design-vue/pro-provider': path.resolve(__dirname, '../packages/provider/src'),
      '@ant-design-vue/pro-utils': path.resolve(__dirname, '../packages/utils/src'),
      '@ant-design-vue/pro-table': path.resolve(__dirname, '../packages/table/src'),
    },
  },
  server: {
    host: true,
    port: 3005
  },
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
      mergeProps: false,
      enableObjectSlots: false,
    }),
    docs(),
    md(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
  ],
  optimizeDeps: {
    include: [
      'fetch-jsonp',
      '@ant-design/icons-vue',
      'lodash-es',
      'dayjs',
      'ant-design-vue',
      'vue',
      'vue-router',
      'vue-i18n',
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};
