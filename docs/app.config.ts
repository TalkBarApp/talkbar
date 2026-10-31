/**
 * Nuxt App Configuration that allows for runtime editing.
 * This content can be accessible in components with the
 * globally available `useAppConfig()`.
 */
// @ts-expect-error - defineAppConfig is auto-imported by Nuxt.
export default defineAppConfig({
  seo: {
    siteName: 'TalkBar Documentation',
    titleTemplate: '%s | TalkBar Documentation',
    description: 'Documentation for TalkBar, the private AI note taker for Windows',
    ogImage: {
      type: 'image/png',
      url: '/apple-touch-icon.png'
    },
  },
  search: {},
  ui: {
    // Colors of www.talkbar.app (see tailwind.config.js). The warm accent is
    // switched in at runtime by the header's color toggle (main.css).
    primary: 'talkbar',
    gray: 'ink',
    variables: {
      light: {
        background: '250 249 245',
        foreground: '43 58 93'
      },
      dark: {
        background: '20 25 36',
        foreground: '224 220 214'
      }
    },
    // 12-column page grid: both sidebars get a quarter of their row instead of a fifth
    page: {
      wrapper: 'flex flex-col lg:grid lg:grid-cols-12 lg:gap-10',
      left: 'lg:col-span-3',
      center: {
        narrow: 'lg:col-span-6',
        base: 'lg:col-span-9',
        full: 'lg:col-span-12'
      },
      right: 'lg:col-span-3 order-first lg:order-last',
      // Page titles in the website's lighter display style
      header: {
        title: 'font-display text-3xl sm:text-4xl text-gray-900 dark:text-white font-normal tracking-tight'
      },
      // "Help to improve" links under the table of contents
      links: {
        title: 'text-[15px] leading-6 font-medium flex items-center gap-1.5',
        base: 'flex items-center gap-2',
        icon: { base: 'w-4 h-4 flex-shrink-0' },
        label: 'text-[15px] leading-6 font-normal relative'
      }
    },
    // Sidebar: compact text and icons with more room between them
    navigation: {
      tree: {
        links: {
          base: 'gap-2.5 py-1',
          label: 'text-[15px] leading-6 text-left text-balance',
          icon: { base: 'w-4 h-4 flex-shrink-0' }
        },
        accordion: {
          button: {
            base: 'py-1.5 gap-2.5',
            label: 'text-[15px] font-medium leading-6 text-left text-balance',
            icon: { base: 'w-4 h-4 flex-shrink-0' },
            trailingIcon: { base: 'w-4 h-4 ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1' }
          }
        }
      }
    },
    content: {
      toc: {
        button: {
          label: 'font-medium text-[15px] leading-6 truncate'
        },
        links: {
          wrapper: 'space-y-1.5',
          base: 'block text-[15px] leading-6 text-left text-balance',
          depth: 'ml-3'
        }
      }
    },
    // Header: medium weight, like the website's compact navigation
    header: {
      wrapper: 'bg-[rgb(var(--ui-background))]/80 dark:bg-[rgb(var(--ui-background))]/80 backdrop-blur-md border-b border-gray-200/70 dark:border-gray-800',
      links: {
        wrapper: 'flex items-center gap-x-5 xl:gap-x-8',
        base: 'text-[15px] leading-6 font-medium flex items-center gap-1 whitespace-nowrap'
      },
      popover: {
        links: {
          label: 'font-medium text-[15px] leading-6 inline-block relative'
        }
      }
    },
    // Footer: plain text links, without the external-link arrow
    footer: {
      bottom: {
        container: 'py-6 lg:py-5 lg:flex lg:items-center lg:justify-between lg:gap-x-6',
        left: 'flex items-center justify-center lg:justify-start lg:flex-1 mt-4 lg:mt-0 lg:order-1 text-[15px] leading-6 text-gray-500 dark:text-gray-400',
        center: 'mt-3 lg:mt-0 lg:order-2 flex items-center justify-center',
        right: 'lg:flex-1 flex items-center justify-center lg:justify-end lg:order-3'
      },
      links: {
        base: 'text-[14px] leading-6',
        externalIcon: { base: 'hidden' }
      }
    },
    icons: {
      check: 'i-heroicons-check'
    }
  },
  toc: {
    title: 'On this page',
    bottom: {
      title: 'Help to improve',
      links: []
    }
  }
})
