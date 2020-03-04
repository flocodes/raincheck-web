import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core'
import React from 'react'

interface TimeProps {
  id: string
  label: string
  time: Date
  disabled: boolean
  onChange: (label: string, time: Date) => void
}

const useStyles = makeStyles(theme => ({
  timePicker: {
    width: 130,
  },
}))

function SingleTime (props: TimeProps) {
  const classes = useStyles()

  const handleChange = (date: any) => {
    if (date.isValid()) {
      props.onChange(props.id, date.toDate())
    }
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardTimePicker
        disabled={props.disabled}
        label={props.label}
        value={props.time}
        onChange={(date: any) => { handleChange(date) }}
        className={classes.timePicker}
      />
    </MuiPickersUtilsProvider>
  )
}

export default SingleTime
