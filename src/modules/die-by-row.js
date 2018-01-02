const die = (insects, col, row) => {
  col = parseInt(col)
  row = parseInt(row)
  // prepare neighbors
  let neighbors = {}
  Array.from(insects).forEach((insect, index) => {
    neighbors[index] = getNeighbors(index, col, row)
  })
  // exec input row by row
  const offByRow = (output, input, base) => {
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
  let insectsArray = insects.split('').map((byte) => {
    return byte === '0'
  })
  let result = []
  let input, output
  let max = Math.pow(2, col)
  let i = 0
  // console.log(insectsArray)
  while (i < max) {
    // init
    input = []
    // copy a init state, while loop seems faster than slice.
    output = insectsArray.slice()
    // first row
    let firstRowStr = i.toString(2).padStart(col, '0')
    let firstRow = Array.from(firstRowStr).map((byte, index) => {
      return byte === '0'
    })
    input = input.concat(firstRow)
    output = offByRow(output, firstRow, 0)
    // other row
    let j = 1
    while (j < row) {
      let prevRow = output.slice((j - 1) * col, j * col)
      let nextRow = prevRow.map((byte) => {
        return !byte
      })
      input = input.concat(nextRow)
      output = offByRow(output, nextRow, j * col)
      j++
    }
    // success?
    let darkness = output.reduce((a, b) => {
      return a && b
    }, true)
    if (darkness) {
      let inputStr = input.map((byte) => {
        return byte ? '0' : '1'
      }).reduce((a, b) => {
        return a + b
      }, '')
      result.push(inputStr)
    }
    i++
  }
  return result
}

const getNeighbors = (index, col, row) => {
  let mode = index % col
  let last = col - 1
  let neighbors = []
  switch (mode) {
    case 0:
      neighbors = [index - col, index, index + 1, index + col]
      break
    case last:
      neighbors = [index - col, index - 1, index, index + col]
      break
    default:
      neighbors = [index - col, index - 1, index, index + 1, index + col]
      break
  }
  return neighbors.filter((neighbor) => {
    return neighbor >= 0 && neighbor < row * col
  })
}

export default die
