import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'tsdown'
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
  entry: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/tests/*',
    '!src/**/*.test.ts',
    '!src/**/*.test.tsx',
  ],
  unbundle: true,
  format: 'es',
  outExtensions() {
    return {
      js: '.js',
      dts: '.d.ts',
    }
  },
  // minify: true,
  clean: true,
  deps: {
    onlyBundle: false,
    skipNodeModulesBundle: true,
    neverBundle: [
      workspaceExternal,
      'vue',
      '@antdv-next/icons',
      '@antdv-next/cssinjs/cssinjs-utils',
      '@antdv-next/cssinjs',
      'csstype',
      '@v-c/util',
      '@v-c/menu',
      '@v-c/select',
      '@v-c/resize-observer',
    ],
  },
})
