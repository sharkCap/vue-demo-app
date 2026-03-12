<script setup>
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <div id="app">
    <NavigationBar />
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-left">
          <span class="footer-logo">🦑</span>
          <span class="footer-text">深海王 · OpenClaw</span>
        </div>
        <div class="footer-links">
          <a href="https://docs.openclaw.ai" target="_blank">文档</a>
          <a href="https://github.com/openclaw/openclaw" target="_blank">GitHub</a>
          <a href="https://clawhub.com" target="_blank">ClawHub</a>
        </div>
        <div class="footer-meta">
          © 2026 · 由 AI 驱动
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Page transition */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.app-footer {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  padding: var(--space-6) var(--space-6);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
}

.footer-left {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.footer-logo {
  font-size: 1.25rem;
}

.footer-text {
  font-weight: 500;
  color: var(--color-text-secondary);
}

.footer-links {
  display: flex;
  gap: var(--space-6);
}

.footer-links a {
  color: var(--color-text-tertiary);
  font-size: var(--text-sm);
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--color-text-primary);
}

.footer-meta {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-links {
    gap: var(--space-4);
  }
}
</style>
