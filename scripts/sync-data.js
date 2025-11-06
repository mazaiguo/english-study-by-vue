/**
 * 从 GitHub Pages 同步数据到 public/data
 * 运行: node scripts/sync-data.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const GITHUB_BASE_URL = 'https://mazaiguo.github.io/blogimg/english-study-data'
const PUBLIC_DATA_DIR = path.resolve(__dirname, '../public/data')

const DATA_FILES = [
  'english_words.json',
  'english_sentences.json',
  'mandarin_words.json',
  'mandarin_sentences.json',
  'pinyin_initials.json',
  'pinyin_finals.json',
  'pinyin_tones.json',
  'phonetic_vowels.json',
  'phonetic_consonants.json',
  'phonetic_diphthongs.json'
]

async function downloadFile(filename) {
  const url = `${GITHUB_BASE_URL}/${filename}`
  console.log(`📥 下载: ${filename}`)
  
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    const filePath = path.join(PUBLIC_DATA_DIR, filename)
    
    // 确保目录存在
    if (!fs.existsSync(PUBLIC_DATA_DIR)) {
      fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true })
    }
    
    // 写入文件（格式化JSON）
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    console.log(`✅ 保存: ${filename}`)
    
    return true
  } catch (error) {
    console.error(`❌ 失败: ${filename} - ${error.message}`)
    return false
  }
}

async function syncAll() {
  console.log('🚀 开始同步数据文件...\n')
  
  let successCount = 0
  let failCount = 0
  
  for (const file of DATA_FILES) {
    const success = await downloadFile(file)
    if (success) {
      successCount++
    } else {
      failCount++
    }
  }
  
  console.log(`\n📊 同步完成: ${successCount} 成功, ${failCount} 失败`)
  
  if (failCount === 0) {
    console.log('✨ 所有数据文件已更新！')
  }
}

syncAll()

