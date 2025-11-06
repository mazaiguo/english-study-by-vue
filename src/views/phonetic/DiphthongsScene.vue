<template>
  <div class="scene-container" :style="{ backgroundColor: theme.colors.background }">
    <LearningCard
      v-if="filteredDiphthongs.length > 0"
      :current-index="currentIndex"
      :total-items="filteredDiphthongs.length"
      :on-next="nextItem"
      :on-previous="previousItem"
      :on-tap="speakItem"
      :on-swipe-up="openSettings"
    >
      <template #content>
        <PhoneticCard v-if="currentDiphthong" :phonetic="currentDiphthong" />
      </template>
    </LearningCard>

    <!-- 无数据提示 -->
    <div v-else class="no-data-message" :style="{ color: theme.colors.primaryText }">
      <div class="no-data-icon">🔤</div>
      <div class="no-data-text">当前课程没有双元音数据</div>
      <button
        class="open-settings-btn"
        :style="{
          backgroundColor: theme.colors.accentBlue,
          color: theme.colors.whiteText
        }"
        @click="openSettings"
      >
        打开设置选择其他课程
      </button>
    </div>

    <!-- 设置面板 -->
    <SettingsPanel
      :is-visible="showSettings"
      :lessons="availableLessons"
      :show-english-settings="true"
      :test-text="currentDiphthong?.exampleWord || 'boy'"
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
import PhoneticCard from '@/components/PhoneticCard.vue'
import SettingsPanel from '@/components/SettingsPanel.vue'
import diphthongsData from '@/data/phonetic_diphthongs.json'

console.log('📖 双元音练习场景加载')

const router = useRouter()
const themeStore = useThemeStore()
const settingsStore = useSettingsStore()
const { speakEnglish } = useTTS()

const theme = computed(() => themeStore.currentTheme)
const diphthongs = ref(diphthongsData.diphthongs || [])
const currentIndex = ref(0)
const showSettings = ref(false)

// 根据选择的课程过滤双元音
const filteredDiphthongs = computed(() => {
  if (settingsStore.currentLesson === 0) {
    return diphthongs.value
  }
  return diphthongs.value.filter(diphthong => diphthong.lesson === settingsStore.currentLesson)
})

// 获取所有可用的课程
const availableLessons = computed(() => {
  const lessons = new Set(diphthongs.value.map(diphthong => diphthong.lesson).filter(Boolean))
  return Array.from(lessons).sort((a, b) => a - b)
})

const currentDiphthong = computed(() => filteredDiphthongs.value[currentIndex.value])

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

const nextItem = () => {
  console.log('➡️ 下一个双元音')
  if (currentIndex.value < filteredDiphthongs.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const previousItem = () => {
  console.log('⬅️ 上一个双元音')
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = filteredDiphthongs.value.length - 1
  }
}

const speakItem = () => {
  console.log('🗣️ 朗读双元音例词:', currentDiphthong.value?.exampleWord)
  if (currentDiphthong.value) {
    speakEnglish(currentDiphthong.value.exampleWord)
  }
}

onMounted(() => {
  console.log('✅ 双元音练习场景已挂载，共', diphthongs.value.length, '个双元音')
  console.log('📚 可用课程:', availableLessons.value)
})
</script>

<style scoped>
.scene-container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: background-color 0.3s ease;
}

.no-data-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  text-align: center;
}

.no-data-icon {
  font-size: 80px;
}

.no-data-text {
  font-size: 24px;
  font-weight: bold;
}

.open-settings-btn {
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.open-settings-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}
</style>

