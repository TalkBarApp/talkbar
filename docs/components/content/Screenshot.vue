<script setup lang="ts">
import { computed, useDocsStrings, useRuntimeConfig } from '#imports'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  caption: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
})

const { t, locale } = useDocsStrings()
const available = (useRuntimeConfig().public.docsScreenshots || []) as string[]

// A localized copy (screenshots/ru/...) wins over the English one.
const resolvedSrc = computed(() => {
  const localized = props.src.replace(/^\/screenshots\//, `/screenshots/${locale}/`)
  if (locale !== 'en' && available.includes(localized)) return localized
  return available.includes(props.src) ? props.src : null
})
</script>

<template>
  <figure class="screenshot not-prose my-6">
    <a v-if="resolvedSrc" :href="resolvedSrc" target="_blank" rel="noopener" class="block">
      <img
        :src="resolvedSrc"
        :alt="alt"
        :width="width"
        loading="lazy"
        class="rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm w-full h-auto"
      >
    </a>
    <div
      v-else
      class="rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 px-6 py-10 text-center"
      role="img"
      :aria-label="alt"
    >
      <UIcon name="i-heroicons-photo" class="h-10 w-10 text-primary-500 dark:text-primary-400 mx-auto" />
      <p class="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-200">{{ t('screenshotPending') }}</p>
      <p v-if="alt" class="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{{ alt }}</p>
      <code class="mt-3 inline-block text-xs text-gray-400 dark:text-gray-500">{{ src }}</code>
    </div>
    <figcaption v-if="caption" class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">{{ caption }}</figcaption>
  </figure>
</template>
