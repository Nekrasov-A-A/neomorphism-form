<template>
  <section
    class="form__group form__group--3cols"
    :class="{
      'form__group--error': field.$anyError,
      'form__group--success': !field.$invalid,
    }"
  >
    <div
      v-if="field.$anyError && !isShowErrorMessages"
      class="form__group__message form__group__message--error"
    >
      Поля обязательны к заполнению
    </div>
    <h3 class="form__group__headline">Дата рождения*</h3>
    <InputBasic
      v-model.trim="field.day.$model"
      placeholder="День"
      :field="field.day"
      :customInputRules="acceptOnlyNumbers"
      :isShowErrorMessages="isShowErrorMessages"
      tip="дд"
      ref="day"
    />
    <InputBasic
      v-model.trim="field.month.$model"
      placeholder="Месяц"
      :field="field.month"
      :customInputRules="acceptOnlyNumbers"
      :isShowErrorMessages="isShowErrorMessages"
      tip="мм"
      ref="month"
    />
    <InputBasic
      v-model.trim="field.year.$model"
      placeholder="Год"
      :field="field.year"
      :customInputRules="acceptOnlyNumbers"
      :isShowErrorMessages="isShowErrorMessages"
      tip="гггг"
      ref="year"
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
