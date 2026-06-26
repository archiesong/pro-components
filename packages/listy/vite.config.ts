import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { tsxResolveTypes } from 'vite-plugin-tsx-resolve-types'
import { createGlobals, workspaceExternal } from '../../scripts/build/workspaceExternal'

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
        exports: 'named',
        globals: createGlobals({ vue: 'Vue' }),
      },
    },
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      name: 'ProListy',
      fileName: () => 'pro-listy.js',
      formats: ['umd'],
    },
  },
})
