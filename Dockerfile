# OpenClaw Vue3 Docker 演示应用
# 多阶段构建优化镜像体积

# 阶段1: 依赖安装与构建
FROM node:20-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制包管理文件
COPY package*.json ./

# 安装依赖
RUN npm install --legacy-peer-deps

# 复制源代码
COPY . .

# 构建生产版本
RUN npm run build

# 阶段2: Nginx服务
FROM nginx:alpine

# 设置容器时区（北京时间）
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone && \
    apk del tzdata

# 复制构建产物
COPY --from=build /app/dist /usr/share/nginx/html

# 复制Nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 修改Nginx用户为非root
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# 运行Nginx
CMD ["nginx", "-g", "daemon off;"]

# 镜像元数据
LABEL maintainer="深海王 <deepsea@openclaw.ai>"
LABEL description="OpenClaw Vue3 演示应用 - 展示AI自动化开发能力"
LABEL version="2.0.0"
LABEL org.opencontainers.image.source="https://github.com/openclaw/openclaw"
