FROM node:22

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制依赖文件，安装依赖
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# 复制剩余代码
COPY . .

# 生成 Prisma 客户端
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
