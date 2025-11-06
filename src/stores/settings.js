import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 设置Store - 管理语速、发音等设置
 */
export const useSettingsStore = defineStore('settings', () => {
  // 语速设置 (0.5 - 2.0)
  const speechRate = ref(0.9)
  
  // 英语发音设置 ('us' 美式 或 'gb' 英式)
  const englishAccent = ref('us')
  
  // 当前选择的课程
  const currentLesson = ref(0) // 0 表示所有课程
  
  /**
   * 设置语速
   * @param {Number} rate - 语速值 (0.5 - 2.0)
   */
  const setSpeechRate = (rate) => {
    if (rate >= 0.5 && rate <= 2.0) {
      speechRate.value = rate
      localStorage.setItem('speechRate', rate.toString())
      console.log('⚙️ 语速设置为:', rate)
    }
  }
  
  /**
   * 设置英语发音
   * @param {String} accent - 'us' 或 'gb'
   */
  const setEnglishAccent = (accent) => {
    if (accent === 'us' || accent === 'gb') {
      englishAccent.value = accent
      localStorage.setItem('englishAccent', accent)
      console.log('⚙️ 英语发音设置为:', accent === 'us' ? '美式' : '英式')
    }
  }
  
  /**
   * 设置当前课程
   * @param {Number} lesson - 课程编号
   */
  const setCurrentLesson = (lesson) => {
    currentLesson.value = lesson
    localStorage.setItem('currentLesson', lesson.toString())
    console.log('⚙️ 课程切换到:', lesson === 0 ? '所有课程' : `第${lesson}课`)
  }
  
  /**
   * 初始化设置（从localStorage读取）
   */
  const initSettings = () => {
    const savedRate = localStorage.getItem('speechRate')
    if (savedRate) {
      speechRate.value = parseFloat(savedRate)
    }
    
    const savedAccent = localStorage.getItem('englishAccent')
    if (savedAccent) {
      englishAccent.value = savedAccent
    }
    
    const savedLesson = localStorage.getItem('currentLesson')
    if (savedLesson) {
      currentLesson.value = parseInt(savedLesson)
    }
    
    console.log('⚙️ 设置已加载:', {
      speechRate: speechRate.value,
      englishAccent: englishAccent.value === 'us' ? '美式' : '英式',
      currentLesson: currentLesson.value
    })
  }
  
  /**
   * 获取语速描述
   */
  const getSpeechRateLabel = () => {
    if (speechRate.value <= 0.7) return '很慢'
    if (speechRate.value <= 0.9) return '慢'
    if (speechRate.value <= 1.1) return '正常'
    if (speechRate.value <= 1.5) return '快'
    return '很快'
  }
  
  return {
    speechRate,
    englishAccent,
    currentLesson,
    setSpeechRate,
    setEnglishAccent,
    setCurrentLesson,
    initSettings,
    getSpeechRateLabel
  }
})

