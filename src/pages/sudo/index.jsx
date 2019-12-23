import React, { useState } from 'react'
import styles from './index.module.less'

import Cube from './components/cube'

function Sudoku() {
  let temp = Array.apply(null, { length: 16 }).map((item, index) => {
    return {
      key: index,
      val: null,
      isLock: false
    }
  })
  const [arr, setArr] = useState(temp)
  console.log(setArr)
  console.log(arr)
  return (
    <div className={styles['sudoku-wrapper']}>
      <h1>数独</h1>
      <div className={styles['sudo-container']}>
        {arr.map((item) => {
          return <Cube key={item.key} item={item} />
        })}
      </div>
    </div>
  )
}

export default Sudoku
