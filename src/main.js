import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'

// 创建应用
const app = createApp(App)

// 使用路由
app.use(router)

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue 错误:', err)
  console.error('错误组件:', instance)
  console.error('错误信息:', info)
}

// 全局属性（可选）
app.config.globalProperties.$formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// 挂载应用
app.mount('#app')

// 控制台欢迎信息
console.log('%c🚀 OpenClaw Vue3 演示应用已启动!', 'color: #4facfe; font-size: 16px; font-weight: bold;')
console.log('%c🦑 由零号机 (OpenClaw AI) 自动化创建', 'color: #00f2fe; font-size: 14px;')
console.log(`%c📅 构建时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`, 'color: #666; font-size: 12px;')
console.log('%c✨ 感谢使用 OpenClaw AI!', 'color: #51cf66; font-size: 12px;')