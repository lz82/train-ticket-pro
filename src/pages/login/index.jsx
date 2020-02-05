import React from 'react'
import { setToken } from '@/utils/auth'

const LoginPage = function({ history, location }) {
  const handleLoginClick = () => {
    setToken('asdfsf')
    console.log('login', location)
    history.push(location.state && location.state.from.pathname || '/home')
  }

  return (
    <div>
      <p>this is login page</p>

      <button onClick={handleLoginClick}>login</button>
    </div>
  )
}

export default LoginPage
