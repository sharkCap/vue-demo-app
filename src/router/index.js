import { createRouter, createWebHistory } from 'vue-router'

// 懒加载页面组件
const HomeView = () => import('../views/HomeView.vue')
const ArchitectureView = () => import('../views/ArchitectureView.vue')
const DeploymentView = () => import('../views/DeploymentView.vue')
const ServerInfoView = () => import('../views/ServerInfoView.vue')
const TodoView = () => import('../views/TodoView.vue')
const ChangelogView = () => import('../views/ChangelogView.vue')

// 路由配置
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '首页 - OpenClaw 能力演示',
      description: '展示OpenClaw AI从想法到部署的完整执行能力'
    }
  },
  {
    path: '/architecture',
    name: 'architecture',
    component: ArchitectureView,
    meta: {
      title: '架构设计',
      description: '项目技术架构与执行步骤详解'
    }
  },
  {
    path: '/deployment',
    name: 'deployment',
    component: DeploymentView,
    meta: {
      title: '部署详情',
      description: 'Docker容器化部署流程与配置'
    }
  },
  {
    path: '/server-info',
    name: 'server-info',
    component: ServerInfoView,
    meta: {
      title: '服务器信息',
      description: '实时服务器状态与监控'
    }
  },
  {
    path: '/todo',
    name: 'todo',
    component: TodoView,
    meta: {
      title: 'Todo List',
      description: '任务管理 - 高效完成目标'
    }
  },
  {
    path: '/changelog',
    name: 'changelog',
    component: ChangelogView,
    meta: {
      title: '更新日志',
      description: 'OpenClaw版本更新记录与功能迭代'
    }
  },
  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

// 创建路由实例
const router = createRouter({
  // 使用HTML5历史模式
  history: createWebHistory(),
  routes,
  
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// 全局路由守卫 - 标题设置
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || 'OpenClaw Vue3 演示应用'
  
  // 设置页面描述
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', to.meta.description || '')
  }
  
  next()
})

// 全局路由守卫 - 导航完成
router.afterEach((to, from) => {
  // 可以在这里添加页面访问统计等
  console.log(`已导航到: ${to.name}`)
})

export default router