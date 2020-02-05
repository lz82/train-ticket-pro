import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import styles from './index.module.less'

const CustomLink = function({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  })
  return (
    <div className={match ? styles['active'] : ''}>
      {match && '> '}
      <Link to={to}>{label}</Link>
    </div>
  )
}

export default CustomLink
