#!/bin/bash

echo "📦 清理旧容器..."
docker compose down -v

echo "🚀 构建并启动开发环境..."
docker compose up -d --build

echo "⏳ 等待数据库启动完成..."
sleep 10

echo "🔧 运行 Prisma 初始化..."
docker compose exec app sh -c "npx prisma migrate dev --name init"

echo "✅ 一切就绪，正在运行开发服务：http://localhost:3000"
