<template>
  <div class="changelog-view">
    <div class="changelog-container container">
      <!-- Header -->
      <header class="changelog-header animate-slide-up">
        <div class="header-content">
          <div class="title-wrapper">
            <div class="title-icon-wrapper">
              <span class="title-icon">📋</span>
              <div class="icon-glow"></div>
            </div>
            <div class="title-text-wrapper">
              <h1 class="page-title">
                <span class="title-gradient">更新日志</span>
              </h1>
              <p class="page-description">
                OpenClaw AI 助手版本迭代记录与功能更新
              </p>
            </div>
          </div>
        </div>
      </header>

      <!-- Changelog Content -->
      <main class="changelog-content animate-scale-in">
        <div class="timeline-container">
          <div class="timeline-line"></div>
          
          <div class="changelog-list">
            <div 
              v-for="(release, index) in changelogData" 
              :key="release.version"
              class="changelog-item"
              :class="{ 'latest': release.latest, 'animate-fade-in': true }"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <!-- Timeline Node -->
              <div class="timeline-node" :class="{ 'latest-node': release.latest }">
                <div class="node-dot"></div>
                <div class="node-ring"></div>
              </div>

              <!-- Version Card -->
              <div class="version-card" :class="{ 'latest-card': release.latest }">
                <div class="card-header">
                  <div class="version-info">
                    <div class="version-title">
                      <h2 class="version-number">
                        <span class="version-tag" :class="{ 'latest-tag': release.latest }">
                          v{{ release.version }}
                        </span>
                        <span v-if="release.latest" class="latest-badge">
                          <span class="badge-icon">🚀</span>
                          <span class="badge-text">最新版</span>
                        </span>
                      </h2>
                      <div class="version-meta">
                        <time class="release-date">
                          <span class="date-icon">📅</span>
                          {{ formatDate(release.date) }}
                        </time>
                        <span class="release-type" :class="release.type">
                          <span class="type-icon">{{ getTypeIcon(release.type) }}</span>
                          {{ release.type }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Changes Content -->
                <div class="changes-content">
                  <template v-for="(changes, category) in release.changes" :key="category">
                    <div 
                      v-if="changes && Array.isArray(changes) && changes.length > 0"
                      class="change-category"
                    >
                      <div class="category-header">
                        <h3 class="category-title">
                          <span class="category-icon-wrapper">
                            <span class="category-icon">{{ getCategoryIcon(category) }}</span>
                          </span>
                          <span class="category-name">{{ getCategoryName(category) }}</span>
                          <span class="category-count">{{ changes.length }}</span>
                        </h3>
                      </div>
                      <ul class="changes-list">
                        <li 
                          v-for="(change, changeIndex) in changes" 
                          :key="changeIndex" 
                          class="change-item"
                          :style="{ animationDelay: `${changeIndex * 50}ms` }"
                        >
                          <div class="change-bullet"></div>
                          <span class="change-text">{{ change }}</span>
                        </li>
                      </ul>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="changelog-footer animate-fade-in" style="animation-delay: 300ms;">
          <div class="footer-content">
            <div class="footer-card">
              <p class="footer-text">
                <span class="footer-icon">🔗</span>
                更多历史版本请访问
                <a href="https://github.com/openclaw/openclaw/releases" target="_blank" class="external-link">
                  <span class="link-text">GitHub Releases</span>
                  <svg class="external-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M4 10L10 4M10 4H6M10 4V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 更新日志数据
const changelogData = ref([
  {
  "version": "2026.4.2",
  "date": "2026-04-03",
  "type": "稳定版",
  "latest": true,
  "changes": {
    "features": [
      "恢复核心任务流(Task Flow)底层架构，支持托管与镜像同步模式",
      "Android助手集成Google Assistant应用操作元数据",
      "飞书文档评论事件流，支持评论线程上下文解析",
      "Matrix插件支持规范化的提及元数据",
      "优化代理压缩模型的一致性解析",
      "WhatsApp反应功能增加指导级别"
    ],
    "improvements": [
      "⚠️ xAI插件搜索设置迁移到插件自有配置路径",
      "⚠️ Web Fetch插件Firecrawl配置迁移到插件自有路径"
    ],
    "bugfixes": [
      "集中化请求认证、代理、TLS和头部处理策略",
      "恢复空配对设备令牌映射的遗留角色回退",
      "代理子代理调用权限优化",
      "执行审批配置验证和清理",
      "修复Slack Markdown格式化指导",
      "修复WhatsApp连接时的在线状态处理"
    ]
  }
},
  {
  "version": "2026.4.1",
  "date": "2026-04-01",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [
      "停止加载非选择的捆绑插件",
      "保持房间级别的账户范围和继承的房间覆盖",
      "优先使用显式QR引导认证而非早期的Tailscale认证分类"
    ],
    "improvements": [],
    "bugfixes": [
      "修复聊天错误回复信息泄露问题",
      "修复会话模型切换排队问题",
      "修复Web UI流式响应对齐问题"
    ]
  }
},
  {
  "version": "2026.3.31",
  "date": "2026-03-31",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [
      "ACP插件MCP桥接配置支持",
      "可配置的空闲流超时设置",
      "背景任务控制平面重构",
      "QQ Bot作为捆绑通道插件"
    ],
    "improvements": [
      "⚠️ 移除重复的节点执行shell包装器",
      "⚠️ 弃用遗留提供商兼容性子路径",
      "⚠️ 技能安装安全检查默认关闭"
    ],
    "bugfixes": [
      "修复Slack重试重复回复问题",
      "修复OpenAI Responses工具模式规范化",
      "修复ACP安全工具名称覆盖问题"
    ]
  }
}
])

// 分类图标映射
const getCategoryIcon = (category) => {
  const icons = {
    features: '✨',
    improvements: '🚀',
    bugfixes: '🐛'
  }
  return icons[category] || '📝'
}

// 分类名称映射
const getCategoryName = (category) => {
  const names = {
    features: '新功能',
    improvements: '功能改进',
    bugfixes: '问题修复'
  }
  return names[category] || '其他'
}

// 版本类型图标映射
const getTypeIcon = (type) => {
  const icons = {
    '稳定版': '✅',
    '测试版': '🧪',
    '重大更新': '⚡'
  }
  return icons[type] || '📦'
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.changelog-view {
  min-height: 100vh;
  background: var(--color-bg-primary);
  position: relative;
  overflow-x: hidden;
}

.changelog-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: linear-gradient(135deg, var(--color-accent-subtle) 0%, transparent 50%);
  opacity: 0.3;
}

.changelog-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  position: relative;
  z-index: 1;
}

/* Header */
.changelog-header {
  margin-bottom: var(--space-12);
  text-align: center;
  padding: var(--space-12) 0;
}

.header-content {
  max-width: 700px;
  margin: 0 auto;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  margin-bottom: var(--space-4);
}

.title-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-icon {
  font-size: 3.5rem;
  position: relative;
  z-index: 2;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5rem;
  height: 5rem;
  background: radial-gradient(circle, var(--color-accent-subtle) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
  animation: pulse 3s ease-in-out infinite;
}

.title-text-wrapper {
  text-align: left;
}

.page-title {
  margin: 0 0 var(--space-2) 0;
}

.title-gradient {
  font-size: var(--text-4xl);
  font-weight: 900;
  background: linear-gradient(135deg, var(--color-accent) 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.page-description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  max-width: 500px;
}

/* Changelog Content */
.changelog-content {
  position: relative;
  margin-bottom: var(--space-12);
}

.timeline-container {
  position: relative;
  padding: var(--space-8) 0;
}

.timeline-line {
  position: absolute;
  left: 2rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, 
    var(--color-accent) 0%, 
    var(--color-border) 50%, 
    transparent 100%
  );
  opacity: 0.3;
}

.changelog-list {
  position: relative;
  z-index: 2;
}

.changelog-item {
  position: relative;
  margin-bottom: var(--space-12);
  display: flex;
  align-items: flex-start;
  gap: var(--space-6);
  opacity: 0;
  animation: slideUp 0.6s ease-out forwards;
}

.changelog-item:last-child {
  margin-bottom: 0;
}

/* Timeline Node */
.timeline-node {
  position: relative;
  flex-shrink: 0;
  margin-top: var(--space-4);
}

.node-dot {
  width: 16px;
  height: 16px;
  background: var(--color-bg-primary);
  border: 3px solid var(--color-accent);
  border-radius: 50%;
  position: relative;
  z-index: 3;
  transition: all var(--transition-normal);
}

.node-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse 2s ease-in-out infinite;
}

.latest-node .node-dot {
  background: var(--color-accent);
  box-shadow: 0 0 20px var(--color-accent);
  animation: glow 2s ease-in-out infinite alternate;
}

.latest-node .node-ring {
  border-color: var(--color-accent);
  opacity: 0.6;
  animation: pulse 1.5s ease-in-out infinite;
}

/* Version Card */
.version-card {
  flex: 1;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
  position: relative;
}

.version-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-border-focus);
}

.latest-card {
  background: linear-gradient(135deg, 
    var(--color-accent-subtle) 0%, 
    var(--color-bg-elevated) 100%
  );
  border-color: var(--color-accent);
  box-shadow: 0 0 30px var(--color-accent-subtle);
}

.latest-card:hover {
  box-shadow: 0 0 40px var(--color-accent-subtle);
}

.card-header {
  padding: var(--space-6) var(--space-6) 0;
}

.version-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.version-title {
  flex: 1;
  min-width: 200px;
}

.version-number {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin: 0 0 var(--space-2) 0;
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--color-text-primary);
}

.version-tag {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  font-family: var(--font-mono);
  font-weight: 700;
  border: 2px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.version-tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.6s;
}

.version-tag:hover::before {
  left: 100%;
}

.version-tag:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

.version-tag.latest-tag {
  background: linear-gradient(135deg, var(--color-accent), #8b5cf6);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 20px var(--color-accent-subtle);
}

.latest-badge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: linear-gradient(135deg, var(--color-success), #16a34a);
  color: white;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
  animation: bounce 2s ease-in-out infinite;
}

.badge-icon {
  font-size: var(--text-sm);
}

.version-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  align-items: flex-end;
}

.release-date {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 600;
  background: var(--color-bg-secondary);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.date-icon {
  font-size: var(--text-sm);
}

.release-type {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid;
}

.type-icon {
  font-size: var(--text-sm);
}

.release-type.稳定版 {
  background: var(--color-success-subtle);
  color: var(--color-success);
  border-color: var(--color-success);
}

.release-type.测试版 {
  background: var(--color-warning-subtle);
  color: var(--color-warning);
  border-color: var(--color-warning);
}

.release-type.重大更新 {
  background: var(--color-error-subtle);
  color: var(--color-error);
  border-color: var(--color-error);
}

/* Changes Content */
.changes-content {
  padding: var(--space-6);
}

.change-category {
  margin-bottom: var(--space-6);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--space-4);
  border: 1px solid var(--color-border-subtle);
  transition: all var(--transition-normal);
}

.change-category:hover {
  border-color: var(--color-border);
  box-shadow: var(--shadow-sm);
}

.change-category:last-child {
  margin-bottom: 0;
}

.category-header {
  margin-bottom: var(--space-3);
}

.category-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.category-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: var(--color-bg-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.category-icon {
  font-size: var(--text-base);
}

.category-name {
  flex: 1;
}

.category-count {
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  min-width: 1.5rem;
  text-align: center;
}

.changes-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.change-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-2) 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
  font-size: var(--text-sm);
  opacity: 0;
  animation: fadeInUp 0.4s ease-out forwards;
}

.change-item:last-child {
  padding-bottom: 0;
}

.change-bullet {
  width: 6px;
  height: 6px;
  background: var(--color-accent);
  border-radius: 50%;
  margin-top: 0.5em;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px var(--color-accent-subtle);
  animation: pulse 2s ease-in-out infinite;
}

.change-text {
  flex: 1;
  transition: color var(--transition-fast);
}

.change-item:hover .change-text {
  color: var(--color-text-primary);
}

/* Footer */
.changelog-footer {
  margin-top: var(--space-12);
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
}

.footer-content {
  display: flex;
  justify-content: center;
}

.footer-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6) var(--space-8);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
}

.footer-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-border-focus);
}

.footer-text {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  margin: 0;
  line-height: 1.5;
  text-align: center;
}

.footer-icon {
  font-size: var(--text-base);
  color: var(--color-accent);
}

.external-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-normal);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  background: var(--color-accent-subtle);
  border: 1px solid var(--color-accent-subtle);
}

.external-link:hover {
  color: var(--color-accent-hover);
  text-decoration: none;
  background: var(--color-accent);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--color-accent-subtle);
}

.link-text {
  font-weight: 600;
}

.external-icon {
  opacity: 0.8;
  transition: all var(--transition-normal);
}

.external-link:hover .external-icon {
  transform: translate(2px, -2px);
  opacity: 1;
}

/* Animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { 
    opacity: 1; 
    transform: translate(-50%, -50%) scale(1);
  }
  50% { 
    opacity: 0.7; 
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes glow {
  from {
    box-shadow: 0 0 20px var(--color-accent);
  }
  to {
    box-shadow: 0 0 30px var(--color-accent), 0 0 40px var(--color-accent);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-3px);
  }
  60% {
    transform: translateY(-2px);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .changelog-container {
    padding: 0 var(--space-4);
  }

  .title-wrapper {
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
  }

  .title-text-wrapper {
    text-align: center;
  }

  .title-gradient {
    font-size: var(--text-3xl);
  }

  .timeline-line {
    left: 1.5rem;
  }

  .changelog-item {
    gap: var(--space-4);
  }

  .version-info {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .version-meta {
    align-items: flex-start;
  }

  .card-header {
    padding: var(--space-4) var(--space-4) 0;
  }

  .changes-content {
    padding: var(--space-4);
  }

  .footer-card {
    padding: var(--space-4) var(--space-6);
    margin: 0 var(--space-4);
  }
}

@media (max-width: 480px) {
  .changelog-container {
    padding: 0 var(--space-3);
  }

  .title-gradient {
    font-size: var(--text-2xl);
  }

  .timeline-container {
    padding: var(--space-6) 0;
  }

  .timeline-line {
    left: 1rem;
  }

  .changelog-item {
    gap: var(--space-3);
  }

  .card-header {
    padding: var(--space-3) var(--space-3) 0;
  }

  .changes-content {
    padding: var(--space-3);
  }

  .footer-card {
    padding: var(--space-3) var(--space-4);
    margin: 0 var(--space-2);
  }

  .category-title {
    font-size: var(--text-base);
  }

  .version-number {
    font-size: var(--text-xl);
  }
}
</style>