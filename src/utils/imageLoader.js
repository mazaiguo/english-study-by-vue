/**
 * 图片加载工具
 * 支持从远程URL或本地路径加载图片
 */

const DEBUG = true;

// 远程图片基础URL（与dataLoader.js保持一致）
const REMOTE_IMAGE_BASE_URL = 'https://mazaiguo.github.io/blogimg/images/';

// 本地图片路径
const LOCAL_IMAGE_BASE_PATH = '/images/';

/**
 * 获取图片URL
 * @param {string} imageFile - 图片文件名（如 "mandarin_word_1.jpg"）
 * @param {boolean} preferRemote - 是否优先使用远程图片（默认true）
 * @returns {string} 图片URL
 */
export function getImageUrl(imageFile, preferRemote = true) {
  if (!imageFile) {
    if (DEBUG) {
      console.warn('⚠️ getImageUrl: 没有提供imageFile');
    }
    return getPlaceholderImage();
  }

  if (preferRemote) {
    const remoteUrl = `${REMOTE_IMAGE_BASE_URL}${imageFile}`;
    if (DEBUG) {
      console.log('🖼️ 加载远程图片:', remoteUrl);
    }
    return remoteUrl;
  } else {
    const localUrl = `${LOCAL_IMAGE_BASE_PATH}${imageFile}`;
    if (DEBUG) {
      console.log('🖼️ 加载本地图片:', localUrl);
    }
    return localUrl;
  }
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
 * @param {boolean} preferRemote - 是否优先使用远程图片
 * @returns {Promise<{success: number, failed: number}>} 加载结果统计
 */
export async function preloadImages(imageFiles, preferRemote = true) {
  if (DEBUG) {
    console.log(`🖼️ 开始批量预加载 ${imageFiles.length} 张图片...`);
  }

  const promises = imageFiles.map(file => {
    const url = getImageUrl(file, preferRemote);
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
 * 图片错误处理
 * @param {Event} event - 图片加载错误事件
 */
export function handleImageError(event) {
  if (DEBUG) {
    console.warn('⚠️ 图片加载失败，使用占位符');
  }
  // 设置占位符图片
  event.target.src = getPlaceholderImage();
  // 添加错误样式类
  event.target.classList.add('image-error');
}

/**
 * 为图片元素添加懒加载支持
 * @param {HTMLImageElement} imgElement - 图片元素
 * @param {string} imageFile - 图片文件名
 * @param {boolean} preferRemote - 是否优先使用远程图片
 */
export function setupLazyImage(imgElement, imageFile, preferRemote = true) {
  const imageUrl = getImageUrl(imageFile, preferRemote);
  
  // 先设置占位符
  imgElement.src = getPlaceholderImage();
  imgElement.classList.add('lazy-image', 'loading');
  
  // 使用IntersectionObserver实现懒加载
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = imageUrl;
          img.onload = () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
          };
          img.onerror = handleImageError;
          observer.unobserve(img);
        }
      });
    });
    observer.observe(imgElement);
  } else {
    // 不支持IntersectionObserver时直接加载
    imgElement.src = imageUrl;
    imgElement.onload = () => {
      imgElement.classList.remove('loading');
      imgElement.classList.add('loaded');
    };
    imgElement.onerror = handleImageError;
  }
}

export default {
  getImageUrl,
  getPlaceholderImage,
  preloadImage,
  preloadImages,
  handleImageError,
  setupLazyImage
};

