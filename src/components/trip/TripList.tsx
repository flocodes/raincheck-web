import React from 'react'
import Trip from './Trip'
import { useQuery } from '@apollo/react-hooks'
import { Redirect } from 'react-router'
import { ME_QUERY } from '../../graphql/queries'
import { Link } from 'react-router-dom'
import { makeStyles, Fab, Typography, Container } from '@material-ui/core'
import { T_Trip } from '../../util/types'
import clsx from 'clsx'
import basicStyles from '../../styles/basicStyles'

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
  const { loading, error, data } = useQuery(ME_QUERY)

  if (loading) {
    return (
      <Typography
        variant='body1'
      >
        Fetching your trips...
      </Typography>
    )
  }
  if (error) {
    console.log(error)
    return <Redirect to='/login' />
  }
  return (
    <Container
      maxWidth='md'
      className={classes.container}
    >
      {data.me.trips.map((trip: T_Trip) => <Trip key={trip.id} trip={trip} />)}
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
