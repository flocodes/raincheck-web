import moment from 'moment'

export const LOCAL_TIME = 'LOCAL_TIME'

export function formatDate (date: Date|null, how: string): string {
  if (how === LOCAL_TIME) {
    return moment(date || new Date()).format('LT')
  }
  return moment(date || new Date()).format('HH:mm')
}

export function formatLocation (lat: number|null, lon: number|null): string {
  return `${Math.round((lat || 0) * 100) / 100} / ${Math.round((lon || 0) * 100) / 100}`
}

// Do not care about the date, only the time.
// To simplify the SQL query, ensure all dates in the DB have a UTC date of 1970-01-01
export function convertDate (date: Date): Date {
  const converted = new Date(date)
  converted.setUTCFullYear(1970, 0, 1)
  return converted
}

/*
export function formatLabel (label: string): string {
  let lbl = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()
  lbl = lbl.replace('_', ' ')
  return lbl
}
*/
