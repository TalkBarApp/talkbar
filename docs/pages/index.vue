<script setup lang="ts">
import { computed, definePageMeta, queryContent, useAsyncData, useDocsStrings, useSeoMeta, useDocsSeo, useShortcuts, useUIState } from '#imports';

definePageMeta({
  layout: 'home',
});

const { siteName, description } = useDocsStrings();
const { toggleContentSearch } = useUIState();
const { metaSymbol } = useShortcuts();

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne());

useDocsSeo(page);

// The title with its accent word marked; the word's position differs by language.
const titleParts = computed(() => {
  const title: string = page.value?.hero?.title || '';
  const accent: string = page.value?.hero?.titleAccent || '';
  const at = accent ? title.indexOf(accent) : -1;
  return at < 0
    ? { before: title, accent: '', after: '' }
    : { before: title.slice(0, at), accent, after: title.slice(at + accent.length) };
});

useSeoMeta({
  titleTemplate: '',
  title: page.value?.title || siteName,
  ogTitle: page.value?.title || siteName,
  description: page.value?.description || description,
  ogDescription: page.value?.description || description,
});
</script>

<template>
  <div v-if="page">
    <UContainer>
      <header class="home-hero">
        <h1 class="home-title">{{ titleParts.before }}<span v-if="titleParts.accent" class="home-title-accent">{{ titleParts.accent }}</span>{{ titleParts.after }}</h1>
        <p class="home-lead">{{ page.hero.description }}</p>
        <div class="home-actions">
          <button type="button" class="home-search" @click="toggleContentSearch">
            <UIcon name="i-heroicons-magnifying-glass" class="h-5 w-5 flex-shrink-0" />
            <span class="truncate">{{ page.hero.search }}</span>
            <span class="ml-auto hidden flex-shrink-0 items-center gap-0.5 sm:flex">
              <UKbd>{{ metaSymbol }}</UKbd>
              <UKbd>K</UKbd>
            </span>
          </button>
          <NuxtLink :to="page.hero.cta.to" class="home-cta">{{ page.hero.cta.label }}</NuxtLink>
        </div>
      </header>

      <!-- The docs follow a conversation: what to do before, during and after it -->
      <section class="home-stages">
        <HomeWaveform />
        <div class="home-stage-grid">
          <div v-for="stage in page.stages" :key="stage.title">
            <h2 class="home-stage-title">{{ stage.title }}</h2>
            <p class="home-stage-text">{{ stage.description }}</p>
            <ul class="home-stage-links">
              <li v-for="link in stage.links" :key="link.to">
                <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </UContainer>

    <section class="home-reference">
      <UContainer>
        <h2 class="home-section-title">{{ page.reference.title }}</h2>
        <div class="home-tile-grid">
          <DocsTile
            v-for="item in page.reference.items"
            :key="item.to"
            v-bind="item"
          />
        </div>
      </UContainer>
    </section>
  </div>
</template>
