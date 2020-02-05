import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from '@/utils/auth'

const ProtectRoute = function({ children, ...rest }) {
  const auth = getToken()

  return <Route {...rest} render={({ location }) =>
    (auth ? children : <Redirect to={{
      pathname: '/login',
      state: { from: location}
    }}/>)} />
}

export default ProtectRoute
