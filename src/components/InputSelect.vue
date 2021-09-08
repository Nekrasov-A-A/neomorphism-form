<template>
  <div class="form-group">
    <label>
      <slot></slot>
    </label>
    <select
      @change="$emit('input', selected)"
      v-model="selected"
      @blur="field.$touch()"
      @focus="field.$reset()"
      class="form-group__select"
      :class="{ 'form-group__select--error': field.$error }"
    >
      <option value="" disabled>{{ disabledPhrase }}</option>
      <option v-for="(item, index) of optionsData" :key="index" :value="item">
        {{ item }}
      </option>
    </select>
    <div v-if="field.$error && field.$dirty" class="form-group__error-message">
      {{ errorMessages.required }}
    </div>
  </div>
</template>

<script>
import errorMessages from "../utils/errorMessages";
export default {
  name: "InputSelect",
  data: () => ({
    selected: "",
    errorMessages,
  }),
  props: {
    optionsData: {
      type: [String, Array],
    },
    disabledPhrase: {
      type: String,
    },
    field: {
      type: Object,
    },
  },
};
</script>

<style lang="sass" scoped>
.form-group
  margin-bottom: 20px
  padding-bottom: 20px
  position: relative
  display: flex
  &__error-message
    position: absolute
    bottom: 4px
    left: 16px
    font-size: 12px
    color: $color-red
  &__select
      background: url('../assets/caret-down-solid.svg') no-repeat right 0.8em center / 1.4em
      padding: 16px
        right: 3.2em
      font-size: 14px
      border-radius: 50px
      cursor: pointer
      background-color: $color-bg
      text-shadow: 1px 1px 0 $color-white
      box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px transparentize($color-white,.3)
      width: 100%
      box-sizing: border-box
      appearance: none
      -webkit-appearance: none
      color: $color-dark-blue
      border: 2px solid transparent
      &:focus
        box-shadow: inset 1px 1px 2px $color-shadow, inset -1px -1px 2px $color-white
        animation: showBorder 0s .1s linear forwards
        outline: 0
        @keyframes showBorder
          0%
            border: 2px solid transparent
          100%
            border: 2px solid $color-dark-blue
      &--error
        border-color: $color-red
      > option
        color: $color-dark-blue
        background-color: $color-bg
</style>
