## 🧑‍💻 本地开发环境启动指南 (Docker 版)

BillWise 使用 Docker 容器化构建本地开发环境，确保跨平台一致性与零依赖配置。你无需安装 Node.js、PostgreSQL，只需安装 Docker 即可开始开发。

---

### ✅ 前置要求

请确保你已安装以下工具：

* [Docker Desktop](https://www.docker.com/products/docker-desktop) ≥ 20.10
* [Git](https://git-scm.com/) ≥ 2.30

---

### 📦 启动开发环境

执行以下命令，自动完成镜像构建、容器启动、数据库初始化等步骤：

```bash
./scripts/dev-init.sh
```

执行成功后，你可以访问：

* Web 应用：[http://localhost:3000](http://localhost:3000)
* PostgreSQL 地址：`postgresql://postgres:postgres@localhost:5432/billwise_dev`

---

### 🛠️ 开发常用命令

| 操作            | 命令                                               |
| ------------- | ------------------------------------------------ |
| 启动服务（不清除数据）   | `docker compose up -d`                           |
| 停止服务（保留数据）    | `docker compose down`                            |
| 停止并清除数据       | `docker compose down -v`                         |
| 进入 app 容器     | `docker compose exec app sh`                     |
| Prisma 迁移（开发） | `docker compose exec app npx prisma migrate dev` |
| 查看数据库日志       | `docker compose logs postgres -f`                |

---

### 🧪 运行 Prisma 命令

你可以在容器中运行任何 Prisma 命令，例如：

```bash
docker compose exec app npx prisma studio
docker compose exec app npx prisma db seed
```

---

### 🧼 清理提示

开发过程中如果遇到奇怪的数据库错误或缓存问题，可尝试重置环境：

```bash
docker compose down -v
./scripts/dev-init.sh
```

---

### 📁 项目结构建议

```
.
├── prisma/              # Prisma schema 文件与迁移目录
├── scripts/             # 启动和初始化脚本
│   └── dev-init.sh
├── docker-compose.yml   # Docker Compose 配置
├── Dockerfile           # App 服务镜像配置
├── .env                 # 环境变量配置（本地用）
├── README.md
└── ...
```

---

### 📌 注意事项

* 默认数据库使用容器内的 PostgreSQL，数据持久化至 volume。
* 如果你本地已有 PostgreSQL 服务，请确保端口 5432 未被占用，或修改 compose 配置。
* 初次运行脚本时会自动执行 `prisma migrate dev --name init`，你可以根据需要修改脚本逻辑。

---

## 🤝 欢迎贡献

欢迎提交 PR 或建议，帮助 BillWise 变得更好。如果你发现任何配置问题，欢迎反馈。
