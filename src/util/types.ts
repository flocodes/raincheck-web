// ignore non-camelcase variable names for DB column names

export interface Trip {
  /* eslint-disable camelcase */
  id: string
  enabled: boolean
  name: string
  start: Date
  end: Date
  from_lat: number
  from_lon: number
  to_lat: number
  to_lon: number
  notify_at: Date
  /* eslint-enable camelcase */
}

export interface NewTrip {
  /* eslint-disable camelcase */
  id: null
  enabled: boolean
  name: null
  start: Date
  end: Date
  from_lat: null
  from_lon: null
  to_lat: null
  to_lon: null
  notify_at: Date
  /* eslint-enable camelcase */
}
