<script setup lang="ts">
import { useDocsStrings } from '#imports';

const { t, repoUrl, websiteUrl, licenseUrl } = useDocsStrings();

// Plain text links in the middle of the footer
const footerLinks = [
  { label: t('footerWebsite'), to: websiteUrl, target: '_blank' },
  { label: t('footerContact'), to: `${licenseUrl}/contact`, target: '_blank' },
];

const links = [
  {
    icon: 'i-simple-icons-github',
    to: repoUrl,
    target: '_blank',
    'aria-label': 'TalkBar on GitHub',
  },
];
</script>

<template>
  <UFooter :links="footerLinks">
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
