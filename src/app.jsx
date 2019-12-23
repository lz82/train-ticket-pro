import React from 'react'
import './app.less'
import styles from './app.module.less'

import Sudoku from './pages/sudo'

function App() {
  return (
    <div className={styles['app-wrapper']}>
      <Sudoku />
    </div>
  )
}

export default App
