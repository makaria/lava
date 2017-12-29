const die = (insects, col, row) => {
  col = parseInt(col)
  row = parseInt(row)
  let neighbors = {}
  Array.from(insects).forEach((insect, index) => {
    neighbors[index] = getNeighbors(index, col, row)
  })
  const off = (arr, str, j) => {
    j = j || 0
    arr.forEach((a, i) => {
      if (a === '0') {
        let index = i + j * col
        let fns = neighbors[index]
        for (let fn of fns) {
          let b = str.charAt(fn) === '0' ? '1' : '0'
          str = str.substring(0, fn) + b + str.substring(fn + 1)
        }
      }
    })
    return str
  }
  let max = Math.pow(2, col)
  let result = []
  let i = 0
  while (i < max) {
    let actions = ''
    let str = insects
    let firstRow = i.toString(2).padStart(col, '0')
    actions = actions + firstRow
    str = off(Array.from(firstRow), str, 0)
    let j = 1
    while (j < row) {
      let prevRow = Array.from(str.substr((j - 1) * col, col))
      let nextRow = prevRow.map((byte) => {
        return byte === '0' ? '1' : '0'
      })
      str = off(nextRow, str, j)
      nextRow = nextRow.reduce((a, b) => {
        return a + b
      }, '')
      actions = actions + nextRow
      j++
    }
    if (parseInt(str) === 0) {
      result.push(actions)
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
