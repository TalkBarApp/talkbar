<script setup lang="ts">
import type { NavItem } from '@nuxt/content';
import { withoutTrailingSlash } from 'ufo';
import { 
  computed, 
  inject, 
  ref, 
  useRoute, 
  useAsyncData, 
  queryContent, 
  createError, 
  useSeoMeta,
  useCategory,
  mapContentNavigation,
  findPageBreadcrumb,
  useDocsStrings
} from '#imports';
import type { Ref } from 'vue';

const route = useRoute();
const category = useCategory();
const navigation = inject<Ref<NavItem[]>>('navigation', ref([]));

// Ensure category has a default value
const { t, siteName } = useDocsStrings();
const categoryValue = computed(() => category?.value || t('docsTitle'));
const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne());

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: t('pageNotFound'), fatal: true });
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryContent()
    .where({
      _partial: false,
      _extension: 'md',
      navigation: { $ne: false },
    })
    .only(['title', 'description', '_path'])
    .findSurround(withoutTrailingSlash(route.path))
);

useSeoMeta({
  title: page.value.title,
  ogTitle: `${page.value.title} - ${siteName}`,
  description: page.value.description,
  ogDescription: page.value.description,
  twitterDescription: page.value.description,
});

// OG Image functionality removed due to compatibility issues

const breadcrumb = computed(() => {
  if (!navigation?.value || !page.value || page.value.showBreadcrumb === false) {
    return [];
  }

  try {
    const crumbs = mapContentNavigation(findPageBreadcrumb(navigation.value, page.value)).map(({ label, to }) => ({
      label,
      to,
    }));
    // removes the link to the current page, unnecessary
    if (crumbs.length > 0) {
      delete crumbs[crumbs.length - 1].to;
    }

    return crumbs;
  } catch (error) {
    console.warn('Error computing breadcrumb:', error);
    return [];
  }
});

</script>

<template>
  <UPage v-if="page">
    <article>
      <span
        id="docsearch-lv0"
        hidden
        >{{ categoryValue }}</span
      >
      <UPageHeader
        :title="page.title"
        :description="page.description"
        :links="page.links"
      >
        <!-- <template #headline>
          <UBreadcrumb v-if="page.showBreadcrumb !== false" :links="breadcrumb" />
        </template> -->
      </UPageHeader>

      <UPageBody prose>
        <ContentRenderer
          v-if="page.body"
          :value="page"
        />

        <hr v-if="surround?.length">

        <UContentSurround :surround="surround" />
      </UPageBody>
    </article>
    <template
      v-if="page.toc !== false"
      #right
    >
      <LayoutToc :page />
    </template>
  </UPage>
  
  <BackToTop />
</template>
