<template>
  <div class="mandarin-word-card">
    <!-- 汉字（超大） -->
    <div
      class="hanzi-text"
      :style="{ color: theme.colors.mandarinPrimary }"
    >
      {{ word.hanzi }}
    </div>

    <!-- 拼音 -->
    <div
      class="pinyin-text"
      :style="{ color: theme.colors.accentBlue }"
    >
      {{ word.pinyin }}
    </div>

    <!-- 翻译 -->
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
        :alt="word.hanzi"
        class="word-image"
        @error="handleImageError"
      />
    </div>

    <!-- 分类标签（可选） -->
    <div
      v-if="word.category"
      class="category-badge"
      :style="{
        backgroundColor: theme.colors.pinyinPrimary,
        color: theme.colors.primaryText
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
    greeting: '问候',
    family: '家庭',
    food: '食物',
    nature: '自然',
    animals: '动物',
    objects: '物品',
    colors: '颜色'
  }
  return categoryMap[category] || category
}
</script>

<style scoped>
.mandarin-word-card {
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

.hanzi-text {
  font-size: 180px;
  font-weight: bold;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
  line-height: 1.2;
}

.pinyin-text {
  font-size: 56px;
  font-weight: bold;
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
  .mandarin-word-card {
    gap: 28px;
  }

  .hanzi-text {
    font-size: 140px;
  }

  .pinyin-text {
    font-size: 44px;
  }

  .translation-text {
    font-size: 36px;
  }

  .category-badge {
    font-size: 17px;
    padding: 6px 14px;
  }
}

@media (max-width: 480px) {
  .mandarin-word-card {
    gap: 35px; /* 增大间距，让卡片更充实 */
  }

  .hanzi-text {
    font-size: 130px; /* 增大字体 */
  }

  .pinyin-text {
    font-size: 40px; /* 增大字体 */
  }

  .translation-text {
    font-size: 32px; /* 增大字体 */
  }

  .category-badge {
    font-size: 15px;
    padding: 5px 12px;
  }
}

/* iPhone 14 Pro Max 优化 (430px) */
@media (min-width: 415px) and (max-width: 440px) and (min-height: 900px) {
  .mandarin-word-card {
    gap: 38px;
  }

  .hanzi-text {
    font-size: 150px; /* Pro Max 更大屏幕 */
  }

  .pinyin-text {
    font-size: 48px;
  }

  .translation-text {
    font-size: 38px;
  }

  .category-badge {
    font-size: 16px;
    padding: 6px 14px;
  }
}

/* iPhone 14 / 14 Pro / 16 Pro 优化 (390-393px) - 基准布局 */
@media (min-width: 385px) and (max-width: 400px) and (min-height: 840px) {
  .mandarin-word-card {
    gap: 32px;
  }

  .hanzi-text {
    font-size: 125px; /* 基准字体大小 */
  }

  .pinyin-text {
    font-size: 40px;
  }

  .translation-text {
    font-size: 32px;
  }

  .category-badge {
    font-size: 15px;
    padding: 5px 12px;
  }
}

/* iPhone SE / 小屏手机 */
@media (max-width: 375px) {
  .mandarin-word-card {
    gap: 28px;
  }

  .hanzi-text {
    font-size: 105px;
  }

  .pinyin-text {
    font-size: 34px;
  }

  .translation-text {
    font-size: 27px;
  }

  .category-badge {
    font-size: 14px;
    padding: 4px 10px;
  }
}
</style>

