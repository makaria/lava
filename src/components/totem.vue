<template>
  <g class="totem" :transform="transform" @click="toggle">
    <rect class="totem"
          :width="size"
          :height="size"
          :x="0"
          :y="0">
    </rect>
    <svg class="icon" :class="iconClass" :width="size * scale" :height="size * scale" :x="size * offset" :y="size * offset">
      <use :xlink:href="icon"></use>
    </svg>
    <!-- <image  :x="x"
            :y="y"
            :width="width"
            :height="height"
            :href="out"
            /> -->
  </g>
</template>

<script>
export default {
  name: 'totem',
  props: {
    totem: {},
    size: 0,
    editing: false
  },
  data () {
    return {
      // clicked: false
    }
  },
  computed: {
    x () {
      return this.totem.col * this.size
    },
    y () {
      return this.totem.row * this.size
    },
    out () {
      return this.totem.off ? 'water' : 'fire'
      // let out = this.totem.off ? 'water' : 'fire'
      // return this.hint ? out + ' ' + this.hint : out
    },
    icon () {
      return this.totem.off ? '#icon-water' : '#icon-fire'
    },
    transform () {
      return `translate(${this.x}, ${this.y})`
    },
    scale () {
      return this.totem.off ? 0.8 * 0.9 : 0.8
    },
    offset () {
      return (1 - this.scale) / 2
    },
    hint () {
      return (((this.totem.hint && !this.clicked) || (this.totem.hint === false && this.clicked)) && !this.editing) ? 'hint' : ''
    },
    clicked () {
      return this.totem.clicked
    },
    iconClass () {
      return this.out + ' ' + this.hint
    }
  },
  methods: {
    toggle: function () {
      this.$emit('toggle', this.totem)
    }
  }
}
</script>

<style scoped>
.totem {
  fill: #e0e0e0;
  stroke: black;
  cursor: pointer;
}

.fire {
  fill: #f44336;
  stroke: #f44336;
}

.water {
  fill: #2196f3;
  stroke: #2196f3;
}

.hint {
  fill: transparent;
}

.icon {
  display: inline-block;
  /* width: 1em;
  height: 1em; */
  /* stroke-width: 0; */
  /* stroke: currentColor; */
  /* fill: currentColor; */
}
</style>

