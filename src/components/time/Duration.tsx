import React from 'react'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import SingleTime from './SingleTime'
import basicStyles from '../../styles/basicStyles'

interface DurationProps {
  start: Date
  end: Date
  onChange: (which: string, time: Date) => void
}

const useStyles = makeStyles(theme => ({
  timeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  ...basicStyles(theme),
}))

function Duration (props: DurationProps) {
  const classes = useStyles()

  const isNextDay = () => {
    const endNormalized = new Date(props.end)
    endNormalized.setFullYear(props.start.getFullYear(), props.start.getMonth(), props.start.getDate())
    return endNormalized < props.start
  }

  return (
    <div className={clsx(classes.timeContainer, classes.mb2)}>
      <SingleTime
        id='start'
        label='Start'
        time={props.start}
        onChange={props.onChange}
        disabled={false}
      />
      <div className={clsx('material-icons', classes.ml2, classes.mr2)}>arrow_right_alt</div>
      <SingleTime
        id='end'
        label={isNextDay() ? 'End (next day)' : 'End'}
        time={props.end}
        onChange={props.onChange}
        disabled={false}
      />
    </div>
  )
}

export default Duration
