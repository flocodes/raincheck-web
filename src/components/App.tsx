import React from 'react'
import { Route, Switch } from 'react-router'
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core'
import Header from './Header'
import TripList from './trip/TripList'
import EditTrip from './trip/EditTrip'
import Login from './Login'
import { green, red } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[700]
    },
    error: {
      main: red[500]
    }
  }
})

const useStyles = makeStyles({
  AppBarSpacer: {
    height: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(2)
    },
  },
})

function App () {
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Header />
        <div className={classes.AppBarSpacer} />
        <Switch>
          <Route exact path='/' component={TripList} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/trip/:id' component={EditTrip} />
          />
        </Switch>
      </MuiThemeProvider>
    </>
  )
}

export default App
