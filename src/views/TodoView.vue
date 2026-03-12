<template>
  <div class="todo-view">
    <!-- Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Todo List</h1>
        <p class="page-desc">管理任务，高效完成目标</p>
      </div>
      
      <!-- Stats -->
      <div class="header-stats">
        <div class="stat-chip">
          <span class="stat-num">{{ stats.total }}</span>
          <span class="stat-text">总任务</span>
        </div>
        <div class="stat-chip success">
          <span class="stat-num">{{ stats.completed }}</span>
          <span class="stat-text">完成</span>
        </div>
        <div class="stat-chip warning" v-if="stats.highPriority > 0">
          <span class="stat-num">{{ stats.highPriority }}</span>
          <span class="stat-text">重要</span>
        </div>
      </div>
    </header>

    <!-- Add Todo -->
    <section class="add-section">
      <form @submit.prevent="addTodo" class="add-form">
        <div class="form-row-main">
          <input
            v-model="newTodo.title"
            type="text"
            placeholder="添加新任务..."
            class="form-input"
            required
          />
          <button type="submit" class="add-btn" :disabled="loading">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="form-options">
          <select v-model="newTodo.priority" class="form-select">
            <option value="low">低优先级</option>
            <option value="medium">中优先级</option>
            <option value="high">高优先级</option>
          </select>
          <input
            v-model="newTodo.dueDate"
            type="date"
            class="form-date"
          />
        </div>
      </form>
    </section>

    <!-- Filters -->
    <section class="filters-section">
      <div class="filter-tabs">
        <button
          v-for="f in filters"
          :key="f.value"
          @click="currentFilter = f.value"
          :class="['filter-tab', { active: currentFilter === f.value }]"
        >
          {{ f.label }}
          <span v-if="f.count !== undefined" class="tab-count">{{ f.count }}</span>
        </button>
      </div>
      
      <select v-model="sortBy" class="sort-select">
        <option value="createdAt">按创建时间</option>
        <option value="priority">按优先级</option>
        <option value="dueDate">按截止日期</option>
      </select>
    </section>

    <!-- Todo List -->
    <section class="list-section">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
      </div>
      
      <div v-else-if="filteredTodos.length === 0" class="empty-state">
        <div class="empty-icon">✓</div>
        <h3>暂无任务</h3>
        <p>添加你的第一个任务开始吧</p>
      </div>

      <transition-group v-else name="list" tag="div" class="todo-list">
        <div
          v-for="todo in filteredTodos"
          :key="todo._id"
          class="todo-item"
          :class="{ completed: todo.completed, [`priority-${todo.priority}`]: true }"
        >
          <button @click="toggleTodo(todo)" class="check-btn" :class="{ checked: todo.completed }">
            <svg v-if="todo.completed" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <div class="todo-body" @click="openEdit(todo)">
            <div class="todo-main">
              <span class="todo-title">{{ todo.title }}</span>
              <span v-if="todo.description" class="todo-desc">{{ todo.description }}</span>
            </div>
            <div class="todo-meta">
              <span v-if="todo.dueDate" class="meta-date">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2" width="12" height="11" rx="2" stroke="currentColor" stroke-width="1.2"/>
                  <path d="M4 0v3M10 0v3M1 5h12" stroke="currentColor" stroke-width="1.2"/>
                </svg>
                {{ formatDate(todo.dueDate) }}
              </span>
              <span class="meta-priority" :class="todo.priority">
                {{ priorityMap[todo.priority] }}
              </span>
            </div>
          </div>
          
          <button @click.stop="deleteTodo(todo._id)" class="delete-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </transition-group>
    </section>

    <!-- Edit Modal -->
    <Teleport to="body">
      <transition name="modal">
        <div v-if="editingTodo" class="modal-overlay" @click.self="cancelEdit">
          <div class="modal-content">
            <div class="modal-header">
              <h2>编辑任务</h2>
              <button @click="cancelEdit" class="close-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            
            <form @submit.prevent="updateTodo" class="modal-form">
              <div class="form-group">
                <label>标题</label>
                <input v-model="editingTodo.title" type="text" required />
              </div>
              
              <div class="form-group">
                <label>描述</label>
                <textarea v-model="editingTodo.description" rows="3"></textarea>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>优先级</label>
                  <select v-model="editingTodo.priority">
                    <option value="low">低</option>
                    <option value="medium">中</option>
                    <option value="high">高</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>截止日期</label>
                  <input v-model="editingTodo.dueDate" type="date" />
                </div>
              </div>
              
              <div class="form-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="editingTodo.completed" />
                  <span>已完成</span>
                </label>
              </div>
              
              <div class="modal-actions">
                <button type="button" @click="cancelEdit" class="btn btn-ghost">取消</button>
                <button type="submit" class="btn btn-primary">保存</button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Clear Completed -->
    <div v-if="stats.completed > 0" class="clear-section">
      <button @click="clearCompleted" class="clear-btn">
        清除已完成 ({{ stats.completed }})
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const API_BASE = '/api/todos'

const todos = ref([])
const loading = ref(false)
const currentFilter = ref('all')
const sortBy = ref('createdAt')
const editingTodo = ref(null)

const newTodo = ref({
  title: '',
  description: '',
  priority: 'medium',
  dueDate: ''
})

const stats = ref({
  total: 0,
  completed: 0,
  pending: 0,
  highPriority: 0
})

const filters = computed(() => [
  { label: '全部', value: 'all', count: stats.value.total },
  { label: '待完成', value: 'pending', count: stats.value.pending },
  { label: '已完成', value: 'completed', count: stats.value.completed },
  { label: '重要', value: 'high', count: stats.value.highPriority }
])

const priorityMap = {
  low: '低',
  medium: '中',
  high: '高'
}

const filteredTodos = computed(() => {
  let result = [...todos.value]

  switch (currentFilter.value) {
    case 'pending':
      result = result.filter(t => !t.completed)
      break
    case 'completed':
      result = result.filter(t => t.completed)
      break
    case 'high':
      result = result.filter(t => t.priority === 'high' && !t.completed)
      break
  }

  if (sortBy.value === 'priority') {
    const order = { high: 0, medium: 1, low: 2 }
    result.sort((a, b) => order[a.priority] - order[b.priority])
  } else if (sortBy.value === 'dueDate') {
    result.sort((a, b) => {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    })
  } else {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return result
})

const fetchTodos = async () => {
  loading.value = true
  try {
    const res = await fetch(`${API_BASE}?sort=${sortBy.value}`)
    todos.value = await res.json()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const fetchStats = async () => {
  try {
    const res = await fetch(`${API_BASE}/stats/summary`)
    stats.value = await res.json()
  } catch (e) {
    console.error(e)
  }
}

const addTodo = async () => {
  if (!newTodo.value.title.trim()) return
  loading.value = true
  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo.value)
    })
    if (res.ok) {
      const todo = await res.json()
      todos.value.unshift(todo)
      newTodo.value = { title: '', description: '', priority: 'medium', dueDate: '' }
      fetchStats()
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const toggleTodo = async (todo) => {
  try {
    const res = await fetch(`${API_BASE}/${todo._id}/toggle`, { method: 'PATCH' })
    if (res.ok) {
      const updated = await res.json()
      const idx = todos.value.findIndex(t => t._id === updated._id)
      if (idx !== -1) todos.value[idx] = updated
      fetchStats()
    }
  } catch (e) {
    console.error(e)
  }
}

const deleteTodo = async (id) => {
  if (!confirm('确定删除？')) return
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
    if (res.ok) {
      todos.value = todos.value.filter(t => t._id !== id)
      fetchStats()
    }
  } catch (e) {
    console.error(e)
  }
}

const openEdit = (todo) => {
  editingTodo.value = { ...todo }
}

const cancelEdit = () => {
  editingTodo.value = null
}

const updateTodo = async () => {
  if (!editingTodo.value) return
  try {
    const res = await fetch(`${API_BASE}/${editingTodo.value._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingTodo.value)
    })
    if (res.ok) {
      const updated = await res.json()
      const idx = todos.value.findIndex(t => t._id === updated._id)
      if (idx !== -1) todos.value[idx] = updated
      editingTodo.value = null
      fetchStats()
    }
  } catch (e) {
    console.error(e)
  }
}

const clearCompleted = async () => {
  if (!confirm('确定清除所有已完成任务？')) return
  try {
    const res = await fetch(`${API_BASE}/completed/all`, { method: 'DELETE' })
    if (res.ok) {
      todos.value = todos.value.filter(t => !t.completed)
      fetchStats()
    }
  } catch (e) {
    console.error(e)
  }
}

const formatDate = (d) => {
  return new Date(d).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

onMounted(() => {
  fetchTodos()
  fetchStats()
})
</script>

<style scoped>
.todo-view {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
  min-height: 100%;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-8);
}

.page-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.page-desc {
  color: var(--color-text-tertiary);
}

.header-stats {
  display: flex;
  gap: var(--space-2);
}

.stat-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-2) var(--space-4);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.stat-chip.success {
  border-color: rgba(34, 197, 94, 0.3);
  background: var(--color-success-subtle);
}

.stat-chip.warning {
  border-color: rgba(239, 68, 68, 0.3);
  background: var(--color-error-subtle);
}

.stat-num {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.stat-text {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* Add Form */
.add-section {
  margin-bottom: var(--space-6);
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.form-row-main {
  display: flex;
  gap: var(--space-3);
  align-items: stretch;
}

.form-input {
  flex: 1;
  padding: var(--space-4);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.form-input::placeholder {
  color: var(--color-text-muted);
}

.form-options {
  display: flex;
  gap: var(--space-3);
}

.form-select,
.form-date {
  padding: var(--space-2) var(--space-3);
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.add-btn {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent);
  border: none;
  border-radius: var(--radius-lg);
  color: white;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.add-btn:hover {
  background: var(--color-accent-hover);
  transform: scale(1.05);
}

.add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Filters */
.filters-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
}

.filter-tabs {
  display: flex;
  gap: var(--space-1);
}

.filter-tab {
  padding: var(--space-2) var(--space-4);
  background: none;
  border: none;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-tertiary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.filter-tab:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-hover);
}

.filter-tab.active {
  color: var(--color-text-primary);
  background: var(--color-bg-tertiary);
}

.tab-count {
  font-size: var(--text-xs);
  padding: var(--space-1) var(--space-2);
  background: var(--color-bg-primary);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
}

.filter-tab.active .tab-count {
  background: var(--color-bg-primary);
  color: var(--color-text-secondary);
}

.sort-select {
  padding: var(--space-2) var(--space-3);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

/* List */
.todo-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.todo-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.todo-item:hover {
  border-color: var(--color-text-muted);
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: var(--color-text-muted);
}

.todo-item.priority-high {
  border-left: 3px solid var(--color-error);
}

.todo-item.priority-medium {
  border-left: 3px solid var(--color-warning);
}

.check-btn {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: transparent;
}

.check-btn:hover {
  border-color: var(--color-accent);
}

.check-btn.checked {
  background: var(--color-success);
  border-color: var(--color-success);
  color: white;
}

.todo-body {
  flex: 1;
  cursor: pointer;
  min-width: 0;
}

.todo-main {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.todo-title {
  font-weight: 500;
  color: var(--color-text-primary);
}

.todo-desc {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.todo-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.meta-date {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.meta-priority {
  font-size: var(--text-xs);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  background: var(--color-bg-tertiary);
  color: var(--color-text-muted);
}

.meta-priority.high {
  background: var(--color-error-subtle);
  color: var(--color-error);
}

.meta-priority.medium {
  background: var(--color-warning-subtle);
  color: var(--color-warning);
}

.delete-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  cursor: pointer;
  opacity: 0;
  transition: all var(--transition-fast);
}

.todo-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background: var(--color-error-subtle);
  color: var(--color-error);
}

/* Empty & Loading */
.empty-state,
.loading-state {
  text-align: center;
  padding: var(--space-16) var(--space-4);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: var(--space-4);
  color: var(--color-success);
}

.empty-state h3 {
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.empty-state p {
  color: var(--color-text-muted);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  margin: 0 auto;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
}

.modal-content {
  width: 100%;
  max-width: 480px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-5);
  border-bottom: 1px solid var(--color-border);
}

.modal-header h2 {
  font-size: var(--text-lg);
  font-weight: 600;
}

.close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-text-tertiary);
  cursor: pointer;
}

.close-btn:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.modal-form {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-group label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: var(--space-3);
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  color: var(--color-text-primary);
  width: 100%;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--color-accent);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.btn {
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  font-weight: 500;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
}

.btn-primary {
  background: var(--color-accent);
  color: white;
}

.btn-primary:hover {
  background: var(--color-accent-hover);
}

.btn-ghost {
  background: none;
  color: var(--color-text-secondary);
}

.btn-ghost:hover {
  background: var(--color-bg-hover);
}

/* Clear */
.clear-section {
  text-align: center;
  margin-top: var(--space-8);
}

.clear-btn {
  padding: var(--space-2) var(--space-4);
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.clear-btn:hover {
  border-color: var(--color-error);
  color: var(--color-error);
}

/* Transitions */
.list-enter-active,
.list-leave-active {
  transition: all var(--transition-normal);
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.modal-enter-active,
.modal-leave-active {
  transition: all var(--transition-normal);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .form-options {
    flex-direction: column;
  }
  
  .filters-section {
    flex-direction: column;
    gap: var(--space-3);
    align-items: stretch;
  }
  
  .filter-tabs {
    overflow-x: auto;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
