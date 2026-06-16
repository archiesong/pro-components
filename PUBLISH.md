# 发布指南

本文档介绍如何发布 @antdv-next1 组件库到 npm。

## 前置条件

- 确保你已经登录 npm：
```bash
npm whoami
```
如果没有登录，请先登录：
```bash
npm login
```

## 发布流程

### 1. 创建变更记录

使用 changeset 记录变更：

```bash
pnpm changeset
```

按照提示选择要发布的包和版本类型（patch/minor/major）。

### 2. 执行发布

运行一键发布脚本：

```bash
pnpm publish
```

这个脚本会自动完成以下步骤：

1. ✅ 使用 changeset 升级版本号
2. ✅ 按依赖顺序发布包
3. ✅ 自动处理 workspace 依赖替换
4. ✅ 自动构建和发布

## 发布顺序

脚本会按照以下顺序发布包（考虑依赖关系）：

1. `@antdv-next1/pro-utils
2. `@antdv-next1/pro-provider
3. `@antdv-next1/pro-listy
4. `@antdv-next1/route-utils
5. `@antdv-next1/pro-card
6. `@antdv-next1/pro-field
7. `@antdv-next1/pro-form
8. `@antdv-next1/pro-layout
9. `@antdv-next1/pro-table
10. `@antdv-next1/pro-components

## 手动发布（不推荐）

如果需要手动发布某个包：

```bash
# 进入包目录
cd packages/utils

# 构建
pnpm build

# 发布
npm publish --access=public
```

## 注意事项

- 发布前确保所有测试通过
- 确保 npm 登录状态正常
- 发布后可以在 npm 上查看新版本
- 避免直接修改已发布的版本

## 回滚版本

如果需要回滚已发布的版本：

```bash
# 废弃某个版本（不删除，只是标记为废弃
npm deprecate @antdv-next1/pro-utils@1.0.5 "这个版本有问题，请使用最新版本"
```

## 常见问题

### Q: 发布失败怎么办？
A: 检查 npm 登录状态、网络连接、包名是否已被占用。

### Q: 如何只发布某个包？
A: 手动进入该包目录执行 `npm publish --access=public`。

### Q: workspace 依赖问题？
A: 发布脚本会自动处理，发布时替换为实际版本号，发布后恢复为 workspace:*。
