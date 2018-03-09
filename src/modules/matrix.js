// http://www.keithschwarz.com/interesting/code/?dir=lights-out
// copied from the cpp version by Keith Schwarz
import { getNeighbors, copy } from './util'

class Matrix {
  constructor (array) {
    this.id = Date.now() + Math.random()
    this.matrix = Array.isArray(array) ? array : []
    this.magic = this.magic.bind(this)
  }

  get matrix () {
    return this.origin
  }

  set matrix (array) {
    this.origin = array
    this.rowNum = array.length
    this.colNum = array[0] && array[0].length
  }

  row (m) {
    m = Math.abs(m % this.rowNum)
    return this.matrix[m]
  }

  column (n) {
    n = Math.abs(n % this.colNum)
    return this.matrix.map((row) => {
      return row[n]
    })
  }

  create (array) {
    this.matrix = array
    return this
  }

  static zeroMatrix (m, n) {
    let matrix = []
    for (let i = 0; i < m; i++) {
      matrix[i] = []
      for (let j = 0; j < n; j++) {
        matrix[i][j] = 0
      }
    }
    // console.log(matrix)
    return matrix
  }

  // 输出单位矩阵
  static unitMatrix (n) {
    let matrix = []
    for (let i = 0; i < n; i++) {
      matrix[i] = []
      for (let j = 0; j < n; j++) {
        matrix[i][j] = i === j ? 1 : 0
      }
    }
    // console.log(matrix)
    return matrix
  }

  // 按下每个按钮对应的矩阵，每行对应一个按钮，a[i][j] <==> matrix[i * n + j]
  static toggleMatrix (m, n) {
    let matrix = []
    // let matrix = Array(m * n).fill(Array(m * n).fill(0))
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        let base = i * n + j
        matrix[base] = Array(m * n).fill(0)
        let neighbors = getNeighbors(base, n, m)
        neighbors.forEach((index) => {
          matrix[base][index] = 1
        })
      }
    }
    return matrix
  }

  static findPivot (matrix, startRow, pivotColumn) {
    let rowNum = matrix.length
    for (let i = startRow; i < rowNum; i++) {
      if (matrix[i][pivotColumn]) {
        return i
      }
    }
    return -1
  }

  static swapRow (matrix, startRow, pivotRow) {
    if (startRow === pivotRow) return matrix
    let tmp = matrix[startRow]
    matrix[startRow] = matrix[pivotRow]
    matrix[pivotRow] = tmp
    return matrix
  }

  static transformRow (currentRow, pivotRow) {
    return currentRow.map((e, index) => {
      // console.log(e, pivotRow[index], e ^ pivotRow[index])
      return e ^ pivotRow[index]
    })
  }

  static gaussianElimination (matrix, puzzle) {
    // console.log('start', matrix, puzzle)
    let rowNum = matrix.length
    let colNum = matrix[0].length
    let startRow = 0
    for (let j = 0; j < colNum; j++) {
      let pivotRow = this.findPivot(matrix, startRow, j)
      if (pivotRow === -1) continue
      this.swapRow(matrix, startRow, pivotRow)
      this.swapRow(puzzle, startRow, pivotRow)
      // [startRow, pivotRow] = [pivotRow, startRow]
      for (let i = pivotRow + 1; i < rowNum; i++) {
        if (matrix[i][j]) {
          matrix[i] = this.transformRow(matrix[i], matrix[startRow])
          puzzle[i] ^= puzzle[startRow]
        }
      }
      startRow++
    }
    // console.log(matrix, puzzle)
    return matrix
  }

  static backSubstitute (matrix, puzzle) {
    // console.log(matrix, puzzle)
    let results = []
    let mn = matrix.length
    // let result = Array(mn).fill(0)
    // let mn = m * n
    for (let i = mn - 1; i >= 0; i--) {
      let pivot = -1
      for (let j = 0; j < mn; j++) {
        if (matrix[i][j]) {
          pivot = j
          break
        }
      }
      if (pivot === -1) {
        if (puzzle[i]) {
          console.error('Puzzle has no solution:(<')
          return []
        } else {
          let r1, r2
          let array = []
          if (results.length > 0) {
            results.forEach((result) => {
              r1 = copy(result)
              r2 = copy(result)
              r1[i] = 0
              r2[i] = 1
              array.push(r1)
              array.push(r2)
            })
          } else {
            r1 = Array(mn).fill(0)
            r2 = Array(mn).fill(0)
            r1[i] = 0
            r2[i] = 1
            array.push(r1)
            array.push(r2)
          }
          results = array
        }
      } else {
        if (results.length > 0) {
          results.forEach((result) => {
            result[i] = puzzle[i]
            for (let j = pivot + 1; j < mn; j++) {
              // console.log(i, j, puzzle[i], matrix[i][j], result[j])
              result[i] = result[i] !== (matrix[i][j] & result[j]) ? 1 : 0
            }
          })
        } else {
          let result = Array(mn).fill(0)
          result[i] = puzzle[i]
          for (let j = pivot + 1; j < mn; j++) {
            // console.log(i, j, puzzle[i], matrix[i][j], result[j])
            result[i] = result[i] !== (matrix[i][j] & result[j]) ? 1 : 0
          }
          results.push(result)
        }
      }
    }
    return results
  }

  static magic (state, row, column) {
    let toggle = this.toggleMatrix(row, column)
    let puzzle = state.split('').map((n) => {
      return ~~n
    })
    // let am = this.augmentedMatrix(matrix, puzzle)
    let matrix = this.gaussianElimination(toggle, puzzle)
    let results = this.backSubstitute(matrix, puzzle)
    // console.log(matrix, result)
    let configuration = results.map((result) => {
      return result.reduce((a, b) => {
        return a + b
      }, '')
    })
    return configuration
  }
}

export default Matrix
