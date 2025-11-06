/**
 * 调试工具
 */

// 全局调试开关
export const DEBUG_MODE = true

/**
 * 调试日志
 * @param {string} category - 分类（如：路由、手势、TTS）
 * @param {string} message - 消息
 * @param {any} data - 额外数据
 */
export function debugLog(category, message, data = null) {
  if (!DEBUG_MODE) return
  
  const emoji = {
    '路由': '🚀',
    '手势': '👆',
    'TTS': '🔊',
    '主题': '🎨',
    '数据': '📊',
    '错误': '❌',
    '警告': '⚠️',
    '成功': '✅'
  }
  
  const prefix = emoji[category] || '📌'
  
  if (data) {
    console.log(`${prefix} [${category}] ${message}`, data)
  } else {
    console.log(`${prefix} [${category}] ${message}`)
  }
}

/**
 * 调试错误
 */
export function debugError(category, message, error) {
  if (!DEBUG_MODE) return
  console.error(`❌ [${category}] ${message}`, error)
}

/**
 * 调试警告
 */
export function debugWarn(category, message, data = null) {
  if (!DEBUG_MODE) return
  
  if (data) {
    console.warn(`⚠️ [${category}] ${message}`, data)
  } else {
    console.warn(`⚠️ [${category}] ${message}`)
  }
}

/**
 * 开启/关闭调试模式
 */
export function setDebugMode(enabled) {
  window.DEBUG_MODE = enabled
  debugLog('系统', `调试模式${enabled ? '已开启' : '已关闭'}`)
}

// 暴露到全局，方便在控制台调用
if (typeof window !== 'undefined') {
  window.setDebugMode = setDebugMode
  window.DEBUG_MODE = DEBUG_MODE
}


