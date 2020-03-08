import React from 'react'
import { CircularProgress } from '@material-ui/core'

function LoadingScreen () {
  return (
    <div style={{ width: 40, marginLeft: 'auto', marginRight: 'auto' }}>
      <CircularProgress />
    </div>
  )
}

export default LoadingScreen
