<template>
  <div class="form__item">
    <textarea
      class="textarea"
      placeholder="Кем выдан"
      @change="$emit('input', $event.target.value)"
    ></textarea>
  </div>
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
.textarea
    resize: vertical
    min-height: 6.25em
    max-height: 12.5em
    width: 100%
    font-size: 1em
    color: $color-dark-blue
    border: 2px dashed transparent
    padding: 0.25em .5em
    background: $color-bg
    box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px transparentize($color-white,.3)
    border-radius: 8px
    transition: all .3s
    &::placeholder
      color: $color-grayish-blue
      font-size: 0.875em
    &:focus
      outline: 0
      border-color: $color-dark-blue
      box-shadow:  inset 1px 1px 2px $color-shadow, inset -1px -1px 2px $color-white
</style>
