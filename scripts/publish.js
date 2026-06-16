#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 定义包发布顺序（考虑依赖关系）
const publishOrder = [
  'utils',
  'provider',
  'listy',
  'route-utils',
  'card',
  'field',
  'form',
  'layout',
  'table',
  'components'
];

const packageVersions = {};

// 执行命令
function runCmd(cmd, cwd = rootDir) {
  console.log(`$ ${cmd}`);
  return execSync(cmd, { cwd, stdio: 'inherit' });
}

// 获取当前包版本
function getPackageVersion(pkgDir) {
  const pkgPath = path.join(rootDir, 'packages', pkgDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  return pkg.version;
}

// 替换 workspace:* 为实际版本号
function replaceWorkspaceDeps(pkgDir) {
  const pkgPath = path.join(rootDir, 'packages', pkgDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  
  // 替换 dependencies
  if (pkg.dependencies) {
    for (const [depName, depVersion] of Object.entries(pkg.dependencies)) {
      if (depVersion === 'workspace:*' && packageVersions[depName]) {
        pkg.dependencies[depName] = packageVersions[depName];
      }
    }
  }
  
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

// 构建包
function buildPackage(pkgDir) {
  console.log(`\n📦 构建 ${pkgDir}...`);
  runCmd('pnpm build', path.join(rootDir, 'packages', pkgDir));
}

// 发布包
function publishPackage(pkgDir) {
  console.log(`\n🚀 发布 ${pkgDir}...`);
  runCmd('npm publish --access=public', path.join(rootDir, 'packages', pkgDir));
}

// 恢复 workspace:* 依赖
function restoreWorkspaceDeps(pkgDir) {
  const pkgPath = path.join(rootDir, 'packages', pkgDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  
  // 替换 dependencies
  if (pkg.dependencies) {
    for (const depName of Object.keys(pkg.dependencies)) {
      if (packageVersions[depName]) {
        pkg.dependencies[depName] = 'workspace:*';
      }
    }
  }
  
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

// 主函数
async function main() {
  console.log('🎉 开始发布流程！\n');
  
  // 1. 使用 changeset 升级版本
  console.log('📝 步骤 1: 使用 changeset 升级版本...');
  runCmd('pnpm bump');
  
  // 2. 获取所有包新版本
  console.log('\n📋 步骤 2: 获取新版本号...');
  for (const pkgDir of publishOrder) {
    const pkgPath = path.join(rootDir, 'packages', pkgDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      packageVersions[pkg.name] = pkg.version;
      console.log(`  ${pkg.name}: ${pkg.version}`);
    }
  }
  
  // 3. 发布每个包
  console.log('\n🚀 步骤 3: 开始发布包...');
  for (const pkgDir of publishOrder) {
    const pkgPath = path.join(rootDir, 'packages', pkgDir, 'package.json');
    if (!fs.existsSync(pkgPath)) {
      console.log(`⚠️ 跳过 ${pkgDir} (目录不存在)`);
      continue;
    }
    
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    
    // 替换 workspace 依赖
    replaceWorkspaceDeps(pkgDir);
    
    // 构建
    buildPackage(pkgDir);
    
    // 发布
    publishPackage(pkgDir);
    
    // 恢复 workspace 依赖
    restoreWorkspaceDeps(pkgDir);
    
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    console.log(`✅ ${pkg.name}@${pkg.version} 发布成功！`);
  }
  
  console.log('\n✨ 所有包发布完成！');
}

main().catch(err => {
  console.error('❌ 发布失败:', err);
  process.exit(1);
});
