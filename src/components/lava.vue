<template>
  <div class="layout">
    <div class="layout-header">
    </div>
    <div class="layout-content">
      <div class="layout-view">
        <div class="layout-padding">
          <div class="lava">
            <!-- <h2>Lava Foundation</h2> -->
            <div class="actions">
              <label for="edit" class="label edit" :class="editing ? 'water' : 'fire'">
                {{ editing ? 'Editing' : 'Playing' }}
                <input id="edit" type="checkbox" class="input" v-model="editing">
              </label>
              <template v-if="editing">
                <label for="row" class="label row">
                  Row:
                  <input id="row" type="number" min="1" max="1000" class="input" v-model="row">
                </label>
                <label for="col" class="label col">
                  Col:
                  <input id="col" type="number" min="1" max="1000" class="input" v-model="col">
                </label>
              </template>
              <button class="hint bg-water" @click="hint">{{ hintText }}</button>
            </div>
            <div class="azeroth">
              <icons></icons>
              <svg  ref="board"
                    class="maelstrom"
                    :width="totemSize * col"
                    :height="totemSize * row"
                    >
                    <totem  v-for="(totem, index) in totems"
                            :key="index"
                            :totem="totem"
                            :size="totemSize"
                            @toggle="toggleTotem"></totem>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-footer"></div>
  </div>
</template>

<script>
import icons from './icons'
import totem from './totem'
import DIE from '../modules/die-by-row'

export default {
  name: 'lava',
  components: {
    totem,
    icons
  },
  data () {
    return {
      row: 5,
      col: 5,
      width: 300,
      height: 300,
      totems: {},
      // status: {},
      editing: false,
      result: [],
      prevState: '',
      prevHintIndex: 0
    }
  },
  computed: {
    totemSize () {
      return this.width / Math.max(this.colNum, this.rowNum)
    },
    status () {
      let status = []
      for (let key in this.totems) {
        let totem = this.totems[key]
        let index = totem.row * this.colNum + totem.col
        status[index] = totem.off ? 0 : 1
      }
      return status
    },
    currentState () {
      return this.status.reduce((a, b) => {
        return a + b
      }, '')
    },
    weight () {
      return this.status.reduce((a, b) => {
        return a + b
      }, 0)
    },
    done () {
      return !this.editing && this.weight === 0
    },
    colNum () {
      return ~~this.col
    },
    rowNum () {
      return ~~this.row
    },
    hintText () {
      return `Hint${this.result.length > 0 ? ' ' + (this.prevHintIndex % this.result.length) : ''}`
    }
  },
  created () {
    window.onresize = this.resize
  },
  watch: {
    col () {
      this.createTotems()
    },
    row () {
      this.createTotems()
    }
  },
  mounted () {
    this.resize()
    this.init()
  },
  methods: {
    init: function () {
      this.createTotems()
    },
    resize: function () {
      let size = Math.min(window.innerHeight, window.innerWidth) * 0.8
      this.width = size
      this.height = size
    },
    createTotems: function () {
      let totems = {}
      for (let i = 0; i < this.rowNum; i++) {
        for (let j = 0; j < this.colNum; j++) {
          let index = i * this.colNum + j
          totems[index] = {
            row: i,
            col: j,
            off: false,
            neighbors: this.getNeighbors(index)
          }
        }
      }
      this.totems = totems
    },
    toggleTotem: function (totem) {
      // console.log(totem)
      let index = totem.row * this.colNum + totem.col
      let state = {}
      state[index] = Object.assign({}, this.totems[index], {
        off: !this.totems[index].off,
        clicked: !this.totems[index].clicked
      })
      if (!this.editing) {
        let neighbors = this.totems[index].neighbors
        for (let neighbor of neighbors) {
          state[neighbor] = Object.assign({}, this.totems[neighbor], {
            off: !this.totems[neighbor].off
          })
        }
      }
      this.totems = Object.assign({}, this.totems, state)
    },
    getNeighbors: function (index) {
      let mode = index % this.colNum
      let last = this.colNum - 1
      let neighbors = []
      switch (mode) {
        case 0:
          neighbors = [index - this.colNum, index + 1, index + this.colNum]
          break
        case last:
          neighbors = [index - this.colNum, index - 1, index + this.colNum]
          break
        default:
          neighbors = [index - this.colNum, index - 1, index + 1, index + this.colNum]
          break
      }
      return neighbors.filter((neighbor) => {
        return neighbor >= 0 && neighbor < this.rowNum * this.colNum
      })
    },
    hint: function () {
      let insects = this.status.reduce((a, b) => {
        return a + b
      }, '')
      let hints
      if (this.prevState === insects) {
        this.prevHintIndex = this.prevHintIndex + 1
        let index = this.prevHintIndex % (this.result.length)
        hints = this.result[index]
      } else {
        this.prevState = insects
        console.time('die')
        let result = DIE(insects, this.colNum, this.rowNum)
        console.timeEnd('die')
        this.prevHintIndex = 0
        this.result = result
        if (result.length > 0) {
          hints = result[0]
        }
      }
      if (hints) {
        let state = {}
        Array.from(hints).forEach((hint, index) => {
          state[index] = Object.assign({}, this.totems[index], {
            hint: hint === '0',
            clicked: false
          })
        })
        this.totems = Object.assign({}, this.totems, state)
      }
    },
    nextBlock: function () {
      this.rowNum = this.rowNum + 1
      this.colNum = this.colNum + 1
    }
  }
}
</script>

<style scoped>
.maelstrom {
  /* background-color: #9e9e9e; */
  user-select: none;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 60vw;
  margin: 1rem 20vw;
  user-select: none;
}

.row,
.col {
  width: 4rem;
}

.label {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* margin: 0 2vw; */
  cursor: pointer;
  /* max-width: 5rem; */
}

.input {
  max-width: 2rem;
  margin-left: .5rem;
  text-align: center;
}

.hint {
  width: 5rem;
  /* max-width: 3rem; */
  color: white;
  border: 0;
  padding: .5rem 1rem;
}
</style>
