<template>
  <div class="scene-container" :style="{ backgroundColor: theme.colors.background }">
    <LearningCard
      :current-index="currentIndex"
      :total-items="consonants.length"
      :on-next="nextItem"
      :on-previous="previousItem"
      :on-tap="speakItem"
    >
      <template #content>
        <PhoneticCard :phonetic="currentConsonant" />
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
import consonantsData from '@/data/phonetic_consonants.json'

console.log('📖 辅音练习场景加载')

const router = useRouter()
const themeStore = useThemeStore()
const { speakEnglish } = useTTS()

const theme = computed(() => themeStore.currentTheme)
const consonants = ref(consonantsData.consonants || [])
const currentIndex = ref(0)

const currentConsonant = computed(() => consonants.value[currentIndex.value])

const nextItem = () => {
  console.log('➡️ 下一个辅音')
  if (currentIndex.value < consonants.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const previousItem = () => {
  console.log('⬅️ 上一个辅音')
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = consonants.value.length - 1
  }
}

const speakItem = () => {
  console.log('🗣️ 朗读辅音例词:', currentConsonant.value?.exampleWord)
  if (currentConsonant.value) {
    speakEnglish(currentConsonant.value.exampleWord)
  }
}

onMounted(() => {
  console.log('✅ 辅音练习场景已挂载，共', consonants.value.length, '个辅音')
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

