<script setup lang="ts">
import { useDocsStrings } from '#imports';

const { t, repoUrl, websiteUrl, licenseUrl } = useDocsStrings();

const year = new Date().getFullYear();
</script>

<template>
  <UFooter>
    <!-- Copyright and tagline; the TalkBar name links to the website -->
    <template #left>
      <p class="text-center lg:text-left">
        © {{ year }}
        <a :href="websiteUrl" target="_blank" rel="noopener" class="font-medium text-gray-700 dark:text-gray-200 hover:text-primary">TalkBar</a>.
        <span class="block sm:inline">{{ t('footerTagline') }}</span>
      </p>
    </template>

    <template #center>
      <span />
    </template>

    <template #right>
      <div class="flex items-center gap-x-3">
        <a
          :href="`${licenseUrl}/contact`"
          target="_blank"
          rel="noopener"
          class="text-[14px] leading-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >{{ t('footerContact') }}</a>
        <UButton
          :to="repoUrl"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="TalkBar on GitHub"
          color="gray"
          variant="ghost"
        />
      </div>
    </template>
  </UFooter>
</template>
