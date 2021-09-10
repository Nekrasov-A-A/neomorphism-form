<template>
  <section
    class="form__date  form__date__passport-date"
    :class="{
      'form__date--error': field.$anyError,
      'form__date--success':
        !field.$anyError &&
        field.$dirty &&
        field.seriesOfPassport.$model !== '' &&
        field.numberOfPassport.$model !== '',
    }"
  >
    <div
      v-if="field.$anyError && !isShowErrorMessages"
      class="form__date__message-error"
    >
      Значение неприемлимо
    </div>
    <h3 class="form__date__headline">Данные документа:</h3>
    <div class="form__date__flex-box">
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
      />
    </div>
  </section>
</template>

<script>
import "../formSections/formSections.sass";
import {
  acceptOnlyLetters,
  acceptOnlyNumbers,
} from "../../utils/customInputRules";
import InputBasic from "../InputBasic.vue";
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
