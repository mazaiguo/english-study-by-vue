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
        @error="(e) => handleImageError(e, pinyin.imageFile)"
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
/* 复用公共样式 pinyin-image-container, pinyin-image, category-badge */

.pinyin-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  position: relative;
}

/* 拼音特定样式 */
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

/* 响应式设计 - 只保留组件特定样式 */
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
}

/* iPhone 14 Pro Max 优化 (430px) */
@media (min-width: 415px) and (max-width: 440px) and (min-height: 900px) {
  .pinyin-text {
    font-size: 160px;
  }

  .description-text {
    font-size: 30px;
  }

  .example-section {
    font-size: 58px;
    gap: 20px;
  }
}

/* iPhone 14 / 14 Pro / 16 Pro 优化 (390-393px) */
@media (min-width: 385px) and (max-width: 400px) and (min-height: 840px) {
  .pinyin-text {
    font-size: 135px;
  }

  .description-text {
    font-size: 25px;
  }

  .example-section {
    font-size: 48px;
    gap: 15px;
  }
}
</style>

