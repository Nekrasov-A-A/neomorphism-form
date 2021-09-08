<template>
  <div class="container" @click.self="closePopUp">
    <div class="container__card">
      <h1>Thanks for testing!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  methods: {
    closePopUp: function() {
      this.$emit("closePopUp");
    },
  },
};
</script>

<style lang="sass" scoped>
.container
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background-color: hsla(0,0%,0%,.3)
  backdrop-filter: blur(2px)
  display: flex
  align-items: center
  justify-content: center
  z-index: 2
  &__card
    display: flex
    align-items: center
    justify-content: center
    width: 60vw
    height: 80vh
    background-color: #fff
    border-radius: 16px
    > h1
      color: $color-dark-blue
</style>
