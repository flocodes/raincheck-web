import React from 'react'
import { cachedReverse, addToCache } from '../../util/geocode'
import { useQuery } from 'react-apollo'
import { REVERSE_GEOCODE_QUERY } from '../../graphql/queries'
import { formatLocation } from '../../util/format'
import { Typography } from '@material-ui/core'

interface LocationDisplayProps {
  lat: number|null
  lon: number|null
}

function LocationDisplay (props: LocationDisplayProps) {
  // Use cached data if it is valid
  // If cached data exists but does not contain a valid label, this falls back to lat/lon,
  // and does not execute the queries again because we can assume that we would get the same
  // invalid data again when re-executing the queries
  const cached = cachedReverse(props.lat, props.lon)
  const skipQuery = (cached !== null)

  const query = useQuery(REVERSE_GEOCODE_QUERY, {
    variables: {
      lat: props.lat,
      lon: props.lon
    },
    skip: skipQuery
  })

  // Fallback: Use format latitude/longitude as default
  let location_string = formatLocation(props.lat, props.lon)
  if (cached !== null && cached.label !== undefined) location_string = cached.label

  // Use the query data if no cached data available
  if (!skipQuery) {
    if (query.loading) location_string = 'Fetching...'
    if (query.error) {
      console.log(`Error reverse geocoding location: ${query.error}`)
      location_string = formatLocation(props.lat, props.lon)
    }
    if (query.data) {
      location_string = query.data.rgeocode.label
      addToCache(query.data.rgeocode)
    }
  }

  return <Typography variant='body1'>{location_string}</Typography>
}

export default LocationDisplay
