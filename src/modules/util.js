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

const copy = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export {
  getNeighbors,
  copy
}
