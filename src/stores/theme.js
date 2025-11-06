import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 主题数据定义
export const themes = {
  rainbow: {
    name: '彩虹糖果 Rainbow',
    description: '明亮活泼，适合3-8岁',
    colors: {
      background: '#E3F2FD',
      cardBackground: '#FFF9E6',
      primaryText: '#333333',
      secondaryText: '#78909C',
      whiteText: '#FFFFFF',
      // 英语功能色
      englishPrimary: '#FF9800',
      englishSecondary: '#42A5F5',
      // 普通话功能色
      mandarinPrimary: '#FF6B9D',
      mandarinSecondary: '#EF5350',
      // 拼音功能色
      pinyinPrimary: '#FFD54F',
      pinyinSecondary: '#AB47BC',
      // 强调色
      accentBlue: '#2196F3',
      accentYellow: '#FFD54F',
      accentGreen: '#4CAF50',
      specialPurple: '#AB47BC',
      warningOrange: '#FF9800'
    }
  },
  forest: {
    name: '森林探险 Forest',
    description: '自然温暖，适合喜欢自然的儿童',
    colors: {
      background: '#FFF8E1',
      cardBackground: '#FFFFFF',
      primaryText: '#3E2723',
      secondaryText: '#8D6E63',
      whiteText: '#FFFFFF',
      englishPrimary: '#8BC34A',
      englishSecondary: '#4CAF50',
      mandarinPrimary: '#FF8A65',
      mandarinSecondary: '#FF7043',
      pinyinPrimary: '#FFB74D',
      pinyinSecondary: '#FFA726',
      accentBlue: '#26A69A',
      accentYellow: '#FFD54F',
      accentGreen: '#66BB6A',
      specialPurple: '#7E57C2',
      warningOrange: '#FF8A65'
    }
  },
  space: {
    name: '太空冒险 Space',
    description: '科技梦幻，适合喜欢科幻的儿童',
    colors: {
      background: '#1A237E',
      cardBackground: '#283593',
      primaryText: '#FFFFFF',
      secondaryText: '#B3E5FC',
      whiteText: '#FFFFFF',
      englishPrimary: '#00E5FF',
      englishSecondary: '#18FFFF',
      mandarinPrimary: '#FF4081',
      mandarinSecondary: '#F50057',
      pinyinPrimary: '#FFEB3B',
      pinyinSecondary: '#FFC107',
      accentBlue: '#00B8D4',
      accentYellow: '#FFEA00',
      accentGreen: '#00E676',
      specialPurple: '#E040FB',
      warningOrange: '#FF6E40'
    }
  },
  ocean: {
    name: '海洋世界 Ocean',
    description: '清新海洋，适合喜欢海洋的儿童',
    colors: {
      background: '#E0F7FA',
      cardBackground: '#FFFFFF',
      primaryText: '#006064',
      secondaryText: '#00838F',
      whiteText: '#FFFFFF',
      englishPrimary: '#00ACC1',
      englishSecondary: '#0097A7',
      mandarinPrimary: '#FF7043',
      mandarinSecondary: '#FF5722',
      pinyinPrimary: '#FFB300',
      pinyinSecondary: '#FFA000',
      accentBlue: '#0288D1',
      accentYellow: '#FFC107',
      accentGreen: '#00897B',
      specialPurple: '#8E24AA',
      warningOrange: '#F4511E'
    }
  },
  animals: {
    name: '动物乐园 Animals',
    description: '温暖可爱，适合喜欢小动物的儿童',
    colors: {
      background: '#FFF9C4',
      cardBackground: '#FFFDE7',
      primaryText: '#4E342E',
      secondaryText: '#6D4C41',
      whiteText: '#FFFFFF',
      englishPrimary: '#FF7043',
      englishSecondary: '#FF8A65',
      mandarinPrimary: '#EC407A',
      mandarinSecondary: '#F06292',
      pinyinPrimary: '#FFB300',
      pinyinSecondary: '#FFA726',
      accentBlue: '#42A5F5',
      accentYellow: '#FFCA28',
      accentGreen: '#66BB6A',
      specialPurple: '#AB47BC',
      warningOrange: '#FF8A65'
    }
  }
}

export const useThemeStore = defineStore('theme', () => {
  const currentThemeKey = ref('rainbow')
  const themeList = ref(Object.keys(themes))

  const currentTheme = computed(() => themes[currentThemeKey.value])

  const initializeThemes = () => {
    // 从 localStorage 读取保存的主题
    const savedTheme = localStorage.getItem('selectedTheme')
    if (savedTheme && themes[savedTheme]) {
      currentThemeKey.value = savedTheme
    }
  }

  const setTheme = (themeKey) => {
    if (themes[themeKey]) {
      currentThemeKey.value = themeKey
      localStorage.setItem('selectedTheme', themeKey)
    }
  }

  const setThemeByName = (themeName) => {
    const themeKey = Object.keys(themes).find(
      key => themes[key].name === themeName
    )
    if (themeKey) {
      setTheme(themeKey)
    }
  }

  const getAllThemes = () => {
    return Object.keys(themes).map(key => ({
      key,
      ...themes[key]
    }))
  }

  return {
    currentThemeKey,
    currentTheme,
    themeList,
    initializeThemes,
    setTheme,
    setThemeByName,
    getAllThemes
  }
})

