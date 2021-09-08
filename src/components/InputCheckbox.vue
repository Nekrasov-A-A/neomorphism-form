<template>
  <div class="input-checkbox">
    Получать уведомления
    <input
      class="input-checkbox__input"
      type="checkbox"
      @change="$emit('input', checked)"
      v-model="checked"
      id="toggle"
    />
    <label
      class="input-checkbox__label"
      tabindex="0"
      for="toggle"
      @keypress.enter="checked = checked ? false : true"
      @keypress.space="checked = checked ? false : true"
      @click="fixFocusBug"
      ref="fixFocusBug"
    >
      <img src="@/assets/check-solid.svg" alt="check icon" />
    </label>
  </div>
</template>

<script>
export default {
  name: "InputCheckBox",
  data: () => ({
    checked: false,
  }),
  methods: {
    fixFocusBug: function() {
      this.$refs.fixFocusBug.blur();
    },
  },
  props: {
    value: {
      type: Boolean,
    },

    field: {
      type: Object,
    },
  },
};
</script>

<style lang="sass" scoped>
.input-checkbox
  margin-bottom: 20px
  display: flex
  align-items: center
  justify-content: center
  cursor: default
  font-size: 14px
  color: $color-dark-blue
  &__label
    box-shadow: -5px -5px 20px $color-white,  5px 5px 20px $color-shadow
    width: 32px
    height: 32px
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    border-radius: 8px
    margin-left: 20px
    transition: all .3s
    background: transparentize($color-white,.2)
    border: 1px solid transparentize($color-white,.3)
    &:hover
      box-shadow: -2px -2px 5px transparentize($color-white,.3), 2px 2px 5px $color-shadow
      border-color: transparent
    &:focus
      outline: 0
      animation: showOutline 0s .1s linear forwards
      @keyframes showOutline
        0%
         outline: 0
        100%
          outline: 2px dashed $color-dark-blue
    > img
      opacity: 0
      transition: all .2s
  &__input
    display: none
  &__input:checked + label
    background: transparent
    > img
      opacity: 1
      width: 24px
      height: 24px
</style>
