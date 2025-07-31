import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import { fileURLToPath, URL } from 'url';
import fs from 'fs';
import path from 'path';

const replaceEs = () => {
  return {
    name: 'replace-es',
    renderChunk(code) {
      return code.replace(/\/es\//g, '/lib/');
    },
  };
};
const replaceEsInDts = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      replaceEsInDts(filePath);
    } else if (filePath.endsWith('.d.ts')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      content = content.replace(/\/es\//g, '/lib/');
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  });
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      outDir: ['es', 'lib'],
      afterBuild() {
        replaceEsInDts('lib');
      },
    }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
    },
    rollupOptions: {
      external: [
        /^vue(\/.+|$)/,
        /^ant-design-vue(\/.+|$)/,
        /^@ant-design\/icons-vue/,
        /^@ant-design-vue(\/.+|$)/,
        /^dayjs(\/.+|$)/,
        'vue-types',
      ],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'es',
          preserveModulesRoot: 'src',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'lib',
          plugins: [replaceEs()],
          exports: 'named',
          preserveModulesRoot: 'src',
        },
      ],
    },
  },
});
