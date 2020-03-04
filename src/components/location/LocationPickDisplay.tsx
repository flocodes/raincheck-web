import React, { useState } from 'react'
import LocationPicker from './LocationPicker'
import LocationDisplay from './LocationDisplay'
import { IconButton, makeStyles, Typography } from '@material-ui/core'
import basicStyles from '../../styles/basicStyles'

interface LocationPickDisplayProps {
  id: string
  label: string
  edit: boolean
  lat: number|null
  lon: number|null
  onChange: CallableFunction
  error: boolean
}

const useStyles = makeStyles(theme => ({
  locationDisplay: {
    display: 'flex',
    alignItems: 'center'
  },
  ...basicStyles(theme),
}))

function LocationPickDisplay (props: LocationPickDisplayProps) {
  const classes = useStyles()
  const [edit, setEdit] = useState(props.edit)

  const onChange = (lat: number, lon: number) => {
    setEdit(false)
    props.onChange(props.id, lat, lon)
  }

  return (
    <>
      <Typography variant='h5' className={classes.mr2}>
        {props.label}
      </Typography>
      {edit ? (
        <div>
          <LocationPicker
            lat={props.lat}
            lon={props.lon}
            error={props.error}
            onChange={onChange}
            onCancel={() => { setEdit(false) }}
          />
        </div>
      ) : (
        <div className={classes.locationDisplay}>
          <LocationDisplay lat={props.lat} lon={props.lon} />
          <IconButton onClick={() => { setEdit(true) }}>
            <div className='material-icons'>edit</div>
          </IconButton>
        </div>
      )}
    </>
  )
}

export default LocationPickDisplay
