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
  gap: 30px;
  position: relative;
}

.hanzi-text {
  font-size: 160px; /* 从180px减少 */
  font-weight: bold;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
  line-height: 1.1; /* 从1.2减少 */
}

.pinyin-text {
  font-size: 48px; /* 从56px减少 */
  font-weight: bold;
  transition: color 0.3s ease;
}

.translation-text {
  font-size: 36px; /* 从44px减少 */
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
    gap: 22px; /* 从30px减少 */
  }

  .hanzi-text {
    font-size: 120px; /* 从140px减少 */
  }

  .pinyin-text {
    font-size: 36px; /* 从44px减少 */
  }

  .translation-text {
    font-size: 28px; /* 从36px减少 */
  }

  .category-badge {
    font-size: 16px;
    padding: 6px 14px;
  }
}

@media (max-width: 480px) {
  .mandarin-word-card {
    gap: 16px; /* 从30px大幅减少 */
  }

  .hanzi-text {
    font-size: 90px; /* 从100px减少 */
  }

  .pinyin-text {
    font-size: 28px; /* 从32px减少 */
  }

  .translation-text {
    font-size: 22px; /* 从28px减少 */
  }

  .category-badge {
    font-size: 14px;
    padding: 5px 12px;
  }
}

/* iPhone优化 */
@media (max-width: 390px) {
  .mandarin-word-card {
    gap: 12px;
  }

  .hanzi-text {
    font-size: 75px;
  }

  .pinyin-text {
    font-size: 24px;
  }

  .translation-text {
    font-size: 18px;
  }

  .category-badge {
    font-size: 13px;
    padding: 4px 10px;
  }
}
</style>

