<script setup lang="ts">
import {
  computed,
  inject,
  ref,
  useAsyncData,
  queryContent,
  mapContentNavigation,
  useRoute,
  isMcpPath,
  useDocsStrings,
} from '#imports';
import type { NavItem } from '@nuxt/content';
import type { Ref } from 'vue';

const route = useRoute();
const { t } = useDocsStrings();

// The MCP & CLI area has its own sidebar; everything else uses the main one.
const navigationFileQueryPath = computed(() =>
  isMcpPath(route.path) ? '/mcp/navigation-mcp' : '/navigation-talkbar'
);

const { data: customNavigation, pending: navPending } = useAsyncData(
  () => `custom-navigation-${navigationFileQueryPath.value}`,
  async () => {
    const nav = await queryContent(navigationFileQueryPath.value).findOne();
    if (nav && Array.isArray(nav.body)) {
      return nav;
    }
    return nav ? { ...nav, body: [] } : null;
  },
  {
    watch: [navigationFileQueryPath],
  }
);

const navTree = computed<NavItem[]>(() => {
  if (Array.isArray(customNavigation.value?.body) && customNavigation.value.body.length > 0) {
    return customNavigation.value.body as NavItem[];
  }

  // Fallback to the navigation generated from the content folder
  const fallbackNavigation = inject<Ref<NavItem[]>>('navigation', ref([]));
  return fallbackNavigation.value || [];
});
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <UNavigationTree
            v-if="!navPending && navTree.length > 0"
            :links="mapContentNavigation(navTree)"
            default-open
            :multiple="false"
            class="navigation-tree"
          />
          <div v-else-if="navPending" class="p-4">{{ t('loadingNavigation') }}</div>
          <div v-else class="p-4">{{ t('noNavigation') }}</div>
        </UAside>
      </template>
      <slot />
    </UPage>
  </UContainer>
</template>
