<template>
  <div
    class="learning-card no-select"
    :style="{
      backgroundColor: theme.colors.cardBackground
    }"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <!-- 索引显示 -->
    <div class="index-text" :style="{ color: theme.colors.specialPurple }">
      {{ currentIndex + 1 }} / {{ totalItems }}
    </div>

    <!-- 主内容区域 -->
    <div class="content-area">
      <slot name="content"></slot>
    </div>

    <!-- 手势提示 -->
    <div class="gesture-hint" :style="{ color: theme.colors.accentYellow }">
      {{ gestureHint }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useGesture } from '@/composables/useGesture'

const props = defineProps({
  currentIndex: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  onNext: {
    type: Function,
    default: () => {}
  },
  onPrevious: {
    type: Function,
    default: () => {}
  },
  onTap: {
    type: Function,
    default: () => {}
  },
  onSwipeUp: {
    type: Function,
    default: null
  },
  gestureHint: {
    type: String,
    default: '点击朗读 | 左右滑动切换 | 轻轻上滑设置 | 下滑返回'
  }
})

const router = useRouter()
const themeStore = useThemeStore()
const theme = computed(() => themeStore.currentTheme)

const returnToMenu = () => {
  console.log('🏠 LearningCard: 返回主菜单')
  router.push('/')
}

const {
  handleTouchStart,
  handleTouchEnd,
  handleMouseDown,
  handleMouseUp
} = useGesture({
  onSwipeLeft: props.onPrevious,
  onSwipeRight: props.onNext,
  onSwipeDown: returnToMenu,
  onSwipeUp: props.onSwipeUp,
  onTap: props.onTap,
  enableUpSwipe: !!props.onSwipeUp
})
</script>

<style scoped>
.learning-card {
  position: relative;
  width: 90%;
  max-width: 1000px;
  min-height: 600px;
  margin: 40px auto;
  padding: 60px 40px;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.index-text {
  position: absolute;
  top: 30px;
  right: 40px;
  font-size: 36px;
  font-weight: bold;
  transition: color 0.3s ease;
}

.content-area {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.gesture-hint {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  padding: 12px 30px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 25px;
  white-space: nowrap;
  transition: color 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .learning-card {
    width: 95%;
    min-height: 500px;
    padding: 50px 30px;
    margin: 20px auto;
  }

  .index-text {
    font-size: 28px;
    top: 20px;
    right: 30px;
  }

  .gesture-hint {
    font-size: 16px;
    padding: 10px 20px;
    bottom: 20px;
  }
}

@media (max-width: 480px) {
  .learning-card {
    width: 95%;
    padding: 40px 20px;
    min-height: 450px;
  }

  .index-text {
    font-size: 24px;
    top: 15px;
    right: 20px;
  }

  .gesture-hint {
    font-size: 14px;
    padding: 8px 15px;
  }
}
</style>

