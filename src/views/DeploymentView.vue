<template>
  <div class="deploy-view">
    <header class="page-header">
      <h1 class="page-title">部署详情</h1>
      <p class="page-desc">Docker 容器化部署配置</p>
    </header>

    <section class="deploy-section">
      <h2 class="section-title">运行中的服务</h2>
      <div class="service-list">
        <div v-for="service in services" :key="service.name" class="service-card">
          <div class="service-header">
            <div class="service-icon">{{ service.icon }}</div>
            <div class="service-name">
              <h3>{{ service.name }}</h3>
              <span class="service-image">{{ service.image }}</span>
            </div>
            <span class="service-status online">运行中</span>
          </div>
          <div class="service-details">
            <div class="detail-item">
              <span class="detail-label">端口</span>
              <span class="detail-value">{{ service.port }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">状态</span>
              <span class="detail-value status-ok">健康</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="deploy-section">
      <h2 class="section-title">Docker Compose 配置</h2>
      <div class="code-block">
        <pre><code>{{ composeConfig }}</code></pre>
      </div>
    </section>

    <section class="deploy-section">
      <h2 class="section-title">快速命令</h2>
      <div class="cmd-list">
        <div v-for="cmd in commands" :key="cmd.cmd" class="cmd-item">
          <code>{{ cmd.cmd }}</code>
          <span class="cmd-desc">{{ cmd.desc }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const services = [
  { name: 'Frontend', icon: '🌐', image: 'vue-demo-app-frontend', port: '9969:80' },
  { name: 'Backend', icon: '⚡', image: 'vue-demo-app-backend', port: '3000:3000' },
  { name: 'MongoDB', icon: '🍃', image: 'mongo:7-jammy', port: '27017:27017' }
]

const composeConfig = `services:
  frontend:
    build: .
    ports:
      - "9969:80"
    depends_on:
      - backend

  backend:
    build: ./server
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://mongodb:27017/todolist

  mongodb:
    image: mongo:7-jammy
    volumes:
      - mongodb_data:/data/db`

const commands = [
  { cmd: 'docker compose up -d', desc: '启动所有服务' },
  { cmd: 'docker compose logs -f', desc: '查看实时日志' },
  { cmd: 'docker compose down', desc: '停止所有服务' },
  { cmd: 'docker compose build', desc: '重新构建镜像' }
]
</script>

<style scoped>
.deploy-view {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

.page-header {
  margin-bottom: var(--space-10);
}

.page-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.page-desc {
  color: var(--color-text-tertiary);
}

.deploy-section {
  margin-bottom: var(--space-12);
}

.section-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.service-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

.service-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.service-icon {
  font-size: 1.5rem;
}

.service-name h3 {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

.service-image {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.service-status {
  margin-left: auto;
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: 500;
  border-radius: var(--radius-full);
}

.service-status.online {
  background: var(--color-success-subtle);
  color: var(--color-success);
}

.service-details {
  display: flex;
  gap: var(--space-8);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.detail-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.detail-value {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.detail-value.status-ok {
  color: var(--color-success);
}

.code-block {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  background: none;
  padding: 0;
}

.cmd-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.cmd-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.cmd-item code {
  padding: var(--space-2) var(--space-3);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  color: var(--color-accent);
}

.cmd-desc {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}
</style>
