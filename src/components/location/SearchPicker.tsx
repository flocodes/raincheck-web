import React, { useState } from 'react'
import { GEOCODE_QUERY } from '../../graphql/queries'
import { useLazyQuery } from 'react-apollo'
import { Typography, makeStyles, TextField, Button, IconButton, LinearProgress } from '@material-ui/core'
import { LocationPickerProps } from './LocationPicker'
import { addToCache } from '../../util/geocode'
import basicStyles from '../../styles/basicStyles'
import clsx from 'clsx'

interface GeocodeLocation {
  lat: number
  lon: number
  label: string
  number: number
  street: string
  city: string
  country: string
}

const useStyles = makeStyles(theme => ({
  suggestion: {
    cursor: 'pointer',
  },
  sContainer: {
    display: 'flex',
    alignItems: 'center',
    minHeight: theme.spacing(4),
  },
  searchForm: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: 560,
  },
  searchBox: {
    flexGrow: 1
  },
  searchButton: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    alignSelf: 'center',
  },
  cancelButton: {
    height: theme.spacing(4.5),
    alignSelf: 'center',
  },
  ...basicStyles(theme)
}))

function SearchPicker (props: LocationPickerProps) {
  const classes = useStyles()
  const [query, setQuery] = useState('')
  const [cacheQuery, setCacheQuery] = useState('')
  const [queried, setQueried] = useState(false)

  const [geocode, { loading, data }] = useLazyQuery(GEOCODE_QUERY)

  const handleQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query === '') return
    geocode({ variables: { query } })
    setCacheQuery(query)
    setQueried(true)
  }

  const QuerySuggestions = () => {
    if (loading) {
      return <LinearProgress />
    } else if (data && data.geocode !== null) {
      return (
        <div>
          {data.geocode.map((location: GeocodeLocation, index: number) => {
            addToCache({
              query: cacheQuery,
              ...location
            })
            return (
              <div key={index} className={classes.sContainer}>
                <Typography
                  className={classes.suggestion}
                  onClick={() => { props.onChange(location.lat, location.lon) }}
                >
                  {location.label}
                </Typography>
              </div>
            )
          })}
        </div>
      )
    } else if (queried) {
      return <Typography color='error'>Address not found</Typography>
    } else {
      return ''
    }
  }

  return (
    <>
      <form
        onSubmit={handleQuery}
        className={classes.searchForm}
      >
        <TextField
          value={query}
          label='Address'
          helperText='Search for an address'
          error={props.error}
          onChange={(event) => { setQuery(event.target.value) }}
          className={clsx(classes.searchBox, classes.mr1)}
        />
        <IconButton
          type='submit'
          className={clsx(classes.searchButton, classes.mr1)}
        >
          <div className='material-icons'>search</div>
        </IconButton>
        {(props.lat && props.lon) && (
          <Button
            type='button'
            variant='contained'
            onClick={() => { props.onCancel() }}
            className={clsx(classes.cancelButton, classes.mt1, classes.mb1)}
          >
            cancel
          </Button>
        )}
      </form>
      {QuerySuggestions()}
    </>
  )
}

export default SearchPicker
