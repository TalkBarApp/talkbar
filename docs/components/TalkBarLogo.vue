<script setup lang="ts">
import blueLight from '~/assets/talkbar-logo-blue-light.svg'
import blueDark from '~/assets/talkbar-logo-blue-dark.svg'
import warmLight from '~/assets/talkbar-logo-warm-light.svg'
import warmDark from '~/assets/talkbar-logo-warm-dark.svg'

// The wordmark of www.talkbar.app; CSS shows the variant for the current
// color theme and light/dark mode (main.css), so it is right on first paint.
defineProps({
  alt: { type: String, default: 'TalkBar' },
})
</script>

<template>
  <span class="relative block">
    <img :src="blueLight" :alt="alt" class="theme-logo theme-logo-blue theme-logo-light">
    <img :src="blueDark" :alt="alt" class="theme-logo theme-logo-blue theme-logo-dark">
    <img :src="warmLight" :alt="alt" class="theme-logo theme-logo-warm theme-logo-light">
    <img :src="warmDark" :alt="alt" class="theme-logo theme-logo-warm theme-logo-dark">
  </span>
</template>
