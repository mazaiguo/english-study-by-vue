<template>
  <div class="scene-container" :style="{ backgroundColor: theme.colors.background }">
    <LearningCard
      :current-index="currentIndex"
      :total-items="filteredWords.length"
      :on-next="nextWord"
      :on-previous="previousWord"
      :on-tap="speakWord"
      :on-swipe-up="openSettings"
    >
      <template #content>
        <MandarinWordCard :word="currentWord" />
      </template>
    </LearningCard>
    
    <!-- 设置面板 -->
    <SettingsPanel
      :is-visible="showSettings"
      :lessons="availableLessons"
      :show-english-settings="false"
      :test-text="currentWord?.hanzi || '你好'"
      @close="closeSettings"
      @lessonChange="handleLessonChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useSettingsStore } from '@/stores/settings'
import { useTTS } from '@/composables/useTTS'
import LearningCard from '@/components/LearningCard.vue'
import MandarinWordCard from '@/components/MandarinWordCard.vue'
import SettingsPanel from '@/components/SettingsPanel.vue'
import wordsData from '@/data/mandarin_words.json'

console.log('📖 普通话单词场景加载')

const router = useRouter()
const themeStore = useThemeStore()
const settingsStore = useSettingsStore()
const { speakMandarin } = useTTS()

const theme = computed(() => themeStore.currentTheme)
const words = ref(wordsData.words || [])
const currentIndex = ref(0)
const showSettings = ref(false)

// 根据选择的课程过滤单词
const filteredWords = computed(() => {
  if (settingsStore.currentLesson === 0) {
    return words.value
  }
  return words.value.filter(w => w.lesson === settingsStore.currentLesson)
})

// 获取可用的课程列表
const availableLessons = computed(() => {
  const lessons = [...new Set(words.value.map(w => w.lesson))].sort((a, b) => a - b)
  return lessons
})

const currentWord = computed(() => filteredWords.value[currentIndex.value])

// 监听课程变化，重置索引
watch(() => settingsStore.currentLesson, () => {
  currentIndex.value = 0
  console.log('📚 课程已切换，当前显示:', filteredWords.value.length, '个单词')
})

const nextWord = () => {
  console.log('➡️ 下一个单词')
  if (currentIndex.value < filteredWords.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0 // 循环到第一个
  }
}

const previousWord = () => {
  console.log('⬅️ 上一个单词')
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = filteredWords.value.length - 1 // 循环到最后一个
  }
}

const openSettings = () => {
  console.log('⚙️ 打开设置面板')
  showSettings.value = true
}

const closeSettings = () => {
  console.log('⚙️ 关闭设置面板')
  showSettings.value = false
}

const handleLessonChange = (lesson) => {
  console.log('📚 课程切换到:', lesson)
  closeSettings()
}

const speakWord = () => {
  console.log('🗣️ 朗读单词:', currentWord.value?.hanzi)
  if (currentWord.value) {
    speakMandarin(currentWord.value.hanzi)
  }
}

onMounted(() => {
  console.log('✅ 普通话单词场景已挂载')
  console.log('📚 共', words.value.length, '个单词')
  console.log('📚 可用课程:', availableLessons.value)
  console.log('📚 当前课程:', settingsStore.currentLesson === 0 ? '全部' : `第${settingsStore.currentLesson}课`)
  console.log('📚 当前显示:', filteredWords.value.length, '个单词')
})
</script>

<style scoped>
.scene-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: background-color 0.3s ease;
}
</style>

