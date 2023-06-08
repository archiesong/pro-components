import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import vueJsx from '@vitejs/plugin-vue-jsx';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), dts()],
  // resolve: {
  //   alias: {
  //     '@ant-design-vue/pro-layout': fileURLToPath(new URL('./src', import.meta.url)),
  //     '@': fileURLToPath(new URL('./examples', import.meta.url)),
  //   },
  // },
  // css: {
  //   postcss: {},
  //   preprocessorOptions: {
  //     less: {
  //       // DO NOT REMOVE THIS LINE
  //       javascriptEnabled: true,
  //       // modifyVars: {
  //       //   hack: `true; @import 'ant-design-vue/es/style/themes/default.less'`,
  //       // }
  //     },
  //   },
  // },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'ProLayout',
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        '@ant-design/icons-vue',
        '@ant-design/icons-svg',
        'ant-design-vue',
        'dayjs',
        'vue-types',
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          'ant-design-vue': 'antd',
          '@ant-design/icons-vue': 'iconsVue',
          '@ant-design/icons-svg': 'iconsSvg',
          'vue-types': 'vueTypes',
          dayjs: 'dayjs',
        },
      },
    },
  },
});
