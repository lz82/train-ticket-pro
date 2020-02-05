import React from 'react'
import { getToken, removeToken } from '@/utils/auth'
import { useHistory } from 'react-router-dom'

const AuthPanel = function() {
  const auth = getToken()
  const history = useHistory()

  const handleLogoutClick = () => {
    removeToken()
    history.replace('/login')
  }

  return auth ? (
    <div>
      welcome! <button onClick={handleLogoutClick}>logout</button>
    </div>
  ) : (
    <div>you have not login</div>
  )
}

export default AuthPanel
