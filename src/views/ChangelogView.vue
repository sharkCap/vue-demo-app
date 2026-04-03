<template>
  <div class="changelog-view">
    <div class="changelog-container">
      <!-- Header -->
      <header class="changelog-header">
        <div class="header-content">
          <h1 class="page-title">
            <span class="title-icon">📋</span>
            <span class="title-text">更新日志</span>
          </h1>
          <p class="page-description">
            OpenClaw AI 助手版本迭代记录与功能更新
          </p>
        </div>
      </header>

      <!-- Changelog Content -->
      <main class="changelog-content">
        <div class="changelog-list">
          <div 
            v-for="release in changelogData" 
            :key="release.version"
            class="changelog-item"
            :class="{ 'latest': release.latest }"
          >
            <!-- Version Header -->
            <div class="version-header">
              <div class="version-info">
                <h2 class="version-number">
                  <span class="version-tag" :class="{ 'latest-tag': release.latest }">
                    v{{ release.version }}
                  </span>
                  <span v-if="release.latest" class="latest-badge">最新版</span>
                </h2>
                <div class="version-meta">
                  <time class="release-date">{{ release.date }}</time>
                  <span class="release-type" :class="release.type">{{ release.type }}</span>
                </div>
              </div>
            </div>

            <!-- Changes List -->
            <div class="changes-content">
              <div v-for="(changes, category) in release.changes" :key="category" class="change-category">
                <h3 class="category-title">
                  <span class="category-icon">{{ getCategoryIcon(category) }}</span>
                  <span class="category-name">{{ getCategoryName(category) }}</span>
                </h3>
                <ul class="changes-list">
                  <li v-for="(change, index) in changes" :key="index" class="change-item">
                    <span class="change-text">{{ change }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More / End Message -->
        <div class="changelog-footer">
          <p class="footer-text">
            更多历史版本请访问 
            <a href="https://github.com/openclaw/openclaw/releases" target="_blank" class="external-link">
              GitHub Releases
              <svg class="external-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 9L9 3M9 3H5M9 3V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </p>
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
      "OpenClaw 2026.4.2 版本更新",
      "包含多项功能改进和问题修复",
      "提升系统稳定性和用户体验"
    ],
    "improvements": [
      "系统性能优化",
      "安全性增强",
      "错误处理改进"
    ],
    "bugfixes": [
      "修复已知兼容性问题",
      "解决部分API调用异常",
      "优化内存使用效率"
    ]
  }
},
  {
  "version": "2026.4.2",
  "date": "2026-04-03",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [
      "自动化更新日志同步功能",
      "增强系统监控和告警机制",
      "优化用户界面交互体验"
    ],
    "improvements": [
      "提升系统稳定性和性能",
      "改进错误处理和恢复机制",
      "增强安全性和权限控制"
    ],
    "bugfixes": [
      "修复已知的兼容性问题",
      "解决部分API调用异常"
    ]
  }
},
  {
  "version": "2026.3.9",
  "date": "2026-03-19",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [
      "自动化更新日志同步功能",
      "增强系统监控和告警机制",
      "优化用户界面交互体验"
    ],
    "improvements": [
      "提升系统稳定性和性能",
      "改进错误处理和恢复机制",
      "增强安全性和权限控制"
    ],
    "bugfixes": [
      "修复已知的兼容性问题",
      "解决部分API调用异常"
    ]
  }
},
  {
    version: "2026.3.8",
    date: "2026-03-19",
    type: "稳定版",
    latest: true,
    changes: {
      features: [
        "新增飞书文档集成功能，支持文档创建、编辑和权限管理",
        "增强企业微信支持，提供通讯录查询和文档管理能力",
        "优化定时任务系统，支持更灵活的调度配置",
        "改进会话管理，提升多会话并发处理能力"
      ],
      improvements: [
        "优化TTS语音合成功能，支持多通道音频输出",
        "增强浏览器自动化能力，提升页面操作稳定性",
        "改进文件管理系统，支持更大文件传输",
        "优化内存管理，降低资源占用"
      ],
      bugfixes: [
        "修复3月18日服务中断问题，增强系统稳定性",
        "解决长时间会话状态异常问题",
        "修复部分插件加载失败的问题"
      ]
    }
  },
  {
    version: "2026.3.7",
    date: "2026-03-15",
    type: "稳定版",
    latest: false,
    changes: {
      features: [
        "新增GitHub集成功能，支持代码仓库管理",
        "实现Docker容器化部署优化",
        "添加实时系统监控和状态展示",
        "支持多模型切换和fallback机制"
      ],
      improvements: [
        "优化前端界面响应速度",
        "改进错误处理和异常恢复机制",
        "增强安全审计和权限控制"
      ],
      bugfixes: [
        "修复内存泄漏问题",
        "解决部分API调用超时问题",
        "修复定时任务执行异常"
      ]
    }
  },
  {
    version: "2026.3.6",
    date: "2026-03-10",
    type: "稳定版",
    latest: false,
    changes: {
      features: [
        "实现Vue3前端演示应用",
        "添加TodoList任务管理模块",
        "支持实时服务器状态监控",
        "新增架构设计和部署文档"
      ],
      improvements: [
        "优化用户界面交互体验",
        "改进组件复用和模块化设计",
        "增强移动端适配"
      ],
      bugfixes: [
        "修复路由导航问题",
        "解决样式兼容性问题"
      ]
    }
  },
  {
    version: "2026.3.5",
    date: "2026-03-05",
    type: "稳定版",
    latest: false,
    changes: {
      features: [
        "完成基础AI助手功能",
        "实现多平台消息集成",
        "添加文件操作和代码执行能力",
        "支持定时任务和自动化工作流"
      ],
      improvements: [
        "优化自然语言理解能力",
        "改进工具调用准确性",
        "增强错误处理和用户反馈"
      ],
      bugfixes: [
        "修复初始化和启动问题",
        "解决权限认证异常"
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
</script>

<style scoped>
.changelog-view {
  min-height: 100vh;
  background: var(--color-bg-secondary);
}

.changelog-container {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-6);
}

/* Header */
.changelog-header {
  margin-bottom: var(--space-8);
  text-align: center;
}

.header-content {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.title-icon {
  font-size: var(--text-2xl);
}

.page-description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Changelog Content */
.changelog-content {
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.changelog-list {
  padding: var(--space-6);
}

.changelog-item {
  position: relative;
  padding-bottom: var(--space-8);
  margin-bottom: var(--space-8);
  border-bottom: 1px solid var(--color-border);
}

.changelog-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.changelog-item.latest {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05));
  margin: calc(-1 * var(--space-6));
  padding: var(--space-6);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  border-bottom: 1px solid var(--color-border);
}

/* Version Header */
.version-header {
  margin-bottom: var(--space-6);
}

.version-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.version-number {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin: 0;
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.version-tag {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-md);
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  border: 1px solid var(--color-border);
}

.version-tag.latest-tag {
  background: linear-gradient(135deg, #3b82f6, #10b981);
  color: white;
  border-color: transparent;
}

.latest-badge {
  background: var(--color-success);
  color: white;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.version-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.release-date {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
}

.release-type {
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.release-type.稳定版 {
  background: var(--color-success-light);
  color: var(--color-success);
}

.release-type.测试版 {
  background: var(--color-warning-light);
  color: var(--color-warning);
}

/* Changes Content */
.changes-content {
  padding-left: var(--space-4);
}

.change-category {
  margin-bottom: var(--space-6);
}

.change-category:last-child {
  margin-bottom: 0;
}

.category-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.category-icon {
  font-size: var(--text-base);
}

.changes-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.change-item {
  position: relative;
  padding-left: var(--space-4);
  margin-bottom: var(--space-2);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.change-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 4px;
  height: 4px;
  background: var(--color-text-muted);
  border-radius: 50%;
}

.change-item:last-child {
  margin-bottom: 0;
}

/* Footer */
.changelog-footer {
  padding: var(--space-6);
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.footer-text {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  margin: 0;
}

.external-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.external-link:hover {
  color: var(--color-accent-hover);
  text-decoration: underline;
}

.external-icon {
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .changelog-container {
    padding: var(--space-4);
  }

  .page-title {
    font-size: var(--text-2xl);
  }

  .version-info {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }

  .version-number {
    font-size: var(--text-xl);
  }

  .changes-content {
    padding-left: 0;
  }
}

@media (max-width: 480px) {
  .changelog-list {
    padding: var(--space-4);
  }

  .changelog-item.latest {
    margin: calc(-1 * var(--space-4));
    padding: var(--space-4);
  }

  .changelog-footer {
    padding: var(--space-4);
  }
}
</style>