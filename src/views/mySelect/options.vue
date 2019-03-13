<template>
  <div class="my-select__dropdown ms-dropdown" v-show="opened">
    <div class="ms-dropdown__item"
      v-for="(item, index) in options" :key="index"
      @mouseover="hover(index)"
      :class="{'active': index === active}">
      <a href="###" @click="$emit('action', index)">{{ item }}</a>
    </div>
  </div>
</template>

<style lang="scss">
  a {
    text-decoration: none;
  }

  .my-select {
    &__dropdown {
      width: 100%;
      position: absolute;
      left: 0;
      top: 35px;
    }
  }

  .ms-dropdown {
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 1px #ccc;
    padding: 2px 0;
    &__item {
      a {
        display: block;
        padding: 10px;
        line-height: 1;
        cursor: default;
      }
      &.active a {
        color: #FFF;
        background: skyblue;
      }
    }
  }
</style>

<script>
export default {
  name: 'mySelectDropdown',
  props: {
    options: Array,
    current: Number,
    opened: Boolean
  },
  data () {
    return {
      active: 0
    }
  },
  watch: {
    current (val) {
      this.active = val
    }
  },
  methods: {
    hover (index) {
      this.active = index
    }
  }
}
</script>
