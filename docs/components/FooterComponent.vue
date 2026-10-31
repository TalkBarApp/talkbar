<script setup lang="ts">
import { useDocsStrings } from '#imports';

const { t, repoUrl, websiteUrl } = useDocsStrings();

const links = [
  {
    icon: 'i-heroicons-globe-alt',
    to: websiteUrl,
    target: '_blank',
    'aria-label': 'TalkBar website',
  },
  {
    icon: 'i-simple-icons-github',
    to: repoUrl,
    target: '_blank',
    'aria-label': 'TalkBar on GitHub',
  },
];
</script>

<template>
  <UFooter>
    <template #left>
      <span><a :href="websiteUrl" target="_blank" rel="noopener"><b>TalkBar</b></a> {{ t('footerTagline') }} © {{ new Date().getFullYear() }} TalkBar.</span>
    </template>

    <template #right>
      <UButton
        v-for="(link, index) of links"
        :key="index"
        v-bind="{ color: 'gray', variant: 'ghost', ...link }"
      />
    </template>
  </UFooter>
</template>
