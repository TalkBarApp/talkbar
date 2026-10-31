<script setup lang="ts">
import { useAboutLinks, useDocsStrings } from '#imports';

const { t, repoUrl, websiteUrl } = useDocsStrings();
const { aboutLinkHref } = useAboutLinks();

const year = new Date().getFullYear();

// Website and license portal pages, as in the About menu
const footerLinks = [
  { label: t('footerProduct'), href: aboutLinkHref({ to: '/#features' }) },
  { label: t('footerPrivacy'), href: aboutLinkHref({ to: '/privacy/' }) },
  { label: t('footerPricing'), href: aboutLinkHref({ to: '/pricing', site: 'license' }) },
  { label: t('footerContact'), href: aboutLinkHref({ to: '/contact', site: 'license' }) },
];
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
      <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
        <nav class="flex flex-wrap items-center justify-center" :aria-label="t('footerNavigation')">
          <template v-for="(link, index) in footerLinks" :key="link.href">
            <span v-if="index > 0" class="mx-2.5 text-gray-300 dark:text-gray-700" aria-hidden="true">|</span>
            <a
              :href="link.href"
              target="_blank"
              rel="noopener"
              class="text-[15px] leading-6 text-gray-600 dark:text-gray-300 hover:text-primary"
            >{{ link.label }}</a>
          </template>
        </nav>
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
