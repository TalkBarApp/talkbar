import { isMcpPath, ref, useDocsStrings, useRoute } from '#imports'

/**
 * Returns the documentation area of the current route, used as the search
 * category label.
 */
export const useCategory = () => {
  const route = useRoute();
  const { t } = useDocsStrings();
  return ref(isMcpPath(route.path) ? t('mcpTitle') : t('docsTitle'));
};
