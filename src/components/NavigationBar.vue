<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <!-- Logo -->
      <router-link to="/" class="nav-logo">
        <span class="logo-icon">🦑</span>
        <span class="logo-text">
          <span class="logo-title">深海王</span>
          <span class="logo-badge">OpenClaw</span>
        </span>
      </router-link>

      <!-- Navigation -->
      <div class="nav-links" :class="{ open: menuOpen }">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path" 
          class="nav-link"
          :class="{ active: isActive(link.path) }"
        >
          <span class="nav-icon">{{ link.icon }}</span>
          <span class="nav-label">{{ link.label }}</span>
        </router-link>
        
        <div class="nav-divider"></div>
        
        <a href="https://docs.openclaw.ai" target="_blank" class="nav-link external">
          <span class="nav-icon">📖</span>
          <span class="nav-label">文档</span>
          <svg class="external-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H5M9 3V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

      <!-- Actions -->
      <div class="nav-actions">
        <!-- Theme Toggle -->
        <button @click="toggleTheme" class="theme-toggle" :title="isDark ? '切换到明亮模式' : '切换到暗黑模式'">
          <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <!-- Status -->
        <div class="status-pill" :class="statusClass">
          <span class="status-dot"></span>
          <span class="status-label">{{ statusLabel }}</span>
        </div>
        
        <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
          <span :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const route = useRoute()
const menuOpen = ref(false)
const { isDark, toggleTheme } = useTheme()

const navLinks = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/todo', label: 'Todo', icon: '✓' },
  { path: '/architecture', label: '架构', icon: '§' },
  { path: '/deployment', label: '部署', icon: '◇' },
  { path: '/server-info', label: '状态', icon: '◉' },
]

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const statusClass = computed(() => 'online')
const statusLabel = computed(() => '在线')
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border);
  transition: background-color var(--transition-normal);
}

@media (prefers-reduced-motion: no-preference) {
  .navbar {
    backdrop-filter: blur(20px);
    background: rgba(10, 10, 11, 0.8);
  }
  
  [data-theme="light"] .navbar {
    background: rgba(255, 255, 255, 0.8);
  }
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 var(--space-6);
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  color: inherit;
}

.logo-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.logo-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

.logo-badge {
  font-size: 10px;
  color: var(--color-text-tertiary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Navigation Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-tertiary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-hover);
}

.nav-link.active {
  color: var(--color-text-primary);
  background: var(--color-bg-tertiary);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--color-accent);
  border-radius: 1px;
}

.nav-icon {
  font-size: var(--text-base);
  line-height: 1;
}

.nav-label {
  line-height: 1;
}

.nav-divider {
  width: 1px;
  height: 20px;
  background: var(--color-border);
  margin: 0 var(--space-2);
}

.external-arrow {
  opacity: 0.5;
}

/* Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* Theme Toggle */
.theme-toggle {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.theme-toggle:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
  border-color: var(--color-text-muted);
}

.status-pill {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-success);
  animation: pulse 2s ease-in-out infinite;
}

.status-label {
  font-weight: 500;
}

/* Menu Toggle */
.menu-toggle {
  display: none;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}

.menu-toggle:hover {
  background: var(--color-bg-hover);
}

.menu-toggle span,
.menu-toggle span::before,
.menu-toggle span::after {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--color-text-secondary);
  border-radius: 1px;
  transition: all var(--transition-fast);
}

.menu-toggle span {
  position: relative;
}

.menu-toggle span::before,
.menu-toggle span::after {
  content: '';
  position: absolute;
  left: 0;
}

.menu-toggle span::before {
  top: -6px;
}

.menu-toggle span::after {
  top: 6px;
}

.menu-toggle span.open {
  background: transparent;
}

.menu-toggle span.open::before {
  top: 0;
  transform: rotate(45deg);
}

.menu-toggle span.open::after {
  top: 0;
  transform: rotate(-45deg);
}

/* Mobile */
@media (max-width: 900px) {
  .nav-label {
    display: none;
  }
}

@media (max-width: 640px) {
  .nav-links {
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    align-items: stretch;
    padding: var(--space-4);
    background: var(--color-bg-primary);
    border-top: 1px solid var(--color-border);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all var(--transition-normal);
    gap: var(--space-2);
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    padding: var(--space-3) var(--space-4);
  }

  .nav-label {
    display: inline;
  }

  .nav-divider {
    display: none;
  }

  .status-pill {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
