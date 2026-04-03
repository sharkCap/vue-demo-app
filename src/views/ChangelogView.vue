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
</script>

<style scoped>
.changelog-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem 0;
}

.changelog-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.changelog-header {
  margin-bottom: 3rem;
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
  gap: 0.75rem;
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-icon {
  font-size: 2rem;
  -webkit-text-fill-color: initial;
}

.page-description {
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.6;
  margin-top: 0.5rem;
}

/* Changelog Content */
.changelog-content {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.changelog-list {
  padding: 2rem;
}

.changelog-item {
  position: relative;
  padding-bottom: 2.5rem;
  margin-bottom: 2.5rem;
  border-bottom: 2px solid #f1f5f9;
  transition: all 0.3s ease;
}

.changelog-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.changelog-item:hover {
  transform: translateY(-2px);
}

.changelog-item.latest {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.08));
  margin: -2rem;
  padding: 2rem;
  border-radius: 1.5rem 1.5rem 0 0;
  border-bottom: 2px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.changelog-item.latest:hover {
  transform: none;
}

/* Version Header */
.version-header {
  margin-bottom: 1.5rem;
  position: relative;
}

.version-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.version-number {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-size: 1.75rem;
  font-weight: 800;
  color: #1e293b;
}

.version-tag {
  background: #f8fafc;
  color: #1e293b;
  padding: 0.375rem 1rem;
  border-radius: 0.75rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-weight: 600;
  border: 2px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.version-tag:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.version-tag.latest-tag {
  background: linear-gradient(135deg, #3b82f6, #10b981);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.4);
}

.latest-badge {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 4px 0 rgba(16, 185, 129, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.version-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.release-date {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 600;
  background: #f1f5f9;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
}

.release-type {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.release-type.稳定版 {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  color: #166534;
  border: 1px solid #86efac;
}

.release-type.测试版 {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #92400e;
  border: 1px solid #fcd34d;
}

.release-type.重大更新 {
  background: linear-gradient(135deg, #fecaca, #fca5a5);
  color: #991b1b;
  border: 1px solid #f87171;
}

/* Changes Content */
.changes-content {
  padding-left: 1rem;
  border-left: 3px solid #e2e8f0;
  margin-left: 0.5rem;
}

.change-category {
  margin-bottom: 1.5rem;
  background: #fafafa;
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #f1f5f9;
}

.change-category:last-child {
  margin-bottom: 0;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.category-icon {
  font-size: 1.25rem;
  background: white;
  padding: 0.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.changes-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.change-item {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #475569;
  line-height: 1.6;
  font-size: 0.95rem;
}

.change-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.625rem;
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.change-item:last-child {
  margin-bottom: 0;
}

.change-item:hover {
  color: #1e293b;
}

/* Footer */
.changelog-footer {
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-top: 1px solid #e2e8f0;
  text-align: center;
}

.footer-text {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

.external-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  background: rgba(59, 130, 246, 0.1);
}

.external-link:hover {
  color: #1d4ed8;
  text-decoration: none;
  background: rgba(59, 130, 246, 0.2);
  transform: translateY(-1px);
}

.external-icon {
  opacity: 0.8;
  transition: transform 0.2s ease;
}

.external-link:hover .external-icon {
  transform: translate(1px, -1px);
}

/* Responsive */
@media (max-width: 768px) {
  .changelog-container {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .version-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .version-number {
    font-size: 1.5rem;
  }

  .changes-content {
    padding-left: 0.75rem;
    margin-left: 0.25rem;
  }

  .changelog-list {
    padding: 1.5rem;
  }

  .changelog-item.latest {
    margin: -1.5rem;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .changelog-view {
    padding: 1rem 0;
  }

  .changelog-list {
    padding: 1rem;
  }

  .changelog-item.latest {
    margin: -1rem;
    padding: 1rem;
  }

  .changelog-footer {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .change-category {
    padding: 0.75rem;
  }
}

/* Animation for latest version */
.changelog-item.latest .version-tag {
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.4);
  }
  to {
    box-shadow: 0 4px 20px 0 rgba(59, 130, 246, 0.6);
  }
}
</style>