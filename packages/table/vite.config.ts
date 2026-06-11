import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
// import { tsxAutoProps } from 'vite-plugin-tsx-auto-props'
import { tsxResolveTypes } from 'vite-plugin-tsx-resolve-types'

export default defineConfig({
  plugins: [
    // tsxAutoProps(),
    tsxResolveTypes({
      defaultPropsToUndefined: ['Boolean'],
    }),
    vueJsx({
      mergeProps: true,
    }),
  ],
  build: {
    rolldownOptions: {
      external: [
        'vue',
        'dayjs',
      ],
      output: {
        exports: 'named',
        globals: {
          'vue': 'Vue',
          'dayjs': 'dayjs',
        },
      },
    },
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      name: 'ProTable',
      fileName: () => 'pro-table.js',
      formats: ['umd'],
    },
  },
})
