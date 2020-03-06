import React from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import SingleTime from './SingleTime'

interface NotifyProps {
  enabled: boolean
  notifyAt: Date
  onChange: (which: 'enabled'|'notify_at', value: boolean|Date) => void
}

function Notify (props: NotifyProps) {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.enabled}
            color='primary'
            onChange={(event) => { props.onChange('enabled', event.target.checked) }}
          />
        }
        label='Notify for this trip'
      />
      <div>
        <SingleTime
          id='notify_at'
          label='Notify at'
          time={props.notifyAt}
          onChange={(label: string, date: any) => { props.onChange('notify_at', date) }}
          disabled={!props.enabled}
        />
      </div>
    </>
  )
}

export default Notify
