<template>
  <div class="scene-container" :style="{ backgroundColor: theme.colors.background }">
    <LearningCard
      :current-index="currentIndex"
      :total-items="filteredFinals.length"
      :on-next="nextItem"
      :on-previous="previousItem"
      :on-tap="speakItem"
      :on-swipe-up="openSettings"
    >
      <template #content>
        <PinyinCard :pinyin="currentFinal" />
      </template>
    </LearningCard>
    
    <!-- 设置面板 -->
    <SettingsPanel
      :is-visible="showSettings"
      :lessons="availableLessons"
      :show-english-settings="false"
      :test-text="currentFinal?.examplePinyin || 'ā'"
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
import PinyinCard from '@/components/PinyinCard.vue'
import SettingsPanel from '@/components/SettingsPanel.vue'
import finalsData from '@/data/pinyin_finals.json'

console.log('📖 拼音韵母场景加载')

const router = useRouter()
const themeStore = useThemeStore()
const settingsStore = useSettingsStore()
const { speakPinyin } = useTTS()

const theme = computed(() => themeStore.currentTheme)
const finals = ref(finalsData.finals || [])
const currentIndex = ref(0)
const showSettings = ref(false)

// 根据课程过滤
const filteredFinals = computed(() => {
  if (settingsStore.currentLesson === 0) {
    return finals.value
  }
  return finals.value.filter(f => f.lesson === settingsStore.currentLesson)
})

// 可用课程列表
const availableLessons = computed(() => {
  const lessons = [...new Set(finals.value.map(f => f.lesson))].sort((a, b) => a - b)
  return lessons
})

const currentFinal = computed(() => filteredFinals.value[currentIndex.value])

// 监听课程变化
watch(() => settingsStore.currentLesson, () => {
  currentIndex.value = 0
  console.log('📚 课程已切换，当前显示:', filteredFinals.value.length, '个韵母')
})

const nextItem = () => {
  console.log('➡️ 下一个韵母')
  if (currentIndex.value < filteredFinals.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const previousItem = () => {
  console.log('⬅️ 上一个韵母')
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = filteredFinals.value.length - 1
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

const speakItem = () => {
  if (currentFinal.value) {
    // 朗读汉字而不是拼音字母，确保使用普通话发音
    const textToSpeak = currentFinal.value.exampleCharacter || currentFinal.value.examplePinyin
    console.log('🗣️ 朗读韵母:', textToSpeak)
    speakPinyin(textToSpeak)
  }
}

onMounted(() => {
  console.log('✅ 拼音韵母场景已挂载')
  console.log('📚 共', finals.value.length, '个韵母')
  console.log('📚 可用课程:', availableLessons.value)
  console.log('📚 当前课程:', settingsStore.currentLesson === 0 ? '全部' : `第${settingsStore.currentLesson}课`)
  console.log('📚 当前显示:', filteredFinals.value.length, '个韵母')
  console.log('⚙️ 当前语速:', settingsStore.speechRate + 'x')
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

