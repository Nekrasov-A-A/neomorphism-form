<template>
  <button
    class="button-sumbit"
    :type="buttonType"
    @click="fixFocus"
    ref="buttonSubmit"
  >
    <slot>Submit</slot>
  </button>
</template>

<script>
export default {
  name: "ButtonSubmit",
  props: {
    buttonType: {
      type: String,
      default: "sumbit",
    },
  },
  methods: {
    fixFocus: function() {
      this.$refs.buttonSubmit.blur();
    },
  },
};
</script>

<style lang="sass" scoped>
.button-sumbit
  font-size: 16px
  font-weight: 700
  padding: 1em 3em
  border: 2px dashed transparent
  outline: 0
  color: $color-dark-blue
  background-color: $color-bg
  box-shadow: -5px -5px 20px $color-white,  5px 5px 20px $color-shadow
  transition: all 0.2s ease-in-out
  cursor: pointer
  border-radius: 50px
  &:hover
    box-shadow: -2px -2px 5px $color-white, 2px 2px 5px $color-shadow
  &:active
    box-shadow: inset 1px 1px 2px $color-shadow, inset -1px -1px 2px $color-white
  &:focus
    animation: showBorder 0s .1s linear forwards
    @keyframes showBorder
      0%
        border-color: transparent
      100%
        border-color: $color-dark-blue
</style>
