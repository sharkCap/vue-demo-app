<template>
  <div class="server-view">
    <header class="page-header">
      <h1 class="page-title">服务器状态</h1>
      <p class="page-desc">实时监控服务器资源使用情况</p>
      <button @click="refreshAll" class="refresh-btn" :disabled="loading">
        <svg :class="{ spinning: loading }" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M14 8A6 6 0 1 1 8 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        刷新
      </button>
    </header>

    <!-- Metrics -->
    <section class="metrics-section">
      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-icon">⚡</span>
          <span class="metric-title">CPU</span>
        </div>
        <div class="metric-value">{{ serverInfo.cpu.usage }}<span class="unit">%</span></div>
        <div class="metric-bar">
          <div class="bar-fill" :style="{ width: serverInfo.cpu.usage + '%' }"></div>
        </div>
        <div class="metric-footer">
          <span>{{ serverInfo.cpu.cores }} 核心</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-icon">🧠</span>
          <span class="metric-title">内存</span>
        </div>
        <div class="metric-value">{{ serverInfo.memory.usage }}<span class="unit">%</span></div>
        <div class="metric-bar">
          <div class="bar-fill" :style="{ width: serverInfo.memory.usage + '%' }"></div>
        </div>
        <div class="metric-footer">
          <span>{{ serverInfo.memory.used }} / {{ serverInfo.memory.total }}</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-icon">💾</span>
          <span class="metric-title">磁盘</span>
        </div>
        <div class="metric-value">{{ serverInfo.disk.usage }}<span class="unit">%</span></div>
        <div class="metric-bar">
          <div class="bar-fill" :style="{ width: serverInfo.disk.usage + '%' }"></div>
        </div>
        <div class="metric-footer">
          <span>已用 {{ serverInfo.disk.used }}</span>
        </div>
      </div>
    </section>

    <!-- System Info -->
    <section class="info-section">
      <h2 class="section-title">系统信息</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">主机名</span>
          <span class="info-value">{{ serverInfo.system.hostname }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">系统</span>
          <span class="info-value">{{ serverInfo.system.platform }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">架构</span>
          <span class="info-value">{{ serverInfo.system.arch }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">运行时间</span>
          <span class="info-value">{{ serverInfo.system.uptime }} 小时</span>
        </div>
        <div class="info-item">
          <span class="info-label">CPU 型号</span>
          <span class="info-value">{{ serverInfo.cpu.model || 'Unknown' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">公网 IP</span>
          <span class="info-value code">43.136.27.117</span>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="info-section">
      <h2 class="section-title">服务状态</h2>
      <div class="service-grid">
        <div v-for="svc in services" :key="svc.name" class="service-item">
          <span class="service-icon">{{ svc.icon }}</span>
          <span class="service-name">{{ svc.name }}</span>
          <span class="service-status" :class="svc.status">
            {{ svc.status === 'running' ? '运行中' : '已停止' }}
          </span>
        </div>
      </div>
    </section>

    <!-- Logs -->
    <section class="info-section">
      <h2 class="section-title">最近日志</h2>
      <div class="logs-container">
        <div v-for="(log, i) in logs" :key="i" class="log-item" :class="log.type">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-msg">{{ log.msg }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(false)

const serverInfo = ref({
  cpu: { usage: 0, cores: 0, model: '' },
  memory: { usage: 0, total: '0GB', used: '0GB' },
  disk: { usage: 0, used: '0GB' },
  system: { hostname: '', platform: '', arch: '', uptime: 0 }
})

const services = [
  { name: 'Frontend', icon: '🌐', status: 'running' },
  { name: 'Backend', icon: '⚡', status: 'running' },
  { name: 'MongoDB', icon: '🍃', status: 'running' },
  { name: 'Docker', icon: '🐳', status: 'running' }
]

const logs = ref([
  { time: '11:38', msg: '服务启动完成', type: 'info' },
  { time: '11:38', msg: 'MongoDB 连接成功', type: 'success' },
  { time: '11:37', msg: '后端服务就绪', type: 'success' },
  { time: '11:37', msg: '前端容器启动', type: 'info' }
])

const fetchServerInfo = async () => {
  try {
    const res = await fetch('/api/server-info')
    if (res.ok) {
      serverInfo.value = await res.json()
    }
  } catch (e) {
    console.error(e)
  }
}

const refreshAll = async () => {
  loading.value = true
  await fetchServerInfo()
  loading.value = false
}

onMounted(() => {
  fetchServerInfo()
})
</script>

<style scoped>
.server-view {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

.page-header {
  margin-bottom: var(--space-10);
  position: relative;
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

.refresh-btn {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.refresh-btn:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Metrics */
.metrics-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  margin-bottom: var(--space-10);
}

.metric-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

.metric-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.metric-icon {
  font-size: 1.25rem;
}

.metric-title {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.metric-value {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.metric-value .unit {
  font-size: var(--text-lg);
  font-weight: 400;
  color: var(--color-text-tertiary);
}

.metric-bar {
  height: 4px;
  background: var(--color-bg-tertiary);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: var(--space-3);
}

.bar-fill {
  height: 100%;
  background: var(--color-accent);
  border-radius: 2px;
  transition: width var(--transition-normal);
}

.metric-footer {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* Sections */
.info-section {
  margin-bottom: var(--space-10);
}

.section-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.info-label {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}

.info-value {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.info-value.code {
  font-family: var(--font-mono);
  color: var(--color-accent);
}

/* Services */
.service-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.service-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.service-icon {
  font-size: 1.25rem;
}

.service-name {
  flex: 1;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.service-status {
  font-size: var(--text-xs);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
}

.service-status.running {
  background: var(--color-success-subtle);
  color: var(--color-success);
}

.service-status.stopped {
  background: var(--color-error-subtle);
  color: var(--color-error);
}

/* Logs */
.logs-container {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.log-item {
  display: flex;
  gap: var(--space-4);
  font-size: var(--text-sm);
  font-family: var(--font-mono);
}

.log-time {
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.log-msg {
  color: var(--color-text-secondary);
}

.log-item.success .log-msg {
  color: var(--color-success);
}

.log-item.error .log-msg {
  color: var(--color-error);
}

/* Responsive */
@media (max-width: 768px) {
  .metrics-section {
    grid-template-columns: 1fr;
  }
  
  .info-grid,
  .service-grid {
    grid-template-columns: 1fr;
  }
  
  .refresh-btn {
    position: static;
    margin-top: var(--space-4);
  }
}
</style>
