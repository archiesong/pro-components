import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '../dist')

// 复制 index.html 为 404.html
const indexPath = path.join(distDir, 'index.html')
const notFoundPath = path.join(distDir, '404.html')

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath)
  console.log('✓ Copied index.html to 404.html for GitHub Pages')
}

// 创建 .nojekyll 文件
const noJekyllPath = path.join(distDir, '.nojekyll')
fs.writeFileSync(noJekyllPath, '')
console.log('✓ Created .nojekyll file for GitHub Pages')
