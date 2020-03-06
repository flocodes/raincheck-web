import React, { useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { CREATE_TRIP_MUTATION, UPDATE_TRIP_MUTATION, DELETE_TRIP_MUTATION } from '../../graphql/mutations'
import LocationPickDisplay from '../location/LocationPickDisplay'
import { useMutation } from 'react-apollo'
import { TextField, Paper, makeStyles, Button, Typography, Container } from '@material-ui/core'
import Duration from '../time/Duration'
import Notify from '../time/Notify'
import { NewTrip, Trip } from '../../util/types'
import basicStyles from '../../styles/basicStyles'
import { convertDate } from '../../util/format'

// Sleep function to add delay
// const sleep = (ms: number) => { return new Promise(resolve => setTimeout(resolve, ms)) }

export interface EditTripProps extends RouteComponentProps<any> {
  trip: NewTrip | Trip
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formContainer: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2)
    },
  },
  ...basicStyles(theme),
}))

function EditTripCore (props: EditTripProps) {
  const classes = useStyles()
  const newTrip = (props.trip.id === null)
  const tripFromProps = { ...props.trip }
  if (newTrip) {
    delete tripFromProps.id
  }
  const [trip, setTrip] = useState(tripFromProps)
  const [nameValid, setNameValid] = useState(true)
  const [fromValid, setFromValid] = useState(true)
  const [toValid, setToValid] = useState(true)

  const valid = (fromValid && toValid && nameValid)

  const [mutation, result] = useMutation(newTrip ? CREATE_TRIP_MUTATION : UPDATE_TRIP_MUTATION)
  const [deleteMutation, deleteResult] = useMutation(DELETE_TRIP_MUTATION)

  const onValueChange = (key: keyof Trip, value: any) => {
    // Type workaround, do not want a complicated type definition just for this update shorthand
    const tripNew: any = { ...trip }
    tripNew[key] = value
    setTrip(tripNew)
  }

  const onNameChange = (name: string) => {
    validateName(name)
    onValueChange('name', name)
  }

  const onLocationChange = (which: 'from'|'to', lat: number, lon: number) => {
    // Type workaround, do not want a complicated type definition just for this update shorthand
    const tripNew: any = { ...trip }
    tripNew[`${which}_lat`] = lat
    tripNew[`${which}_lon`] = lon
    setTrip(tripNew)
  }

  const onTimeChange = (which: string, time: Date) => {
    if (which !== 'start' && which !== 'end') return
    onValueChange(which, time)
  }

  const validateName = (name: string|undefined|null) => {
    setNameValid(name !== undefined && name !== null && name !== '')
  }

  // Only name and locations can be invalid, other fields are pre-filled with defaults
  const validateForm = () => {
    validateName(trip.name)
    if (!trip.from_lat || !trip.from_lon) setFromValid(false)
    else setFromValid(true)
    if (!trip.to_lat || !trip.to_lon) setToValid(false)
    else setToValid(true)
  }

  // Create/update trip, converting the datetimes so all dates are UTC 1970-01-01
  const submitForm = async () => {
    // Typescript...
    const tripSubmit: any = { ...trip }
    for (const key of ['start', 'end', 'notify_at']) {
      tripSubmit[key] = convertDate(tripSubmit[key])
    }
    validateForm()
    if (valid) {
      console.log('Submitting trip:')
      console.log(tripSubmit)
      await mutation({ variables: { ...tripSubmit } })
      if (result.error) console.log(result.error)
      props.history.push('/trips')
    }
  }

  return (
    <Container
      maxWidth='sm'
      className={classes.container}
    >
      <Paper
        elevation={1}
        className={classes.formContainer}
      >
        <Typography variant='h4' className={classes.mb2}>
          {newTrip ? 'New trip' : 'Edit trip'}
        </Typography>
        <TextField
          fullWidth
          label='Trip name'
          value={trip.name ? trip.name : ''}
          onChange={(event) => { onNameChange(event.target.value) }}
          error={!nameValid}
          helperText={!nameValid ? 'Trips need a name' : ''}
          className={classes.mb2}
        />
        <Notify
          enabled={trip.enabled}
          notifyAt={trip.notify_at}
          onChange={onValueChange}
        />
        <div className={classes.mb2} />
        <LocationPickDisplay
          id='from'
          label='From'
          edit={newTrip}
          lat={trip.from_lat}
          lon={trip.from_lon}
          onChange={onLocationChange}
          error={!fromValid}
        />
        <LocationPickDisplay
          id='to'
          label='To'
          edit={newTrip}
          lat={trip.to_lat}
          lon={trip.to_lon}
          onChange={onLocationChange}
          error={!toValid}
        />
        <Typography variant='h5'>Duration</Typography>
        <Duration
          start={trip.start}
          end={trip.end}
          onChange={onTimeChange}
        />
        {/*
        <button
          type='button'
          onClick={validateForm}
        >
          DEBUG: Validate form
        </button>
        <div>DEBUG: {valid ? 'Valid' : 'Invalid'}</div>
        */}
        <div style={{ display: 'flex' }}>
          <Button
            variant='contained'
            color='primary'
            className={classes.mr2}
            onClick={async e => {
              e.preventDefault()
              submitForm()
            }}
          >
            {newTrip ? 'Create' : 'Update'}
          </Button>
          <div style={{ flexGrow: 1 }} />
          {!newTrip && (
            <Button
              variant='contained'
              onClick={async () => {
                await deleteMutation({ variables: { id: trip.id } })
                if (deleteResult.error) console.log(deleteResult.error)
                props.history.push('/trips')
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </Paper>
    </Container>
  )
}

export default withRouter(EditTripCore)
