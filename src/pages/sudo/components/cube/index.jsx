import React from 'react'

import styles from './index.module.less'

function Cube(props) {
  let index = props.item.key
  let rightCls = ''
  let bottomCls = ''
  if(index % 4 === 1) {
    console.log(index, '4')
    rightCls = 'border-right-4'
  } else if (index % 4 === 0 || index % 4 === 2) {
    console.log(index, '1')
    rightCls = 'border-right-1'
  } else {
    console.log(index, '0')
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

  return <div className={[styles['cube-wrapper'], styles[rightCls], styles[bottomCls]].join(' ')}>cube</div>
}

export default Cube
