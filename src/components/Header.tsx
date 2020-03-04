import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import basicStyles from '../styles/basicStyles'
import { useMutation } from 'react-apollo'
import { LOGOUT_MUTATION } from '../graphql/mutations'
import { loggedIn } from '../util/auth'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  ...basicStyles(theme),
}))

function Header (props: any) {
  const classes = useStyles()

  const [mutation, _result] = useMutation(LOGOUT_MUTATION)

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link to='/' style={{ textDecoration: 'none', color: 'unset' }}>
          <Typography
            variant='h6'
            className={classes.mr2}
            noWrap
          >
            Raincheck
          </Typography>
        </Link>
        <div className={classes.grow} />
        {loggedIn() && (
          <Button
            variant='contained'
            onClick={() => {
              mutation()
              props.history.push('/login')
            }}
          >
            <div style={{ display: 'flex' }}>
              <div className={clsx('material-icons', classes.mr1)}>account_circle</div>
              <div>Logout</div>
            </div>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(Header)
