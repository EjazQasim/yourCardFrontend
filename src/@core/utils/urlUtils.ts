export const buildURLQuery = (obj: Record<string, any>): string => {
  const o: Record<string, any> = Object.fromEntries(Object.entries(obj).filter(([key]) => obj[key] !== ''))

  return Object.entries(o)
    .map(([key, value]) => [encodeURIComponent(key), encodeURIComponent(value)].join('='))
    .join('&')
}
