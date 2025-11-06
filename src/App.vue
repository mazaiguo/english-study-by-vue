<template>
  <div id="app" :style="{ backgroundColor: themeStore.currentTheme.colors.background }">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useSettingsStore } from '@/stores/settings'

const themeStore = useThemeStore()
const settingsStore = useSettingsStore()

onMounted(() => {
  // 初始化主题
  themeStore.initializeThemes()
  // 初始化设置
  settingsStore.initSettings()
})
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vh; /* 固定高度，防止滚动条 */
  overflow: hidden; /* 禁用滚动 */
  transition: background-color 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

