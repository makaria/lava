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
              <button class="test" @click="test">Test</button>
            </div>
            <div class="azeroth" @contextmenu.prevent>
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
            <div class="audio">
              <audio ref="water" src="../../static/water.wav"></audio>
              <audio ref="fire" src="../../static/fire.wav"></audio>
              <audio ref="success" src="../../static/success.wav"></audio>
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
// import DIE from '../modules/exhaustion'
import Matrix from '../modules/matrix'

export default {
  name: 'lava',
  components: {
    totem,
    icons
  },
  data () {
    return {
      row: 3,
      col: 3,
      width: 300,
      height: 300,
      totems: {},
      status: [],
      editing: false,
      result: [],
      prevState: '',
      prevHintIndex: 0,
      audioContext: null
    }
  },
  computed: {
    totemSize () {
      return this.width / Math.max(this.colNum, this.rowNum)
    },
    insects () {
      return this.status.reduce((a, b) => {
        return a + b
      }, '')
    },
    // status () {
    //   let status = []
    //   for (let key in this.totems) {
    //     let totem = this.totems[key]
    //     let index = totem.row * this.colNum + totem.col
    //     status[index] = totem.off ? 0 : 1
    //   }
    //   return status
    // },
    // currentState () {
    //   return this.status.reduce((a, b) => {
    //     return a + b
    //   }, '')
    // },
    // weight () {
    //   return this.status.reduce((a, b) => {
    //     return a + b
    //   }, 0)
    // },
    // done () {
    //   return !this.editing && this.weight === 0
    // },
    colNum () {
      return ~~this.col
    },
    rowNum () {
      return ~~this.row
    },
    hintText () {
      let amount = this.result.length
      return `Hint${amount > 0 ? ' ' + ((this.prevHintIndex % amount) + 1) + '/' + amount : ''}`
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
    // this.audio = this.$refs.audio
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
      this.updateStatus()
    },
    updateStatus: function () {
      let status = []
      for (let key in this.totems) {
        let totem = this.totems[key]
        let index = totem.row * this.colNum + totem.col
        status[index] = totem.off ? 0 : 1
      }
      this.status = status
    },
    toggleTotem: function (totem) {
      // this.audio.play()
      let index = totem.row * this.colNum + totem.col
      totem = this.totems[index]
      let off = totem.off
      // this.audioPlay(totem.off)
      let state = {}
      state[index] = Object.assign({}, totem, {
        off: !totem.off,
        clicked: !totem.clicked
      })
      if (!this.editing) {
        let neighbors = totem.neighbors
        for (let neighbor of neighbors) {
          state[neighbor] = Object.assign({}, this.totems[neighbor], {
            off: !this.totems[neighbor].off
          })
        }
      }
      this.totems = Object.assign({}, this.totems, state)
      // 因为不确定computed执行的时机，故在此先明确的先计算出status再执行依赖status的后续函数
      this.updateStatus()
      if (!this.editing) {
        this.isDone(off)
      } else {
        this.audioPlay(off)
      }
    },
    isDone: function (off) {
      // console.log(JSON.stringify(this.status))
      // 先执行此函数但是还能得到正确结果，莫非读取this.status时会先检查是否需要重新computed？
      let weight = this.status.reduce((a, b) => {
        return a + b
      }, 0)
      if (weight === 0) {
        this.$refs.success.play()
        setTimeout(() => {
          this.nextBlock()
        }, 500)
      } else {
        this.audioPlay(off)
      }
      // console.log(weight)
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
      // let insects = this.status.reduce((a, b) => {
      //   return a + b
      // }, '')
      let hints
      if (this.prevState === this.insects) {
        this.prevHintIndex = this.prevHintIndex + 1
        let index = this.prevHintIndex % (this.result.length)
        hints = this.result[index]
      } else {
        this.prevState = this.insects
        console.time('die')
        // let result = DIE(this.insects, this.colNum, this.rowNum)
        let result = Matrix.magic(this.insects, this.rowNum, this.colNum)
        console.timeEnd('die')
        this.prevHintIndex = 0
        result = result.sort((a, b) => {
          let wa = a.replace(/0/g, '')
          let wb = b.replace(/0/g, '')
          return wa.length < wb.length
        })
        this.result = result
        if (result.length > 0) {
          hints = result[0]
        }
      }
      if (hints) {
        let state = {}
        Array.from(hints).forEach((hint, index) => {
          state[index] = Object.assign({}, this.totems[index], {
            hint: hint === '1',
            clicked: false
          })
        })
        this.totems = Object.assign({}, this.totems, state)
      }
    },
    nextBlock: function () {
      this.row = ~~this.row + 1
      this.col = ~~this.col + 1
      this.result = []
    },
    audioPlay: function (off) {
      if (off) {
        let fire = this.$refs.fire
        fire.currentTime = 0
        fire.play()
      } else {
        let water = this.$refs.water
        water.currentTime = 0
        water.play()
      }
    },
    test: function () {
      // let a = new Matrix().create('0011100101001110010100101001010010101101001010010100101101010110100101', 5)
      // let a = new Matrix([[0, 1], [2, 1], [5, 0]])
      // console.log(a, a.row(2), a.column(2), a.multiply(new Matrix().create('01010', 1)))
      console.time('die')
      console.log(Matrix.magic(this.insects, this.rowNum, this.colNum))
      console.timeEnd('die')
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
