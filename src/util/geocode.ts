interface Location {
  lat: number
  lon: number
  query: string
  label?: string
  number?: number
  street?: string
  city?: string
  country?: string
}

const cache: Array<Location> = []

export function cached (query: string|null) {
  if (query === null) return null
  const cached = cache.find(e => e.query === query)
  return cached || null
}

export function cachedReverse (lat: number|null, lon: number|null) {
  if (lat === null || lon === null) return null
  const cached = cache.find(e => e.lat === lat && e.lon === lon)
  return cached || null
}

export function addToCache (location: Location) {
  if (cache.some(e => e.lat === location.lat && e.lon === location.lon)) return
  cache.push(location)
  console.log(`${cache.length} locations in cache`)
}
