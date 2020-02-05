import Cookies from 'js-cookie'

import appconfig from '@/config'

const tokenKey = appconfig.appToken

export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token, expires) {
  // 默认session
  if (!expires) {
    return Cookies.set(tokenKey, token)
  } else {
    return Cookies.set(tokenKey, token, { expires: expires })
  }
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}

export default tokenKey
