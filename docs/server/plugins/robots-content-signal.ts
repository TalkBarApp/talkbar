// Content Signals (https://contentsignals.org): the published docs may be used for
// search, as input to AI answers and for AI training. Added only to an indexable
// robots.txt; preview builds keep "Disallow: /" untouched.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('robots:robots-txt' as never, (ctx: { robotsTxt: string }) => {
    if (!ctx.robotsTxt.includes('(indexable)')) return
    ctx.robotsTxt = ctx.robotsTxt.replace(
      /^User-agent: \*$/m,
      'User-agent: *\nContent-Signal: search=yes, ai-input=yes, ai-train=yes',
    )
  })
})
