import React from 'react'
import { formatDate, LOCAL_TIME } from '../../util/format'
import LocationDisplay from '../location/LocationDisplay'
import { Card, makeStyles, CardContent, CardActionArea, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { grey } from '@material-ui/core/colors'
import { T_Trip } from '../../util/types'
import basicStyles from '../../styles/basicStyles'

export interface TripProps {
  trip: T_Trip
}

const useStyles = makeStyles(theme => ({
  trip: {
    cursor: 'pointer',
  },
  enabledTrip: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  disabledTrip: {
    background: grey[200],
  },
  flexHorCenter: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center'
  },
  ...basicStyles(theme),
}))

function Trip (props: TripProps) {
  const classes = useStyles()

  return (
    <Link
      to={`/trip/${props.trip.id}`}
      style={{ textDecoration: 'none', color: 'unset' }}
    >
      <Card
        className={clsx(classes.trip, classes.mb2, props.trip.enabled ? classes.enabledTrip : classes.disabledTrip)}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              variant='h5'
              className={classes.mb2}
            >
              {props.trip.name}
            </Typography>
            <Typography
              component='span'
              variant='body1'
            >
              <div className={clsx(classes.flexHorCenter, classes.mb1)}>
                <div className={clsx('material-icons', classes.mr2)}>
                  {props.trip.enabled ? 'notifications_active' : 'notifications_off'}
                </div>
                <div>{formatDate(props.trip.notify_at, LOCAL_TIME)}</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div className={clsx('material-icons', classes.mr2)}>place</div>
                <div className={clsx(classes.flexHorCenter, classes.mb1)}>
                  <LocationDisplay lat={props.trip.from_lat} lon={props.trip.from_lon} />
                  <div className={clsx('material-icons', classes.ml2, classes.mr2)}>arrow_right_alt</div>
                  <LocationDisplay lat={props.trip.to_lat} lon={props.trip.to_lon} />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div className={clsx('material-icons', classes.mr2)}>access_time</div>
                <div className={classes.flexHorCenter}>
                  <div>{formatDate(props.trip.start, LOCAL_TIME)}</div>
                  <div className={clsx('material-icons', classes.ml2, classes.mr2)}>arrow_right_alt</div>
                  <div>{formatDate(props.trip.end, LOCAL_TIME)}</div>
                </div>
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default Trip
