export interface T_Trip {
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
}

export interface T_NewTrip {
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
}
