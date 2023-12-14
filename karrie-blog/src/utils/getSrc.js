export function getSrc(src, type) {
  const typeList = ["large", "small", "mini"];
  let baseURL = process.env.VUE_APP_API_BASE_URL;
  return typeList.includes(type)
    ? baseURL + src + `?type=${type}`
    : baseURL + src;
}
