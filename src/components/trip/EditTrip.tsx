import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { TRIP_QUERY } from '../../graphql/queries'
import EditTripCore from './EditTripCore'
import LoadingScreen from '../LoadingScreen'

interface TripURLParams {
  id?: string
}

function EditTrip () {
  const params: TripURLParams = useParams()
  if (!params.id) {
    throw new Error('No trip ID provided')
  }

  const newTrip = (params.id === 'new')
  const { loading, error, data } = useQuery(TRIP_QUERY, {
    variables: { id: params.id },
    skip: newTrip
  })

  if (newTrip) {
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
  if (loading) return <LoadingScreen />
  if (error) {
    if (error.graphQLErrors && error.graphQLErrors.some(error => {
      if (!error.extensions) return false
      return error.extensions.code === 'NotAuthenticated'
    })) {
      return <Redirect to='/login' />
    }
    console.log(error)
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
