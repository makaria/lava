import { getNeighbors } from './util'

// exec input row by row
const offByRow = (output, input, base, neighbors) => {
  // console.log(input, JSON.stringify(output))
  input.forEach((action, index) => {
    if (action) {
      let inputIndex = index + base
      let outputIndexs = neighbors[inputIndex]
      for (let outputIndex of outputIndexs) {
        output[outputIndex] = !output[outputIndex]
      }
    }
    // console.log(JSON.stringify(output))
  })
  // no need to return
  return output
}

const trialAndError = (state, col, row) => {
  col = parseInt(col)
  row = parseInt(row)
  // prepare neighbors
  let neighbors = {}
  Array.from(state).forEach((insect, index) => {
    neighbors[index] = getNeighbors(index, col, row)
  })
  // prepare configuration array
  let stateArray = state.split('').map((byte) => {
    return byte === '0'
  })
  // declare variables
  let result = []
  let input, output
  let max = Math.pow(2, col)
  let i = 0
  while (i < max) {
    // initial a input array
    input = []
    // copy a init state, while loop seems faster than slice.
    output = stateArray.slice()
    // generate first row for every i
    let firstRowStr = i.toString(2).padStart(col, '0')
    let firstRow = Array.from(firstRowStr).map((byte, index) => {
      return byte === '0'
    })
    input = input.concat(firstRow)
    // press buttons in first row
    output = offByRow(output, firstRow, 0, neighbors)
    // other row
    let j = 1
    while (j < row) {
      let prevRow = output.slice((j - 1) * col, j * col)
      let nextRow = prevRow.map((byte) => {
        return !byte
      })
      input = input.concat(nextRow)
      output = offByRow(output, nextRow, j * col, neighbors)
      j++
    }
    // success?
    let darkness = output.reduce((a, b) => {
      return a && b
    }, true)
    if (darkness) {
      let inputStr = input.map((byte) => {
        return byte ? '1' : '0'
      }).reduce((a, b) => {
        return a + b
      }, '')
      result.push(inputStr)
    }
    i++
  }
  return result
}

export default trialAndError
