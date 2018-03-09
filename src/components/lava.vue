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
              <label for="edit" class="label edit" :class="editing ? 'bg-fire' : 'bg-water'">
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
              <button v-if="!editing" class="hint bg-water" @click="hint">{{ hintText }}</button>
              <button v-else class="reset bg-water" @click="reset">Reset</button>
              <!-- <button class="test" @click="test">Test</button> -->
            </div>
            <div class="azeroth">
              <icons></icons>
              <svg  ref="board"
                    class="maelstrom"
                    :width="totemSize * col"
                    :height="totemSize * row"
                    @contextmenu.prevent
                    >
                    <totem  v-for="(totem, index) in totems"
                            :key="index"
                            :totem="totem"
                            :size="totemSize"
                            @toggle="toggleTotem"
                            :editing="editing"></totem>
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
import { getNeighbors } from '../modules/util'

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
      // status: [],
      editing: false,
      showHint: false,
      result: [],
      prevState: '',
      prevHintIndex: 0
    }
  },
  computed: {
    totemSize () {
      return Math.min(this.width / this.colNum, this.height / this.rowNum)
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
    state () {
      return this.status.reduce((a, b) => {
        return a + b
      }, '')
    },
    weight () {
      if (this.status.length > 0) {
        return this.status.reduce((a, b) => {
          return a + b
        }, 0)
      } else {
        return 42
      }
    },
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
    },
    weight () {
      if (!this.editing && this.weight === 0) {
        this.done()
      }
    },
    editing () {
      this.isPlayable()
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
      // let size = Math.min(window.innerHeight, window.innerWidth) * 0.85
      this.width = window.innerWidth * 0.85
      this.height = window.innerHeight * 0.8
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
            clicked: false,
            hint: false,
            neighbors: getNeighbors(index, this.colNum, this.rowNum)
          }
        }
      }
      this.totems = totems
    },
    reset: function () {
      for (let key in this.totems) {
        let totem = this.totems[key]
        if (totem.off) {
          totem.off = false
        }
      }
    },
    toggleTotem: function (totem) {
      this.audioPlay(totem.off)
      let index = totem.row * this.colNum + totem.col
      let patch = {}
      if (!this.editing) {
        let neighbors = this.totems[index].neighbors
        for (let neighbor of neighbors) {
          patch[neighbor] = Object.assign({}, this.totems[neighbor], {
            off: !this.totems[neighbor].off
          })
        }
      } else {
        patch[index] = Object.assign({}, this.totems[index], {
          off: !this.totems[index].off
        })
      }
      patch[index] = Object.assign({}, patch[index], {
        clicked: !this.totems[index].clicked
      })
      this.totems = Object.assign({}, this.totems, patch)
    },
    done: function () {
      this.$refs.success.play()
      setTimeout(() => {
        this.nextBlock()
      }, 500)
    },
    hint: function () {
      let hints
      if (this.prevState === this.state) {
        this.prevHintIndex = this.prevHintIndex + 1
        let index = this.prevHintIndex % (this.result.length)
        hints = this.result[index]
      } else {
        this.prevState = this.state
        this.prevHintIndex = 0
        console.time('die')
        // let result = DIE(this.state, this.colNum, this.rowNum)
        let result = Matrix.magic(this.state, this.rowNum, this.colNum)
        console.timeEnd('die')
        result = this.sortByWeight(result)
        this.result = result
        hints = result[0]
      }
      if (hints) {
        this.updateHint(hints)
      } else {
        console.error('No solution!')
      }
    },
    updateHint: function (hints) {
      let state = {}
      Array.from(hints).forEach((hint, index) => {
        state[index] = Object.assign({}, this.totems[index], {
          hint: hint === '1',
          clicked: false
        })
      })
      this.totems = Object.assign({}, this.totems, state)
    },
    clearHint: function () {
      for (let key in this.totems) {
        this.totems[key].hint = false
        this.totems[key].clicked = false
      }
      this.result = []
    },
    sortByWeight: function (result) {
      return result.sort((a, b) => {
        let wa = a.replace(/0/g, '')
        let wb = b.replace(/0/g, '')
        return wa.length < wb.length
      })
    },
    nextBlock: function () {
      this.row = ~~this.row + 1
      this.col = ~~this.col + 1
    },
    isPlayable: function () {
      if (!this.editing) {
        let result = Matrix.magic(this.state, this.rowNum, this.colNum)
        if (result.length === 0) {
          alert('No solutions!')
          this.editing = true
        }
        if (this.prevState !== this.state) {
          this.clearHint()
        }
      } else {
        // this.result = []
      }
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
    }
  }
}
</script>

<style scoped>
.layout-padding {
  padding: 1rem 1.5rem;
}

.maelstrom {
  /* background-color: #9e9e9e; */
  user-select: none;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* max-width: 60vw; */
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

.edit {
  padding: .5rem 1rem;
  color: white;
  font-size: 1rem;
  border: 0;
  /* min-width: 5rem; */
  /* background-color: #2196f3; */
}

.edit > .input {
  display: none;
}

.input {
  max-width: 2rem;
  margin-left: .5rem;
  text-align: center;
}

.hint, .reset {
  /* min-width: 5rem; */
  /* max-width: 3rem; */
  color: white;
  border: 0;
  padding: .5rem 1rem;
  font-size: 1rem;
}
</style>
