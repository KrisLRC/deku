<template>
  <div class="my-select">
    <label class="my-select__wrapper">
      <input readonly class="my-select__input" type="text" v-model="view"
        @keyup.up.left="prev" @keyup.down.right="next" @keyup.enter="enter"
        @click="toggle" @blur="blur">
    </label>
    <dropdown :opened="opened" :options="options" :current="current"
      @mouseover.native="over" @mouseout.native="out"
      @action="action" ref="mySelectDropdown"></dropdown>
  </div>
</template>

<style lang="scss">
  * {
    box-sizing: border-box;
    color: #666;
  }
  .my-select {
    display: inline-block;
    position: relative;
    user-select: none;

    &::after {
      content: "";
      border: 5px solid;
      width: 0;
      height: 0;
      border-color: #666 transparent transparent transparent;
      position: absolute;
      top: 50%;
      right: 10px;
      margin-top: -3px;
    }

    &__input {
      padding: 6px 28px 6px 12px;
      line-height: 1.42858;
      border: 1px solid #ccc;
      border-radius: 4px;
      min-width: 180px;
      width: 180px;
      display: block;
      box-sizing: border-box;
      position: relative;
      cursor: default;

      // 解决 使用table键获取焦点的时候，会导致input框中的文本被选中的蓝色背景。
      &::selection {
        background: transparent;
      }

      &::-moz-selection {
        background: transparent;
      }
    }
  }
</style>

<script>
import dropdown from './options'

const isNum = val => typeof val === 'number'

export default {
  name: 'mySelect',
  components: {
    dropdown
  },
  data () {
    return {
      current: 0,
      options: [
        'Apple',
        'Banana',
        'Orange'
      ],
      opened: false,
      isInsideOfDropdown: false
    }
  },
  computed: {
    view () {
      return this.options[this.current]
    }
  },
  methods: {
    prev () {
      if (isNum(this.current) && this.current > 0) {
        this.current--
      }
    },
    next () {
      if (isNum(this.current) && this.current < this.options.length - 1) {
        this.current++
      }
    },
    toggle (val) {
      this.opened = typeof val === 'boolean' ? val : !this.opened
    },
    action (index) {
      this.current = index
      this.toggle()
    },
    enter () {
      if (this.opened) {
        this.action(this.$refs.mySelectDropdown.active)
      } else {
        this.toggle()
      }
    },
    blur () {
      if (this.opened) {
        if (!this.isInsideOfDropdown) {
          this.toggle(false)
        }
      }
    },
    over () {
      this.isInsideOfDropdown = true
    },
    out () {
      this.isInsideOfDropdown = false
    }
  }
}
</script>
