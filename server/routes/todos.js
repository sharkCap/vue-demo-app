const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')

// 获取所有 todos
router.get('/', async (req, res) => {
  try {
    const { completed, priority, sort } = req.query
    
    let query = {}
    if (completed !== undefined) {
      query.completed = completed === 'true'
    }
    if (priority) {
      query.priority = priority
    }
    
    let sortOption = { createdAt: -1 }
    if (sort === 'priority') {
      sortOption = { priority: -1, createdAt: -1 }
    } else if (sort === 'dueDate') {
      sortOption = { dueDate: 1 }
    }
    
    const todos = await Todo.find(query).sort(sortOption)
    res.json(todos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 获取单个 todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    res.json(todo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 创建 todo
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' })
    }
    
    const todo = new Todo({
      title: title.trim(),
      description: description?.trim() || '',
      priority: priority || 'medium',
      dueDate: dueDate || null
    })
    
    await todo.save()
    res.status(201).json(todo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// 更新 todo
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body
    
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    
    if (title !== undefined) todo.title = title.trim()
    if (description !== undefined) todo.description = description.trim()
    if (completed !== undefined) todo.completed = completed
    if (priority !== undefined) todo.priority = priority
    if (dueDate !== undefined) todo.dueDate = dueDate
    
    await todo.save()
    res.json(todo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// 删除 todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    res.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 批量删除已完成的 todos
router.delete('/completed/all', async (req, res) => {
  try {
    const result = await Todo.deleteMany({ completed: true })
    res.json({ message: `Deleted ${result.deletedCount} completed todos` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 切换 todo 完成状态
router.patch('/:id/toggle', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    
    todo.completed = !todo.completed
    await todo.save()
    res.json(todo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 获取统计信息
router.get('/stats/summary', async (req, res) => {
  try {
    const total = await Todo.countDocuments()
    const completed = await Todo.countDocuments({ completed: true })
    const pending = await Todo.countDocuments({ completed: false })
    const highPriority = await Todo.countDocuments({ priority: 'high', completed: false })
    
    res.json({
      total,
      completed,
      pending,
      highPriority,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
