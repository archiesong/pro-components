import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { tsxResolveTypes } from 'vite-plugin-tsx-resolve-types'
import { workspaceExternal } from '../../scripts/build/workspaceExternal'

export default defineConfig({
  plugins: [
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
      ],
      output: {
        globals: {
          'vue': 'vue',
        },
      },
    },
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      name: 'ProForm',
      fileName: () => 'pro-form.esm.js',
      formats: ['es'],
    },
  },
})
