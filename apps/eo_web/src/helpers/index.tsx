export const scapeParamFromQuery = (
  key: string,
  urlParam?: URLSearchParams,
): string | null => {
  if (!urlParam) {
    urlParam = new URLSearchParams(window.location.search);
  }
  const val = urlParam.get(key);
  return val ? val.replace(" ", "+") : null;
};
