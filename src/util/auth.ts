import Cookies from 'js-cookie'

export function loggedIn () {
  return Cookies.get('loggedIn') === 'true'
}
