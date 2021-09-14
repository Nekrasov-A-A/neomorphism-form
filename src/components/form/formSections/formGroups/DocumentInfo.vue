<template>
  <section
    class="form__group  form__group--3cols"
    :class="{
      'form__group--error': field.$anyError,
      'form__group--success':
        !field.$anyError &&
        field.$dirty &&
        field.seriesOfPassport.$model !== '' &&
        field.numberOfPassport.$model !== '',
    }"
  >
    <div
      v-if="field.$anyError && !isShowErrorMessages"
      class="form__group__message form__group__message--error"
    >
      Значение неприемлимо
    </div>
    <h3 class="form__group__headline">Данные документа:</h3>
    <InputBasic
      v-model.trim="field.seriesOfPassport.$model"
      placeholder="Серия"
      :field="field.seriesOfPassport"
      :customInputRules="acceptOnlyNumbers"
      :isShowErrorMessages="isShowErrorMessages"
      ref="seriesOfPassport"
    />
    <InputBasic
      v-model.trim="field.numberOfPassport.$model"
      placeholder="Номер"
      :field="field.numberOfPassport"
      :customInputRules="acceptOnlyNumbers"
      :isShowErrorMessages="isShowErrorMessages"
      ref="numberOfPassport"
      style="grid-column: 2/4"
    />
  </section>
</template>

<script>
import { acceptOnlyLetters, acceptOnlyNumbers } from "@/utils/customInputRules";
import InputBasic from "../formItems/InputBasic.vue";
export default {
  name: "DateOfBirth",
  components: { InputBasic },
  props: {
    field: {
      type: Object,
    },
  },
  data: () => ({
    isShowErrorMessages: false,
    acceptOnlyLetters,
    acceptOnlyNumbers,
  }),
  methods: {
    focus() {
      let errorInputs = Object.keys(this.field.$model).filter(
        (el) => this.field[el].$invalid
      );
      if (errorInputs) {
        this.$refs[errorInputs[0]].focus();
      }
    },
  },
};
</script>
