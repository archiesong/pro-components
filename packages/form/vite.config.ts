import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
// import { tsxAutoProps } from 'vite-plugin-tsx-auto-props'
import { tsxResolveTypes } from 'vite-plugin-tsx-resolve-types'
import { createGlobals, workspaceExternal } from '../../scripts/build/workspaceExternal'

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
        workspaceExternal,
        /^dayjs/,
      ],
      output: {
        exports: 'named',
        globals: createGlobals({ vue: 'Vue' }),
      },
    },
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      name: 'ProForm',
      fileName: () => 'pro-form.js',
      formats: ['umd'],
    },
  },
})
