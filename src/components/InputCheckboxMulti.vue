<template>
  <div
    class="multiple-checkbox"
    :class="{ 'multiple-checkbox--error': field.$anyError }"
  >
    <h3>Группа клиентов*</h3>
    <InputCheckbox
      item="VIP"
      label="VIP"
      v-model="checkedGroup"
      ref="checkbox"
    />
    <InputCheckbox
      item="Проблемные"
      label="Проблемные"
      v-model="checkedGroup"
    />
    <InputCheckbox item="ОМС" label="ОМС" v-model="checkedGroup" />
    <div
      class="multiple-checkbox__message multiple-checkbox__message--error"
      v-if="field.$anyError"
    >
      Выберите как минимум одно поле
    </div>
    <div
      class="multiple-checkbox__message multiple-checkbox__message--tip"
      v-if="!field.$anyError && checkedGroup.length === 0"
    >
      Выберите 1 или больше значений
    </div>
  </div>
</template>

<script>
import InputCheckbox from "./InputCheckbox.vue";
export default {
  components: { InputCheckbox },
  name: "InputCheckBox",
  props: {
    value: {
      type: Array,
    },

    field: {
      type: Object,
    },
  },
  data: () => ({
    checkedGroup: [],
  }),

  methods: {
    focus: function() {
      this.$refs.checkbox.focus();
    },
    fixFocusBug: function(event) {
      event.target.parentNode.blur();
    },
  },
  watch: {
    checkedGroup: {
      handler: function(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.multiple-checkbox
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: center
  position: relative
  margin-bottom: 36px
  border: 2px solid transparent
  border-radius: 8px
  padding: 16px
    bottom: 42px
  box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px transparentize($color-white,.3)
  @media screen and (max-width: $mobile)
    flex-direction: column
    width: 100%
  &--error
    border-color: $color-red
  > h3
    color: $color-dark-blue
    font-size: 14px
    width: 100%
    margin-bottom: 10px
    text-align: left
    cursor: default
  > *
    margin-left: 12px
    &:nth-child(1),&:nth-child(2)
      margin-left: 0
  &__message
    position: absolute
    bottom: -16px
    left: 0
    font-size: 12px
    &--error
      color: $color-red
    &--tip
      color: $color-grayish-blue
</style>
