<template>
  <div class="scene-container" :style="{ backgroundColor: theme.colors.background }">
    <LearningCard
      :current-index="currentIndex"
      :total-items="filteredInitials.length"
      :on-next="nextItem"
      :on-previous="previousItem"
      :on-tap="speakItem"
      :on-swipe-up="openSettings"
    >
      <template #content>
        <PinyinCard :pinyin="currentInitial" />
      </template>
    </LearningCard>
    
    <!-- 设置面板 -->
    <SettingsPanel
      :is-visible="showSettings"
      :lessons="availableLessons"
      :show-english-settings="false"
      :test-text="currentInitial?.examplePinyin || 'bà'"
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
import initialsData from '@/data/pinyin_initials.json'

console.log('📖 拼音声母场景加载')

const router = useRouter()
const themeStore = useThemeStore()
const settingsStore = useSettingsStore()
const { speakPinyin } = useTTS()

const theme = computed(() => themeStore.currentTheme)
const initials = ref(initialsData.initials || [])
const currentIndex = ref(0)
const showSettings = ref(false)

// 根据选择的课程过滤
const filteredInitials = computed(() => {
  if (settingsStore.currentLesson === 0) {
    return initials.value
  }
  return initials.value.filter(i => i.lesson === settingsStore.currentLesson)
})

// 获取可用课程列表
const availableLessons = computed(() => {
  const lessons = [...new Set(initials.value.map(i => i.lesson))].sort((a, b) => a - b)
  return lessons
})

const currentInitial = computed(() => filteredInitials.value[currentIndex.value])

// 监听课程变化
watch(() => settingsStore.currentLesson, () => {
  currentIndex.value = 0
  console.log('📚 课程已切换，当前显示:', filteredInitials.value.length, '个声母')
})

const nextItem = () => {
  console.log('➡️ 下一个声母')
  if (currentIndex.value < filteredInitials.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const previousItem = () => {
  console.log('⬅️ 上一个声母')
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = filteredInitials.value.length - 1
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
  if (currentInitial.value) {
    // 朗读汉字而不是拼音字母，确保使用普通话发音
    const textToSpeak = currentInitial.value.exampleCharacter || currentInitial.value.examplePinyin
    console.log('🗣️ 朗读声母:', textToSpeak)
    speakPinyin(textToSpeak)
  }
}

onMounted(() => {
  console.log('✅ 拼音声母场景已挂载')
  console.log('📚 共', initials.value.length, '个声母')
  console.log('📚 可用课程:', availableLessons.value)
  console.log('📚 当前课程:', settingsStore.currentLesson === 0 ? '全部' : `第${settingsStore.currentLesson}课`)
  console.log('📚 当前显示:', filteredInitials.value.length, '个声母')
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

