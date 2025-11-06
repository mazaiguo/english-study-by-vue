<template>
  <transition name="slide-up">
    <div v-if="isVisible" class="settings-panel" :style="{ backgroundColor: theme.colors.cardBackground }">
      <!-- 关闭按钮 -->
      <div class="close-button" @click="close">
        <span :style="{ color: theme.colors.primaryText }">✕</span>
      </div>
      
      <!-- 标题 -->
      <h3 class="panel-title" :style="{ color: theme.colors.primaryText }">
        ⚙️ 设置
      </h3>
      
      <!-- 课程选择 -->
      <div v-if="lessons.length > 0" class="setting-group">
        <label class="setting-label" :style="{ color: theme.colors.primaryText }">
          📚 选择课程
        </label>
        <div class="lesson-buttons">
          <button
            class="lesson-button"
            :class="{ active: settingsStore.currentLesson === 0 }"
            :style="getLessonButtonStyle(0)"
            @click="selectLesson(0)"
          >
            全部
          </button>
          <button
            v-for="lesson in lessons"
            :key="lesson"
            class="lesson-button"
            :class="{ active: settingsStore.currentLesson === lesson }"
            :style="getLessonButtonStyle(lesson)"
            @click="selectLesson(lesson)"
          >
            第{{ lesson }}课
          </button>
        </div>
      </div>
      
      <!-- 语速调整 -->
      <div class="setting-group">
        <label class="setting-label" :style="{ color: theme.colors.primaryText }">
          🎚️ 语速：{{ settingsStore.getSpeechRateLabel() }} ({{ settingsStore.speechRate.toFixed(1) }}x)
        </label>
        <input
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          v-model.number="localRate"
          @input="updateRate"
          class="rate-slider"
        />
        <div class="rate-labels">
          <span :style="{ color: theme.colors.secondaryText }">慢 0.5x</span>
          <span :style="{ color: theme.colors.secondaryText }">正常 1.0x</span>
          <span :style="{ color: theme.colors.secondaryText }">快 2.0x</span>
        </div>
      </div>
      
      <!-- 英语发音（仅英语相关页面显示） -->
      <div v-if="showEnglishSettings" class="setting-group">
        <label class="setting-label" :style="{ color: theme.colors.primaryText }">
          🗣️ 英语发音
        </label>
        <div class="accent-buttons">
          <button
            class="accent-button"
            :class="{ active: settingsStore.englishAccent === 'us' }"
            :style="getAccentButtonStyle('us')"
            @click="selectAccent('us')"
          >
            🇺🇸 美式
          </button>
          <button
            class="accent-button"
            :class="{ active: settingsStore.englishAccent === 'gb' }"
            :style="getAccentButtonStyle('gb')"
            @click="selectAccent('gb')"
          >
            🇬🇧 英式
          </button>
        </div>
      </div>
      
      <!-- 测试发音按钮 -->
      <div class="setting-group">
        <button
          class="test-button"
          :style="{
            backgroundColor: theme.colors.accentBlue,
            color: theme.colors.whiteText
          }"
          @click="testSpeech"
        >
          🔊 测试发音
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useSettingsStore } from '@/stores/settings'
import { useTTS } from '@/composables/useTTS'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  lessons: {
    type: Array,
    default: () => []
  },
  showEnglishSettings: {
    type: Boolean,
    default: false
  },
  testText: {
    type: String,
    default: '你好'
  }
})

const emit = defineEmits(['close', 'lessonChange'])

const themeStore = useThemeStore()
const settingsStore = useSettingsStore()
const { speakEnglish, speakMandarin } = useTTS()

const theme = computed(() => themeStore.currentTheme)
const localRate = ref(settingsStore.speechRate)

watch(() => settingsStore.speechRate, (newRate) => {
  localRate.value = newRate
})

const close = () => {
  emit('close')
}

const selectLesson = (lesson) => {
  settingsStore.setCurrentLesson(lesson)
  emit('lessonChange', lesson)
}

const updateRate = () => {
  settingsStore.setSpeechRate(localRate.value)
}

const selectAccent = (accent) => {
  settingsStore.setEnglishAccent(accent)
}

const testSpeech = () => {
  if (props.showEnglishSettings) {
    speakEnglish(props.testText)
  } else {
    speakMandarin(props.testText)
  }
}

const getLessonButtonStyle = (lesson) => {
  const isActive = settingsStore.currentLesson === lesson
  return {
    backgroundColor: isActive ? theme.value.colors.accentBlue : theme.value.colors.cardBackground,
    color: isActive ? theme.value.colors.whiteText : theme.value.colors.primaryText,
    borderColor: theme.value.colors.accentBlue
  }
}

const getAccentButtonStyle = (accent) => {
  const isActive = settingsStore.englishAccent === accent
  return {
    backgroundColor: isActive ? theme.value.colors.englishPrimary : theme.value.colors.cardBackground,
    color: isActive ? theme.value.colors.whiteText : theme.value.colors.primaryText,
    borderColor: theme.value.colors.englishPrimary
  }
}
</script>

<style scoped>
.settings-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 80vh;
  padding: 30px;
  border-radius: 30px 30px 0 0;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow-y: auto;
  transition: all 0.3s ease;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}

.panel-title {
  font-size: 32px;
  margin-bottom: 25px;
  text-align: center;
}

.setting-group {
  margin-bottom: 30px;
}

.setting-label {
  display: block;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
}

.lesson-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.lesson-button {
  padding: 12px 24px;
  border: 2px solid;
  border-radius: 20px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lesson-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.lesson-button.active {
  transform: scale(1.05);
}

.rate-slider {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
  background: linear-gradient(to right, #42A5F5, #FF9800);
}

.rate-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.rate-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.rate-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 14px;
}

.accent-buttons {
  display: flex;
  gap: 15px;
}

.accent-button {
  flex: 1;
  padding: 15px;
  border: 2px solid;
  border-radius: 20px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.accent-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.accent-button.active {
  transform: scale(1.05);
}

.test-button {
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 25px;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.test-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.test-button:active {
  transform: translateY(0);
}

/* 滑入动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

/* 响应式 */
@media (max-width: 768px) {
  .settings-panel {
    padding: 20px;
  }

  .panel-title {
    font-size: 26px;
  }

  .setting-label {
    font-size: 18px;
  }

  .lesson-button,
  .accent-button {
    font-size: 16px;
    padding: 10px 18px;
  }

  .test-button {
    font-size: 20px;
    padding: 15px;
  }
}
</style>

