<template>
  <div class="form-group">
    <input
      class="form-group__input"
      :class="{ 'form-group__input--error': field.$error }"
      @blur="field.$touch()"
      @focus="field.$reset()"
      :placeholder="isRequired()"
      :type="inputType"
      :value="value"
      @change="$emit('input', $event.target.value)"
      @keypress="customValidateInput($event)"
    />

    <label
      class="form-group__label"
      :class="{
        'form-group__label--success':
          value !== '' && !field.$invalid && field.$dirty,
      }"
      >{{ placeholder }}
      <img src="@/assets/check-circle-solid.svg" alt="check icon" />
    </label>
    <!-- Error-message start -->
    <div
      v-for="(item, index) of Object.keys(field.$params)"
      :key="index"
      class="form-group__error-message"
      v-show="!field[item] && field.$dirty"
    >
      {{ errorMessages[item] }}
    </div>
    <!-- Error-message end- -->
  </div>
</template>

<script>
import errorMessages from "../utils/errorMessages";

export default {
  name: "InputBasic",
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    field: {
      type: Object,
    },
    inputType: {
      type: String,
      default: "text",
    },
    customInputRules: {
      type: Function,
    },
  },
  data: () => ({
    errorMessages,
  }),
  methods: {
    customValidateInput: function(event) {
      if (
        event.charCode === 9 ||
        event.charCode === 13 ||
        event.charCode === 37 ||
        event.charCode === 39 ||
        event.charCode === 38 ||
        event.charCode === 40 ||
        event.charCode === 8 ||
        event.charCode === 17 ||
        (event.charCode === 86 && event.ctrlKey)
      ) {
        return;
      }
      if (this.customInputRules(event.key)) {
        return;
      }
      event.preventDefault();
    },
    isRequired: function() {
      if (this.field.required === false) return this.placeholder + "*";
      return this.placeholder;
    },
  },
};
</script>

<style lang="sass" scoped>
.form-group
  position: relative
  padding-bottom: 20px
  margin-bottom: 16px
  &__error-message
    position: absolute
    bottom: 4px
    left: 16px
    font-size: 12px
    color: $color-red
  &__label
    position: absolute
    top: 50%
    left: 16px
    transform: translateY(-50%)
    color: $color-grayish-blue
    cursor: text
    display: none
    font-size: 14px
    > img
      width: 14px
      height: 14px
      display: none
    &--success
        color: $color-success
        top: -10px
        display: flex
        > img
          display: flex
          margin-left: 4px

  &__input
      border: 1px solid transparent
      padding: 16px
      font-size: 16px
      border-radius: 50px
      outline: 0
      background-color:$color-bg
      text-shadow: 1px 1px 0 $color-white
      box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px transparentize($color-white,.3)
      width: 100%
      box-sizing: border-box
      transition: all 0.2s ease-in-out
      appearance: none
      -webkit-appearance: none
      color: $color-dark-blue
      &:focus
        box-shadow:  inset 1px 1px 2px $color-shadow, inset -1px -1px 2px $color-white
      &:focus::placeholder
        opacity: 0
      &:focus + .form-group__label
        display: flex
        animation: moveToTop .5s ease forwards
        @keyframes moveToTop
          from
            top: 50%
            opacity: .7
          to
            top: -10px
            opacity: 1
      &::placeholder
        color: $color-grayish-blue
        font-size: 14px
      &--error
        border-color: $color-red
        box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px transparentize($color-white,.3), inset 0 0 2px transparentize($color-red,.5), 0 0 2px  transparentize($color-red,.5)
        &::placeholder
          color: $color-red
</style>
