<template>
  <div>
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
    <!-- <section
      class="form__date"
      :class="{
        'form__date--error': field.dayOfBirth.$anyError,
        'form__date--success': !field.dayOfBirth.$invalid,
      }"
      ref="dayOfBirth"
      tabindex="0"
    >
      <div
        v-if="field.dayOfBirth.$anyError && !isShowErrorMessages"
        class="form__date__message-error"
      >
        Поля обязательны к заполнению
      </div>
      <h3 class="form__date__headline">Дата рождения*</h3>
      <div class="form__date__flex-box">
        <InputBasic
          v-model.trim="field.dayOfBirth.dayOfBirthDay.$model"
          placeholder="День"
          :field="field.dayOfBirth.dayOfBirthDay"
          :customInputRules="acceptOnlyNumbers"
          :isShowErrorMessages="isShowErrorMessages"
          tip="дд"
          ref="dayOfBirthDay"
        />
        <InputBasic
          v-model.trim="field.dayOfBirth.dayOfBirthMonth.$model"
          placeholder="Месяц"
          :field="field.dayOfBirth.dayOfBirthMonth"
          :customInputRules="acceptOnlyNumbers"
          :isShowErrorMessages="isShowErrorMessages"
          tip="мм"
          ref="dayOfBirthMonth"
        />
        <InputBasic
          v-model.trim="field.dayOfBirth.dayOfBirthYear.$model"
          placeholder="Год"
          :field="field.dayOfBirth.dayOfBirthYear"
          :customInputRules="acceptOnlyNumbers"
          :isShowErrorMessages="isShowErrorMessages"
          tip="гггг"
          ref="dayOfBirthYear"
        />
      </div>
    </section> -->
    <InputBasic
      v-model.trim="field.mobilePhoneNumber.$model"
      placeholder="Мобильный телефон"
      :field="field.mobilePhoneNumber"
      :customInputRules="acceptOnlyNumbers"
      tip="Начинается с 7"
      ref="mobilePhoneNumber"
    />
    <InputsRadioGender v-model="field.gender.$model" :field="field.gender" />

    <!-- <button style="padding: 16px" @click="normFn" type="button">
      Prev
    </button> -->
  </div>
</template>

<script>
import "./formSections.sass";
import {
  acceptOnlyLetters,
  acceptOnlyNumbers,
} from "../../utils/customInputRules";
import InputBasic from "../InputBasic.vue";
import InputsRadioGender from "../InputsRadioGender.vue";
import DateOfBirth from "../multipleInputs/DateOfBirth.vue";
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
