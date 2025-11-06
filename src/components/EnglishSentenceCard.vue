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
        @error="handleImageError"
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
.english-sentence-card {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.image-container {
  width: 100%;
  max-width: 350px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.05);
}

.sentence-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.sentence-image.loading {
  opacity: 0.5;
}

.sentence-image.loaded {
  opacity: 1;
}

.sentence-image.image-error {
  object-fit: contain;
}

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

.meta-info {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.info-badge {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
}

/* 响应式设计 */
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

  .info-badge {
    font-size: 16px;
    padding: 6px 16px;
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

  .info-badge {
    font-size: 14px;
    padding: 5px 12px;
  }
}

/* iPhone 14 Pro Max 优化 (430px) */
@media (min-width: 415px) and (max-width: 440px) and (min-height: 900px) {
  .english-sentence-card {
    gap: 38px;
  }

  .sentence-text {
    font-size: 42px;
  }

  .phonetic-text {
    font-size: 30px;
  }

  .translation-text {
    font-size: 30px;
  }

  .info-badge {
    font-size: 17px;
    padding: 7px 18px;
  }
}

/* iPhone 14 / 14 Pro / 16 Pro 优化 (390-393px) - 基准布局 */
@media (min-width: 385px) and (max-width: 400px) and (min-height: 840px) {
  .english-sentence-card {
    gap: 34px;
  }

  .sentence-text {
    font-size: 36px; /* 基准英语句子大小 */
  }

  .phonetic-text {
    font-size: 26px;
  }

  .translation-text {
    font-size: 26px;
  }

  .info-badge {
    font-size: 15px;
    padding: 6px 15px;
  }
}
</style>

