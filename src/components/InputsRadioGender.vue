<template>
  <div class="form-gender">
    <h3 class="form-gender__headline">Выберите пол:</h3>
    <div class="form-gender__flex-box">
      <input
        type="radio"
        class="form-gender__input"
        v-model="picked"
        value="Мужской"
        id="mangender"
        ref="mangender"
      />
      <label
        class="form-gender__label"
        for="mangender"
        tabindex="0"
        @keypress.enter="$refs.mangender.click()"
        @click="imitateBlur($event.target)"
      >
        Мужской
      </label>

      <input
        type="radio"
        class="form-gender__input"
        v-model="picked"
        value="Женский"
        id="womangender"
        ref="womangender"
      />
      <label
        class="form-gender__label"
        for="womangender"
        tabindex="0"
        @keypress.enter="$refs.womangender.click()"
        @click="imitateBlur($event.target)"
      >
        Женский
      </label>
    </div>
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
.form-gender
  margin-bottom: 20px
  display: flex
  flex-direction: column
  box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px transparentize($color-white,.3)
  padding: 16px
    bottom: 24px
  border-radius: 10px
  &__headline
    color: $color-dark-blue
    font-size: 14px
    width: 100%
    margin-bottom: 16px
    text-align: left
    cursor: default
  &__flex-box
    display: flex
    justify-content: center
    align-items: center
  &__label
    font-size: 14px
    position: relative
    user-select: none
    cursor: pointer
    display: inline-block
    margin-left: 2em
    margin-right: 1em
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
      width: 14px
      height: 14px
      border-radius: 50%
      box-shadow: -2px -2px 8px $color-white,  2px 2px 8px $color-shadow,
      background: $color-bg
      left: -1.6em
    &::before
      display: none
  &__input
    display: none
    &:checked + .form-gender__label
      &::after
        background-color: $color-success
        clip-path: circle(25%)
      &::before
        display: flex
</style>
