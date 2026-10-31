import { useDocsStrings } from '#imports'

/** Resolves About menu paths to the TalkBar website or the license portal for this build. */
export const useAboutLinks = () => {
  const { websiteUrl, licenseUrl } = useDocsStrings()
  const aboutLinkHref = (link: { to: string; site?: string }) =>
    `${link.site === 'license' ? licenseUrl : websiteUrl}${link.to === '/' ? '' : link.to}`
  return { aboutLinkHref, websiteUrl }
}
