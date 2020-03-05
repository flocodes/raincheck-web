import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core'
import Header from './Header'
import TripList from './trip/TripList'
import EditTrip from './trip/EditTrip'
import Login from './Login'
import { green, red } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'
import requiresLogin from './RequiresLogin'

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
          {/* TODO: Landing page */}
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' render={() => <Login login={false} />} />
          <Route exact path='/trips' component={requiresLogin(TripList)} />
          <Route exact path='/trip/:id' component={requiresLogin(EditTrip)} />
          />
        </Switch>
      </MuiThemeProvider>
    </>
  )
}

export default App
