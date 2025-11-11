/**
 * 数据加载工具
 * 支持从本地或远程加载JSON数据
 * 默认使用本地public/data目录，远程作为备用
 */

const DEBUG = true

// 本地数据配置（优先使用本地 public/data 目录）
const LOCAL_DATA_BASE_URL = '/data'  // public/data

// 远程数据配置（GitHub Pages 备用地址）
const REMOTE_DATA_BASE_URL = 'https://mazaiguo.github.io/blogimg/english-study-data'

// 数据加载策略：优先使用本地，失败时回退到远程
const USE_LOCAL_FIRST = true

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
 * 从本地或远程加载JSON数据
 * @param {String} dataKey - 数据文件key（如：'english_words'）
 * @param {Boolean} useLocal - 是否使用本地数据（默认true，优先本地）
 * @returns {Promise<Object>} - JSON数据
 */
export async function loadData(dataKey, useLocal = USE_LOCAL_FIRST) {
  const fileName = DATA_FILES[dataKey]
  
  if (!fileName) {
    throw new Error(`未知的数据文件: ${dataKey}`)
  }

  if (DEBUG) {
    console.log(`📥 开始加载数据: ${dataKey}`)
    console.log(`📂 本地优先模式: ${useLocal ? '是' : '否'}`)
  }

  // 优先尝试本地加载（从 public/data 目录）
  if (useLocal) {
    try {
      const localUrl = `${LOCAL_DATA_BASE_URL}/${fileName}`
      
      if (DEBUG) {
        console.log(`📂 [本地(public/data)] 加载数据: ${localUrl}`)
      }

      const response = await fetch(localUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (DEBUG) {
        console.log(`✅ 本地数据加载成功: ${dataKey}`)
      }

      // 缓存到localStorage
      cacheData(dataKey, data)

      return data
    } catch (error) {
      console.warn(`⚠️ 本地加载失败: ${error.message}`)
      console.log(`🔄 尝试从远程加载...`)
      
      // 本地失败，尝试远程加载
      try {
        const remoteUrl = `${REMOTE_DATA_BASE_URL}/${fileName}`
        
        if (DEBUG) {
          console.log(`🌐 [远程(GitHub Pages)] 加载数据: ${remoteUrl}`)
        }

        const response = await fetch(remoteUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        
        if (DEBUG) {
          console.log(`✅ 远程数据加载成功: ${dataKey}`)
        }

        // 缓存到localStorage
        cacheData(dataKey, data)

        return data
      } catch (remoteError) {
        console.error(`❌ 远程加载也失败: ${remoteError.message}`)
      }
    }
  } else {
    // 直接使用远程加载
    try {
      const remoteUrl = `${REMOTE_DATA_BASE_URL}/${fileName}`
      
      if (DEBUG) {
        console.log(`🌐 [远程(GitHub Pages)] 加载数据: ${remoteUrl}`)
      }

      const response = await fetch(remoteUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (DEBUG) {
        console.log(`✅ 远程数据加载成功: ${dataKey}`)
      }

      // 缓存到localStorage
      cacheData(dataKey, data)

      return data
    } catch (error) {
      console.warn(`⚠️ 远程加载失败: ${error.message}`)
    }
  }

  // 所有加载方式都失败，尝试从缓存加载
  console.log(`💾 尝试从缓存加载...`)
  const cachedData = getCachedData(dataKey)
  if (cachedData) {
    console.log(`✅ 从缓存加载数据成功`)
    return cachedData
  }

  throw new Error(`无法加载数据: ${dataKey}（本地、远程、缓存均失败）`)
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

