import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/**/*.ts',
    '!src/**/tests/*',
    '!src/**/*.test.ts',
  ],
  dts: true,
  unbundle: true,
  format: 'esm',
  outExtensions() {
    return {
      js: '.js',
      dts: '.d.ts',
    }
  },
  clean: true,
  deps: {
    onlyBundle: false,
    skipNodeModulesBundle: true,
  },
})
