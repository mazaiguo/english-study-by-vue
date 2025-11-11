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
        @error="(e) => handleImageError(e, word.imageFile)"
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
/* 复用公共样式 card-wrapper, image-container, word-image, category-badge */

.mandarin-word-card {
  /* 继承 card-wrapper 的基础样式 */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
}

/* 汉字特定样式 - 比基础大小更大 */
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

/* 响应式设计 - 只保留组件特定的字体大小调整 */
/* category-badge 的响应式样式已由 card-common.css 提供 */

@media (max-width: 768px) {
  .hanzi-text {
    font-size: 140px;
  }

  .pinyin-text {
    font-size: 44px;
  }

  .translation-text {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .hanzi-text {
    font-size: 130px;
  }

  .pinyin-text {
    font-size: 40px;
  }

  .translation-text {
    font-size: 32px;
  }
}

/* iPhone 14 Pro Max 优化 (430px) */
@media (min-width: 415px) and (max-width: 440px) and (min-height: 900px) {
  .hanzi-text {
    font-size: 150px;
  }

  .pinyin-text {
    font-size: 48px;
  }

  .translation-text {
    font-size: 38px;
  }
}

/* iPhone 14 / 14 Pro / 16 Pro 优化 (390-393px) */
@media (min-width: 385px) and (max-width: 400px) and (min-height: 840px) {
  .hanzi-text {
    font-size: 125px;
  }

  .pinyin-text {
    font-size: 40px;
  }

  .translation-text {
    font-size: 32px;
  }
}

/* iPhone SE / 小屏手机 */
@media (max-width: 375px) {
  .hanzi-text {
    font-size: 105px;
  }

  .pinyin-text {
    font-size: 34px;
  }

  .translation-text {
    font-size: 27px;
  }
}
</style>


