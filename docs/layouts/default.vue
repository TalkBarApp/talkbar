<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
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
const fallbackNavigation = inject<Ref<NavItem[]>>('navigation', ref([]));

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
  return fallbackNavigation.value || [];
});

// The sidebar can be folded to a slim rail to give the page more room; the
// choice is remembered on this device.
const SIDEBAR_KEY = 'docsSidebarCollapsed';
const collapsed = ref(false);

onMounted(() => {
  try {
    collapsed.value = localStorage.getItem(SIDEBAR_KEY) === 'true';
  } catch {
    // Storage can be unavailable (private mode); the sidebar stays open.
  }
});

const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
  try {
    localStorage.setItem(SIDEBAR_KEY, String(collapsed.value));
  } catch {
    // The choice then lasts for this page only.
  }
};

// Fixed-width sidebar column (narrower than the page grid's quarter), or a rail
const pageUi = computed(() => ({
  wrapper: `flex flex-col lg:grid lg:gap-10 transition-[grid-template-columns] duration-300 ${
    collapsed.value ? 'lg:grid-cols-[2.5rem_minmax(0,1fr)]' : 'lg:grid-cols-[15.5rem_minmax(0,1fr)]'
  }`,
  left: 'lg:col-span-1 min-w-0',
  center: { base: 'lg:col-span-1 min-w-0' },
}));
</script>

<template>
  <UContainer>
    <UPage :ui="pageUi">
      <template #left>
        <UAside>
          <div :class="['hidden lg:flex items-center mb-3', collapsed ? 'justify-center' : 'justify-between -mr-2']">
            <span v-if="!collapsed" class="font-display font-light text-[15px] leading-6 text-gray-400 dark:text-gray-500">{{ t('sidebarTitle') }}</span>
            <UTooltip :text="collapsed ? t('expandSidebar') : t('collapseSidebar')">
              <UButton
                :icon="collapsed ? 'i-heroicons-chevron-double-right-20-solid' : 'i-heroicons-chevron-double-left-20-solid'"
                :aria-label="collapsed ? t('expandSidebar') : t('collapseSidebar')"
                :aria-expanded="!collapsed"
                color="gray"
                variant="ghost"
                size="xs"
                @click="toggleSidebar"
              />
            </UTooltip>
          </div>
          <div v-show="!collapsed">
            <UNavigationTree
              v-if="!navPending && navTree.length > 0"
              :links="mapContentNavigation(navTree)"
              default-open
              :multiple="false"
              class="navigation-tree"
            />
            <div v-else-if="navPending" class="p-4">{{ t('loadingNavigation') }}</div>
            <div v-else class="p-4">{{ t('noNavigation') }}</div>
          </div>
        </UAside>
      </template>
      <slot />
    </UPage>
  </UContainer>
</template>
