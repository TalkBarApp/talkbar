<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: string
  to: string
}>()
</script>

<template>
  <NuxtLink :to="to" class="docs-tile">
    <UIcon :name="icon" class="docs-tile-icon" />
    <span class="docs-tile-title">{{ title }}</span>
    <span class="docs-tile-text">{{ description }}</span>
  </NuxtLink>
</template>
