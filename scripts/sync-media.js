/**
 * 从 GitHub Pages 同步媒体资源（图片/视频）到 public/
 * 运行: node scripts/sync-media.js [images|videos|all]
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const GITHUB_BASE_URL = 'https://mazaiguo.github.io/blogimg'
const PUBLIC_DIR = path.resolve(__dirname, '../public')

/**
 * 下载文件
 * @param {string} url - 文件URL
 * @param {string} destPath - 目标路径
 * @returns {Promise<boolean>}
 */
function downloadFile(url, destPath) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(destPath)
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(`❌ HTTP ${response.statusCode}: ${url}`)
        resolve(false)
        return
      }
      
      response.pipe(file)
      
      file.on('finish', () => {
        file.close()
        resolve(true)
      })
    }).on('error', (err) => {
      fs.unlink(destPath, () => {}) // 删除不完整的文件
      console.error(`❌ 下载失败: ${err.message}`)
      resolve(false)
    })
  })
}

/**
 * 获取远程目录的文件列表
 * 注意：GitHub Pages 不支持列表，需要手动维护文件列表
 * 或者从JSON数据文件中提取图片文件名
 */
async function getImageListFromData() {
  const dataFiles = [
    'english_words.json',
    'english_sentences.json',
    'mandarin_words.json',
    'mandarin_sentences.json'
  ]
  
  const imageFiles = new Set()
  
  for (const file of dataFiles) {
    try {
      const url = `${GITHUB_BASE_URL}/english-study-data/${file}`
      const response = await fetch(url)
      if (!response.ok) continue
      
      const data = await response.json()
      
      // 提取图片文件名
      const items = data.words || data.sentences || []
      items.forEach(item => {
        if (item.imageFile) {
          imageFiles.add(item.imageFile)
        }
      })
    } catch (error) {
      console.warn(`⚠️ 读取 ${file} 失败:`, error.message)
    }
  }
  
  return Array.from(imageFiles)
}

/**
 * 同步图片
 */
async function syncImages() {
  console.log('📥 开始同步图片...\n')
  
  const imagesDir = path.join(PUBLIC_DIR, 'images')
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }
  
  // 从数据文件获取图片列表
  const imageFiles = await getImageListFromData()
  
  if (imageFiles.length === 0) {
    console.log('⚠️ 没有找到需要下载的图片')
    return { success: 0, failed: 0 }
  }
  
  console.log(`📋 找到 ${imageFiles.length} 个图片文件\n`)
  
  let successCount = 0
  let failCount = 0
  
  for (const file of imageFiles) {
    const url = `${GITHUB_BASE_URL}/images/${file}`
    const destPath = path.join(imagesDir, file)
    
    // 如果文件已存在，跳过
    if (fs.existsSync(destPath)) {
      console.log(`⏭️  跳过已存在: ${file}`)
      successCount++
      continue
    }
    
    console.log(`📥 下载: ${file}`)
    const success = await downloadFile(url, destPath)
    
    if (success) {
      console.log(`✅ 保存: ${file}`)
      successCount++
    } else {
      failCount++
    }
  }
  
  return { success: successCount, failed: failCount }
}

/**
 * 同步视频（如果有的话）
 */
async function syncVideos() {
  console.log('\n📥 开始同步视频...\n')
  
  const videosDir = path.join(PUBLIC_DIR, 'videos')
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true })
  }
  
  // 视频文件列表需要手动配置
  // 或者添加到 JSON 数据中
  const videoFiles = [
    // 'example.mp4'
  ]
  
  if (videoFiles.length === 0) {
    console.log('ℹ️  没有配置视频文件')
    return { success: 0, failed: 0 }
  }
  
  let successCount = 0
  let failCount = 0
  
  for (const file of videoFiles) {
    const url = `${GITHUB_BASE_URL}/videos/${file}`
    const destPath = path.join(videosDir, file)
    
    if (fs.existsSync(destPath)) {
      console.log(`⏭️  跳过已存在: ${file}`)
      successCount++
      continue
    }
    
    console.log(`📥 下载: ${file}`)
    const success = await downloadFile(url, destPath)
    
    if (success) {
      console.log(`✅ 保存: ${file}`)
      successCount++
    } else {
      failCount++
    }
  }
  
  return { success: successCount, failed: failCount }
}

/**
 * 主函数
 */
async function main() {
  const arg = process.argv[2] || 'all'
  
  console.log('🚀 媒体资源同步工具\n')
  
  let imageResult = { success: 0, failed: 0 }
  let videoResult = { success: 0, failed: 0 }
  
  if (arg === 'images' || arg === 'all') {
    imageResult = await syncImages()
  }
  
  if (arg === 'videos' || arg === 'all') {
    videoResult = await syncVideos()
  }
  
  console.log('\n📊 同步完成')
  console.log(`  图片: ${imageResult.success} 成功, ${imageResult.failed} 失败`)
  console.log(`  视频: ${videoResult.success} 成功, ${videoResult.failed} 失败`)
  
  const totalSuccess = imageResult.success + videoResult.success
  const totalFailed = imageResult.failed + videoResult.failed
  
  if (totalFailed === 0 && totalSuccess > 0) {
    console.log('\n✨ 所有资源已同步！')
  }
}

main()

