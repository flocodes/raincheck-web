import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { TRIP_QUERY } from '../../graphql/queries'
import EditTripCore from './EditTripCore'
import { Typography } from '@material-ui/core'

interface TripURLParams {
  id?: string
}

function EditTrip () {
  const params: TripURLParams = useParams()
  if (!params.id) {
    throw new Error('No trip ID provided')
  }

  const new_trip = (params.id === 'new')
  const { loading, error, data } = useQuery(TRIP_QUERY, {
    variables: { id: params.id },
    skip: new_trip
  })

  if (new_trip) {
    return (
      <EditTripCore trip={{
        id: null,
        enabled: true,
        name: null,
        start: new Date('1970-01-01T08:00'),
        end: new Date('1970-01-01T08:30'),
        from_lat: null,
        from_lon: null,
        to_lat: null,
        to_lon: null,
        notify_at: new Date('1970-01-01T07:30')
      }}
      />
    )
  }
  if (loading) {
    return (
      <Typography variant='body1'>Fetching...</Typography>
    )
  }
  if (error) {
    console.log(error)
    return <div>{error}</div>
  }
  if (data) {
    const tripProp = { ...data.trip }
    for (const key of ['start', 'end', 'notify_at']) {
      tripProp[key] = new Date(tripProp[key])
    }
    return <EditTripCore trip={tripProp} />
  }
  return <div>You should not see this.</div>
}


export default EditTrip
