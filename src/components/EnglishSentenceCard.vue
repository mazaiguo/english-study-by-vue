<template>
  <div class="english-sentence-card">
    <!-- 英语句子 -->
    <div
      class="sentence-text"
      :style="{ color: theme.colors.englishPrimary }"
    >
      {{ sentence.sentence }}
    </div>

    <!-- 音标 -->
    <div
      class="phonetic-text"
      :style="{ color: theme.colors.accentBlue }"
    >
      {{ sentence.phonetic }}
    </div>

    <!-- 中文翻译 -->
    <div
      class="translation-text"
      :style="{ color: theme.colors.secondaryText }"
    >
      {{ sentence.translation }}
    </div>

    <!-- 图片 -->
    <div v-if="sentence.imageFile" class="image-container">
      <img
        :src="getImageUrl(sentence.imageFile)"
        :alt="sentence.sentence"
        class="sentence-image"
        @error="(e) => handleImageError(e, sentence.imageFile)"
      />
    </div>

    <!-- 元信息 -->
    <div class="meta-info">
      <div
        v-if="sentence.category"
        class="info-badge"
        :style="{
          backgroundColor: theme.colors.englishSecondary,
          color: theme.colors.whiteText
        }"
      >
        {{ getCategoryName(sentence.category) }}
      </div>
      <div
        v-if="sentence.difficulty"
        class="info-badge"
        :style="{
          backgroundColor: getDifficultyColor(sentence.difficulty),
          color: theme.colors.whiteText
        }"
      >
        {{ getDifficultyName(sentence.difficulty) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { getImageUrl, handleImageError } from '@/utils/imageLoader'

const props = defineProps({
  sentence: {
    type: Object,
    required: true
  }
})

const themeStore = useThemeStore()
const theme = computed(() => themeStore.currentTheme)

const getCategoryName = (category) => {
  const categoryMap = {
    greeting: 'Greetings',
    emotion: 'Emotions',
    question: 'Questions',
    answer: 'Answers',
    preference: 'Preferences',
    weather: 'Weather',
    activity: 'Activities',
    request: 'Requests',
    apology: 'Apologies',
    response: 'Responses',
    feeling: 'Feelings'
  }
  return categoryMap[category] || category
}

const getDifficultyName = (difficulty) => {
  const difficultyMap = {
    easy: 'Easy ⭐',
    medium: 'Medium ⭐⭐',
    hard: 'Hard ⭐⭐⭐'
  }
  return difficultyMap[difficulty] || difficulty
}

const getDifficultyColor = (difficulty) => {
  const colorMap = {
    easy: '#4CAF50',
    medium: '#FF9800',
    hard: '#F44336'
  }
  return colorMap[difficulty] || '#999999'
}
</script>

<style scoped>
/* 复用公共样式 sentence-image-container, sentence-image, meta-info, info-badge */

.english-sentence-card {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* 英语句子特定样式 */
.sentence-text {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
  transition: color 0.3s ease;
}

.phonetic-text {
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  font-family: 'Noto Sans', sans-serif;
  transition: color 0.3s ease;
}

.translation-text {
  font-size: 32px;
  text-align: center;
  transition: color 0.3s ease;
}

/* 响应式设计 - 只保留组件特定样式 */
@media (max-width: 768px) {
  .sentence-text {
    font-size: 36px;
  }

  .phonetic-text {
    font-size: 26px;
  }

  .translation-text {
    font-size: 26px;
  }
}

@media (max-width: 480px) {
  .sentence-text {
    font-size: 28px;
  }

  .phonetic-text {
    font-size: 20px;
  }

  .translation-text {
    font-size: 20px;
  }
}

/* iPhone 14 Pro Max 优化 (430px) */
@media (min-width: 415px) and (max-width: 440px) and (min-height: 900px) {
  .sentence-text {
    font-size: 42px;
  }

  .phonetic-text {
    font-size: 30px;
  }

  .translation-text {
    font-size: 30px;
  }
}

/* iPhone 14 / 14 Pro / 16 Pro 优化 (390-393px) */
@media (min-width: 385px) and (max-width: 400px) and (min-height: 840px) {
  .sentence-text {
    font-size: 36px;
  }

  .phonetic-text {
    font-size: 26px;
  }

  .translation-text {
    font-size: 26px;
  }
}
</style>

