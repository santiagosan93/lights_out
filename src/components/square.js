import React from 'react'

const Square = (props) => {
  return (
    <div className={props.on ? 'square on' : 'square'} onClick={e => props.turnOn(props.index)}>
    </div>
  )
}

export default Square
