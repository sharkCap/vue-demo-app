const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todolist'

// 中间件
app.use(cors())
app.use(express.json())

// 路由
const todoRoutes = require('./routes/todos')
app.use('/api/todos', todoRoutes)

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 服务器信息 API
app.get('/api/server-info', async (req, res) => {
  const os = require('os')
  const exec = require('child_process').exec
  
  try {
    // 获取 CPU 使用率
    const cpuUsage = await new Promise((resolve) => {
      exec("top -bn1 | grep 'Cpu(s)' | awk '{print $2}'", (err, stdout) => {
        if (err) resolve(0)
        else resolve(parseFloat(stdout.trim()) || 0)
      })
    })
    
    // 获取内存信息
    const totalMemory = Math.round(os.totalmem() / 1024 / 1024 / 1024 * 10) / 10 // GB
    const freeMemory = os.freemem()
    const usedMemory = Math.round((os.totalmem() - freeMemory) / 1024 / 1024 / 1024 * 10) / 10 // GB
    const memoryUsage = Math.round((1 - freeMemory / os.totalmem()) * 100)
    
    // 获取磁盘信息
    const diskInfo = await new Promise((resolve) => {
      exec("df -h / | awk 'NR==2 {print $3, $4, $5}'", (err, stdout) => {
        if (err) resolve({ used: 'N/A', available: 'N/A', usage: 0 })
        else {
          const parts = stdout.trim().split(/\s+/)
          resolve({
            used: parts[0] || 'N/A',
            available: parts[1] || 'N/A',
            usage: parseInt(parts[2]) || 0
          })
        }
      })
    })
    
    res.json({
      cpu: {
        usage: Math.round(cpuUsage),
        cores: os.cpus().length,
        model: os.cpus()[0]?.model || 'Unknown'
      },
      memory: {
        total: `${totalMemory}GB`,
        used: `${usedMemory}GB`,
        usage: memoryUsage
      },
      disk: {
        used: diskInfo.used,
        available: diskInfo.available,
        usage: diskInfo.usage
      },
      system: {
        hostname: os.hostname(),
        platform: os.platform(),
        arch: os.arch(),
        uptime: Math.round(os.uptime() / 3600) // hours
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 连接 MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB 连接成功')
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 服务器运行在 http://0.0.0.0:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB 连接失败:', err.message)
    process.exit(1)
  })
