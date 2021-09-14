<template>
  <section class="form__section">
    <h1>Персональные данные</h1>
    <InputBasic
      v-model.trim="field.lastName.$model"
      placeholder="Фамилия"
      :field="field.lastName"
      :customInputRules="acceptOnlyLetters"
      ref="lastName"
    />
    <InputBasic
      v-model.trim="field.firstName.$model"
      placeholder="Имя"
      :field="field.firstName"
      :customInputRules="acceptOnlyLetters"
      ref="firstName"
    />
    <InputBasic
      v-model.trim="field.patronymicName.$model"
      placeholder="Отчество"
      :field="field.patronymicName"
      :customInputRules="acceptOnlyLetters"
      ref="patronymicName"
    />
    <DateOfBirth :field="field.dateOfBirth" ref="dateOfBirth" />
    <InputBasic
      v-model.trim="field.mobilePhoneNumber.$model"
      placeholder="Мобильный телефон"
      :field="field.mobilePhoneNumber"
      :customInputRules="acceptOnlyNumbers"
      tip="Начинается с 7"
      ref="mobilePhoneNumber"
    />
    <InputsRadioGender v-model="field.gender.$model" :field="field.gender" />
  </section>
</template>

<script>
import { acceptOnlyLetters, acceptOnlyNumbers } from "@/utils/customInputRules";
import InputBasic from "./formItems/InputBasic.vue";
import InputsRadioGender from "./formGroups/InputsRadioGender.vue";
import DateOfBirth from "./formGroups/DateOfBirth.vue";
export default {
  components: { InputBasic, InputsRadioGender, DateOfBirth },
  name: "PersonData",
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
      let invalidFields = Object.keys(this.field).filter(
        (fieldName) => this.field[fieldName].$invalid
      );
      if (invalidFields) {
        this.$refs[invalidFields[0]].focus();
      }
    },

    checkInvalidFormGroup() {
      this.field.$touch();
      if (this.field.$invalid) {
        let invalidFields = Object.keys(this.field).filter(
          (fieldName) => this.field[fieldName].$invalid
        );
        if (invalidFields) {
          this.$refs[invalidFields[0]].focus();
        }
      }
      this.step += 1;
      if (this.step > 3) this.step = 3;
    },
  },
};
</script>

<style lang="sass" scoped></style>
