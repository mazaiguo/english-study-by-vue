import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// 调试模式开关
const DEBUG = true

/**
 * 手势操作 Composable
 * @param {Object} options - 配置选项
 * @param {Function} options.onSwipeLeft - 左滑回调（上一个）
 * @param {Function} options.onSwipeRight - 右滑回调（下一个）
 * @param {Function} options.onSwipeDown - 下滑回调（返回主菜单）
 * @param {Function} options.onSwipeUp - 上滑回调（可选）
 * @param {Function} options.onTap - 点击回调（朗读）
 * @param {Number} options.minSwipeDistance - 最小滑动距离（默认100px）
 * @param {Number} options.maxTapMovement - 最大点击移动距离（默认10px）
 * @param {Number} options.maxTapDuration - 最大点击持续时间（默认300ms）
 */
export function useGesture(options = {}) {
  const router = useRouter()
  
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeDown,
    onSwipeUp,
    onTap,
    minSwipeDistance = 100,
    minUpSwipeDistance = 40, // 上滑的最小距离，进一步降低（从60改为40）
    maxTapMovement = 10,
    maxTapDuration = 300,
    enableUpSwipe = false // 新增：是否启用上滑手势
  } = options

  if (DEBUG) {
    console.log('🎯 useGesture 初始化:', {
      hasOnSwipeLeft: !!onSwipeLeft,
      hasOnSwipeRight: !!onSwipeRight,
      hasOnSwipeDown: !!onSwipeDown,
      hasOnSwipeUp: !!onSwipeUp,
      hasOnTap: !!onTap,
      enableUpSwipe,
      minSwipeDistance,
      maxTapMovement
    })
  }

  const touchStartX = ref(0)
  const touchStartY = ref(0)
  const touchStartTime = ref(0)
  const isSwiping = ref(false)

  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    touchStartX.value = touch.clientX
    touchStartY.value = touch.clientY
    touchStartTime.value = Date.now()
    isSwiping.value = false
    
    if (DEBUG) {
      console.log('👆 Touch Start:', {
        x: touchStartX.value,
        y: touchStartY.value
      })
    }
  }

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0]
    const touchEndX = touch.clientX
    const touchEndY = touch.clientY
    const touchEndTime = Date.now()

    const deltaX = touchEndX - touchStartX.value
    const deltaY = touchEndY - touchStartY.value
    const duration = touchEndTime - touchStartTime.value
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (DEBUG) {
      console.log('👆 Touch End:', {
        deltaX,
        deltaY,
        distance,
        duration,
        absX: Math.abs(deltaX),
        absY: Math.abs(deltaY)
      })
    }

    // 判断是否为点击
    if (distance < maxTapMovement && duration < maxTapDuration) {
      if (DEBUG) console.log('🎯 检测到点击')
      if (onTap) {
        onTap(e)
      }
      return
    }

    // 判断滑动方向
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    if (absX > absY) {
      // 水平滑动
      if (absX >= minSwipeDistance) {
        if (deltaX > 0 && onSwipeRight) {
          if (DEBUG) console.log('👉 右滑 - 下一个')
          onSwipeRight()
        } else if (deltaX < 0 && onSwipeLeft) {
          if (DEBUG) console.log('👈 左滑 - 上一个')
          onSwipeLeft()
        }
      }
    } else {
      // 垂直滑动 - 上滑和下滑都打开设置
      if (absY >= minUpSwipeDistance) {
        if (deltaY < 0 && enableUpSwipe && onSwipeUp) {
          if (DEBUG) console.log('👆 上滑 - 打开设置')
          onSwipeUp()
        } else if (deltaY > 0 && enableUpSwipe && onSwipeDown) {
          if (DEBUG) console.log('👇 下滑 - 打开设置')
          onSwipeDown()
        }
      }
    }
  }

  // 鼠标事件支持（用于桌面浏览器测试）
  const mouseStartX = ref(0)
  const mouseStartY = ref(0)
  const mouseStartTime = ref(0)
  const isMouseDown = ref(false)

  const handleMouseDown = (e) => {
    mouseStartX.value = e.clientX
    mouseStartY.value = e.clientY
    mouseStartTime.value = Date.now()
    isMouseDown.value = true
    
    if (DEBUG) {
      console.log('🖱️ Mouse Down:', {
        x: mouseStartX.value,
        y: mouseStartY.value
      })
    }
  }

  const handleMouseUp = (e) => {
    if (!isMouseDown.value) return
    
    const mouseEndX = e.clientX
    const mouseEndY = e.clientY
    const mouseEndTime = Date.now()

    const deltaX = mouseEndX - mouseStartX.value
    const deltaY = mouseEndY - mouseStartY.value
    const duration = mouseEndTime - mouseStartTime.value
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    isMouseDown.value = false

    if (DEBUG) {
      console.log('🖱️ Mouse Up:', {
        deltaX,
        deltaY,
        distance,
        duration,
        absX: Math.abs(deltaX),
        absY: Math.abs(deltaY)
      })
    }

    // 判断是否为点击
    if (distance < maxTapMovement && duration < maxTapDuration) {
      if (DEBUG) console.log('🎯 检测到鼠标点击')
      if (onTap) {
        onTap(e)
      }
      return
    }

    // 判断滑动方向
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    if (absX > absY) {
      if (absX >= minSwipeDistance) {
        if (deltaX > 0 && onSwipeRight) {
          if (DEBUG) console.log('👉 鼠标右滑 - 下一个')
          onSwipeRight()
        } else if (deltaX < 0 && onSwipeLeft) {
          if (DEBUG) console.log('👈 鼠标左滑 - 上一个')
          onSwipeLeft()
        }
      }
    } else {
      // 垂直滑动 - 上滑和下滑都打开设置
      if (absY >= minUpSwipeDistance) {
        if (deltaY < 0 && enableUpSwipe && onSwipeUp) {
          if (DEBUG) console.log('👆 鼠标上滑 - 打开设置')
          onSwipeUp()
        } else if (deltaY > 0 && enableUpSwipe && onSwipeDown) {
          if (DEBUG) console.log('👇 鼠标下滑 - 打开设置')
          onSwipeDown()
        }
      }
    }
  }

  // 返回主菜单的通用方法
  const returnToMenu = () => {
    if (DEBUG) {
      console.log('🏠 返回主菜单，当前路由:', router.currentRoute.value.path)
    }
    router.push('/')
  }

  return {
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
    returnToMenu,
    isSwiping
  }
}

