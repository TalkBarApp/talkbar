<script setup lang="ts">
import { definePageMeta, queryContent, useAsyncData, useSeoMeta, useDocsSeo } from '#imports';

definePageMeta({
  layout: 'home',
});

const { data: page } = await useAsyncData('mcp-index', () => queryContent('mcp').findOne());

useDocsSeo(page);

useSeoMeta({
  titleTemplate: '',
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
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
      <template #headline>
        <UBadge
          v-if="page.hero.headline"
          variant="subtle"
          size="lg"
          class="relative rounded-full font-semibold"
        >
          <NuxtLink
            :to="page.hero.headline.to"
            :aria-label="page.hero.headline.label"
            class="focus:outline-none"
            tabindex="-1"
          >
            <span
              class="absolute inset-0"
              aria-hidden="true"
            />
          </NuxtLink>

          {{ page.hero.headline.label }}

          <UIcon
            v-if="page.hero.headline.icon"
            :name="page.hero.headline.icon"
            class="pointer-events-none ml-1 h-4 w-4"
          />
        </UBadge>
      </template>

      <template #title>
        <MDC :value="page.hero.title" />
      </template>

      <template #description>
        <h2 v-if="page.hero.introductionTitle" class="text-2xl sm:text-xl mt-4 !text-gray-500">{{ page.hero.introductionTitle }}</h2>
      </template>
    </ULandingHero>

    <ULandingSection
      v-if="page.features"
      :title="page.features.title"
      :description="page.hero.introductionSubtitle"
      :links="page.features.links"
      class="py-16 sm:py-12"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) of page.features.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection
      v-if="page.machineReference"
      :title="page.machineReference.title"
      :description="page.machineReference.description"
      class="py-16 sm:py-12"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) of page.machineReference.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection
      v-if="page.community"
      :title="page.community.title"
      :links="page.community.links"
      class="py-16 pb-32 sm:py-12 sm:pb-24"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) of page.community.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>
  </div>
</template>
