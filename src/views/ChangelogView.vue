<template>
  <div class="changelog-view">
    <div class="changelog-container container">
      <header class="changelog-header">
        <h1>更新日志</h1>
        <p>OpenClaw AI 助手版本迭代记录</p>
      </header>
      
      <div v-if="loading" class="loading">
        加载中...
      </div>
      
      <div v-else class="changelog-content">
        <div v-for="release in changelogData" :key="release.version" class="version-item">
          <h2>版本 {{ release.version }}</h2>
          <p>发布日期: {{ release.date }}</p>
          
          <div v-if="release.features && release.features.length" class="features">
            <h3>新功能</h3>
            <ul>
              <li v-for="feature in release.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
          
          <div v-if="release.improvements && release.improvements.length" class="improvements">
            <h3>改进</h3>
            <ul>
              <li v-for="improvement in release.improvements" :key="improvement">{{ improvement }}</li>
            </ul>
          </div>
          
          <div v-if="release.fixes && release.fixes.length" class="bugfixes">
            <h3>修复</h3>
            <ul>
              <li v-for="bugfix in release.fixes" :key="bugfix">{{ bugfix }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const API_BASE = '/api/changelog'
const changelogData = ref([])
const loading = ref(false)

const fetchChangelog = async () => {
  try {
    loading.value = true
    const response = await fetch(`${API_BASE}?page=1&limit=10`)
    const data = await response.json()
    changelogData.value = data.data
  } catch (error) {
    console.error('获取更新日志失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchChangelog()
})
</script>

<style scoped>
.changelog-view {
  padding: 20px;
}

.changelog-header {
  text-align: center;
  margin-bottom: 30px;
}

.version-item {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.features, .improvements, .bugfixes {
  margin: 15px 0;
}

h3 {
  color: #333;
  margin-bottom: 10px;
}

ul {
  margin-left: 20px;
}

li {
  margin: 5px 0;
}
</style>