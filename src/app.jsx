import React from 'react'
import './app.less'
import styles from './app.module.less'
import config from '@/config'

function App() {
  return (
    <div className="App">
      <div className={styles.test} />
      <span>{config.baseUrl}</span>
    </div>
  )
}

export default App
