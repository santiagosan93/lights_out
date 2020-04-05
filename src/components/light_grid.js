import React, { Component } from 'react'
import Square from './square'
import random5050 from '../helpers/random5050'

class LightGrid extends Component {
  static defaultProps = {
    columns: 5,
    rows: 5
  }
  constructor(props) {
    super(props)
    this.state = {
      grid: this.fillGrid()
    }
    this.fillGrid = this.fillGrid.bind(this)
    this.turnOn = this.turnOn.bind(this)
    this.turnOnSuroundingSquares = this.turnOnSuroundingSquares.bind(this)
  }

  fillGrid() {
    let grid = []
    let column = 1
    let row = 1
    let index = 0
    for(var i = 1; i <= this.props.columns * this.props.rows; i++) {
      grid.push({index: index,  on: random5050(), column: column, row: row})
      column += 1
      if (column > this.props.columns) {
        column = 1
        row += 1
      }
      index += 1
    }
    return grid
  }

  turnOnSuroundingSquares(grid, selectedSquare) {
    const squares = grid.filter((square) => {
      const squareLeft = (square.row === selectedSquare.row) && (square.column === selectedSquare.column - 1)
      const squareRight = (square.row === selectedSquare.row) && (square.column === selectedSquare.column + 1)
      const squareUp = (square.column === selectedSquare.column) && (square.row === selectedSquare.row - 1)
      const squareDown = (square.column === selectedSquare.column) && (square.row === selectedSquare.row + 1)
      return (
        squareLeft || squareRight || squareUp || squareDown
      )
    })
    return squares
  }

  turnOn(selectedIndex) {
    let grid = [...this.state.grid]
    const square = grid.filter(square => square.index === selectedIndex)[0]
    square.on = !(square.on)
    grid[selectedIndex] = square
    const suroundingSquares = this.turnOnSuroundingSquares(grid,square)
    suroundingSquares.forEach((sq) => {
      sq.on = !(sq.on)
      grid[sq.index] = sq
    })
    this.setState({
      grid: grid
    })
  }

  render(){
    return (
      <div className='grid'>
        {this.state.grid.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              row={square.row}
              column={square.column}
              on={square.on}
              turnOn={this.turnOn}
            />
          )
        })}
      </div>
    )
  }
}

export default LightGrid
