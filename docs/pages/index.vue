<script setup lang="ts">
import { definePageMeta, queryContent, useAsyncData, useDocsStrings, useSeoMeta, useDocsSeo } from '#imports';

definePageMeta({
  layout: 'home',
});

const { siteName, description } = useDocsStrings();

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne());

useDocsSeo(page);

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
    <!-- Logo -->
    <TalkBarLogo alt="TalkBar" class="mt-14 mx-auto h-12 w-[232px]" />
    <ULandingHero
      v-if="page.hero"
      class="py-8 sm:py-8 md:py-8 relative !pt-0"
      :ui="{ title: 'font-display font-light sm:text-6xl text-4xl', description: 'text-lg sm:text-xl' }"
      v-bind="page.hero"
    >
      <template #title>
        <MDC :value="page.hero.title" class="mt-6" />
      </template>

      <template #description>
        <h2 v-if="page.hero.introductionSubtitle" class="text-2xl sm:text-xl mt-4 !text-gray-500">{{ page.hero.introductionSubtitle }}</h2>
      </template>
    </ULandingHero>

    <!-- Split section: app docs and MCP docs -->
    <ULandingSection
      v-if="page.platforms"
      :title="page.platforms.title"
      class="py-16 sm:py-12"
    >
      <div class="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div
          v-for="(platform, index) of page.platforms.items"
          :key="index"
          class="relative group"
        >
          <div :class="`bg-white dark:bg-gray-900 rounded-[18px] shadow-[0_1px_2px_rgb(30_40_60/0.03),0_10px_28px_-18px_rgb(30_45_80/0.1)] border border-gray-200 dark:border-gray-700 p-8 ${platform.id === 'app' ? 'hover:border-primary-500 dark:hover:border-primary-400' : 'hover:border-gray-400 dark:hover:border-gray-500'} transition-all duration-300 h-full flex flex-col`">
            <div :class="`flex items-center gap-1 mb-6 ${platform.id === 'app' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}`">
              <div class="p-3 rounded-lg">
                <UIcon :name="platform.icon" class="h-10 w-10" />
              </div>
              <div>
                <h3 class="font-display text-2xl font-medium text-gray-900 dark:text-white">{{ platform.title }}</h3>
              </div>
            </div>

            <p class="text-gray-600 dark:text-gray-300 mb-6 text-lg">{{ platform.description }}</p>

            <ul class="space-y-3 mb-8 flex-1">
              <li
                v-for="feature in platform.features"
                :key="feature"
                class="flex items-center gap-3 text-gray-700 dark:text-gray-300"
              >
                <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>{{ feature }}</span>
              </li>
            </ul>

            <NuxtLink
              :to="platform.to"
              :class="`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all border duration-300 w-full ${platform.id === 'app' ? 'border-primary-500 text-primary-700 dark:text-primary-400 hover:bg-primary-500' : 'border-gray-400 text-gray-800 dark:border-gray-500 dark:text-gray-200 hover:bg-gray-800 dark:hover:bg-gray-700'} hover:text-white dark:hover:text-white`"
            >
              <span>{{ platform.cta || platform.title }}</span>
              <UIcon name="i-heroicons-arrow-right-20-solid" class="ml-2 h-5 w-5" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </ULandingSection>

    <!-- Quick Start Section -->
    <ULandingSection
      v-if="page.quickstart"
      :title="page.quickstart.title"
      class="py-16 sm:py-12 bg-[rgb(245_244_239)] dark:bg-gray-950/60"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) of page.quickstart.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <!-- Resources Section -->
    <ULandingSection
      v-if="page.resources"
      :title="page.resources.title"
      class="py-16 pb-32 sm:py-12 sm:pb-24"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) of page.resources.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>
  </div>
</template>
