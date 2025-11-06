<template>
  <div class="phonetic-card">
    <!-- 音标符号（超大） -->
    <div
      class="phonetic-symbol"
      :style="{ color: theme.colors.specialPurple }"
    >
      {{ phonetic.symbol }}
    </div>

    <!-- 描述 -->
    <div
      class="description-text"
      :style="{ color: theme.colors.secondaryText }"
    >
      {{ phonetic.description }}
    </div>

    <!-- 例词 -->
    <div class="example-section">
      <span
        class="example-word"
        :style="{ color: theme.colors.englishPrimary }"
      >
        {{ phonetic.exampleWord }}
      </span>
      <span
        class="example-phonetic"
        :style="{ color: theme.colors.accentBlue }"
      >
        {{ phonetic.examplePhonetic }}
      </span>
    </div>

    <!-- 分类标签 -->
    <div
      v-if="phonetic.category"
      class="category-badge"
      :style="{
        backgroundColor: theme.colors.englishSecondary,
        color: theme.colors.whiteText
      }"
    >
      {{ phonetic.category }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const props = defineProps({
  phonetic: {
    type: Object,
    required: true
  }
})

const themeStore = useThemeStore()
const theme = computed(() => themeStore.currentTheme)
</script>

<style scoped>
.phonetic-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: relative;
}

.phonetic-symbol {
  font-size: 180px;
  font-weight: bold;
  font-family: 'Noto Sans', 'Doulos SIL', sans-serif;
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
  font-size: 48px;
}

.example-word {
  font-weight: bold;
  text-transform: lowercase;
  transition: color 0.3s ease;
}

.example-phonetic {
  font-weight: 500;
  font-family: 'Noto Sans', 'Doulos SIL', sans-serif;
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
  .phonetic-symbol {
    font-size: 140px;
  }

  .description-text {
    font-size: 24px;
  }

  .example-section {
    font-size: 38px;
    gap: 15px;
  }

  .category-badge {
    font-size: 18px;
    padding: 6px 16px;
  }
}

@media (max-width: 480px) {
  .phonetic-symbol {
    font-size: 100px;
  }

  .description-text {
    font-size: 20px;
  }

  .example-section {
    font-size: 28px;
    gap: 10px;
  }

  .category-badge {
    font-size: 16px;
    padding: 5px 12px;
  }
}
</style>

