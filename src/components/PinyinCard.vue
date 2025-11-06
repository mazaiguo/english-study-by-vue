<template>
  <div class="pinyin-card">
    <!-- 拼音字母（超大） -->
    <div
      class="pinyin-text"
      :style="{ color: theme.colors.pinyinPrimary }"
    >
      {{ pinyin.pinyin }}
    </div>

    <!-- 描述 -->
    <div
      class="description-text"
      :style="{ color: theme.colors.secondaryText }"
    >
      {{ pinyin.description }}
    </div>

    <!-- 例字 -->
    <div class="example-section">
      <span
        class="example-character"
        :style="{ color: theme.colors.mandarinPrimary }"
      >
        {{ pinyin.exampleCharacter }}
      </span>
      <span
        class="example-pinyin"
        :style="{ color: theme.colors.accentBlue }"
      >
        {{ pinyin.examplePinyin }}
      </span>
    </div>

    <!-- 分类标签 -->
    <div
      v-if="pinyin.category"
      class="category-badge"
      :style="{
        backgroundColor: theme.colors.pinyinSecondary,
        color: theme.colors.whiteText
      }"
    >
      {{ pinyin.category }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const props = defineProps({
  pinyin: {
    type: Object,
    required: true
  }
})

const themeStore = useThemeStore()
const theme = computed(() => themeStore.currentTheme)
</script>

<style scoped>
.pinyin-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: relative;
}

.pinyin-text {
  font-size: 200px;
  font-weight: bold;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
}

.description-text {
  font-size: 28px;
  transition: color 0.3s ease;
}

.example-section {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 56px;
}

.example-character {
  font-weight: bold;
  transition: color 0.3s ease;
}

.example-pinyin {
  font-weight: 500;
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
  .pinyin-text {
    font-size: 150px;
  }

  .description-text {
    font-size: 24px;
  }

  .example-section {
    font-size: 44px;
    gap: 15px;
  }

  .category-badge {
    font-size: 18px;
    padding: 6px 16px;
  }
}

@media (max-width: 480px) {
  .pinyin-text {
    font-size: 100px;
  }

  .description-text {
    font-size: 20px;
  }

  .example-section {
    font-size: 32px;
    gap: 10px;
  }

  .category-badge {
    font-size: 16px;
    padding: 5px 12px;
  }
}
</style>

