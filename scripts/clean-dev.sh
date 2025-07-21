#!/bin/bash

echo "🧹 Cleaning all build & cache folders..."

# 当前路径是 monorepo 根目录
ROOT_DIR=$(pwd)

# 删除根目录缓存
rm -rf "$ROOT_DIR/node_modules"
rm -rf "$ROOT_DIR/.turbo"
rm -rf "$ROOT_DIR/pnpm-lock.yaml"

# 清理 apps 目录下每个项目的缓存
rm -rf "$ROOT_DIR/apps/web/.next"
rm -rf "$ROOT_DIR/apps/web/node_modules"
rm -rf "$ROOT_DIR/apps/web/.cache"

# 清理 packages 下模块缓存（如 db、trpc、utils 等）
rm -rf "$ROOT_DIR/packages/**/node_modules"
rm -rf "$ROOT_DIR/packages/**/dist"

# 提示
echo "✅ Cache cleaned. Reinstalling dependencies..."

pnpm install

echo "✅ All clean. You can now run: pnpm dev"
