import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom'
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../graphql/mutations'
import { Typography, TextField, Paper, makeStyles, Button, Link, Container, CircularProgress } from '@material-ui/core'
import basicStyles from '../styles/basicStyles'
import { loggedIn } from '../util/auth'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formContainer: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2)
    },
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    marginTop: theme.spacing(2),
  },
  progress: {
    alignSelf: 'center',
  },
  ...basicStyles(theme),
}))

interface LoginProps extends RouteComponentProps<any> {
  login?: boolean
}

// TODO: Validate email
// TODO: Validate password (min length etc)
function Login (props: LoginProps) {
  const classes = useStyles()

  const [login, setLogin] = useState(props.login === undefined ? true : props.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  const [mutation, result] = useMutation(login ? LOGIN_MUTATION : SIGNUP_MUTATION)

  if (loggedIn()) {
    return <Redirect to='/trips' />
  }

  return (
    <Container
      maxWidth='xs'
      className={classes.container}
    >
      <Paper
        elevation={1}
        className={classes.formContainer}
      >
        <form
          onSubmit={async e => {
            e.preventDefault()
            setLoggingIn(true)
            // have to wait for mutation results to avoid multiple redirects
            // '/trips' redirects back here when mutation not finished, but this redirects back to /trips
            await mutation({ variables: { email, password } })
            if (result.error) console.log(result.error)
            props.history.push('/trips')
          }}
        >
          <Typography variant='h4' className={classes.mb2}>{login ? 'Login' : 'Sign Up'}</Typography>
          <div>
            <TextField
              fullWidth
              type='text'
              value={email}
              label='Email'
              onChange={e => setEmail(e.target.value)}
              autoFocus
              tabIndex={1}
              className={classes.mb2}
            />
            <TextField
              fullWidth
              type='password'
              value={password}
              label='Password'
              onChange={e => setPassword(e.target.value)}
              tabIndex={2}
              className={classes.mb2}
            />
            <div className={classes.buttonContainer}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                tabIndex={3}
                className={classes.mr2}
              >
                {login ? 'login' : 'create account'}
              </Button>
              {loggingIn && <CircularProgress className={classes.progress} size={32} />}
              <div style={{ flexGrow: 1 }} />
              <Link
                variant='body2'
                component='button'
                type='button'
                color='primary'
                underline='none'
                onClick={() => setLogin(!login)}
                tabIndex={4}
              >
                {login
                  ? 'need to create an account?'
                  : 'already have an account?'}
              </Link>
            </div>
          </div>
        </form>
      </Paper>
    </Container>
  )
}

export default withRouter(Login)
