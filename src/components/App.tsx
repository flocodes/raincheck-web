import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core'
import Header from './Header'
import TripList from './trip/TripList'
import EditTrip from './trip/EditTrip'
import Login from './Login'
import { green, red } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloClient } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

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

const databaseURI = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_DB_URI : 'http://localhost:4000'
console.log(`Expecting DB at ${databaseURI}`)
const httpLink = createHttpLink({
  uri: databaseURI,
  credentials: 'include'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

function App () {
  const classes = useStyles()

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Header />
          <div className={classes.AppBarSpacer} />
          <Switch>
            {/* TODO: Landing page */}
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' render={() => <Login login={false} />} />
            <Route exact path='/trips' component={TripList} />
            <Route exact path='/trip/:id' component={EditTrip} />
            />
          </Switch>
        </MuiThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App
