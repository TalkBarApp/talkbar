<script setup lang="ts">
import type { PropType } from 'vue'

export interface AboutMenuLink {
  label: string
  to: string
  description?: string
  icon?: string
}

export interface AboutMenuData {
  label: string
  site: string
  main: AboutMenuLink[]
  groups: { label: string; items: AboutMenuLink[] }[]
}

// The website menu in the docs header: three main pages, then use cases and
// industries in two columns, as on www.talkbar.app.
const props = defineProps({
  menu: { type: Object as PropType<AboutMenuData>, required: true },
})

const href = (to: string) => `${props.menu.site}${to}`
</script>

<template>
  <UPopover mode="hover" :popper="{ placement: 'bottom', offsetDistance: 12 }" :ui="{ width: 'max-w-none', rounded: 'rounded-2xl' }">
    <button type="button" class="text-[15px] leading-6 font-medium flex items-center gap-1 hover:text-primary">
      {{ menu.label }}
      <UIcon name="i-heroicons-chevron-down-20-solid" class="w-5 h-5" />
    </button>

    <template #panel>
      <div class="w-[780px] p-3 grid grid-cols-[1.4fr_1fr_1fr] gap-2">
        <div class="space-y-1 pr-2 border-r border-gray-200 dark:border-gray-800">
          <a
            v-for="link in menu.main"
            :key="link.to"
            :href="href(link.to)"
            target="_blank"
            rel="noopener"
            class="group flex gap-3 items-start px-3 py-2.5 rounded-lg hover:bg-gray-100/70 dark:hover:bg-gray-800/60 transition-colors"
          >
            <span class="flex size-9 flex-shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary-50 text-primary dark:bg-primary-950/60">
              <UIcon :name="link.icon || 'i-heroicons-arrow-up-right'" class="w-[18px] h-[18px]" />
            </span>
            <span class="min-w-0">
              <span class="block text-[15px] leading-5 font-medium text-gray-900 dark:text-white">{{ link.label }}</span>
              <span v-if="link.description" class="block mt-0.5 text-[13px] leading-snug text-gray-500 dark:text-gray-400">{{ link.description }}</span>
            </span>
          </a>
        </div>

        <div v-for="group in menu.groups" :key="group.label" class="px-2 py-1.5">
          <p class="label px-2 pb-2 text-gray-500 dark:text-gray-400">{{ group.label }}</p>
          <a
            v-for="item in group.items"
            :key="item.to"
            :href="href(item.to)"
            target="_blank"
            rel="noopener"
            class="block px-2 py-1.5 rounded-md text-[14px] leading-5 text-gray-700 dark:text-gray-200 hover:bg-gray-100/70 hover:text-primary dark:hover:bg-gray-800/60 transition-colors"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
    </template>
  </UPopover>
</template>
