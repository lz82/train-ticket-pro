import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { Button } from 'antd'
import Cube from './components/cube'

const sudoLib = [
  [3, 1, null, 4, null, null, 1, null, null, 2, null, null, null, 3, null, 2],
  [null, 1, null, null, null, null, 1, 2, null, 2, null, null, 1, null, 2, 4],
  [1, null, 2, null, null, null, 4, null, 4, null, null, 2, null, null, 3, null],
  [null, 4, 2, null, null, 3, null, null, null, null, 4, 2, 4, null, null, 1],
  [null, 3, null, 4, 1, null, 2, null, 3, null, 4, 1, null, 1, null, null],
  [2, null, 4, null, null, null, 3, null, 3, null, null, 4, null, 2, 1, null],
  [null, 3, 2, null, null, null, 3, null, 3, 4, null, null, 1, null, null, 3],
  [null, null, 4, null, null, 2, 1, null, null, null, null, null, 1, 3, null, 4],
  [null, 3, null, 1, null, 1, null, 2, 1, null, null, null, null, null, 1, 4],
  [4, null, null, 2, null, 3, 4, null, null, 4, null, 3, 3, null, null, null],
  [null, 2, null, null, 4, null, null, 3, null, 3, 1, null, null, 4, 3, null],
  [null, null, 3, 4, null, null, null, null, 2, 4, 1, null, null, 1, null, null],
  [1, null, null, 4, null, 4, 1, null, null, 3, 2, null, 2, null, null, 3],
  [1, null, 3, null, null, 3, null, null, null, 2, null, 3, null, null, null, 4]
]

// 检查行是否有重复
const rows = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15]
]
const columns = [
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15]
]
const areas = [
  [0, 1, 4, 5],
  [2, 3, 6, 7],
  [8, 9, 12, 13],
  [10, 11, 14, 15]
]

function Sudoku() {
  const [arr, setArr] = useState([])
  const initSudo = () => {
    const random = sudoLib[parseInt(Math.random() * sudoLib.length, 10)]
    setArr(
      random.map((item, index) => {
        return {
          key: index,
          val: item,
          isLock: !!item,
          hasError: false
        }
      })
    )
  }

  useEffect(() => {
    initSudo()
  }, [])

  const handleChange = (cube) => {
    arr.map((item) => {
      return item.key === cube.key ? Object.assign(item, cube) : item
    })
    setArr(arr)
  }

  const checkRepeat = (checkList) => {
    debugger
    const list = []
    checkList.forEach((item) => {
      list.push(arr[item].val)
    })
    const temp = new Set(list)
    return checkList.length === temp.size
  }

  const handleSubmit = () => {
    console.log(arr)
    // 1.0 检测完整性
    let errArr = []
    arr.forEach((item) => {
      if (!item.val) {
        errArr.push(item.key)
      }
    })

    rows.forEach((item) => {
      const repeat = checkRepeat(item)
      if (!repeat) {
        errArr.push(...item)
      }
    })

    columns.forEach((item) => {
      const repeat = checkRepeat(item)
      if (!repeat) {
        errArr.push(...item)
      }
    })

    areas.forEach((item) => {
      const repeat = checkRepeat(item)
      if (!repeat) {
        errArr.push(...item)
      }
    })

    errArr = new Set(errArr)

    setArr(
      arr.map((item) => {
        console.log(errArr)
        return Array.from(errArr).findIndex((o) => o === item.key) > -1
          ? Object.assign(item, { hasError: true })
          : Object.assign(item, { hasError: false })
      })
    )
  }

  const handleReset = () => {
    setArr(
      arr.map((item) => {
        return item.isLock ? Object.assign(item, { hasError: false }) : Object.assign(item, { val: null, hasError: false })
      })
    )
  }

  const handleAg = () => {
    initSudo()
  }

  return (
    <div className={styles['sudoku-wrapper']}>
      <h1>数独</h1>
      <div className={styles['sudo-container']}>
        {arr.map((item) => {
          return <Cube key={item.key} item={item} onChange={handleChange} />
        })}
      </div>
      <div className={styles['btn-wrapper']}>
        <Button type="primary" size="large" onClick={handleSubmit}>
          提交
        </Button>
        &nbsp;
        <Button type="danger" size="large" onClick={handleReset}>
          重置
        </Button>
        &nbsp;
        <Button type="danger" size="large" onClick={handleAg}>
          再来一次
        </Button>
      </div>
    </div>
  )
}

export default Sudoku
