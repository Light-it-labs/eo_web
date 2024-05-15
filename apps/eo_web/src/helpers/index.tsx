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

export const getUrlFromHost = () => {
  const protocol = window.location.hostname === "localhost" ? "http" : "https";
  return `${protocol}://${window.location.host}`;
};
