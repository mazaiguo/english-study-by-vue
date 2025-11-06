import { ref, computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'

// 调试模式
const DEBUG = true

/**
 * TTS语音合成 Composable
 */
export function useTTS() {
  const settingsStore = useSettingsStore()
  
  const isSpeaking = ref(false)
  const isSupported = ref(false)
  const voices = ref([])
  const voicesLoaded = ref(false)
  
  // 语音参数 - 使用store中的设置
  const pitch = ref(1.2) // 音调（儿童友好）
  const rate = computed(() => settingsStore.speechRate) // 语速从store获取
  const volume = ref(1.0) // 音量

  // 检查浏览器是否支持 Web Speech API
  const checkSupport = () => {
    isSupported.value = 'speechSynthesis' in window
    if (DEBUG) {
      console.log('🔊 TTS支持检查:', isSupported.value)
    }
    return isSupported.value
  }

  // 加载语音列表
  const loadVoices = () => {
    if (!isSupported.value) return

    const availableVoices = window.speechSynthesis.getVoices()
    
    if (availableVoices.length > 0 && !voicesLoaded.value) {
      voices.value = availableVoices
      voicesLoaded.value = true
      
      if (DEBUG) {
        console.log('🔊 可用语音数量:', availableVoices.length)
        const chineseVoices = availableVoices.filter(v => v.lang.startsWith('zh'))
        console.log('🔊 中文语音数量:', chineseVoices.length)
        if (chineseVoices.length > 0) {
          chineseVoices.forEach(v => {
            console.log('  ✅', v.name, '-', v.lang)
          })
        } else {
          console.warn('⚠️ 系统中没有安装中文语音包')
          console.log('💡 请安装Windows中文语音包或使用支持中文TTS的浏览器')
        }
      }
    }
  }

  // 初始化：立即尝试加载语音
  if (checkSupport()) {
    loadVoices()
    
    // 监听语音加载事件
    if (!voicesLoaded.value) {
      if (DEBUG) {
        console.log('🔊 监听语音列表加载事件...')
      }
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        if (DEBUG) {
          console.log('🔊 语音列表加载事件触发')
        }
        loadVoices()
      })
    }
  }

  // 停止当前语音
  const stop = () => {
    if (isSupported.value && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      isSpeaking.value = false
    }
  }

  /**
   * 朗读文本
   * @param {String} text - 要朗读的文本
   * @param {String} lang - 语言代码 ('zh-CN', 'en-US', 'en-GB')
   */
  const speak = (text, lang = 'zh-CN') => {
    if (!checkSupport()) {
      console.warn('⚠️ 浏览器不支持 Web Speech API')
      return
    }

    // 停止当前语音
    stop()

    if (!text) {
      if (DEBUG) console.warn('⚠️ 没有要朗读的文本')
      return
    }

    if (DEBUG) {
      console.log('🔊 开始朗读:', { text, lang })
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.pitch = pitch.value
    utterance.rate = rate.value
    utterance.volume = volume.value

    utterance.onstart = () => {
      isSpeaking.value = true
      if (DEBUG) console.log('🔊 朗读开始')
    }

    utterance.onend = () => {
      isSpeaking.value = false
      if (DEBUG) console.log('✅ 朗读结束')
    }

    utterance.onerror = (event) => {
      console.error('❌ TTS错误:', event)
      isSpeaking.value = false
    }

    // 确保使用中文语音（如果有多个语音可用，优先选择中文）
    if (lang.startsWith('zh')) {
      // 确保语音已加载
      if (!voicesLoaded.value || voices.value.length === 0) {
        if (DEBUG) {
          console.log('🔊 语音列表未加载，尝试重新获取...')
        }
        voices.value = window.speechSynthesis.getVoices()
      }
      
      const chineseVoice = voices.value.find(voice => voice.lang.startsWith('zh'))
      if (chineseVoice) {
        utterance.voice = chineseVoice
        if (DEBUG) {
          console.log('🔊 选择中文语音:', chineseVoice.name)
        }
      } else {
        if (DEBUG) {
          console.warn('⚠️ 未找到中文语音，使用默认语音')
          console.log('⚠️ 可用语音:', voices.value.map(v => `${v.name} (${v.lang})`))
        }
      }
    }

    window.speechSynthesis.speak(utterance)
  }

  /**
   * 朗读英语
   * @param {String} text - 英语文本
   * @param {String} accent - 'us' 或 'gb'（美式/英式），如果不传则使用设置中的
   */
  const speakEnglish = (text, accent = null) => {
    // 如果没有指定accent，使用store中的设置
    const finalAccent = accent || settingsStore.englishAccent
    const lang = finalAccent === 'gb' ? 'en-GB' : 'en-US'
    
    if (DEBUG) {
      console.log('🔊 朗读英语:', text, '发音:', finalAccent === 'gb' ? '英式' : '美式')
    }
    
    speak(text, lang)
  }

  /**
   * 朗读普通话
   * @param {String} text - 中文文本
   */
  const speakMandarin = (text) => {
    if (DEBUG) {
      console.log('🔊 朗读普通话:', text)
    }
    // 确保使用中文语言
    speak(text, 'zh-CN')
  }

  /**
   * 朗读拼音（使用普通话）
   * @param {String} pinyin - 拼音文本
   */
  const speakPinyin = (pinyin) => {
    if (DEBUG) {
      console.log('🔊 朗读拼音:', pinyin)
    }
    // 拼音也使用中文语音引擎
    speak(pinyin, 'zh-CN')
  }

  return {
    isSpeaking,
    isSupported,
    voices,
    voicesLoaded,
    loadVoices,
    pitch,
    rate,
    volume,
    speak,
    speakEnglish,
    speakMandarin,
    speakPinyin,
    stop,
    checkSupport
  }
}

