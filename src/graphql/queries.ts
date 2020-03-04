import { gql } from 'apollo-boost'

// Query a trip by ID
export const TRIP_QUERY = gql`
query Trip($id: ID!) {
  trip(id: $id) {
    id
    enabled
    name
    start
    end
    from_lat
    from_lon
    to_lat
    to_lon
    notify_at
  }
}
`

// Query info and trips of a user
export const ME_QUERY = gql`
  {
    me {
      trips {
        id
        enabled
        name
        start
        end
        from_lat
        from_lon
        to_lat
        to_lon
        notify_at
      }
    }
  }
`

// Turn a query into latitude, longitude and address
// Must return at least lat, lon, label for cache to work correctly
export const GEOCODE_QUERY = gql`
query geocode($query: String!) {
  geocode(query: $query) {
    lat
    lon
    label
    number
    street
    city
    country
  }
}
`

// Turn latitude and longitude into an address
// Must return at least lat, lon, label for cache to work correctly
export const REVERSE_GEOCODE_QUERY = gql`
  query rgeocode($lat: Float!, $lon: Float!) {
    rgeocode(lat: $lat, lon: $lon) {
      lat
      lon
      label
      number
      street
      city
      country
    }
  }
`
