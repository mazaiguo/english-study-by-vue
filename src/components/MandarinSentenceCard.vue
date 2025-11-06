<template>
  <div class="mandarin-sentence-card">
    <!-- 汉字句子 -->
    <div
      class="hanzi-text"
      :style="{ color: theme.colors.mandarinPrimary }"
    >
      {{ sentence.hanzi }}
    </div>

    <!-- 拼音 -->
    <div
      class="pinyin-text"
      :style="{ color: theme.colors.accentBlue }"
    >
      {{ sentence.pinyin }}
    </div>

    <!-- 翻译 -->
    <div
      class="translation-text"
      :style="{ color: theme.colors.secondaryText }"
    >
      {{ sentence.translation }}
    </div>

    <!-- 难度和分类标签 -->
    <div class="meta-info">
      <div
        v-if="sentence.category"
        class="info-badge"
        :style="{
          backgroundColor: theme.colors.pinyinPrimary,
          color: theme.colors.primaryText
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
    greeting: '问候',
    emotion: '情感',
    daily: '日常',
    question: '疑问',
    answer: '回答',
    preference: '喜好',
    weather: '天气',
    activity: '活动',
    request: '请求',
    apology: '道歉',
    response: '回应'
  }
  return categoryMap[category] || category
}

const getDifficultyName = (difficulty) => {
  const difficultyMap = {
    easy: '简单 ⭐',
    medium: '中等 ⭐⭐',
    hard: '困难 ⭐⭐⭐'
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
.mandarin-sentence-card {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.hanzi-text {
  font-size: 56px;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
  transition: color 0.3s ease;
}

.pinyin-text {
  font-size: 36px;
  font-weight: 500;
  text-align: center;
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
  .hanzi-text {
    font-size: 44px;
  }

  .pinyin-text {
    font-size: 28px;
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
  .hanzi-text {
    font-size: 32px;
  }

  .pinyin-text {
    font-size: 22px;
  }

  .translation-text {
    font-size: 20px;
  }

  .info-badge {
    font-size: 14px;
    padding: 5px 12px;
  }
}
</style>

