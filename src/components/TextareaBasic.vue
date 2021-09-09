<template>
  <section class="form-textarea">
    <textarea
      class="form-textarea__textarea"
      placeholder="Кем выдан"
      @change="$emit('input', $event.target.value)"
    ></textarea>
  </section>
</template>

<script>
export default {
  name: "TextareaBasic",
  data: () => ({}),
  props: {
    field: {
      type: Object,
    },
  },
};
</script>

<style lang="sass" scoped>
.form-textarea
  &__textarea
    resize: vertical
    min-height: 100px
    max-height: 200px
    min-width: 200px
    font-size: 16px
    color: $color-dark-blue
    border: 2px dashed transparent
    padding: 4px 8px
    background: $color-bg
    box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px transparentize($color-white,.3)
    border-radius: 8px
    transition: all .3s
    margin-bottom: 36px
    &::placeholder
      color: $color-grayish-blue
      font-size: 14px
    &:focus
      outline: 0
      border-color: $color-dark-blue
      box-shadow:  inset 1px 1px 2px $color-shadow, inset -1px -1px 2px $color-white
</style>
