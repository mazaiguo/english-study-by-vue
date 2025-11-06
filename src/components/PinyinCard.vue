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

    <!-- 图片 -->
    <div v-if="pinyin.imageFile" class="image-container">
      <img
        :src="getImageUrl(pinyin.imageFile)"
        :alt="pinyin.pinyin"
        class="pinyin-image"
        @error="handleImageError"
      />
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
import { getImageUrl, handleImageError } from '@/utils/imageLoader'

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

.pinyin-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.pinyin-image.loading {
  opacity: 0.5;
}

.pinyin-image.loaded {
  opacity: 1;
}

.pinyin-image.image-error {
  object-fit: contain;
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

/* iPhone 14 Pro Max 优化 (430px) */
@media (min-width: 415px) and (max-width: 440px) and (min-height: 900px) {
  .pinyin-card {
    gap: 45px;
  }

  .pinyin-text {
    font-size: 160px; /* Pro Max 更大 */
  }

  .description-text {
    font-size: 30px;
  }

  .example-section {
    font-size: 58px;
    gap: 20px;
  }

  .category-badge {
    font-size: 18px;
    padding: 7px 16px;
  }
}

/* iPhone 14 / 14 Pro / 16 Pro 优化 (390-393px) - 基准布局 */
@media (min-width: 385px) and (max-width: 400px) and (min-height: 840px) {
  .pinyin-card {
    gap: 40px;
  }

  .pinyin-text {
    font-size: 135px; /* 基准拼音大小 */
  }

  .description-text {
    font-size: 25px;
  }

  .example-section {
    font-size: 48px;
    gap: 15px;
  }

  .category-badge {
    font-size: 16px;
    padding: 6px 13px;
  }
}
</style>

