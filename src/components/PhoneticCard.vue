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

    <!-- 图片 -->
    <div v-if="phonetic.imageFile" class="image-container">
      <img
        :src="getImageUrl(phonetic.imageFile)"
        :alt="phonetic.symbol"
        class="phonetic-image"
        @error="handleImageError"
      />
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
import { getImageUrl, handleImageError } from '@/utils/imageLoader'

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
  gap: 25px;
  position: relative;
}

.image-container {
  width: 100%;
  max-width: 280px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.05);
}

.phonetic-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.phonetic-image.loading {
  opacity: 0.5;
}

.phonetic-image.loaded {
  opacity: 1;
}

.phonetic-image.image-error {
  object-fit: contain;
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

/* iPhone 14 Pro Max 优化 (430px) */
@media (min-width: 415px) and (max-width: 440px) and (min-height: 900px) {
  .phonetic-card {
    gap: 45px;
  }

  .phonetic-symbol {
    font-size: 160px; /* Pro Max 更大 */
  }

  .description-text {
    font-size: 30px;
  }

  .example-section {
    font-size: 50px;
    gap: 20px;
  }

  .category-badge {
    font-size: 18px;
    padding: 7px 16px;
  }
}

/* iPhone 14 / 14 Pro / 16 Pro 优化 (390-393px) - 基准布局 */
@media (min-width: 385px) and (max-width: 400px) and (min-height: 840px) {
  .phonetic-card {
    gap: 40px;
  }

  .phonetic-symbol {
    font-size: 135px; /* 基准音标大小 */
  }

  .description-text {
    font-size: 25px;
  }

  .example-section {
    font-size: 40px;
    gap: 15px;
  }

  .category-badge {
    font-size: 16px;
    padding: 6px 13px;
  }
}
</style>

