<template>
  <div class="english-word-card">
    <!-- 英语单词（超大） -->
    <div
      class="word-text"
      :style="{ color: theme.colors.englishPrimary }"
    >
      {{ word.word }}
    </div>

    <!-- 音标 -->
    <div
      class="phonetic-text"
      :style="{ color: theme.colors.accentBlue }"
    >
      {{ word.phonetic }}
    </div>

    <!-- 中文翻译 -->
    <div
      class="translation-text"
      :style="{ color: theme.colors.secondaryText }"
    >
      {{ word.translation }}
    </div>

    <!-- 分类标签 -->
    <div
      v-if="word.category"
      class="category-badge"
      :style="{
        backgroundColor: theme.colors.englishSecondary,
        color: theme.colors.whiteText
      }"
    >
      {{ getCategoryName(word.category) }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const props = defineProps({
  word: {
    type: Object,
    required: true
  }
})

const themeStore = useThemeStore()
const theme = computed(() => themeStore.currentTheme)

const getCategoryName = (category) => {
  const categoryMap = {
    greeting: 'Greetings',
    food: 'Food',
    animals: 'Animals',
    objects: 'Objects',
    nature: 'Nature',
    colors: 'Colors',
    emotions: 'Emotions',
    family: 'Family',
    people: 'People'
  }
  return categoryMap[category] || category
}
</script>

<style scoped>
.english-word-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  position: relative;
}

.word-text {
  font-size: 120px;
  font-weight: bold;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
  text-transform: capitalize;
}

.phonetic-text {
  font-size: 48px;
  font-weight: 500;
  font-family: 'Noto Sans', sans-serif;
  transition: color 0.3s ease;
}

.translation-text {
  font-size: 44px;
  transition: color 0.3s ease;
}

.category-badge {
  position: absolute;
  top: -20px;
  left: 20px;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 20px;
  font-weight: bold;
  transition: all 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .word-text {
    font-size: 90px;
  }

  .phonetic-text {
    font-size: 36px;
  }

  .translation-text {
    font-size: 34px;
  }

  .category-badge {
    font-size: 18px;
    padding: 6px 16px;
  }
}

@media (max-width: 480px) {
  .word-text {
    font-size: 64px;
  }

  .phonetic-text {
    font-size: 28px;
  }

  .translation-text {
    font-size: 26px;
  }

  .category-badge {
    font-size: 16px;
    padding: 5px 12px;
  }
}
</style>

