import { ref, watch } from 'vue'

const isDark = ref(true)

// Initialize from localStorage
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    // Check system preference
    isDark.value = !window.matchMedia('(prefers-color-scheme: light)').matches
  }
}

export function useTheme() {
  // Apply theme to document
  const applyTheme = (dark) => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  // Watch for changes
  watch(isDark, (dark) => {
    applyTheme(dark)
  })

  // Apply initial theme
  if (typeof window !== 'undefined') {
    applyTheme(isDark.value)
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleTheme
  }
}
