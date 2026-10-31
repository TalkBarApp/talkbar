<script setup lang="ts">
import { computed, useDocsStrings } from '#imports';
import type { ParsedContent } from '@nuxt/content';

const props = defineProps<{
  page: ParsedContent;
}>();

const { t, locale, repoUrl, siteUrl } = useDocsStrings();

const externalLinks = computed(() => [
  {
    icon: 'i-heroicons-pencil-square',
    label: t('editPage'),
    to: `${repoUrl}/edit/main/docs/content/${locale}/${props.page?._file}`,
    target: '_blank',
  },
  {
    icon: 'i-heroicons-chat-bubble-oval-left-ellipsis',
    label: t('reportIssue'),
    to: `${repoUrl}/issues/new?labels=documentation&title=${encodeURIComponent(`[Docs] ${props.page?.title || ''}`)}&body=${encodeURIComponent(`Page: ${siteUrl}${props.page?._path}\n\n`)}`,
    target: '_blank',
  },
]);
</script>

<template>
  <UContentToc
    :title="t('onThisPage')"
    :links="page.body?.toc?.links"
    highlight
    highlight-color="neutral"
    color="neutral"
  >
    <template #bottom>
      <div
        class="hidden space-y-6 lg:block"
        :class="{ '!mt-6': page.body?.toc?.links?.length }"
      >
        <UDivider
          v-if="page.body?.toc?.links?.length"
          type="dashed"
        />

        <UPageLinks
          :title="t('helpToImprove')"
          :links="externalLinks"
        />
      </div>
    </template>
  </UContentToc>
</template>
