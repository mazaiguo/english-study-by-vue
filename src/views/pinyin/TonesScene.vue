<template>
  <div class="scene-container" :style="{ backgroundColor: theme.colors.background }">
    <LearningCard
      v-if="filteredTones.length > 0"
      :current-index="currentIndex"
      :total-items="filteredTones.length"
      :on-next="nextItem"
      :on-previous="previousItem"
      :on-tap="speakItem"
      :on-swipe-up="openSettings"
    >
      <template #content>
        <div v-if="currentTone" class="tone-card">
          <!-- 拼音声调 -->
          <div
            class="tone-text"
            :style="{ color: theme.colors.pinyinPrimary }"
          >
            {{ currentTone.pinyin }}
          </div>

          <!-- 声调说明 -->
          <div
            class="tone-name"
            :style="{ color: theme.colors.mandarinPrimary }"
          >
            {{ currentTone.tone }}
          </div>

          <!-- 描述 -->
          <div
            class="description-text"
            :style="{ color: theme.colors.secondaryText }"
          >
            {{ currentTone.description }}
          </div>

          <!-- 汉字和含义 -->
          <div class="example-section">
            <span
              class="example-character"
              :style="{ color: theme.colors.mandarinPrimary }"
            >
              {{ currentTone.exampleCharacter }}
            </span>
            <span
              class="example-meaning"
              :style="{ color: theme.colors.accentBlue }"
            >
              ({{ currentTone.meaning }})
            </span>
          </div>
        </div>
      </template>
    </LearningCard>

    <!-- 无数据提示 -->
    <div v-else class="no-data-message" :style="{ color: theme.colors.primaryText }">
      <div class="no-data-icon">🔤</div>
      <div class="no-data-text">当前课程没有声调数据</div>
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
      :show-english-settings="false"
      :test-text="currentTone?.pinyin || 'mā'"
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
import SettingsPanel from '@/components/SettingsPanel.vue'
import tonesData from '@/data/pinyin_tones.json'

console.log('📖 拼音声调场景加载')

const router = useRouter()
const themeStore = useThemeStore()
const settingsStore = useSettingsStore()
const { speakPinyin } = useTTS()

const theme = computed(() => themeStore.currentTheme)
const tones = ref(tonesData.tones || [])
const currentIndex = ref(0)
const showSettings = ref(false)

// 根据课程过滤
const filteredTones = computed(() => {
  if (settingsStore.currentLesson === 0) {
    return tones.value
  }
  return tones.value.filter(t => t.lesson === settingsStore.currentLesson)
})

// 可用课程列表
const availableLessons = computed(() => {
  const lessons = [...new Set(tones.value.map(t => t.lesson))].sort((a, b) => a - b)
  return lessons
})

const currentTone = computed(() => filteredTones.value[currentIndex.value])

// 监听课程变化
watch(() => settingsStore.currentLesson, () => {
  currentIndex.value = 0
  console.log('📚 课程已切换，当前显示:', filteredTones.value.length, '个声调')
})

const nextItem = () => {
  console.log('➡️ 下一个声调')
  if (currentIndex.value < filteredTones.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const previousItem = () => {
  console.log('⬅️ 上一个声调')
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = filteredTones.value.length - 1
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
  if (currentTone.value) {
    // 朗读汉字而不是拼音，确保使用普通话发音
    const textToSpeak = currentTone.value.exampleCharacter || currentTone.value.pinyin
    console.log('🗣️ 朗读声调:', textToSpeak)
    speakPinyin(textToSpeak)
  }
}

onMounted(() => {
  console.log('✅ 拼音声调场景已挂载')
  console.log('📚 共', tones.value.length, '个声调')
  console.log('📚 可用课程:', availableLessons.value)
  console.log('📚 当前课程:', settingsStore.currentLesson === 0 ? '全部' : `第${settingsStore.currentLesson}课`)
  console.log('📚 当前显示:', filteredTones.value.length, '个声调')
  console.log('⚙️ 当前语速:', settingsStore.speechRate + 'x')
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

.tone-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.tone-text {
  font-size: 180px;
  font-weight: bold;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
}

.tone-name {
  font-size: 44px;
  font-weight: bold;
  transition: color 0.3s ease;
}

.description-text {
  font-size: 28px;
  transition: color 0.3s ease;
}

.example-section {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 48px;
}

.example-character {
  font-weight: bold;
  transition: color 0.3s ease;
}

.example-meaning {
  font-size: 32px;
  transition: color 0.3s ease;
}

@media (max-width: 768px) {
  .tone-text {
    font-size: 140px;
  }

  .tone-name {
    font-size: 36px;
  }

  .description-text {
    font-size: 24px;
  }

  .example-section {
    font-size: 38px;
  }

  .example-meaning {
    font-size: 26px;
  }
}

@media (max-width: 480px) {
  .tone-text {
    font-size: 100px;
  }

  .tone-name {
    font-size: 28px;
  }

  .description-text {
    font-size: 20px;
  }

  .example-section {
    font-size: 28px;
  }

  .example-meaning {
    font-size: 20px;
  }
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

