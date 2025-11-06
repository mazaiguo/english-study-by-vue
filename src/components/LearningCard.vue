<template>
  <div class="learning-card-container">
    <!-- 返回主页按钮 -->
    <button 
      class="home-button"
      :style="{ 
        backgroundColor: theme.colors.accentBlue,
        color: theme.colors.whiteText 
      }"
      @click="goHome"
      aria-label="返回主页"
    >
      <span class="home-icon">🏠</span>
    </button>

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
    default: '点击朗读 | 左右滑动切换 | 上下滑动打开设置'
  }
})

const router = useRouter()
const themeStore = useThemeStore()
const theme = computed(() => themeStore.currentTheme)

const goHome = () => {
  console.log('🏠 点击返回主菜单')
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
  onSwipeDown: props.onSwipeUp, // 下滑也打开设置
  onSwipeUp: props.onSwipeUp,   // 上滑打开设置
  onTap: props.onTap,
  enableUpSwipe: !!props.onSwipeUp
})
</script>

<style scoped>
.learning-card-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 返回主页按钮 */
.home-button {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  font-size: 24px;
}

.home-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.home-button:active {
  transform: scale(0.95);
}

.home-icon {
  display: block;
  line-height: 1;
}

.learning-card {
  position: relative;
  width: 90%;
  max-width: 1000px;
  min-height: 500px; /* 从600px减少到500px */
  margin: 20px auto; /* 从40px减少到20px */
  padding: 50px 40px; /* 从60px减少到50px */
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
    min-height: 420px; /* 从500px减少 */
    padding: 35px 25px; /* 减少padding */
    margin: 15px auto;
  }

  .index-text {
    font-size: 26px;
    top: 18px;
    right: 25px;
  }

  .gesture-hint {
    font-size: 15px;
    padding: 8px 18px;
    bottom: 18px;
  }
  
  .home-button {
    width: 45px;
    height: 45px;
    top: 15px;
    left: 15px;
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .learning-card {
    width: 92%;
    padding: 30px 18px; /* 进一步减少 */
    min-height: 350px; /* 从450px大幅减少 */
    margin: 10px auto;
  }

  .index-text {
    font-size: 22px;
    top: 12px;
    right: 18px;
  }

  .gesture-hint {
    font-size: 13px;
    padding: 6px 12px;
    bottom: 12px;
  }
  
  .home-button {
    width: 40px;
    height: 40px;
    top: 12px;
    left: 12px;
    font-size: 18px;
  }
}

/* iPhone专属优化 (iPhone 12/13/14系列) */
@media (max-width: 390px) and (min-height: 800px) {
  .learning-card-container {
    padding: 10px 0;
  }
  
  .learning-card {
    width: 90%;
    min-height: 320px; /* 大幅减少高度 */
    padding: 25px 15px; /* 最小化padding */
    margin: 8px auto;
  }

  .index-text {
    font-size: 20px;
    top: 10px;
    right: 15px;
  }

  .gesture-hint {
    font-size: 12px;
    padding: 5px 10px;
    bottom: 10px;
  }
  
  .content-area {
    gap: 20px; /* 减少内容间距 */
  }
}

/* iPhone SE / 小屏手机 */
@media (max-width: 375px) {
  .learning-card {
    width: 88%;
    min-height: 300px;
    padding: 22px 12px;
    margin: 5px auto;
  }
  
  .home-button {
    width: 38px;
    height: 38px;
    top: 10px;
    left: 10px;
    font-size: 16px;
  }
}
</style>

