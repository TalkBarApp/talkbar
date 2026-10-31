import defaultTheme from 'tailwindcss/defaultTheme'

// Fonts follow www.talkbar.app: the English site pairs Hanken Grotesk (text) with
// Urbanist (headings); the Russian site uses Onest for both, since those faces
// have no Cyrillic. Text faces are set in main.css (the theme layers put Inter
// first in the sans stack).
const russian = process.env.DOCS_LOCALE === 'ru'
const headingFont = russian ? ['Onest'] : ['Urbanist', 'Onest', 'Hanken Grotesk']

export default {
  content: [
    `./app.{js,ts,vue}`,
    `./App.{js,ts,vue}`,
    `./components/**/*.{vue,js,ts}`,
    `./composables/**/*.{js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./plugins/**/*.{vue,js,ts}`
  ],
  theme: {
    extend: {
      // Type scale of www.talkbar.app
      fontSize: {
        xs: ['0.825rem', { lineHeight: '1.1rem' }],
        sm: ['0.9625rem', { lineHeight: '1.375rem' }],
        base: ['1.1rem', { lineHeight: '1.65rem' }],
        lg: ['1.2375rem', { lineHeight: '1.75rem' }],
        xl: ['1.375rem', { lineHeight: '1.925rem' }],
        '2xl': ['1.65rem', { lineHeight: '2.2rem' }],
        '3xl': ['2.0625rem', { lineHeight: '2.475rem' }],
        '4xl': ['2.475rem', { lineHeight: '2.75rem' }],
        '5xl': ['3.3rem', { lineHeight: '1' }],
        '6xl': ['4.125rem', { lineHeight: '1' }]
      },
      fontFamily: {
        display: [...headingFont, ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono]
      },
      colors: {
        // Default accent: TalkBar blue #054df6 (text on dark #5b84ff)
        talkbar: {
          50: '#eef3ff',
          100: '#dce6ff',
          200: '#b9ccff',
          300: '#8aa9ff',
          400: '#5b84ff',
          500: '#054df6',
          600: '#0440d0',
          700: '#0433b8',
          800: '#062b8f',
          900: '#0a2770',
          950: '#081843'
        },
        // Warm accent #d58458, offered by the color toggle (applied in main.css)
        'talkbar-warm': {
          50: '#fcf4ef',
          100: '#f8e6dc',
          200: '#f0cbb7',
          300: '#e7ad8e',
          400: '#dd9a74',
          500: '#d58458',
          600: '#b8602e',
          700: '#964d24',
          800: '#7a3f1f',
          900: '#63351c',
          950: '#361a0d'
        },
        // Navy neutrals from the website: ink text #2b3a5d, muted #656f88,
        // hairlines #e3e5ea, dark card #1d212c, dark page #141924
        ink: {
          50: '#f6f7f9',
          100: '#eef0f3',
          200: '#e3e5ea',
          300: '#cbd0da',
          400: '#8a91a3',
          500: '#656f88',
          600: '#54607b',
          700: '#3a4560',
          800: '#2b3142',
          900: '#1d212c',
          950: '#141924'
        }
      }
    }
  }
}
