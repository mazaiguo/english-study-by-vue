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

    <!-- 图片 -->
    <div v-if="word.imageFile" class="image-container">
      <img
        :src="getImageUrl(word.imageFile)"
        :alt="word.word"
        class="word-image"
        @error="handleImageError"
      />
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
import { getImageUrl, handleImageError } from '@/utils/imageLoader'

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
  gap: 20px;
  position: relative;
}

.image-container {
  width: 100%;
  max-width: 300px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.05);
}

.word-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.word-image.loading {
  opacity: 0.5;
}

.word-image.loaded {
  opacity: 1;
}

.word-image.image-error {
  object-fit: contain;
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

/* iPhone 14 Pro Max 优化 (430px) */
@media (min-width: 415px) and (max-width: 440px) and (min-height: 900px) {
  .english-word-card {
    gap: 38px;
  }

  .word-text {
    font-size: 105px; /* Pro Max 更大 */
  }

  .phonetic-text {
    font-size: 44px;
  }

  .translation-text {
    font-size: 38px;
  }

  .category-badge {
    font-size: 18px;
    padding: 7px 16px;
  }
}

/* iPhone 14 / 14 Pro / 16 Pro 优化 (390-393px) - 基准布局 */
@media (min-width: 385px) and (max-width: 400px) and (min-height: 840px) {
  .english-word-card {
    gap: 34px;
  }

  .word-text {
    font-size: 88px; /* 基准英语单词大小 */
  }

  .phonetic-text {
    font-size: 36px;
  }

  .translation-text {
    font-size: 32px;
  }

  .category-badge {
    font-size: 16px;
    padding: 6px 14px;
  }
}
</style>

