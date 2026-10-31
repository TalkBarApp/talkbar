<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, useDocsStrings } from '#imports'

const { t } = useDocsStrings()

// Track scroll position
const scrollY = ref(0)
const showButton = computed(() => scrollY.value > 800)

// Update scroll position
const updateScrollY = () => {
  scrollY.value = window.scrollY
}

// Smooth scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Add scroll listener on mount
onMounted(() => {
  window.addEventListener('scroll', updateScrollY, { passive: true })
})

// Remove scroll listener on unmount
onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollY)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-90 translate-y-2"
    enter-to-class="opacity-100 scale-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 scale-100 translate-y-0"
    leave-to-class="opacity-0 scale-90 translate-y-2"
  >
    <div
      v-if="showButton"
      class="fixed bottom-6 right-10 z-50"
    >      <UButton
        icon="i-heroicons-arrow-up"
        size="lg"
        color="primary"
        variant="solid"
        :ui="{
          rounded: 'rounded-full',
          icon: { size: { lg: 'h-5 w-5' } }
        }"
        class="shadow-lg hover:shadow-xl transition-shadow duration-200"
        :aria-label="t('backToTop')"
        @click="scrollToTop"
      />
    </div>
  </Transition>
</template>
