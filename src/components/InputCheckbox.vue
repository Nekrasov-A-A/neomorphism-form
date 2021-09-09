<template>
  <div class="input-checkbox">
    <h1>{{ label }}</h1>
    <input
      class="input-checkbox__input"
      type="checkbox"
      :id="item"
      :value="item"
      v-model="checked"
      @change="$emit('input', localValue)"
      :ref="item"
    />
    <label
      class="input-checkbox__label"
      tabindex="0"
      :for="item"
      @click="fixFocusBug($event)"
      @keypress.enter="imitateInputChange(item)"
    >
      <img src="@/assets/check-solid.svg" alt="check icon" />
    </label>
  </div>
</template>

<script>
export default {
  name: "InputCheckBox",
  props: {
    value: {
      type: [Boolean, Array],
    },
    field: {
      type: Object,
    },
    item: {
      type: [String, Array],
    },
    label: {
      type: String,
    },
  },

  data: () => ({
    localValue: false,
  }),

  methods: {
    fixFocusBug: function(event) {
      event.target.parentNode.blur();
      event.target.blur();
    },
    imitateInputChange: function(value) {
      this.$refs[value].click();
    },
  },

  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(val) {
        this.localValue = val;
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.input-checkbox
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
    margin-left: 10px
    transition: all .3s
    background: transparentize($color-white,.2)
    border: 1px solid transparentize($color-white,.3)
    user-select: none
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
