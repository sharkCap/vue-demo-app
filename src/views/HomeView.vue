<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge animate-fade-in">
          <span class="badge-icon">🦑</span>
          <span>零号机 · OpenClaw AI</span>
        </div>
        
        <h1 class="hero-title animate-slide-up">
          从<span class="text-gradient">想法</span>到<span class="text-gradient">部署</span>
          <br>让 AI 完成一切
        </h1>
        
        <p class="hero-subtitle animate-slide-up" style="animation-delay: 0.1s">
          展示 AI 驱动开发的完整能力：理解需求、编写代码、容器化部署、持续迭代
        </p>
        
        <div class="hero-actions animate-slide-up" style="animation-delay: 0.2s">
          <router-link to="/todo" class="btn btn-primary btn-lg">
            <span>开始体验</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <a href="https://docs.openclaw.ai" target="_blank" class="btn btn-secondary btn-lg">
            查看文档
          </a>
        </div>
      </div>
      
      <div class="hero-visual animate-fade-in" style="animation-delay: 0.3s">
        <div class="code-window">
          <div class="window-header">
            <div class="window-dots">
              <span></span><span></span><span></span>
            </div>
            <span class="window-title">deepseek-v3.2</span>
          </div>
          <div class="window-content">
            <div class="code-line">
              <span class="prompt">></span>
              <span class="typing">部署一个 TodoList 应用...</span>
            </div>
            <div class="code-output">
              <div class="output-line"><span class="dim">✓</span> 创建前端项目</div>
              <div class="output-line"><span class="dim">✓</span> 编写后端 API</div>
              <div class="output-line"><span class="dim">✓</span> 配置 MongoDB</div>
              <div class="output-line"><span class="dim">✓</span> Docker 容器化</div>
              <div class="output-line highlight"><span class="dim">✓</span> 部署成功 → :9969</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="section-header">
        <h2 class="section-title">核心能力</h2>
        <p class="section-desc">AI 驱动的全栈开发能力演示</p>
      </div>
      
      <div class="features-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.desc }}</p>
          <router-link v-if="feature.link" :to="feature.link" class="feature-link">
            查看 →
          </router-link>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="tech-stack">
      <div class="section-header">
        <h2 class="section-title">技术栈</h2>
      </div>
      
      <div class="stack-list">
        <div v-for="item in techStack" :key="item.name" class="stack-item">
          <span class="stack-icon">{{ item.icon }}</span>
          <span class="stack-name">{{ item.name }}</span>
          <span class="stack-desc">{{ item.desc }}</span>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats-section">
      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const features = [
  {
    icon: '◈',
    title: '需求理解',
    desc: 'AI 理解自然语言描述的需求，转化为具体的技术方案'
  },
  {
    icon: '⬡',
    title: '代码生成',
    desc: '从前端组件到后端 API，自动生成高质量代码',
    link: '/architecture'
  },
  {
    icon: '◇',
    title: 'Docker 部署',
    desc: '自动构建 Docker 镜像，一键部署到服务器',
    link: '/deployment'
  },
  {
    icon: '◉',
    title: '实时监控',
    desc: '服务器状态、资源使用、运行日志一览无余',
    link: '/server-info'
  },
  {
    icon: '✓',
    title: 'TodoList',
    desc: '完整的 CRUD 示例：增删改查、状态切换、数据持久化',
    link: '/todo'
  },
  {
    icon: '⚙',
    title: '持续迭代',
    desc: '根据反馈持续改进，无需人工干预'
  }
]

const techStack = [
  { icon: '💚', name: 'Vue 3', desc: '前端框架' },
  { icon: '⚡', name: 'Vite', desc: '构建工具' },
  { icon: '🚂', name: 'Express', desc: '后端框架' },
  { icon: '🍃', name: 'MongoDB', desc: '数据库' },
  { icon: '🐳', name: 'Docker', desc: '容器化' },
  { icon: '🧠', name: 'DeepSeek', desc: 'AI 模型' }
]

const stats = [
  { value: '100%', label: 'AI 生成' },
  { value: '5min', label: '部署时间' },
  { value: '3', label: '容器服务' },
  { value: '0', label: '人工干预' }
]
</script>

<style scoped>
.home-view {
  min-height: 100%;
}

/* Hero */
.hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-16) var(--space-6);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
  min-height: calc(100vh - 200px);
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  width: fit-content;
}

.badge-icon {
  font-size: 1rem;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}

.hero-subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 480px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  font-weight: 500;
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
}

.btn-lg {
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-base);
}

.btn-primary {
  background: var(--color-accent);
  color: white;
}

.btn-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-bg-hover);
  border-color: var(--color-text-muted);
}

/* Code Window */
.hero-visual {
  perspective: 1000px;
}

.code-window {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  transform: rotateY(-5deg) rotateX(5deg);
  transition: transform var(--transition-slow);
}

.code-window:hover {
  transform: rotateY(0) rotateX(0);
}

.window-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-tertiary);
  border-bottom: 1px solid var(--color-border);
}

.window-dots {
  display: flex;
  gap: var(--space-2);
}

.window-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border);
}

.window-dots span:first-child { background: #ff5f57; }
.window-dots span:nth-child(2) { background: #febc2e; }
.window-dots span:last-child { background: #28c840; }

.window-title {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.window-content {
  padding: var(--space-5);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.code-line {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.prompt {
  color: var(--color-accent);
}

.typing {
  color: var(--color-text-primary);
}

.code-output {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.output-line {
  color: var(--color-text-secondary);
}

.output-line .dim {
  color: var(--color-success);
  margin-right: var(--space-3);
}

.output-line.highlight {
  color: var(--color-accent);
}

/* Sections */
.features,
.tech-stack,
.stats-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-16) var(--space-6);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.section-desc {
  color: var(--color-text-tertiary);
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.feature-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  transition: all var(--transition-normal);
}

.feature-card:hover {
  border-color: var(--color-text-muted);
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 1.5rem;
  margin-bottom: var(--space-4);
  color: var(--color-accent);
}

.feature-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.feature-desc {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  line-height: 1.6;
}

.feature-link {
  display: inline-block;
  margin-top: var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-accent);
}

/* Tech Stack */
.stack-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);
}

.stack-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-5);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.stack-icon {
  font-size: 1.25rem;
}

.stack-name {
  font-weight: 500;
  color: var(--color-text-primary);
}

.stack-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

/* Stats */
.stats-section {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8);
  text-align: center;
}

.stat-value {
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}

/* Responsive */
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-content {
    align-items: center;
  }
  
  .hero-subtitle {
    margin: 0 auto;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-visual {
    display: none;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .btn-lg {
    width: 100%;
  }
}
</style>
