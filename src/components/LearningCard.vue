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
  height: 100vh; /* 固定高度，防止滚动条 */
  overflow: hidden; /* 禁用滚动 */
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
  min-height: 600px;
  margin: 20px auto;
  padding: 50px 40px;
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
    width: 96%;
    min-height: 520px;
    padding: 40px 25px;
    margin: 10px auto;
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

/* iPhone 14 Pro Max 优化 (430px x 932px) */
@media (min-width: 415px) and (max-width: 440px) and (min-height: 900px) {
  .learning-card-container {
    padding: 0;
  }
  
  .learning-card {
    width: 96%;
    min-height: calc(100vh - 100px); /* 留更多边距 */
    padding: 50px 25px;
    margin: 10px auto;
    border-radius: 20px;
  }

  .index-text {
    font-size: 26px;
    top: 18px;
    right: 25px;
  }

  .gesture-hint {
    font-size: 14px;
    padding: 8px 16px;
    bottom: 18px;
  }
  
  .content-area {
    gap: 30px;
  }
  
  .home-button {
    width: 46px;
    height: 46px;
    top: 15px;
    left: 15px;
    font-size: 20px;
  }
}

/* iPhone 14 / 14 Pro / 16 Pro 优化 (390-393px x 844-852px) - 基准布局 */
@media (min-width: 385px) and (max-width: 400px) and (min-height: 840px) {
  .learning-card-container {
    padding: 0;
  }
  
  .learning-card {
    width: 97%;
    min-height: calc(100vh - 90px); /* 适中的边距 */
    padding: 45px 20px;
    margin: 5px auto;
    border-radius: 18px;
  }

  .index-text {
    font-size: 24px;
    top: 16px;
    right: 22px;
  }

  .gesture-hint {
    font-size: 13px;
    padding: 7px 14px;
    bottom: 14px;
  }
  
  .content-area {
    gap: 28px;
  }
  
  .home-button {
    width: 44px;
    height: 44px;
    top: 12px;
    left: 12px;
    font-size: 19px;
  }
}

/* iPhone SE / 小屏手机 */
@media (max-width: 375px) {
  .learning-card {
    width: 97%;
    min-height: calc(100vh - 90px);
    padding: 35px 15px;
    margin: 5px auto;
    border-radius: 16px;
  }
  
  .index-text {
    font-size: 22px;
    top: 14px;
    right: 18px;
  }

  .gesture-hint {
    font-size: 12px;
    padding: 6px 12px;
    bottom: 12px;
  }
  
  .home-button {
    width: 40px;
    height: 40px;
    top: 10px;
    left: 10px;
    font-size: 17px;
  }
}
</style>

