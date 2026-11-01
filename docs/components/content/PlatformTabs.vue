<script setup lang="ts">
import { onMounted, onUnmounted, useId } from 'vue'
import { useState } from '#imports'

type Platform = 'windows' | 'macos'
const platform = useState<Platform>('docs-platform', () => 'windows')
const initialized = useState<boolean>('docs-platform-initialized', () => false)
const id = useId()
const key = 'talkbar-docs-platform'

function storedPlatform(): Platform | null {
  try {
    const value = localStorage.getItem(key)
    return value === 'windows' || value === 'macos' ? value : null
  } catch { return null }
}

function select(value: Platform) {
  platform.value = value
  try { localStorage.setItem(key, value) } catch { /* Storage can be disabled. */ }
}

function syncStorage(event: StorageEvent) {
  if (event.key === key) platform.value = storedPlatform() || 'windows'
}

function move(event: KeyboardEvent) {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
  event.preventDefault()
  const next = platform.value === 'windows' ? 'macos' : 'windows'
  select(next)
  document.getElementById(`${id}-${next}-tab`)?.focus()
}

onMounted(() => {
  if (!initialized.value) {
    const saved = storedPlatform()
    const nav = navigator as Navigator & { userAgentData?: { platform?: string } }
    const detected = nav.userAgentData?.platform || navigator.platform || navigator.userAgent
    platform.value = saved || (/mac/i.test(detected) ? 'macos' : 'windows')
    initialized.value = true
  }
  window.addEventListener('storage', syncStorage)
})
onUnmounted(() => window.removeEventListener('storage', syncStorage))
</script>

<template>
  <div class="platform-tabs my-6">
    <div role="tablist" aria-label="Platform" class="flex gap-1 border-b border-gray-200 dark:border-gray-700" @keydown="move">
      <button v-for="item in (['windows', 'macos'] as const)" :id="`${id}-${item}-tab`" :key="item"
        type="button" role="tab" :aria-selected="platform === item" :aria-controls="`${id}-${item}-panel`"
        :tabindex="platform === item ? 0 : -1"
        class="px-4 py-2 text-sm font-semibold border-b-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500"
        :class="platform === item ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-200'"
        @click="select(item)">{{ item === 'windows' ? 'Windows' : 'macOS' }}</button>
    </div>
    <div v-show="platform === 'windows'" :id="`${id}-windows-panel`" role="tabpanel" :aria-labelledby="`${id}-windows-tab`" class="pt-2"><slot name="windows" /></div>
    <div v-show="platform === 'macos'" :id="`${id}-macos-panel`" role="tabpanel" :aria-labelledby="`${id}-macos-tab`" class="pt-2"><slot name="macos" /></div>
  </div>
</template>
