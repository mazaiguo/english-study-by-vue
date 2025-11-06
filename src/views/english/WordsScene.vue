<template>
  <div class="scene-container" :style="{ backgroundColor: theme.colors.background }">
    <LearningCard
      :current-index="currentIndex"
      :total-items="words.length"
      :on-next="nextWord"
      :on-previous="previousWord"
      :on-tap="speakWord"
    >
      <template #content>
        <EnglishWordCard :word="currentWord" />
      </template>
    </LearningCard>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useTTS } from '@/composables/useTTS'
import LearningCard from '@/components/LearningCard.vue'
import EnglishWordCard from '@/components/EnglishWordCard.vue'
import wordsData from '@/data/english_words.json'

console.log('📖 英语单词场景加载')

const router = useRouter()
const themeStore = useThemeStore()
const { speakEnglish } = useTTS()

const theme = computed(() => themeStore.currentTheme)
const words = ref(wordsData.words || [])
const currentIndex = ref(0)

const currentWord = computed(() => words.value[currentIndex.value])

const nextWord = () => {
  console.log('➡️ 下一个单词')
  if (currentIndex.value < words.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const previousWord = () => {
  console.log('⬅️ 上一个单词')
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = words.value.length - 1
  }
}

const speakWord = () => {
  console.log('🗣️ 朗读单词:', currentWord.value?.word)
  if (currentWord.value) {
    speakEnglish(currentWord.value.word)
  }
}

onMounted(() => {
  console.log('✅ 英语单词场景已挂载，共', words.value.length, '个单词')
})
</script>

<style scoped>
.scene-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: background-color 0.3s ease;
}
</style>

