<template>
  <div class="form__item">
    <input
      class="input-basic"
      :class="{
        'input-basic--error': field.$error,
        'input-basic--inner-bs': !isShowErrorMessages,
      }"
      @blur="field.$touch()"
      :placeholder="isRequired()"
      :type="inputType"
      :value="value"
      @change="$emit('input', $event.target.value)"
      @keypress="customValidateInput($event)"
      ref="inputBasic"
    />
    <label
      class="input-basic__label"
      :class="{
        'input-basic__label--success':
          value !== '' && !field.$invalid && field.$dirty,
        'input-basic__label--error': field.$error && field.$model !== '',
      }"
      >{{ placeholder }}
      <img src="@/assets/check-circle-solid.svg" alt="check icon" />
    </label>
    <!-- Error-message start -->
    <div
      class="form__item__message form__item__message--error"
      v-if="field.required === false && field.$dirty && isShowErrorMessages"
      role="status"
      aria-live="polite"
    >
      * Поле обязательно к заполнению
    </div>
    <div
      class="form__item__message form__item__message--error"
      v-else-if="
        field.minValue === false && field.$dirty && isShowErrorMessages
      "
      role="status"
      aria-live="polite"
    >
      Введите значение больше чем {{ field.$params.minValue.min }}
    </div>
    <div
      class="form__item__message form__item__message--error"
      v-else-if="
        field.maxValue === false && field.$dirty && isShowErrorMessages
      "
      role="status"
      aria-live="polite"
    >
      Введите значение меньше чем {{ field.$params.maxValue.max }}
    </div>
    <div
      class="form__item__message form__item__message--error"
      v-else-if="field.minLength === false && isShowErrorMessages"
      role="status"
      aria-live="polite"
    >
      Введите еще
      {{ field.$params.minLength.min - field.$model.length }} символов
    </div>
    <div
      class="form__item__message form__item__message--error"
      v-else-if="field.alphaRuEn === false && isShowErrorMessages"
      role="status"
      aria-live="polite"
    >
      Используйте только буквы
    </div>
    <div
      class="form__item__message form__item__message--error"
      v-else-if="
        field.firstValueMobilePhoneNumber === false && isShowErrorMessages
      "
      role="status"
      aria-live="polite"
    >
      Номер должен начинаться с 7
    </div>
    <div
      class="form__item__message form__item__message--error"
      v-else-if="field.MobilePhoneNumberLength === false && isShowErrorMessages"
      role="status"
      aria-live="polite"
    >
      Введите 11 цифр
    </div>
    <!-- Error-message end- -->
    <div
      class="form__item__message form__item__message--tip"
      v-else
      role="status"
      aria-live="polite"
    >
      {{ tip }}
    </div>
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
    isShowErrorMessages: {
      type: Boolean,
      default: true,
    },
    tip: {
      type: [String, Boolean],
      default: "",
    },
  },
  data: () => ({
    errorMessages,
  }),

  methods: {
    focus: function() {
      this.$refs.inputBasic.focus();
    },
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
.form__item
  position: relative
  padding-bottom: 1.25em
  margin-bottom: 1.75em
  &__message
    position: absolute
    bottom: 0.25em
    left: 1em
    font-size: 0.75em
    &--error
      color: $color-red
    &--tip
      color: $color-grayish-blue



.input-basic
  border: 1px solid transparent
  padding: 1em
  border-radius: 50px
  outline: 0
  background-color: $color-bg
  text-shadow: 1px 1px 0 $color-white
  box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px transparentize($color-white, 0.3)
  width: 100%
  box-sizing: border-box
  transition: all 0.2s ease-in-out
  appearance: none
  -webkit-appearance: none
  color: $color-dark-blue
  font-size: 1em
  @media screen and (max-width: $mobile)
    padding: 0.75em
  &:focus
    box-shadow:  inset 1px 1px 2px $color-shadow, inset -1px -1px 2px $color-white
  &:focus::placeholder
    opacity: 0
  &:focus + .input-basic__label
    display: flex
    animation: moveToTop .5s ease forwards
    @keyframes moveToTop
      from
        top: 50%
        opacity: .7
      to
        top: -0.714em
        opacity: 1
  &::placeholder
    color: $color-grayish-blue
    font-size: 0.875em
  &--inner-bs
    box-shadow:  inset 1px 1px 2px $color-shadow, inset -1px -1px 2px $color-white
  &--error
    border-color: $color-red
    &::placeholder
      color: $color-red
  &__label
    position: absolute
    top: 50%
    left: 1.143em
    transform: translateY(-50%)
    color: $color-grayish-blue
    cursor: text
    display: none
    font-size: 0.875em
    @media screen and (max-width: $mobile)
      left: 0.75em
    > img
      width: 1em
      height: 1em
      display: none
    &--success
        color: $color-success
        top: -0.714em
        display: flex
        > img
          display: flex
          margin-left: 0.286em
    &--error
      color: $color-red
      display: flex
      top: -0.714em
</style>
