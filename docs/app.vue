<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import type { ParsedContent } from '@nuxt/content';
import { computed, fetchContentNavigation, provide, queryContent, ref, useAsyncData, useDocsStrings, useFetch, useHead, useRoute, useSeoMeta, watch } from '#imports';

const { t, locale, siteName, description } = useDocsStrings();

const { data: navigationRaw } = await useAsyncData('navigation', () => fetchContentNavigation());
const navigation = computed(() => {
  if (navigationRaw.value) {
    return navigationRaw.value.filter(item => item._path !== '/');
  }
  return [];
});
provide('navigation', navigation);

// Load header links from YAML content
const { data: headerLinksData } = await useAsyncData('headerlinks', () =>
  queryContent('headerlink').findOne()
);

// Lazy load search index only when search is used
const files = ref<ParsedContent[]>([])
const searchIndexLoaded = ref(false)
const isLoadingIndex = ref(false)

const loadSearchIndex = async () => {
  if (searchIndexLoaded.value || isLoadingIndex.value) {
    return
  }
  isLoadingIndex.value = true
  const { data } = await useFetch<ParsedContent[]>('/search-index.json', { server: false })
  if (Array.isArray(data.value)) {
    files.value = data.value
    searchIndexLoaded.value = true
  }
  isLoadingIndex.value = false
}

// Create header links with active state based on current route
const route = useRoute();
const headerLinks = computed(() => {
  const body = headerLinksData.value?.body;
  if (Array.isArray(body)) {
    return body.map((link: { label: string; to: string }) => ({
      ...link,
      active: link.to === route.path
    }));
  }
  return [];
});

const getSearchConfig = () => ({
  resultLimit: 10,
  fuseOptions: {
    includeMatches: true,
    includeScore: true,
    threshold: 0.3,
    distance: 1000,
    minMatchCharLength: 2,
    ignoreLocation: true,
    findAllMatches: false,
    keys: [
      { name: 'title', weight: 10 },
      { name: 'tags', weight: 5 },
      { name: 'description', weight: 3 },
      { name: 'content', weight: 1 },
      { name: 'keywords', weight: 4 },
      { name: 'headings', weight: 3 },
      { name: 'category', weight: 2 },
      { name: '_path', weight: 2 },
      { name: 'codeBlocks', weight: 1 }
    ]
  }
})

const searchTerm = ref('');

watch(searchTerm, (val) => {
  if (val && !searchIndexLoaded.value) {
    loadSearchIndex()
  }
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#054df6' },
  ],
  htmlAttrs: {
    lang: locale,
  },
  script: [
    {
      // Apply the saved accent (blue by default, or warm) before first paint
      innerHTML: "try{if(localStorage.getItem('colorTheme')==='warm')document.documentElement.classList.add('color-theme-warm')}catch(e){}",
      tagPosition: 'head',
      tagPriority: 'critical',
    },
  ],
});

useSeoMeta({
  titleTemplate: `%s - ${siteName}`,
  ogSiteName: siteName,
  ogDescription: description,
  description,
  twitterDescription: description,
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#054df6" />

    <HeaderComponent :links="headerLinks" />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <ClientOnly>
        <LazyUContentSearch
          v-model:search-term="searchTerm"
          :color-mode="false"
          :files="files"
          :navigation="navigation"
          :fuse="getSearchConfig()"
          shortcut="meta_k"
          :placeholder="t('searchPlaceholder')"
          icon="i-heroicons-magnifying-glass"
          @focusin="loadSearchIndex"
        />
      </ClientOnly>
    </UMain>

    <FooterComponent />

    <UNotifications />
  </div>
</template>
