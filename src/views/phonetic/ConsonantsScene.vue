<template>
  <div class="scene-container" :style="{ backgroundColor: theme.colors.background }">
    <div v-if="loading" class="loading-message" :style="{ color: theme.colors.primaryText }">
      <div class="loading-icon">⏳</div>
      <div class="loading-text">Loading consonants data...</div>
    </div>

    <LearningCard
      v-else-if="filteredConsonants.length > 0"
      :current-index="currentIndex"
      :total-items="filteredConsonants.length"
      :on-next="nextItem"
      :on-previous="previousItem"
      :on-tap="speakItem"
      :on-swipe-up="openSettings"
    >
      <template #content>
        <PhoneticCard v-if="currentConsonant" :phonetic="currentConsonant" />
      </template>
    </LearningCard>

    <!-- 无数据提示 -->
    <div v-else class="no-data-message" :style="{ color: theme.colors.primaryText }">
      <div class="no-data-icon">🔤</div>
      <div class="no-data-text">当前课程没有辅音数据</div>
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
      :test-text="currentConsonant?.exampleWord || 'cat'"
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
import { loadData } from '@/utils/dataLoader'
import LearningCard from '@/components/LearningCard.vue'
import PhoneticCard from '@/components/PhoneticCard.vue'
import SettingsPanel from '@/components/SettingsPanel.vue'

console.log('📖 辅音练习场景加载')

const router = useRouter()
const themeStore = useThemeStore()
const settingsStore = useSettingsStore()
const { speakEnglish } = useTTS()

const theme = computed(() => themeStore.currentTheme)
const consonants = ref([])
const currentIndex = ref(0)
const showSettings = ref(false)
const loading = ref(true)

// 根据选择的课程过滤辅音
const filteredConsonants = computed(() => {
  if (settingsStore.currentLesson === 0) {
    return consonants.value
  }
  return consonants.value.filter(consonant => consonant.lesson === settingsStore.currentLesson)
})

// 获取所有可用的课程
const availableLessons = computed(() => {
  const lessons = new Set(consonants.value.map(consonant => consonant.lesson).filter(Boolean))
  return Array.from(lessons).sort((a, b) => a - b)
})

const currentConsonant = computed(() => filteredConsonants.value[currentIndex.value])

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
  console.log('➡️ 下一个辅音')
  if (currentIndex.value < filteredConsonants.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const previousItem = () => {
  console.log('⬅️ 上一个辅音')
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = filteredConsonants.value.length - 1
  }
}

const speakItem = () => {
  console.log('🗣️ 朗读辅音例词:', currentConsonant.value?.exampleWord)
  if (currentConsonant.value) {
    speakEnglish(currentConsonant.value.exampleWord)
  }
}

onMounted(async () => {
  console.log('✅ 辅音练习场景已挂载')
  
  try {
    const data = await loadData('phonetic_consonants', true)
    consonants.value = data.consonants || []
    console.log('📚 共', consonants.value.length, '个辅音')
    console.log('📚 可用课程:', availableLessons.value)
  } catch (error) {
    console.error('❌ 加载辅音数据失败:', error)
  } finally {
    loading.value = false
  }
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

.loading-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  text-align: center;
}

.loading-icon {
  font-size: 80px;
  animation: spin 2s linear infinite;
}

.loading-text {
  font-size: 24px;
  font-weight: bold;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

