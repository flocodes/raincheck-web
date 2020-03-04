import React, { useState } from 'react'
import LatLonPicker from './LatLonPicker'
import SearchPicker from './SearchPicker'
import { Typography, makeStyles } from '@material-ui/core'
import basicStyles from '../../styles/basicStyles'
import clsx from 'clsx'

export interface LocationPickerProps {
  lat: number|null
  lon: number|null
  error: boolean
  onChange: CallableFunction
  onCancel: CallableFunction
}

const useStyles = makeStyles(theme => ({
  switchButton: {
    textDecoration: 'none',
    cursor: 'pointer'
  },
  switchText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  ...basicStyles(theme)
}))

function LocationPicker (props: LocationPickerProps) {
  const classes = useStyles()
  // Default picker = SearchPicker
  const [picker, setPicker] = useState(true)

  return (
    <>
      {picker ? (
        <SearchPicker
          lat={props.lat}
          lon={props.lon}
          error={props.error}
          onChange={props.onChange}
          onCancel={props.onCancel}
        />
      ) : (
        <LatLonPicker
          lat={props.lat}
          lon={props.lon}
          error={props.error}
          onChange={props.onChange}
          onCancel={props.onCancel}
        />
      )}
      <Typography
        variant='body2'
        color='textPrimary'
        className={clsx(classes.mt1, classes.mb2)}
      >
        You can also&nbsp;
        <Typography
          variant='inherit'
          color='primary'
          onClick={() => setPicker(!picker)}
          className={classes.switchButton}
        >
          {picker ? 'use coordinates' : 'search for a location'}
        </Typography>
      </Typography>
    </>
  )
}

export default LocationPicker
