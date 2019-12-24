import React, { useState, useEffect } from 'react'
import { Icon } from 'antd'

import styles from './index.module.less'

function Cube(props) {
  const [showOp, setShowOp] = useState(false)
  const [style, setStyle] = useState({})
  const [cube, setCube] = useState(props.item)

  const handleMouseOver = () => {
    setShowOp(true)
  }

  const handleMouseOut = () => {
    setShowOp(false)
  }
  const calcStyle = () => {
    let index = cube.key
    let rightCls = ''
    let bottomCls = ''
    if (index % 4 === 1) {
      rightCls = 'border-right-4'
    } else if (index % 4 === 0 || index % 4 === 2) {
      rightCls = 'border-right-1'
    } else {
      rightCls = 'border-right-0'
    }
    const temp = parseInt(index / 4, 10)
    if (temp === 1) {
      bottomCls = 'border-bottom-4'
    } else if (temp === 0 || temp === 2) {
      bottomCls = 'border-bottom-1'
    } else {
      bottomCls = 'border-bottom-0'
    }
    return {
      rightCls,
      bottomCls
    }
  }

  const handleChange = (add) => {
    let temp = cube.val + add
    if (temp > 4) temp = 4
    if (temp < 1) temp = 1
    setCube({
      key: cube.key,
      val: temp,
      isLock: cube.isLock
    })
    props.onChange({
      key: cube.key,
      val: temp
    })
  }

  useEffect(() => {
    setStyle(calcStyle())
  }, [])

  useEffect(() => {
    console.log('useEffect...')
    setCube(props.item)
    renderData()
  }, [props.item.val, props.item.hasError])

  const renderData = () => {
    return (
      <div
        className={[
          styles['cube-wrapper'],
          styles[style.rightCls],
          styles[style.bottomCls],
          cube.hasError ? styles['error'] : ''
        ].join(' ')}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
      >
        {cube.isLock ? <i className={'iconfont icon-lock ' + styles['lock-icon']} /> : null}
        <span>{cube.val}</span>

        {!cube.isLock && showOp ? (
          <>
            <Icon
              type="plus-circle"
              className={styles['arrow-top']}
              onClick={() => handleChange(1)}
            />
            <Icon
              type="minus-circle"
              className={styles['arrow-down']}
              onClick={() => handleChange(-1)}
            />
          </>
        ) : null}
      </div>
    )
  }

  return renderData()
}

export default Cube
