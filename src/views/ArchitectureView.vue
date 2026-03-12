<template>
  <div class="arch-view">
    <header class="page-header">
      <h1 class="page-title">架构设计</h1>
      <p class="page-desc">项目技术架构与执行流程</p>
    </header>

    <section class="arch-section">
      <h2 class="section-title">技术栈</h2>
      <div class="tech-grid">
        <div v-for="tech in techStack" :key="tech.name" class="tech-card">
          <div class="tech-icon">{{ tech.icon }}</div>
          <div class="tech-info">
            <h3>{{ tech.name }}</h3>
            <p>{{ tech.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="arch-section">
      <h2 class="section-title">项目结构</h2>
      <div class="code-block">
        <pre><code>{{ projectStructure }}</code></pre>
      </div>
    </section>

    <section class="arch-section">
      <h2 class="section-title">执行流程</h2>
      <div class="flow-list">
        <div v-for="(step, i) in flowSteps" :key="i" class="flow-item">
          <div class="flow-num">{{ i + 1 }}</div>
          <div class="flow-content">
            <h4>{{ step.title }}</h4>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const techStack = [
  { icon: '💚', name: 'Vue 3', desc: '前端框架，Composition API' },
  { icon: '⚡', name: 'Vite', desc: '下一代前端构建工具' },
  { icon: '🚂', name: 'Express', desc: 'Node.js Web 框架' },
  { icon: '🍃', name: 'MongoDB', desc: 'NoSQL 文档数据库' },
  { icon: '🐳', name: 'Docker', desc: '容器化部署方案' },
  { icon: '🔷', name: 'Nginx', desc: '反向代理与静态服务' }
]

const projectStructure = `vue-demo-app/
├── src/                  # 前端源码
│   ├── views/            # 页面组件
│   ├── components/       # 通用组件
│   ├── router/           # 路由配置
│   └── style.css         # 全局样式
├── server/               # 后端源码
│   ├── index.js          # 入口文件
│   ├── routes/           # API 路由
│   └── models/           # 数据模型
├── Dockerfile            # 前端镜像
├── docker-compose.yml    # 容器编排
└── nginx.conf            # Nginx 配置`

const flowSteps = [
  { title: '需求分析', desc: 'AI 理解用户需求，确定技术方案' },
  { title: '代码生成', desc: '自动生成前端组件、后端 API、数据库模型' },
  { title: '容器构建', desc: '编写 Dockerfile，构建多阶段镜像' },
  { title: '服务编排', desc: 'Docker Compose 编排多服务' },
  { title: '部署上线', desc: '一键启动，自动健康检查' },
  { title: '持续迭代', desc: '根据反馈优化改进' }
]
</script>

<style scoped>
.arch-view {
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

.arch-section {
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

.tech-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.tech-card {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.tech-icon {
  font-size: 2rem;
  line-height: 1;
}

.tech-info h3 {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.tech-info p {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
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

.flow-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.flow-item {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.flow-num {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  font-weight: 700;
  font-size: var(--text-sm);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.flow-content h4 {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.flow-content p {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}

@media (max-width: 640px) {
  .tech-grid {
    grid-template-columns: 1fr;
  }
}
</style>
