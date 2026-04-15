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

      <!-- Main Content Layout with Sidebar -->
      <div class="changelog-layout">
        <!-- Sidebar Navigation -->
        <aside class="changelog-sidebar" :class="{ 'sidebar-hidden': !showSidebar }">
          <div class="sidebar-container">
            <div class="sidebar-header">
              <h3 class="sidebar-title">版本目录</h3>
              <button class="sidebar-toggle" @click="toggleSidebar" :title="showSidebar ? '隐藏侧边栏' : '显示侧边栏'">
                <span class="toggle-icon">{{ showSidebar ? '←' : '→' }}</span>
              </button>
            </div>
            <div class="sidebar-content">
              <ul class="version-list">
                <li 
                  v-for="release in changelogData" 
                  :key="release.version"
                  class="version-item"
                  :class="{ 'active': activeVersion === release.version }"
                >
                  <a @click.prevent="scrollToVersion(release.version)" href="#" class="version-link">
                    <span class="version-number">v{{ release.version }}</span>
                    <span v-if="release.latest" class="latest-badge-sidebar">最新</span>
                    <span class="version-date">{{ formatDate(release.date) }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <!-- Back to Top Button -->
        <button class="back-to-top" :class="{ 'show': showBackToTop }" @click="scrollToTop" title="回到顶部">
          <span class="back-to-top-icon">↑</span>
        </button>

        <!-- Main Content -->
        <main class="changelog-content animate-scale-in" :class="{ 'content-expanded': !showSidebar }">
        <div class="timeline-container">
          <div class="timeline-line"></div>
          
          <div class="changelog-list">
            <div 
              v-for="(release, index) in changelogData" 
              :key="release.version"
              :id="`version-${release.version}`"
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// 响应式状态管理
const enableAutoHide = ref(true);
const showNavigation = ref(true);
const showSidebar = ref(true);
const showBackToTop = ref(false);
const activeVersion = ref('');

// 自动隐藏逻辑
let lastScrollTop = 0;

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // 控制回到顶部按钮显示
  showBackToTop.value = scrollTop > 300;
  
  // 控制导航栏自动隐藏
  if (enableAutoHide.value) {
    // 向下滚动时隐藏，向上滚动时显示
    const currentScrollTop = scrollTop;
    
    if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
      // 向下滚动
      showNavigation.value = false;
    } else if (currentScrollTop < lastScrollTop || currentScrollTop <= 50) {
      // 向上滚动或滚动到顶部附近
      showNavigation.value = true;
    }
    
    lastScrollTop = currentScrollTop;
  }
  
  // 检测当前活跃版本
  const versions = changelogData.value;
  for (let i = versions.length - 1; i >= 0; i--) {
    const element = document.getElementById(`version-${versions[i].version}`);
    if (element && element.offsetTop <= scrollTop + 200) {
      activeVersion.value = versions[i].version;
      break;
    }
  }
};

// 切换自动隐藏
const toggleAutoHide = () => {
  enableAutoHide.value = !enableAutoHide.value;
  if (!enableAutoHide.value) {
    showNavigation.value = true;
  }
};

// 切换侧边栏显示
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

// 滚动到指定版本
const scrollToVersion = (version) => {
  const element = document.getElementById(`version-${version}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 回到顶部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 更新日志数据
const changelogData = ref([
  {
  "version": "2026.4.14",
  "date": "2026-04-14",
  "type": "release",
  "changes": {
    "features": [
      "系统稳定性优化"
    ],
    "improvements": [
      "性能提升"
    ],
    "bugfixes": [
      "修复已知问题"
    ]
  }
},
  {
  "version": "2026.4.12",
  "date": "2026-04-12",
  "type": "release",
  "changes": {
    "features": [
      "新增API接口"
    ],
    "improvements": [],
    "bugfixes": [
      "修复43个问题"
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

// 滚动到指定版本（已存在，无需重复声明）

// 监听滚动，更新当前活跃版本
const updateActiveVersion = () => {
  const versions = changelogData.value.map(v => v.version)
  const scrollPosition = window.scrollY + 100
  
  for (const version of versions) {
    const element = document.getElementById(`version-${version}`)
    if (element) {
      const elementTop = element.offsetTop
      const elementBottom = elementTop + element.offsetHeight
      
      if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
        activeVersion.value = version
        break
      }
    }
  }
}

onMounted(() => {
  // 设置默认活跃版本为最新版
  if (changelogData.value.length > 0) {
    const latest = changelogData.value.find(v => v.latest)
    activeVersion.value = latest ? latest.version : changelogData.value[0].version
  }
  
  // 添加滚动监听
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // 监听滚动事件
  window.addEventListener('scroll', updateActiveVersion)

  // 添加滚动事件监听
  window.addEventListener('scroll', handleNavScroll, { passive: true })
  
  // 初始化时检测一次位置
  handleScroll();
  })

// 在组件卸载时移除事件监听
onUnmounted(() => {
  // 清理事件监听
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('scroll', updateActiveVersion)

  // 移除滚动事件监听
  window.removeEventListener('scroll', handleNavScroll)
  })
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


  /* 版本导航样式 */
  .version-navigation {
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.05) 0%, rgba(160, 82, 45, 0.05) 100%);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    margin: var(--space-6) 0;
    border: 1px solid rgba(139, 69, 19, 0.1);
  }

  .nav-container {
    max-width: 100%;
  }

  .nav-title {
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--space-3);
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .nav-title::before {
    content: "🧭";
    font-size: var(--text-xl);
  }

  .nav-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    max-height: 200px;
    overflow-y: auto;
    padding-right: var(--space-2);
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-secondary);
    font-size: var(--text-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
  }

  .nav-item:hover {
    background: var(--color-primary-light);
    color: var(--color-primary);
    border-color: var(--color-primary);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  .nav-item.active {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
  }

  .nav-item.latest {
    border-color: var(--color-accent);
  }

  .nav-item.latest:hover {
    background: var(--color-accent-light);
    color: var(--color-accent);
  }

  .nav-item.latest.active {
    background: var(--color-accent);
    color: white;
  }

  .nav-version {
    font-family: var(--font-mono);
  }

  .nav-latest-badge {
    background: var(--color-accent);
    color: white;
    font-size: var(--text-xs);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    font-weight: 600;
  }

  .nav-item.active .nav-latest-badge {
    background: rgba(255, 255, 255, 0.2);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .version-navigation {
      padding: var(--space-3);
      margin: var(--space-4) 0;
    }

    .nav-title {
      font-size: var(--text-base);
    }

    .nav-list {
      max-height: 150px;
      gap: var(--space-1);
    }

    .nav-item {
      padding: var(--space-1) var(--space-2);
      font-size: var(--text-xs);
    }
  }

  @media (max-width: 480px) {
    .nav-list {
      max-height: 120px;
    }

    .nav-item {
      padding: var(--space-1) var(--space-2);
      font-size: var(--text-xs);
    }

    .nav-latest-badge {
      font-size: 10px;
      padding: 1px 4px;
    }
  }

.virtual-scroll-container {
  height: 600px;
  overflow-y: auto;
  position: relative;
  will-change: scroll-position;
}

.virtual-scroll-content {
  position: relative;
}

.virtual-scroll-items {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  will-change: transform;
}

.changelog-item {
  contain: layout style paint;
  will-change: transform, opacity;
}
/* 导航自动隐藏样式 */
.version-navigation {
  position: fixed;
  left: 20px;
  top: 100px;
  width: 180px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  z-index: 100;
}

.version-navigation.nav-hidden {
  transform: translateX(-220px);
  opacity: 0;
}

.nav-container {
  padding: 15px;
}

.nav-title {
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 2px 0;
}

.nav-item a {
  display: block;
  padding: 8px 12px;
  text-decoration: none;
  color: #666;
  font-size: 14px;
  border-radius: 3px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-item a:hover {
  background: #f5f5f5;
  color: #333;
}

.nav-item.active a {
  background: #e3f2fd;
  color: #1976d2;
  font-weight: 500;
}

.nav-version {
  font-weight: 500;
}

.nav-latest {
  display: inline-block;
  background: #1976d2;
  color: white;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 10px;
  margin-left: 6px;
  font-weight: normal;
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--color-accent);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
}

.back-to-top.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background: var(--color-accent-hover, var(--color-accent));
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.back-to-top-icon {
  transition: transform 0.2s ease;
}

.back-to-top:hover .back-to-top-icon {
  transform: translateY(-2px);
}

/* Layout with Sidebar */
.changelog-layout {
  display: flex;
  min-height: calc(100vh - 200px);
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Sidebar Styles */
.changelog-sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 80px;
  height: fit-content;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  transition: all 0.3s ease;
  z-index: 50;
}

.changelog-sidebar.sidebar-hidden {
  width: 0;
  overflow: hidden;
}

.sidebar-container {
  background: var(--color-bg-secondary, var(--color-bg-tertiary));
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-tertiary, var(--color-bg-secondary));
}

.sidebar-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.sidebar-toggle {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-hover);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
}

.sidebar-toggle:hover {
  background: var(--color-accent, var(--color-text-accent));
  color: white;
  border-color: var(--color-accent, var(--color-text-accent));
}

.sidebar-content {
  padding: var(--space-2);
}

.version-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.version-item {
  margin-bottom: var(--space-1);
}

.version-link {
  display: block;
  padding: var(--space-2) var(--space-3);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  color: var(--color-text-secondary);
}

.version-link:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.version-item.active .version-link {
  background: var(--color-accent, var(--color-text-accent));
  color: white;
}

.version-number {
  display: block;
  font-size: var(--text-sm);
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.latest-badge-sidebar {
  display: inline-block;
  background: var(--color-success, #10b981);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  margin-left: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.version-date {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  opacity: 0.8;
}

/* Main Content */
.changelog-content {
  flex: 1;
  min-width: 0;
  transition: margin-left 0.3s ease;
}

.changelog-content.content-expanded {
  margin-left: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .changelog-layout {
    padding: 0 var(--space-4);
  }
  
  .changelog-sidebar {
    width: 240px;
  }
}

@media (max-width: 768px) {
  .changelog-layout {
    flex-direction: column;
    padding: 0 var(--space-4);
  }
  
  .changelog-sidebar {
    width: 100%;
    position: relative;
    top: 0;
    max-height: none;
    margin-bottom: var(--space-6);
  }
  
  .changelog-sidebar.sidebar-hidden {
    width: 100%;
    height: 0;
    margin-bottom: 0;
  }
  
  .sidebar-container {
    max-height: 300px;
    overflow-y: auto;
  }
  
  .changelog-content {
    margin-left: 0 !important;
  }
}

@media (max-width: 640px) {
  .changelog-layout {
    padding: 0 var(--space-3);
  }
  
  .sidebar-header {
    padding: var(--space-3);
  }
  
  .sidebar-content {
    padding: var(--space-1);
  }
  
  .version-link {
    padding: var(--space-1) var(--space-2);
  }
}</style>