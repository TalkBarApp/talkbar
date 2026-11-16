<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useDocsStrings, useRuntimeConfig } from '#imports'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  caption: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  /** A small cut-out (a panel, a menu, a dialog): shown centered on a grey
      panel at a reduced size instead of stretched to the page width. */
  compact: { type: Boolean, default: false },
  /** Largest width of a compact screenshot on the page, in CSS pixels. */
  maxWidth: { type: [String, Number], default: 480 },
})

const { t, locale } = useDocsStrings()
const config = useRuntimeConfig().public
const available = (config.docsScreenshots || []) as string[]
// Production builds leave out screenshots that don't exist yet; dev and preview
// builds show a placeholder so missing images stay visible to writers.
const showPlaceholder = Boolean(config.docsShowScreenshotPlaceholders)

// A localized copy (screenshots/ru/...) wins over the English one.
const localizedSrc = props.src.replace(/^\/screenshots\//, `/screenshots/${locale}/`)
// The file list is read when the server starts. In dev, an image added later is
// not on it yet, so try loading it anyway (localized first, then English) and
// show the placeholder only when the file really is missing.
const candidates = computed(() => {
  const list: string[] = []
  if (locale !== 'en' && available.includes(localizedSrc)) list.push(localizedSrc)
  if (available.includes(props.src)) list.push(props.src)
  if (showPlaceholder) {
    if (locale !== 'en' && !list.includes(localizedSrc)) list.push(localizedSrc)
    if (!list.includes(props.src)) list.push(props.src)
  }
  return [...new Set(list)]
})
const failed = ref(0)
const resolvedSrc = computed(() => candidates.value[failed.value] ?? null)
function onImgError() {
  failed.value += 1
}

const label = computed(() => props.caption || props.alt || '')
const zoomLabel = computed(() => t('zoomExpand').replace('{label}', label.value))
const unzoomLabel = computed(() => t('zoomClose').replace('{label}', label.value))
const compactStyle = computed(() =>
  props.compact ? { maxWidth: `${Number(props.maxWidth) || 480}px` } : undefined,
)

// ---- Click to zoom: the same behaviour as the website (react-medium-image-zoom):
// the picture grows from its place on the page to fit the window with a 24px
// margin over a dark overlay; a click, Escape, scrolling or resizing closes it.
const MARGIN = 24
const DURATION = 300
const thumb = ref<HTMLImageElement | null>(null)
const dialog = ref<HTMLDialogElement | null>(null)
const state = ref<'unloaded' | 'loading' | 'loaded' | 'unloading'>('unloaded')
const zoomStyle = ref<Record<string, string>>({})
let closeTimer: ReturnType<typeof setTimeout> | undefined

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Where the zoomed picture ends up: centred and as large as the window allows,
// like the website (a small picture can grow past its own pixel size).
function targetBox(img: HTMLImageElement) {
  const nw = img.naturalWidth || img.width
  const nh = img.naturalHeight || img.height
  const vw = window.innerWidth - MARGIN * 2
  const vh = window.innerHeight - MARGIN * 2
  const scale = Math.min(vw / nw, vh / nh)
  const width = nw * scale
  const height = nh * scale
  return { width, height, left: (window.innerWidth - width) / 2, top: (window.innerHeight - height) / 2 }
}

// Transform that places the zoomed picture exactly over the page picture.
function fromThumb(box: ReturnType<typeof targetBox>) {
  const r = thumb.value!.getBoundingClientRect()
  const s = r.width / box.width
  const dx = r.left - box.left
  const dy = r.top - box.top
  return `translate(${dx}px, ${dy}px) scale(${s})`
}

function boxStyle(box: ReturnType<typeof targetBox>, transform: string) {
  return {
    width: `${box.width}px`,
    height: `${box.height}px`,
    left: `${box.left}px`,
    top: `${box.top}px`,
    transform,
    transitionDuration: reducedMotion() ? '0ms' : `${DURATION}ms`,
  }
}

let openFrame = 0

async function open() {
  if (!thumb.value || !dialog.value || state.value !== 'unloaded') return
  clearTimeout(closeTimer)
  const box = targetBox(thumb.value)
  zoomStyle.value = { ...boxStyle(box, fromThumb(box)), transitionDuration: '0ms' }
  dialog.value.showModal()
  state.value = 'loading'
  window.addEventListener('wheel', close, { passive: true })
  window.addEventListener('touchmove', close, { passive: true })
  window.addEventListener('resize', close)
  await nextTick()
  // Two frames so the start position is painted before it moves.
  openFrame = requestAnimationFrame(() => {
    openFrame = requestAnimationFrame(() => {
      openFrame = 0
      if (state.value !== 'loading') return
      zoomStyle.value = boxStyle(box, 'none')
      state.value = 'loaded'
    })
  })
}

function close() {
  if (!thumb.value || !dialog.value) return
  // Escape or a click during the first frames of opening closes it too.
  if (state.value === 'loading') {
    if (openFrame) cancelAnimationFrame(openFrame)
    openFrame = 0
    state.value = 'loaded'
  }
  if (state.value !== 'loaded') return
  window.removeEventListener('wheel', close)
  window.removeEventListener('touchmove', close)
  window.removeEventListener('resize', close)
  const box = targetBox(thumb.value)
  zoomStyle.value = boxStyle(box, fromThumb(box))
  state.value = 'unloading'
  closeTimer = setTimeout(
    () => {
      dialog.value?.close()
      state.value = 'unloaded'
      thumb.value?.focus?.()
    },
    reducedMotion() ? 0 : DURATION,
  )
}

function onCancel(e: Event) {
  e.preventDefault()
  close()
}

onBeforeUnmount(() => {
  clearTimeout(closeTimer)
  if (openFrame) cancelAnimationFrame(openFrame)
  if (typeof window === 'undefined') return
  window.removeEventListener('wheel', close)
  window.removeEventListener('touchmove', close)
  window.removeEventListener('resize', close)
})
</script>

<template>
  <figure
    v-if="resolvedSrc || showPlaceholder"
    class="screenshot not-prose my-6"
    :class="{ 'screenshot--compact': compact }"
  >
    <div :class="compact ? 'screenshot-stage' : undefined">
      <button
        v-if="resolvedSrc"
        type="button"
        class="screenshot-zoom"
        :style="compactStyle"
        :aria-label="zoomLabel"
        :data-zoom-state="state"
        @click="open"
      >
        <img
          ref="thumb"
          :src="resolvedSrc"
          :alt="alt"
          :width="width"
          loading="lazy"
          @error="onImgError"
          class="screenshot-img rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm w-full h-auto"
        >
      </button>
      <div
        v-else
        data-screenshot-placeholder
        class="screenshot-placeholder rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 px-6 py-10 text-center"
        :style="compactStyle"
        role="img"
        :aria-label="alt"
      >
        <UIcon name="i-heroicons-photo" class="h-10 w-10 text-primary-500 dark:text-primary-400 mx-auto" />
        <p class="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-200">{{ t('screenshotPending') }}</p>
        <p v-if="alt" class="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{{ alt }}</p>
        <code class="mt-3 inline-block text-xs text-gray-400 dark:text-gray-500">{{ src }}</code>
      </div>
    </div>
    <figcaption v-if="caption" class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">{{ caption }}</figcaption>

    <Teleport v-if="resolvedSrc" to="body">
      <dialog
        ref="dialog"
        class="screenshot-modal"
        :aria-label="label"
        :data-zoom-state="state"
        @cancel="onCancel"
        @click="close"
      >
        <img
          v-if="state !== 'unloaded'"
          :src="resolvedSrc"
          :alt="alt"
          class="screenshot-modal-img"
          :style="zoomStyle"
        >
        <button type="button" class="screenshot-modal-close" :aria-label="unzoomLabel" @click.stop="close">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </dialog>
    </Teleport>
  </figure>
</template>

<style>
/* Page picture: the whole picture is the zoom button. */
.screenshot-zoom {
  display: block;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  border: 0;
  background: none;
  cursor: zoom-in;
  border-radius: 0.5rem;
}
.screenshot-zoom:focus-visible {
  outline: 2px solid rgb(var(--color-primary-500));
  outline-offset: 3px;
}
/* The page picture hides while its zoomed copy is open, as on the website. */
.screenshot-zoom:not([data-zoom-state='unloaded']) .screenshot-img {
  visibility: hidden;
}

/* Compact cut-outs: centred on a rounded grey panel, smaller than the page. */
.screenshot--compact .screenshot-placeholder {
  width: 100%;
}
/* Compact cut-outs carry their own rounded corners, space and shadow. */
.screenshot--compact .screenshot-img {
  border: 0;
  border-radius: 0;
  box-shadow: none;
}
.screenshot--compact .screenshot-stage {
  display: flex;
  justify-content: center;
  border-radius: 1rem;
  background: rgb(var(--color-gray-100));
  padding: 2.25rem 1.5rem;
}
.dark .screenshot--compact .screenshot-stage {
  background: rgb(var(--color-gray-800) / 0.55);
}
@media (max-width: 640px) {
  .screenshot--compact .screenshot-stage {
    padding: 1.25rem 0.75rem;
  }
}

/* Zoomed view: same overlay colour, margin and shadow as the website. */
.screenshot-modal {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  overflow: hidden;
  background-color: rgba(3, 7, 18, 0);
  transition: background-color 300ms;
  cursor: zoom-out;
}
.screenshot-modal::backdrop {
  background: transparent;
}
.screenshot-modal[data-zoom-state='loaded'] {
  background-color: rgba(3, 7, 18, 0.94);
}
.screenshot-modal-img {
  position: absolute;
  max-width: none;
  margin: 0;
  border-radius: 0.5rem;
  transform-origin: top left;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.2, 0, 0.2, 1);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
  cursor: zoom-out;
}
.screenshot-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  cursor: pointer;
  opacity: 0;
  transition: opacity 300ms, background-color 150ms;
}
.screenshot-modal[data-zoom-state='loaded'] .screenshot-modal-close {
  opacity: 1;
}
.screenshot-modal-close:hover {
  background: rgba(255, 255, 255, 0.22);
}
.screenshot-modal-close:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .screenshot-modal,
  .screenshot-modal-close {
    transition: none;
  }
}
</style>
