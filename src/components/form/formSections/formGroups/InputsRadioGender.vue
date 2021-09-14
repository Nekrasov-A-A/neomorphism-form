<template>
  <div class="form__group form__group--2cols">
    <h3 class="form__group__headline">Укажите пол:</h3>
    <input
      type="radio"
      class="input-radio"
      v-model="picked"
      value="Мужской"
      id="male"
    />
    <label
      class="input-radio__label"
      for="male"
      tabindex="0"
      @keypress.enter="$refs.mangender.click()"
      @click="imitateBlur($event.target)"
    >
      Мужской
    </label>

    <input
      type="radio"
      class="input-radio"
      v-model="picked"
      value="Женский"
      id="female"
    />
    <label
      class="input-radio__label"
      for="female"
      tabindex="0"
      @keypress.enter="$refs.womangender.click()"
      @click="imitateBlur($event.target)"
    >
      Женский
    </label>
  </div>
</template>

<script>
export default {
  name: "InputGender",
  props: {
    field: {
      type: Object,
    },
  },
  data: () => ({
    picked: "",
  }),
  methods: {
    imitateBlur: function(target) {
      target.blur();
    },
  },
  watch: {
    picked: function(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="sass" scoped>
.input-radio__label
    font-size: 1em
    position: relative
    user-select: none
    cursor: pointer
    display: inline-block
    padding-bottom: 2em
    color: $color-dark-blue
    &:focus
      outline: 0
      animation: showOutline 0s .1s linear forwards
      @keyframes showOutline
        0%
          outline: 0
        100%
          outline: 2px dashed $color-grayish-blue
    &::after, &::before
      content: ''
      position: absolute
      width: 1em
      height: 1em
      border-radius: 50%
      box-shadow: -2px -2px 8px $color-white,  2px 2px 8px $color-shadow,
      background: $color-bg
      left: -1.6em
    &::before
      display: none

.input-radio
    display: none
    &:checked + .input-radio__label
      &::after
        background-color: $color-success
        clip-path: circle(25%)
      &::before
        display: flex
</style>
