<template>
  <div
    class="form__group"
    :class="{
      'form__group--error': field.$anyError,
      'form__group--success': !field.$invalid,
    }"
  >
    <h3 class="form__group__headline">Группа клиентов*</h3>
    <InputCheckbox
      item="VIP"
      label="VIP"
      v-model="checkedGroup"
      ref="checkbox"
      style="margin: 0"
    />
    <InputCheckbox
      item="Проблемные"
      label="Проблемные"
      v-model="checkedGroup"
      style="margin: 0"
    />
    <InputCheckbox
      item="ОМС"
      label="ОМС"
      v-model="checkedGroup"
      style="margin: 0, margin-bottom: 1em"
    />
    <div
      class="form__group__message form__group__message--error"
      v-if="field.$anyError"
    >
      Выберите как минимум одно поле
    </div>
    <div
      class="form__group__message form__group__message--tip"
      v-if="!field.$anyError && checkedGroup.length === 0"
    >
      Выберите 1 или больше значений
    </div>
  </div>
</template>

<script>
import InputCheckbox from "../formItems/InputCheckbox.vue";
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

<style lang="sass" scoped></style>
