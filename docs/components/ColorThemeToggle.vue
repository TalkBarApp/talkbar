<script setup lang="ts">
import { computed, onMounted, ref, useDocsStrings } from '#imports'

// Blue is the default accent and warm the alternative, as on www.talkbar.app.
// The class is set before first paint by the script in app.vue.
type ColorTheme = 'blue' | 'warm'

const { t } = useDocsStrings()
const colorTheme = ref<ColorTheme>('blue')

onMounted(() => {
  colorTheme.value = document.documentElement.classList.contains('color-theme-warm') ? 'warm' : 'blue'
})

const nextLabel = computed(() => (colorTheme.value === 'blue' ? t('switchToWarm') : t('switchToBlue')))

const toggle = () => {
  colorTheme.value = colorTheme.value === 'blue' ? 'warm' : 'blue'
  document.documentElement.classList.toggle('color-theme-warm', colorTheme.value === 'warm')
  try {
    localStorage.setItem('colorTheme', colorTheme.value)
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts for this page only.
  }
}
</script>

<template>
  <UTooltip :text="nextLabel">
    <button
      type="button"
      class="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      :aria-label="nextLabel"
      @click="toggle"
    >
      <span class="color-dot" aria-hidden="true">
        <span class="color-dot-warm" />
        <span class="color-dot-blue" />
      </span>
    </button>
  </UTooltip>
</template>
