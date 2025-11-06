<template>
  <div class="scene-container" :style="{ backgroundColor: theme.colors.background }">
    <LearningCard
      :current-index="currentIndex"
      :total-items="sentences.length"
      :on-next="nextSentence"
      :on-previous="previousSentence"
      :on-tap="speakSentence"
    >
      <template #content>
        <MandarinSentenceCard :sentence="currentSentence" />
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
import MandarinSentenceCard from '@/components/MandarinSentenceCard.vue'
import sentencesData from '@/data/mandarin_sentences.json'

console.log('📖 普通话句子场景加载')

const router = useRouter()
const themeStore = useThemeStore()
const { speakMandarin } = useTTS()

const theme = computed(() => themeStore.currentTheme)
const sentences = ref(sentencesData.sentences || [])
const currentIndex = ref(0)

const currentSentence = computed(() => sentences.value[currentIndex.value])

const nextSentence = () => {
  console.log('➡️ 下一个句子')
  if (currentIndex.value < sentences.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const previousSentence = () => {
  console.log('⬅️ 上一个句子')
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = sentences.value.length - 1
  }
}

const speakSentence = () => {
  console.log('🗣️ 朗读句子:', currentSentence.value?.hanzi)
  if (currentSentence.value) {
    speakMandarin(currentSentence.value.hanzi)
  }
}

onMounted(() => {
  console.log('✅ 普通话句子场景已挂载，共', sentences.value.length, '个句子')
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

