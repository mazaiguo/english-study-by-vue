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
        <EnglishWordCard :word="currentWord" />
      </template>
    </LearningCard>

    <!-- 设置面板 -->
    <SettingsPanel
      :is-visible="showSettings"
      :lessons="availableLessons"
      :show-english-settings="true"
      :test-text="currentWord?.word || 'hello'"
      @close="closeSettings"
      @lesson-change="handleLessonChange"
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
import EnglishWordCard from '@/components/EnglishWordCard.vue'
import SettingsPanel from '@/components/SettingsPanel.vue'
import wordsData from '@/data/english_words.json'

console.log('📖 英语单词场景加载')

const router = useRouter()
const themeStore = useThemeStore()
const settingsStore = useSettingsStore()
const { speakEnglish } = useTTS()

const theme = computed(() => themeStore.currentTheme)
const words = ref(wordsData.words || [])
const currentIndex = ref(0)
const showSettings = ref(false)

// 根据选择的课程过滤单词
const filteredWords = computed(() => {
  if (settingsStore.currentLesson === 0) {
    return words.value
  }
  return words.value.filter(word => word.lesson === settingsStore.currentLesson)
})

// 获取所有可用的课程
const availableLessons = computed(() => {
  const lessons = new Set(words.value.map(word => word.lesson).filter(Boolean))
  return Array.from(lessons).sort((a, b) => a - b)
})

const currentWord = computed(() => filteredWords.value[currentIndex.value])

// 监听课程变化，重置索引
watch(() => settingsStore.currentLesson, () => {
  currentIndex.value = 0
  console.log('📚 切换到课程:', settingsStore.currentLesson === 0 ? '所有' : settingsStore.currentLesson)
})

// 设置面板控制
const openSettings = () => {
  console.log('⚙️ 打开设置面板')
  showSettings.value = true
}

const closeSettings = () => {
  console.log('⚙️ 关闭设置面板')
  showSettings.value = false
}

const handleLessonChange = (lesson) => {
  console.log('📚 课程已切换:', lesson)
}

const nextWord = () => {
  console.log('➡️ 下一个单词')
  if (currentIndex.value < filteredWords.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const previousWord = () => {
  console.log('⬅️ 上一个单词')
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = filteredWords.value.length - 1
  }
}

const speakWord = () => {
  console.log('🗣️ 朗读单词:', currentWord.value?.word)
  if (currentWord.value) {
    speakEnglish(currentWord.value.word)
  }
}

onMounted(() => {
  console.log('✅ 英语单词场景已挂载，共', words.value.length, '个单词')
  console.log('📚 可用课程:', availableLessons.value)
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

