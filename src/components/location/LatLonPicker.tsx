import React, { useState } from 'react'
import { LocationPickerProps } from './LocationPicker'
import { makeStyles, TextField, Button } from '@material-ui/core'
import basicStyles from '../../styles/basicStyles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  latLonForm: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline'
  },
  latLonInput: {
    width: '100%',
    maxWidth: 190,
  },
  latLonButton: {
    height: theme.spacing(4.5),
  },
  ...basicStyles(theme),
}))

const LAT_ERROR_STRING = 'Latitude must be a number between -90 and 90'
const LON_ERROR_STRING = 'Longitude must be a number between -180 and 180'

function LatLonPicker (props: LocationPickerProps) {
  const classes = useStyles()

  // Location
  const [latStr, setLatStr] = useState(props.lat ? props.lat.toString() : '')
  const [lonStr, setLonStr] = useState(props.lon ? props.lon.toString() : '')
  // Validation
  const [latValid, setLatValid] = useState(true)
  const [lonValid, setLonValid] = useState(true)

  /* Two different error cases:
     1. Internal value validation fails (state)
     2. External error, e.g. location is null (error prop)
        AND the location has not changed (do not show error when user fixes location)
     => need to check both state and prop
   */
  const latError = (!latValid || (props.error && (props.lat ? props.lat.toString() : '') === latStr))
  const lonError = (!lonValid || (props.error && (props.lon ? props.lon.toString() : '') === lonStr))

  const handleStringChange = (label: string, value: string) => {
    value = value.replace('/,/g', '.')
    if (label === 'lat') {
      setLatStr(value)
      const v = parseFloat(value)
      setLatValid(!(isNaN(v) || v < -90 || v > 90))
    } else if (label === 'lon') {
      setLonStr(value)
      const v = parseFloat(value)
      setLonValid(!(isNaN(v) || v < -180 || v > 180))
    }
  }

  return (
    <form
      className={classes.latLonForm}
      onSubmit={e => {
        e.preventDefault()
        if (latError || lonError) {
          console.log('Cannot update location because lat/lon are invalid')
        } else {
          // props.onChange(lat, lon)
          props.onChange(parseFloat(latStr), parseFloat(lonStr))
        }
      }}
    >
      <TextField
        type='text'
        label='Latitude'
        value={latStr}
        onChange={event => { handleStringChange('lat', event.target.value) }}
        error={latError}
        helperText={latError ? LAT_ERROR_STRING : ''}
        className={clsx(classes.latLonInput, classes.mb2, classes.mr2)}
      />
      <TextField
        type='text'
        label='Longitude'
        value={lonStr}
        onChange={event => { handleStringChange('lon', event.target.value) }}
        error={lonError}
        helperText={lonError ? LON_ERROR_STRING : ''}
        className={clsx(classes.latLonInput, classes.mb2, classes.mr2)}
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        className={clsx(classes.latLonButton, classes.mr2)}
      >
        {(props.lat && props.lon) ? 'Update' : 'Set'}
      </Button>
      {(props.lat && props.lon) && (
        <Button
          type='button'
          variant='contained'
          onClick={() => { props.onCancel() }}
          className={classes.latLonButton}
        >
          cancel
        </Button>
      )}
    </form>
  )
}

export default LatLonPicker
