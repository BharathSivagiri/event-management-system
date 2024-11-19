export const buildUrlWithParams = (url, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `${url}?${queryString}` : url;
};
