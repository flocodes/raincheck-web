import { loggedIn } from '../util/auth'
import { Redirect } from 'react-router-dom'
import React from 'react'

function requiresLogin (Component: React.ComponentType<any>): React.ComponentType<any> {
  if (!loggedIn()) return () => <Redirect to='/login' />
  return (props: any) => <Component {...props} />
}

export default requiresLogin
