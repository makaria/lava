<template>
  <div class="lava">
    <h2 class="lava-title fire">Lava Foundation</h2>
    <div class="actions" :style="{ width: `${totemSize * col}px` }">
      <label for="edit" class="label edit" :class="editing ? 'bg-fire' : 'bg-water'">
        {{ editing ? 'Editing' : 'Playing' }}
        <input
          id="edit"
          type="checkbox"
          class="input"
          v-model="editing"
        >
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
    </div>
    <div class="azeroth">
      <icons></icons>
      <svg
        ref="board"
        class="maelstrom"
        :width="totemSize * col"
        :height="totemSize * row"
        @contextmenu.prevent
      >
        <totem
          v-for="(totem, index) in totems"
          :key="index"
          :totem="totem"
          :size="totemSize"
          @toggle="toggleTotem"
          :editing="editing"
        ></totem>
      </svg>
    </div>
    <div class="audio">
      <audio ref="water" src="./static/water.wav"></audio>
      <audio ref="fire" src="./static/fire.wav"></audio>
      <audio ref="success" src="./static/success.wav"></audio>
    </div>
  </div>
</template>

<script>
import icons from "./icons";
import totem from "./totem";
import { getNeighbors } from "../modules/util";
import Worker from "../modules/matrix.worker.js";

export default {
  name: "lava",
  components: {
    totem,
    icons
  },
  data() {
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
      prevState: "",
      prevHintIndex: 0
    };
  },
  computed: {
    totemSize() {
      return Math.min(this.width / this.colNum, this.height / this.rowNum);
    },
    status() {
      let status = [];
      for (let key in this.totems) {
        let totem = this.totems[key];
        let index = totem.row * this.colNum + totem.col;
        status[index] = totem.off ? 0 : 1;
      }
      return status;
    },
    state() {
      return this.status.reduce((a, b) => {
        return a + b;
      }, "");
    },
    weight() {
      if (this.status.length > 0) {
        return this.status.reduce((a, b) => {
          return a + b;
        }, 0);
      } else {
        return 42;
      }
    },
    colNum() {
      return ~~this.col;
    },
    rowNum() {
      return ~~this.row;
    },
    hintText() {
      let amount = this.result.length;
      return `Hint${
        amount > 0
          ? " " + ((this.prevHintIndex % amount) + 1) + "/" + amount
          : ""
      }`;
    }
  },
  created() {
    window.addEventListener("resize", this.resize);
    const worker = new Worker();
    worker.addEventListener("message", this.handleWorkerCallback);
    this.worker = worker;
  },
  watch: {
    col() {
      this.createTotems();
    },
    row() {
      this.createTotems();
    },
    weight() {
      if (!this.editing && this.weight === 0) {
        this.done();
      }
    },
    editing() {
      this.isPlayable();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.resize();
      this.init();
    });
  },
  methods: {
    init() {
      this.createTotems();
    },
    resize() {
      this.width = window.innerWidth - 16 * 2;
      this.height = window.innerHeight - 34 - 16 * 3 - 28 - 16;
    },
    createTotems() {
      let totems = {};
      for (let i = 0; i < this.rowNum; i++) {
        for (let j = 0; j < this.colNum; j++) {
          let index = i * this.colNum + j;
          totems[index] = {
            row: i,
            col: j,
            off: false,
            clicked: false,
            hint: false,
            neighbors: getNeighbors(index, this.colNum, this.rowNum)
          };
        }
      }
      this.totems = totems;
    },
    reset() {
      for (let key in this.totems) {
        let totem = this.totems[key];
        if (totem.off) {
          totem.off = false;
        }
      }
    },
    toggleTotem(totem) {
      this.audioPlay(totem.off);
      let index = totem.row * this.colNum + totem.col;
      let patch = {};
      if (!this.editing) {
        let neighbors = this.totems[index].neighbors;
        for (let neighbor of neighbors) {
          patch[neighbor] = Object.assign({}, this.totems[neighbor], {
            off: !this.totems[neighbor].off
          });
        }
      } else {
        patch[index] = Object.assign({}, this.totems[index], {
          off: !this.totems[index].off
        });
      }
      patch[index] = Object.assign({}, patch[index], {
        clicked: !this.totems[index].clicked
      });
      this.totems = Object.assign({}, this.totems, patch);
    },
    done() {
      this.$refs.success.play();
      setTimeout(() => {
        this.result = [];
        this.nextBlock();
        this.clearHint();
      }, 500);
    },
    hint() {
      let hints;
      if (this.prevState === this.state) {
        this.prevHintIndex = this.prevHintIndex + 1;
        let index = this.prevHintIndex % this.result.length;
        hints = this.result[index];
        this.updateHint(hints);
      } else {
        this.prevState = this.state;
        this.prevHintIndex = 0;
        this.worker.postMessage({
          state: this.state,
          rowNum: this.rowNum,
          colNum: this.colNum,
          type: "hint"
        });
      }
    },
    handleHint(result) {
      result = this.sortByWeight(result);
      this.result = result;
      const hints = result[0];
      if (hints) {
        this.updateHint(hints);
      } else {
        console.error("No solution!");
      }
    },
    handlePlay(result) {
      if (result.length === 0) {
        alert("No solutions!");
        this.editing = true;
      }
      if (this.prevState !== this.state) {
        this.clearHint();
      }
    },
    handleWorkerCallback(event) {
      const { result, type } = event.data;
      const handler = type === "play" ? this.handlePlay : this.handleHint;
      handler(result);
    },
    updateHint(hints) {
      let state = {};
      Array.from(hints).forEach((hint, index) => {
        state[index] = Object.assign({}, this.totems[index], {
          hint: hint === "1",
          clicked: false
        });
      });
      this.totems = Object.assign({}, this.totems, state);
    },
    clearHint() {
      for (let key in this.totems) {
        this.totems[key].hint = false;
        this.totems[key].clicked = false;
      }
      this.result = [];
    },
    sortByWeight(result) {
      return result.sort((a, b) => {
        let wa = a.replace(/0/g, "");
        let wb = b.replace(/0/g, "");
        return wa.length < wb.length;
      });
    },
    nextBlock() {
      this.row = ~~this.row + 1;
      this.col = ~~this.col + 1;
    },
    isPlayable() {
      if (this.editing) return;
      this.worker.postMessage({
        state: this.state,
        rowNum: this.rowNum,
        colNum: this.colNum,
        type: "play"
      });
    },
    audioPlay(off) {
      if (off) {
        let fire = this.$refs.fire;
        fire.currentTime = 0;
        fire.play();
      } else {
        let water = this.$refs.water;
        water.currentTime = 0;
        water.play();
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  }
};
</script>

<style scoped>
.lava {
}
.lava-title {
  margin: 16px 0;
}

.bg-fire {
  background-color: #f44336;
}

.bg-water {
  background-color: #2196f3;
}

.fire {
  color: #f44336;
}

.water {
  color: #2196f3;
}

.maelstrom {
  user-select: none;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  user-select: none;
  margin: auto;
  margin-bottom: 16px;
  min-width: 300px;
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
  cursor: pointer;
  margin-right: 16px;
  width: 80px;
  border-radius: 34px;
}

.edit {
  padding: 0.5rem 0;
  font-size: 1rem;
  border: 0;
  color: black;
}

.edit > .input {
  display: none;
}

.input {
  max-width: 2rem;
  margin-left: 0.5rem;
  text-align: center;
}

.hint,
.reset {
  border: 0;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  color: black;
  margin-left: 16px;
  min-width: 80px;
  border-radius: 34px;
}
</style>
