<template>
  <div class="form__item">
    <select
      @change="$emit('input', selected)"
      ref="select"
      v-model="selected"
      @blur="field.$touch()"
      @focus="field.$reset()"
      class="input-select"
      :class="{
        'input-select--error': field.$error,
        'input-select--success':
          !field.$error &&
          field.$dirty &&
          field.$model !== 'Не выбрано' &&
          field.$model !== '',
      }"
    >
      <option value="" disabled>{{ disabledPhrase }}</option>
      <option v-for="(item, index) of optionsData" :key="index" :value="item">
        {{ item }}
      </option>
    </select>
    <div
      v-if="field.$error && field.$dirty"
      class="form__item__message form__item__message--error"
    >
      * Поле обязательно к заполнению
    </div>
  </div>
</template>

<script>
export default {
  name: "InputSelect",
  data: () => ({
    selected: "",
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
  methods: {
    focus: function() {
      this.$refs.select.focus();
    },
  },
};
</script>

<style lang="sass" scoped>
.input-select
  background: url('../../../../assets/caret-down-solid.svg') no-repeat right 0.8em center / 1.4em
  padding: 1.14em
    right: 3.2em
  font-size: 0.875em
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
  &--success
    border-color: $color-success
  > option
    color: $color-dark-blue
    background-color: $color-bg
</style>
