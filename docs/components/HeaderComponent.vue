<script setup lang="ts">
import { computed, isMcpPath, queryContent, useAboutLinks, useAsyncData, useDocsStrings, useRoute } from '#imports'
import type { PropType } from 'vue'
import type { AboutMenuData } from './AboutMenu.vue'

interface HeaderLink {
  label: string
  to: string
  active?: boolean
  children?: HeaderLink[]
}

const props = defineProps({
  links: {
    type: Array as PropType<HeaderLink[]>,
    default: () => []
  }
})

const route = useRoute()
const { t, repoUrl } = useDocsStrings()
const { aboutLinkHref, websiteUrl } = useAboutLinks()

const isMcpRoute = computed(() => isMcpPath(route.path))

// The wordmark carries the brand; the badge names the documentation area.
const areaLabel = computed(() => (isMcpRoute.value ? 'MCP' : 'Docs'))

const { data: aboutMenu } = await useAsyncData('about-menu', () =>
  queryContent('about-menu').findOne() as Promise<AboutMenuData & Record<string, unknown>>
)

// The mobile menu lists the website links as one more group.
const panelLinks = computed(() => {
  const menu = aboutMenu.value
  if (!menu) return props.links
  const websiteLinks = [...menu.main, ...menu.groups.flatMap(group => group.items)].map(link => ({
    label: link.label,
    to: aboutLinkHref(link),
    target: '_blank',
  }))
  return [...props.links, { label: menu.label, to: websiteUrl, children: websiteLinks }]
})
</script>

<template>
  <UHeader
    :links="panelLinks"
    to="/"
    :ui="{ container: 'max-w-half', panel: { wrapper: 'bg-[rgb(var(--ui-background))]' } }"
  >
    <template #logo>
      <span class="flex items-center gap-2.5">
        <TalkBarLogo :alt="isMcpRoute ? t('mcpTitle') : t('docsTitle')" class="h-7 w-[135px] lg:h-8 lg:w-[155px]" />
        <span class="label rounded-full px-2 py-0.5 bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300">{{ areaLabel }}</span>
      </span>
    </template>

    <template #center>
      <div class="hidden lg:flex items-center gap-x-8">
        <UHeaderLinks :links="links" />
        <AboutMenu v-if="aboutMenu" :menu="aboutMenu" />
      </div>
    </template>

    <template #right>
      <div class="flex items-center gap-1 lg:ml-8">
        <UButton :to="repoUrl" target="_blank" icon="i-simple-icons-github" aria-label="GitHub" color="gray" variant="ghost" />
        <ColorThemeToggle />
        <UColorModeButton />
        <UContentSearchButton :label="t('searchButton')" />
        <UButton
          to="https://github.com/TalkBarApp/talkbar/releases/latest"
          target="_blank"
          :label="t('download')"
          icon="i-heroicons-arrow-down-tray-20-solid"
          color="primary"
          variant="solid"
          size="sm"
          class="ml-1 hidden sm:inline-flex rounded-full px-4 font-medium shadow-[0_10px_26px_-14px_rgb(var(--color-primary-500)/0.9)]"
        />
      </div>
    </template>

    <template #panel>
      <UNavigationTree :links="panelLinks" default-open :multiple="false" />
    </template>
  </UHeader>
</template>
