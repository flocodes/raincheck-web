import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import basicStyles from '../styles/basicStyles'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  ...basicStyles(theme),
}))

function Header (props: any) {
  const classes = useStyles()

  // TODO: Find a way to check whether we are logged in
  // TODO: Allow user to log out
  const token = true
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
        {/*
        <Link to='/trip/new'>
          <Button
            variant='contained'

          >
            <div style={{ display: 'flex' }}>
              <div className={clsx('material-icons', classes.material_icon)}>add</div>
              <div>Create new trip</div>
            </div>
          </Button>
        </Link>
        */}
        <div className={classes.grow} />
        {token && (
          <Button
            variant='contained'
            onClick={() => {
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
