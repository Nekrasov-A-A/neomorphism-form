<template>
  <div class="form-gender">
    <input
      type="radio"
      class="form-gender__input"
      v-model="picked"
      value="Мужской"
      id="man"
    />
    <label class="form-gender__label" for="man"> Мужской </label>

    <input
      type="radio"
      class="form-gender__input"
      v-model="picked"
      value="Женский"
      id="woman"
    />
    <label class="form-gender__label" for="woman"> Женский </label>
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
  &__label
    font-size: 14px
    position: relative
    user-select: none
    cursor: pointer
    display: inline-block
    margin-left: 3em
    color: $color-dark-blue
    &:first-child
      margin-left: 0
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
