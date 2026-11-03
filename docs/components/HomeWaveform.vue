<script setup lang="ts">
// One conversation as a waveform: quiet before it, loud during it (in the accent
// color) and quiet again after it. The three parts line up with the stages below.
const BAR_COUNT = 96
const THIRD = BAR_COUNT / 3
const HEIGHT = 96

// Repeatable pseudo-random values, so server and browser draw the same bars.
const noise = (index: number) => {
  const value = Math.sin(index * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

const bars = Array.from({ length: BAR_COUNT }, (_, index) => {
  const live = index >= THIRD && index < THIRD * 2
  // Before rises toward the conversation; after falls away from it.
  const edge = index < THIRD ? index / THIRD : (BAR_COUNT - 1 - index) / THIRD
  const level = live ? 0.42 + noise(index) * 0.58 : 0.08 + edge * 0.14 + noise(index) * 0.1
  const half = Math.round((level * HEIGHT) / 2)
  return {
    x: Number((((index + 0.5) / BAR_COUNT) * 1000).toFixed(1)),
    y1: HEIGHT / 2 - half,
    y2: HEIGHT / 2 + half,
    live,
  }
})
</script>

<template>
  <svg
    class="home-wave"
    :viewBox="`0 0 1000 ${HEIGHT}`"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <line
      v-for="(bar, index) in bars"
      :key="index"
      :x1="bar.x"
      :x2="bar.x"
      :y1="bar.y1"
      :y2="bar.y2"
      :class="{ 'home-wave-live': bar.live }"
      :style="{ '--bar': index }"
    />
  </svg>
</template>
