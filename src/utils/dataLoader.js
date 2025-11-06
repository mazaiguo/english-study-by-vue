/**
 * 数据加载工具
 * 支持从远程URL或本地文件加载JSON数据
 */

const DEBUG = true

// 远程数据源配置
const REMOTE_BASE_URL = 'https://mazaiguo.github.io/blogimg/english-study-data'

// 数据文件映射
const DATA_FILES = {
  // 英语
  'english_words': 'english_words.json',
  'english_sentences': 'english_sentences.json',
  
  // 普通话
  'mandarin_words': 'mandarin_words.json',
  'mandarin_sentences': 'mandarin_sentences.json',
  
  // 拼音
  'pinyin_initials': 'pinyin_initials.json',
  'pinyin_finals': 'pinyin_finals.json',
  'pinyin_tones': 'pinyin_tones.json',
  
  // 音标
  'phonetic_vowels': 'phonetic_vowels.json',
  'phonetic_consonants': 'phonetic_consonants.json',
  'phonetic_diphthongs': 'phonetic_diphthongs.json'
}

/**
 * 从远程或本地加载JSON数据
 * @param {String} dataKey - 数据文件key（如：'english_words'）
 * @param {Boolean} useRemote - 是否优先使用远程数据（默认true）
 * @returns {Promise<Object>} - JSON数据
 */
export async function loadData(dataKey, useRemote = true) {
  const fileName = DATA_FILES[dataKey]
  
  if (!fileName) {
    throw new Error(`未知的数据文件: ${dataKey}`)
  }

  if (DEBUG) {
    console.log(`📥 开始加载数据: ${dataKey}`)
    console.log(`📡 远程模式: ${useRemote ? '是' : '否'}`)
  }

  // 优先尝试远程加载
  if (useRemote) {
    try {
      const remoteUrl = `${REMOTE_BASE_URL}/${fileName}`
      
      if (DEBUG) {
        console.log(`🌐 尝试从远程加载: ${remoteUrl}`)
      }

      const response = await fetch(remoteUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache' // 确保获取最新数据
        },
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (DEBUG) {
        console.log(`✅ 远程数据加载成功: ${dataKey}`)
      }

      // 缓存到localStorage（可选）
      cacheData(dataKey, data)

      return data
    } catch (error) {
      console.warn(`⚠️ 远程加载失败: ${error.message}`)
      console.log(`💾 回退到本地数据`)
    }
  }

  // 回退到本地数据
  try {
    if (DEBUG) {
      console.log(`📂 从本地加载: /src/data/${fileName}`)
    }

    const localData = await import(`../data/${fileName}`)
    
    if (DEBUG) {
      console.log(`✅ 本地数据加载成功: ${dataKey}`)
    }

    return localData.default || localData
  } catch (error) {
    console.error(`❌ 本地数据加载失败: ${error.message}`)
    
    // 尝试从缓存加载
    const cachedData = getCachedData(dataKey)
    if (cachedData) {
      console.log(`💾 从缓存加载数据`)
      return cachedData
    }

    throw new Error(`无法加载数据: ${dataKey}`)
  }
}

/**
 * 缓存数据到localStorage
 * @param {String} key - 数据key
 * @param {Object} data - 数据对象
 */
function cacheData(key, data) {
  try {
    const cacheKey = `data_cache_${key}`
    const cacheData = {
      data,
      timestamp: Date.now(),
      version: '1.0.0'
    }
    localStorage.setItem(cacheKey, JSON.stringify(cacheData))
    
    if (DEBUG) {
      console.log(`💾 数据已缓存: ${key}`)
    }
  } catch (error) {
    console.warn(`⚠️ 缓存失败: ${error.message}`)
  }
}

/**
 * 从localStorage获取缓存数据
 * @param {String} key - 数据key
 * @returns {Object|null} - 缓存的数据或null
 */
function getCachedData(key) {
  try {
    const cacheKey = `data_cache_${key}`
    const cached = localStorage.getItem(cacheKey)
    
    if (cached) {
      const cacheData = JSON.parse(cached)
      const age = Date.now() - cacheData.timestamp
      const maxAge = 24 * 60 * 60 * 1000 // 24小时
      
      if (age < maxAge) {
        if (DEBUG) {
          console.log(`💾 使用缓存数据（${Math.round(age / 1000 / 60)}分钟前）`)
        }
        return cacheData.data
      } else {
        // 缓存过期，清除
        localStorage.removeItem(cacheKey)
      }
    }
  } catch (error) {
    console.warn(`⚠️ 读取缓存失败: ${error.message}`)
  }
  
  return null
}

/**
 * 清除所有数据缓存
 */
export function clearDataCache() {
  Object.keys(DATA_FILES).forEach(key => {
    const cacheKey = `data_cache_${key}`
    localStorage.removeItem(cacheKey)
  })
  console.log('🗑️ 数据缓存已清除')
}

/**
 * 批量加载多个数据文件
 * @param {Array<String>} dataKeys - 数据文件key数组
 * @param {Boolean} useRemote - 是否使用远程数据
 * @returns {Promise<Object>} - 包含所有数据的对象
 */
export async function loadMultipleData(dataKeys, useRemote = true) {
  const results = {}
  
  await Promise.all(
    dataKeys.map(async (key) => {
      try {
        results[key] = await loadData(key, useRemote)
      } catch (error) {
        console.error(`加载 ${key} 失败:`, error)
        results[key] = null
      }
    })
  )
  
  return results
}

/**
 * 预加载所有数据（后台加载）
 */
export async function preloadAllData() {
  if (DEBUG) {
    console.log('🚀 开始预加载所有数据...')
  }

  const keys = Object.keys(DATA_FILES)
  await loadMultipleData(keys, true)
  
  if (DEBUG) {
    console.log('✅ 所有数据预加载完成')
  }
}

