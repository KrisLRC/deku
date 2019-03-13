<template>
  <div class="my-select" :class="{'opened': opened}">
    <label class="my-select__wrapper">
      <input readonly class="my-select__input" type="text" :placeholder="placeholder"
        v-model="view" @click="toggle" @blur="blur"
        @keyup.up.left="prev" @keyup.down.right="next" @keyup.enter="enter">
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
      border-color: #c0c4cc transparent transparent transparent;
      position: absolute;
      top: 50%;
      right: 10px;
      margin-top: -3px;
      transition: all 0.3s;
    }

    &.opened::after {
      margin-top: -9px;
      transform: rotate(180deg);
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
      cursor: pointer;
      transition: border-color 0.2s ease-out;

      &:hover {
        border-color: #aaa;
      }

      &::placeholder {
        color: #c0c4cc;
      }

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
      current: null,
      options: [
        'Apple',
        'Banana',
        'Orange'
      ],
      opened: false,
      isInsideOfDropdown: false
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: Number,
      default: -1
    }
  },
  created () {
    this.current = this.value
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
