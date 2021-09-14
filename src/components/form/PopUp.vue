<template>
  <div class="container" @click.self="closePopUp">
    <div class="container__card">
      <img
        src="@/assets/times-circle-regular.svg"
        alt="times icon"
        @click="closePopUp"
      />
      <div class="container__card__form-data" v-if="isShowFormData">
        {{ formData }}
      </div>
      <div class="container__card-content" v-else>
        <h1>
          Thanks for <br />
          testing!
        </h1>
        <div @click="isShowFormData = isShowFormData ? false : true">
          <ButtonSubmit buttonType="button">Show formData</ButtonSubmit>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonSubmit from "./ButtonSubmit.vue";
export default {
  components: { ButtonSubmit },
  name: "PopUp",
  props: {
    formData: {
      type: [Object, String],
      default: "Soon!",
    },
  },
  data: () => ({
    isShowFormData: false,
  }),
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
  padding: 0 5%

  &__card

    width: 60vw
    height: 80vh
    background-color: $color-bg
    border-radius: 16px
    position: relative
    @media screen and (max-width: $mobile)
      width: 100%
      padding: 0 5%
    > img
        height: 32px
        width: 32px
        position: absolute
        top: 1em
        right: 1em
        cursor: pointer
    &__form-data
      width: 100%
      height: 100%
      display: flex
      align-items: center
      justify-content: center
      padding: 0 10%
    &-content
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      width: 100%
      height: 100%
      > h1
        color: $color-dark-blue
        font-size: 3em
        box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px transparentize($color-white,.3)
        padding: 1em
        border-radius: 8px
        text-align: center
        line-height: 1.1em
        margin-bottom: .7em
</style>
