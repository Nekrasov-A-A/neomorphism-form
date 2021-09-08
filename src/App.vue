<template>
  <div id="app">
    <div class="wrapper">
      <PopUp v-if="isShowPopUp" @closePopUp="closePopUp" />
      <form class="form" @submit.prevent="onSubmit" novalidate>
        <!--  -->
        <InputBasic
          v-model.trim="$v.form.lastName.$model"
          placeholder="Фамилия"
          :field="$v.form.lastName"
          :customInputRules="acceptOnlyLetters"
        />

        <InputBasic
          v-model.trim="$v.form.firstName.$model"
          placeholder="Имя"
          :field="$v.form.firstName"
          :customInputRules="acceptOnlyLetters"
        />

        <InputBasic
          v-model.trim="$v.form.patronymicName.$model"
          placeholder="Отчество"
          :field="$v.form.patronymicName"
          :customInputRules="acceptOnlyLetters"
        />
        <!-- HERE IS DATEPICKER!!!!!!!!!!!!!!! -->
        <InputBasic
          v-model.trim="$v.form.mobilePhoneNumber.$model"
          placeholder="Мобильный телефон"
          :field="$v.form.mobilePhoneNumber"
          :customInputRules="acceptOnlyNumbers"
        />

        <InputSelect
          :optionsData="doctorsData"
          v-model="$v.form.doctor.$model"
          :field="$v.form.doctor"
          disabledPhrase="Выберите врача"
        />
        <!--  -->
        <InputCheckBox
          v-model="$v.form.isNotify.$model"
          :field="$v.form.isNotify"
        />

        <!-- PASSPORT START -->

        <InputSelect
          :optionsData="typeOfDocumentsData"
          v-model="$v.form.passport.documentType.$model"
          :field="$v.form.passport.documentType"
          disabledPhrase="Выберите тип документа*"
        />

        <!-- PASSPORT END -->
        <ButtonSubmit>Отправить</ButtonSubmit>
        <!--  -->
      </form>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import InputBasic from "./components/InputBasic.vue";
import InputCheckBox from "./components/InputCheckbox.vue";
import InputSelect from "./components/InputSelect.vue";
import ButtonSubmit from "./components/ButtonSubmit.vue";
import PopUp from "./components/PopUp.vue";
import {
  alphaRuEn,
  firstValueMobilePhoneNumber,
  MobilePhoneNumberLength,
} from "./utils/validateRules";
export default {
  name: "App",
  components: { InputBasic, InputCheckBox, InputSelect, ButtonSubmit, PopUp },
  data: () => ({
    doctorsData: ["Иванов", "Захаров", "Чернышева"],
    typeOfDocumentsData: [
      "Паспорт",
      "Свидетельство о рождении",
      "Вод. удостоверение",
    ],
    isShowPopUp: false,
    form: {
      lastName: "",
      firstName: "",
      patronymicName: "",
      mobilePhoneNumber: "",
      isNotify: false,
      doctor: "Не выбрано",
      passport: {
        documentType: "",
      },
    },
  }),
  methods: {
    acceptOnlyLetters: function(key) {
      return /[а-яa-z]/gi.test(key);
    },
    acceptOnlyNumbers: function(key) {
      return /[0-9]/gi.test(key);
    },
    closePopUp: function() {
      this.isShowPopUp = false;
    },
    toUpperCaseFirstLetter: function(value) {
      if (value !== "") return value.slice(0, 1).toUpperCase() + value.slice(1);
      return value;
    },
    onSubmit: function() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.isShowPopUp = true;
        const formData = {
          lastName: this.toUpperCaseFirstLetter(this.$v.form.$model.lastName),
          firstName: this.toUpperCaseFirstLetter(this.$v.form.$model.firstName),
          patronymicName: this.toUpperCaseFirstLetter(
            this.$v.form.$model.patronymicName
          ),
          mobilePhoneNumber: this.$v.form.$model.mobilePhoneNumber
            .match(/[0-9]/g)
            .join(""),
          isNotify: this.$v.form.$model.isNotify,
          doctor: this.$v.form.$model.doctor,
        };
        console.log(formData);
      }
      return;
    },
  },

  validations: {
    form: {
      lastName: { required, alphaRuEn },
      firstName: { required, alphaRuEn },
      patronymicName: { alphaRuEn },
      mobilePhoneNumber: {
        required,
        MobilePhoneNumberLength,
        firstValueMobilePhoneNumber,
      },
      isNotify: {},
      doctor: {},
      passport: {
        documentType: { required },
      },
    },
  },
};
</script>

<style lang="sass" scoped>

.wrapper
  min-height: 100vh
  display: flex
  align-items: center
  justify-content: center
  background-color: $color-bg
  > form
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
</style>
