<template>
  <div class="scene-container" :style="{ backgroundColor: theme.colors.background }">
    <LearningCard
      :current-index="currentIndex"
      :total-items="vowels.length"
      :on-next="nextItem"
      :on-previous="previousItem"
      :on-tap="speakItem"
    >
      <template #content>
        <PhoneticCard :phonetic="currentVowel" />
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
import PhoneticCard from '@/components/PhoneticCard.vue'
import vowelsData from '@/data/phonetic_vowels.json'

console.log('📖 元音练习场景加载')

const router = useRouter()
const themeStore = useThemeStore()
const { speakEnglish } = useTTS()

const theme = computed(() => themeStore.currentTheme)
const vowels = ref(vowelsData.vowels || [])
const currentIndex = ref(0)

const currentVowel = computed(() => vowels.value[currentIndex.value])

const nextItem = () => {
  console.log('➡️ 下一个元音')
  if (currentIndex.value < vowels.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const previousItem = () => {
  console.log('⬅️ 上一个元音')
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = vowels.value.length - 1
  }
}

const speakItem = () => {
  console.log('🗣️ 朗读元音例词:', currentVowel.value?.exampleWord)
  if (currentVowel.value) {
    speakEnglish(currentVowel.value.exampleWord)
  }
}

onMounted(() => {
  console.log('✅ 元音练习场景已挂载，共', vowels.value.length, '个元音')
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

