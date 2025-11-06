<template>
  <div class="main-menu" :style="{ backgroundColor: theme.colors.background }">
    <!-- 标题 -->
    <div class="title-section">
      <h1 class="title" :style="{ color: theme.colors.mandarinPrimary }">
        语言学习乐园 🎨
      </h1>
      
      <!-- 主题选择器 -->
      <div class="theme-selector">
        <select
          v-model="currentThemeKey"
          @change="handleThemeChange"
          class="theme-dropdown"
          :style="{
            backgroundColor: theme.colors.cardBackground,
            color: theme.colors.primaryText
          }"
        >
          <option
            v-for="themeOption in themeOptions"
            :key="themeOption.key"
            :value="themeOption.key"
          >
            {{ themeOption.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- 学习模块按钮 -->
    <div class="modules-grid">
      <!-- 英语学习 -->
      <div class="module-section">
        <h2 class="section-title" :style="{ color: theme.colors.englishPrimary }">
          🅰️ 英语学习
        </h2>
        <div class="button-group">
          <button
            class="module-button"
            :style="{
              backgroundColor: theme.colors.englishPrimary,
              color: theme.colors.whiteText
            }"
            @click="navigate('/english/words')"
          >
            <span class="button-icon">🅰️</span>
            <span class="button-title">单词学习</span>
            <span class="button-subtitle">Words</span>
          </button>

          <button
            class="module-button"
            :style="{
              backgroundColor: theme.colors.englishSecondary,
              color: theme.colors.whiteText
            }"
            @click="navigate('/english/sentences')"
          >
            <span class="button-icon">📝</span>
            <span class="button-title">句子学习</span>
            <span class="button-subtitle">Sentences</span>
          </button>

          <button
            class="module-button"
            :style="{
              backgroundColor: theme.colors.accentYellow,
              color: theme.colors.primaryText
            }"
            @click="navigate('/phonetic/vowels')"
          >
            <span class="button-icon">🔤</span>
            <span class="button-title">元音练习</span>
            <span class="button-subtitle">Vowels</span>
          </button>

          <button
            class="module-button"
            :style="{
              backgroundColor: theme.colors.specialPurple,
              color: theme.colors.whiteText
            }"
            @click="navigate('/phonetic/consonants')"
          >
            <span class="button-icon">🔤</span>
            <span class="button-title">辅音练习</span>
            <span class="button-subtitle">Consonants</span>
          </button>

          <button
            class="module-button"
            :style="{
              backgroundColor: theme.colors.accentGreen,
              color: theme.colors.whiteText
            }"
            @click="navigate('/phonetic/diphthongs')"
          >
            <span class="button-icon">🔤</span>
            <span class="button-title">双元音</span>
            <span class="button-subtitle">Diphthongs</span>
          </button>
        </div>
      </div>

      <!-- 普通话学习 -->
      <div class="module-section">
        <h2 class="section-title" :style="{ color: theme.colors.mandarinPrimary }">
          🀄 普通话学习
        </h2>
        <div class="button-group">
          <button
            class="module-button"
            :style="{
              backgroundColor: theme.colors.mandarinPrimary,
              color: theme.colors.whiteText
            }"
            @click="navigate('/mandarin/words')"
          >
            <span class="button-icon">🀄</span>
            <span class="button-title">单词学习</span>
            <span class="button-subtitle">Words</span>
          </button>

          <button
            class="module-button"
            :style="{
              backgroundColor: theme.colors.mandarinSecondary,
              color: theme.colors.whiteText
            }"
            @click="navigate('/mandarin/sentences')"
          >
            <span class="button-icon">📝</span>
            <span class="button-title">句子学习</span>
            <span class="button-subtitle">Sentences</span>
          </button>

          <button
            class="module-button"
            :style="{
              backgroundColor: theme.colors.pinyinPrimary,
              color: theme.colors.primaryText
            }"
            @click="navigate('/pinyin/initials')"
          >
            <span class="button-icon">🎵</span>
            <span class="button-title">声母练习</span>
            <span class="button-subtitle">Initials</span>
          </button>

          <button
            class="module-button"
            :style="{
              backgroundColor: theme.colors.pinyinSecondary,
              color: theme.colors.whiteText
            }"
            @click="navigate('/pinyin/finals')"
          >
            <span class="button-icon">🎵</span>
            <span class="button-title">韵母练习</span>
            <span class="button-subtitle">Finals</span>
          </button>

          <button
            class="module-button"
            :style="{
              backgroundColor: theme.colors.accentGreen,
              color: theme.colors.whiteText
            }"
            @click="navigate('/pinyin/tones')"
          >
            <span class="button-icon">🎵</span>
            <span class="button-title">声调练习</span>
            <span class="button-subtitle">Tones</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 手势提示 -->
    <div class="gesture-hint" :style="{ color: theme.colors.accentYellow }">
      💡 提示：点击按钮进入学习 | 学习中可使用左右滑动切换内容
    </div>

    <!-- 版本信息 -->
    <div class="version" :style="{ color: theme.colors.secondaryText }">
      v2.0.0 | 专为 3-12 岁儿童设计
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

console.log('🏠 主菜单加载')

const router = useRouter()
const themeStore = useThemeStore()

const theme = computed(() => themeStore.currentTheme)
const currentThemeKey = ref(themeStore.currentThemeKey)
const themeOptions = computed(() => themeStore.getAllThemes())

const handleThemeChange = () => {
  console.log('🎨 主题切换到:', currentThemeKey.value)
  themeStore.setTheme(currentThemeKey.value)
}

const navigate = (path) => {
  console.log('🚀 [主菜单] 导航到:', path)
  console.log('当前路由:', router.currentRoute.value.path)
  
  router.push(path).then(() => {
    console.log('✅ [主菜单] 导航成功:', path)
    console.log('新路由:', router.currentRoute.value.path)
  }).catch(err => {
    console.error('❌ [主菜单] 导航失败:', err)
    console.error('错误堆栈:', err.stack)
  })
}

onMounted(() => {
  console.log('✅ 主菜单已挂载')
  console.log('当前主题:', themeStore.currentTheme.name)
  console.log('当前路由:', router.currentRoute.value.path)
})
</script>

<style scoped>
.main-menu {
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.3s ease;
}

.title-section {
  text-align: center;
  margin-bottom: 40px;
  width: 100%;
  max-width: 1200px;
}

.title {
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
}

.theme-selector {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.theme-dropdown {
  padding: 12px 24px;
  font-size: 18px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.theme-dropdown:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.modules-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 固定两列，左右分布 */
  gap: 30px;
  width: 100%;
  max-width: 1400px;
  margin-bottom: 40px;
}

.module-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  transition: color 0.3s ease;
  min-height: 50px; /* 确保标题高度一致 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-group {
  display: grid;
  grid-template-rows: repeat(5, 1fr); /* 5行，高度相等 */
  gap: 15px;
  align-content: start;
}

.module-button {
  padding: 24px;
  border-radius: 20px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: none;
  outline: none;
  min-height: 140px; /* 确保按钮最小高度一致 */
}

.module-button:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.module-button:active {
  transform: translateY(-2px) scale(0.98);
}

.button-icon {
  font-size: 48px;
}

.button-title {
  font-size: 28px;
}

.button-subtitle {
  font-size: 18px;
  opacity: 0.9;
}

.gesture-hint {
  text-align: center;
  font-size: 20px;
  margin: 30px 0;
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
}

.version {
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  transition: color 0.3s ease;
}

/* 响应式设计 - 保持左右分列 */
@media (max-width: 768px) {
  .title {
    font-size: 40px;
  }

  .modules-grid {
    grid-template-columns: 1fr 1fr; /* 保持两列 */
    gap: 20px;
  }

  .section-title {
    font-size: 24px;
    min-height: 40px;
  }

  .module-button {
    padding: 16px 12px;
    min-height: 120px;
  }

  .button-icon {
    font-size: 32px;
  }

  .button-title {
    font-size: 18px;
  }

  .button-subtitle {
    font-size: 14px;
  }

  .gesture-hint {
    font-size: 14px;
    padding: 10px 16px;
  }
}

@media (max-width: 480px) {
  .main-menu {
    padding: 15px 8px;
  }

  .title {
    font-size: 28px;
    margin-bottom: 15px;
  }

  .theme-dropdown {
    font-size: 14px;
    padding: 8px 16px;
  }

  .title-section {
    margin-bottom: 25px;
  }

  .modules-grid {
    grid-template-columns: 1fr 1fr; /* 保持两列 */
    gap: 12px;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 8px;
    min-height: 35px;
  }

  .button-group {
    gap: 10px;
    grid-template-rows: repeat(5, 1fr);
  }

  .module-button {
    padding: 14px 8px;
    min-height: 100px;
  }

  .button-icon {
    font-size: 28px;
  }

  .button-title {
    font-size: 16px;
  }

  .button-subtitle {
    font-size: 12px;
  }

  .gesture-hint {
    font-size: 12px;
    padding: 8px 12px;
    margin: 20px 0;
  }

  .version {
    font-size: 12px;
  }
}

/* iPhone专属优化 - 保持左右分列 */
@media (max-width: 390px) and (min-height: 800px) {
  .main-menu {
    padding: 12px 6px;
  }

  .title {
    font-size: 26px;
  }

  .modules-grid {
    grid-template-columns: 1fr 1fr; /* 保持两列 */
    gap: 10px;
  }

  .section-title {
    font-size: 18px;
    min-height: 30px;
  }

  .module-button {
    padding: 12px 6px;
    border-radius: 15px;
    min-height: 90px;
  }

  .button-icon {
    font-size: 24px;
  }

  .button-title {
    font-size: 14px;
  }

  .button-subtitle {
    font-size: 11px;
  }
}
</style>

