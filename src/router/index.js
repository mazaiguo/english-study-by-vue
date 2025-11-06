import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'MainMenu',
      component: () => import('@/views/MainMenu.vue'),
      meta: { title: '语言学习乐园' }
    },
    // 英语学习模块
    {
      path: '/english/words',
      name: 'EnglishWords',
      component: () => import('@/views/english/WordsScene.vue'),
      meta: { title: '英语单词学习' }
    },
    {
      path: '/english/sentences',
      name: 'EnglishSentences',
      component: () => import('@/views/english/SentencesScene.vue'),
      meta: { title: '英语句子学习' }
    },
    // 英语音标模块
    {
      path: '/phonetic/vowels',
      name: 'PhoneticVowels',
      component: () => import('@/views/phonetic/VowelsScene.vue'),
      meta: { title: '元音练习' }
    },
    {
      path: '/phonetic/consonants',
      name: 'PhoneticConsonants',
      component: () => import('@/views/phonetic/ConsonantsScene.vue'),
      meta: { title: '辅音练习' }
    },
    {
      path: '/phonetic/diphthongs',
      name: 'PhoneticDiphthongs',
      component: () => import('@/views/phonetic/DiphthongsScene.vue'),
      meta: { title: '双元音练习' }
    },
    // 普通话学习模块
    {
      path: '/mandarin/words',
      name: 'MandarinWords',
      component: () => import('@/views/mandarin/WordsScene.vue'),
      meta: { title: '普通话单词学习' }
    },
    {
      path: '/mandarin/sentences',
      name: 'MandarinSentences',
      component: () => import('@/views/mandarin/SentencesScene.vue'),
      meta: { title: '普通话句子学习' }
    },
    // 拼音练习模块
    {
      path: '/pinyin/initials',
      name: 'PinyinInitials',
      component: () => import('@/views/pinyin/InitialsScene.vue'),
      meta: { title: '声母练习' }
    },
    {
      path: '/pinyin/finals',
      name: 'PinyinFinals',
      component: () => import('@/views/pinyin/FinalsScene.vue'),
      meta: { title: '韵母练习' }
    },
    {
      path: '/pinyin/tones',
      name: 'PinyinTones',
      component: () => import('@/views/pinyin/TonesScene.vue'),
      meta: { title: '声调练习' }
    }
  ]
})

// 路由守卫：设置页面标题和调试
router.beforeEach((to, from, next) => {
  console.log('🚦 路由守卫 - beforeEach:', {
    from: from.path,
    to: to.path,
    name: to.name
  })
  
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach((to, from) => {
  console.log('✅ 路由守卫 - afterEach:', {
    from: from.path,
    to: to.path,
    name: to.name
  })
})

router.onError((error) => {
  console.error('❌ 路由错误:', error)
  console.error('错误详情:', {
    message: error.message,
    stack: error.stack
  })
})

export default router

