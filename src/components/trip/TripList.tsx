import React from 'react'
import TripListItem from './TripListItem'
import { useQuery } from '@apollo/react-hooks'
import { ME_QUERY } from '../../graphql/queries'
import { Link, Redirect } from 'react-router-dom'
import { makeStyles, Fab, Container } from '@material-ui/core'
import { Trip } from '../../util/types'
import clsx from 'clsx'
import basicStyles from '../../styles/basicStyles'
import LoadingScreen from '../LoadingScreen'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  newTripContainer: {
    position: 'sticky',
    bottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'end',
    pointerEvents: 'none',
    textDecoration: 'none',
    color: 'unset'
  },
  newTripButton: {
    pointerEvents: 'auto'
  },
  ...basicStyles(theme),
}))

function TripList () {
  const classes = useStyles()
  const { loading, error, data } = useQuery(ME_QUERY, { fetchPolicy: 'cache-and-network' })

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    if (error.graphQLErrors.some(error => error.name === 'NotAuthenticated')) {
      return <Redirect to='/login' />
    }
    console.log(error)
  }

  return (
    <Container
      maxWidth='md'
      className={classes.container}
    >
      {data.me.trips.map((trip: Trip) => <TripListItem key={trip.id} trip={trip} />)}
      <Link
        to='/trip/new'
        className={clsx(classes.newTripContainer, classes.mt2, classes.mr2)}
      >
        <Fab
          color='secondary'
          className={classes.newTripButton}
        >
          <div className='material-icons'>add</div>
        </Fab>
      </Link>
    </Container>
  )
}

export default TripList
