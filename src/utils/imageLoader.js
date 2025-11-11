/**
 * 图片/视频加载工具
 * 支持从本地或远程URL加载媒体资源
 * 默认使用本地public目录，远程作为备用
 */

const DEBUG = true;

// 本地资源配置（优先使用本地 public 目录）
const LOCAL_IMAGE_BASE_URL = '/images'  // public/images
const LOCAL_VIDEO_BASE_URL = '/videos'  // public/videos

// 远程资源配置（GitHub Pages 备用地址）
const REMOTE_IMAGE_BASE_URL = 'https://mazaiguo.github.io/blogimg/images'
const REMOTE_VIDEO_BASE_URL = 'https://mazaiguo.github.io/blogimg/videos'

// 资源加载策略：优先使用本地，失败时回退到远程
const USE_LOCAL_FIRST = true

/**
 * 获取图片URL（优先本地）
 * @param {string} imageFile - 图片文件名（如 "apple.jpg" 或 "有.jpg"）
 * @param {boolean} useLocal - 是否使用本地资源（默认true）
 * @returns {string} 图片URL
 */
export function getImageUrl(imageFile, useLocal = USE_LOCAL_FIRST) {
  if (!imageFile) {
    if (DEBUG) {
      console.warn('⚠️ getImageUrl: 没有提供imageFile');
    }
    return getPlaceholderImage();
  }

  const baseUrl = useLocal ? LOCAL_IMAGE_BASE_URL : REMOTE_IMAGE_BASE_URL;
  const imageUrl = `${baseUrl}/${imageFile}`;
  
  if (DEBUG) {
    const source = useLocal ? '本地(public/images)' : '远程(GitHub Pages)';
    console.log(`🖼️ [${source}] 加载图片:`, imageUrl);
  }
  
  return imageUrl;
}

/**
 * 获取视频URL（优先本地）
 * @param {string} videoFile - 视频文件名（如 "pronunciation.mp4"）
 * @param {boolean} useLocal - 是否使用本地资源（默认true）
 * @returns {string} 视频URL
 */
export function getVideoUrl(videoFile, useLocal = USE_LOCAL_FIRST) {
  if (!videoFile) {
    if (DEBUG) {
      console.warn('⚠️ getVideoUrl: 没有提供videoFile');
    }
    return '';
  }

  const baseUrl = useLocal ? LOCAL_VIDEO_BASE_URL : REMOTE_VIDEO_BASE_URL;
  const videoUrl = `${baseUrl}/${videoFile}`;
  
  if (DEBUG) {
    const source = useLocal ? '本地(public/videos)' : '远程(GitHub Pages)';
    console.log(`🎬 [${source}] 加载视频:`, videoUrl);
  }
  
  return videoUrl;
}

/**
 * 判断文件是否为视频
 * @param {string} fileName - 文件名
 * @returns {boolean} 是否为视频文件
 */
function isVideoFile(fileName) {
  if (!fileName) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
  const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
  return videoExtensions.includes(ext);
}

/**
 * 获取占位符图片
 * @returns {string} 占位符图片的data URL
 */
export function getPlaceholderImage() {
  // 返回一个简单的SVG占位符
  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#999" text-anchor="middle" dominant-baseline="middle">
        暂无图片
      </text>
    </svg>
  `.trim();
  
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

/**
 * 获取占位符视频
 * @returns {string} 占位符视频的data URL（SVG格式）
 */
export function getPlaceholderVideo() {
  // 返回一个简单的SVG占位符（带播放图标）
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f0f0f0"/>
      <circle cx="200" cy="150" r="40" fill="#999"/>
      <polygon points="185,135 225,150 185,165" fill="#fff"/>
      <text x="50%" y="220" font-family="Arial" font-size="16" fill="#999" text-anchor="middle" dominant-baseline="middle">
        暂无视频
      </text>
    </svg>
  `.trim();
  
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

/**
 * 根据文件类型获取对应的占位符
 * @param {string} fileName - 文件名
 * @returns {string} 占位符URL
 */
export function getPlaceholder(fileName) {
  return isVideoFile(fileName) ? getPlaceholderVideo() : getPlaceholderImage();
}

/**
 * 预加载图片
 * @param {string} imageUrl - 图片URL
 * @returns {Promise<boolean>} 加载成功返回true，失败返回false
 */
export function preloadImage(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (DEBUG) {
        console.log('✅ 图片预加载成功:', imageUrl);
      }
      resolve(true);
    };
    img.onerror = () => {
      if (DEBUG) {
        console.warn('⚠️ 图片预加载失败:', imageUrl);
      }
      resolve(false);
    };
    img.src = imageUrl;
  });
}

/**
 * 批量预加载图片
 * @param {string[]} imageFiles - 图片文件名数组
 * @returns {Promise<{success: number, failed: number}>} 加载结果统计
 */
export async function preloadImages(imageFiles) {
  if (DEBUG) {
    console.log(`🖼️ 开始批量预加载 ${imageFiles.length} 张图片...`);
  }

  const promises = imageFiles.map(file => {
    const url = getImageUrl(file);
    return preloadImage(url);
  });

  const results = await Promise.all(promises);
  const success = results.filter(r => r).length;
  const failed = results.filter(r => !r).length;

  if (DEBUG) {
    console.log(`✅ 图片预加载完成: 成功 ${success}, 失败 ${failed}`);
  }

  return { success, failed };
}

/**
 * 图片错误处理（带自动回退机制）
 * @param {Event} event - 图片加载错误事件
 * @param {string} originalFile - 原始文件名（用于回退）
 */
export function handleImageError(event, originalFile = null) {
  const failedUrl = event.target.src;
  const isLocalUrl = failedUrl.startsWith(window.location.origin) || failedUrl.startsWith('/');
  
  // 如果本地加载失败且有原始文件名，尝试从远程加载
  if (isLocalUrl && originalFile && !event.target.dataset.remoteAttempted) {
    if (DEBUG) {
      console.warn('⚠️ 本地图片加载失败:', failedUrl);
      console.log('🔄 尝试从远程加载...');
    }
    
    event.target.dataset.remoteAttempted = 'true';
    
    // 判断是图片还是视频
    if (isVideoFile(originalFile)) {
      event.target.src = getVideoUrl(originalFile, false); // 使用远程URL
    } else {
      event.target.src = getImageUrl(originalFile, false); // 使用远程URL
    }
    return;
  }
  
  // 远程也失败或没有原始文件名，使用占位符
  if (DEBUG) {
    console.warn('⚠️ 图片/视频加载失败（本地+远程）:', failedUrl);
    console.log('📦 使用占位符');
  }
  
  // 根据文件类型设置对应的占位符
  event.target.src = getPlaceholder(originalFile);
  event.target.classList.add('media-error');
}

/**
 * 为图片/视频元素添加懒加载支持（带自动回退）
 * @param {HTMLImageElement|HTMLVideoElement} mediaElement - 图片或视频元素
 * @param {string} mediaFile - 媒体文件名
 * @param {boolean} useLocal - 是否优先使用本地资源（默认true）
 */
export function setupLazyImage(mediaElement, mediaFile, useLocal = USE_LOCAL_FIRST) {
  const isVideo = isVideoFile(mediaFile);
  const mediaUrl = isVideo ? getVideoUrl(mediaFile, useLocal) : getImageUrl(mediaFile, useLocal);
  
  // 先设置占位符
  mediaElement.src = getPlaceholder(mediaFile);
  mediaElement.classList.add('lazy-media', 'loading');
  
  // 使用IntersectionObserver实现懒加载
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const media = entry.target;
          media.src = mediaUrl;
          media.onload = () => {
            media.classList.remove('loading');
            media.classList.add('loaded');
          };
          media.onerror = (event) => handleImageError(event, mediaFile);
          observer.unobserve(media);
        }
      });
    });
    observer.observe(mediaElement);
  } else {
    // 不支持IntersectionObserver时直接加载
    mediaElement.src = mediaUrl;
    mediaElement.onload = () => {
      mediaElement.classList.remove('loading');
      mediaElement.classList.add('loaded');
    };
    mediaElement.onerror = (event) => handleImageError(event, mediaFile);
  }
}

/**
 * 预加载视频
 * @param {string} videoUrl - 视频URL
 * @returns {Promise<boolean>} 加载成功返回true，失败返回false
 */
export function preloadVideo(videoUrl) {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.onloadeddata = () => {
      if (DEBUG) {
        console.log('✅ 视频预加载成功:', videoUrl);
      }
      resolve(true);
    };
    video.onerror = () => {
      if (DEBUG) {
        console.warn('⚠️ 视频预加载失败:', videoUrl);
      }
      resolve(false);
    };
    video.src = videoUrl;
  });
}

export default {
  getImageUrl,
  getVideoUrl,
  getPlaceholderImage,
  getPlaceholderVideo,
  getPlaceholder,
  preloadImage,
  preloadImages,
  preloadVideo,
  handleImageError,
  setupLazyImage,
  // 导出常量供外部使用
  LOCAL_IMAGE_BASE_URL,
  LOCAL_VIDEO_BASE_URL,
  REMOTE_IMAGE_BASE_URL,
  REMOTE_VIDEO_BASE_URL
};

