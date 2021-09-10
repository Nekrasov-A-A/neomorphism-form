<template>
  <div id="app">
    <div class="wrapper">
      <PopUp v-if="isShowPopUp" @closePopUp="closePopUp" :formData="formData" />
      <form class="form" @submit.prevent="onSubmit" novalidate>
        <!--  -->
        <InputBasic
          v-model.trim="$v.form.lastName.$model"
          placeholder="Фамилия"
          :field="$v.form.lastName"
          :customInputRules="acceptOnlyLetters"
          ref="lastName"
        />

        <InputBasic
          v-model.trim="$v.form.firstName.$model"
          placeholder="Имя"
          :field="$v.form.firstName"
          :customInputRules="acceptOnlyLetters"
          ref="firstName"
        />

        <InputBasic
          v-model.trim="$v.form.patronymicName.$model"
          placeholder="Отчество"
          :field="$v.form.patronymicName"
          :customInputRules="acceptOnlyLetters"
          ref="patronymicName"
        />

        <section
          class="form__date"
          :class="{
            'form__date--error': $v.form.dayOfBirth.$anyError,
            'form__date--success': !$v.form.dayOfBirth.$invalid,
          }"
          ref="dayOfBirth"
          tabindex="0"
        >
          <div
            v-if="$v.form.dayOfBirth.$anyError && !isShowErrorMessages"
            class="form__date__message-error"
          >
            Поля обязательны к заполнению
          </div>
          <h3 class="form__date__headline">Дата рождения*</h3>
          <div class="form__date__flex-box">
            <InputBasic
              v-model.trim="$v.form.dayOfBirth.dayOfBirthDay.$model"
              placeholder="День"
              :field="$v.form.dayOfBirth.dayOfBirthDay"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              tip="дд"
              ref="dayOfBirthDay"
            />
            <InputBasic
              v-model.trim="$v.form.dayOfBirth.dayOfBirthMonth.$model"
              placeholder="Месяц"
              :field="$v.form.dayOfBirth.dayOfBirthMonth"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              tip="мм"
              ref="dayOfBirthMonth"
            />
            <InputBasic
              v-model.trim="$v.form.dayOfBirth.dayOfBirthYear.$model"
              placeholder="Год"
              :field="$v.form.dayOfBirth.dayOfBirthYear"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              tip="гггг"
              ref="dayOfBirthYear"
            />
          </div>
        </section>

        <InputBasic
          v-model.trim="$v.form.mobilePhoneNumber.$model"
          placeholder="Мобильный телефон"
          :field="$v.form.mobilePhoneNumber"
          :customInputRules="acceptOnlyNumbers"
          tip="Начинается с 7"
          ref="mobilePhoneNumber"
        />

        <InputsRadioGender
          v-model="$v.form.gender.$model"
          :field="$v.form.gender"
        />
        <InputCheckboxMulti
          v-model="$v.form.multiple.$model"
          :field="$v.form.multiple"
          ref="multiple"
        />
        <InputSelect
          :optionsData="doctorsData"
          v-model="$v.form.doctor.$model"
          :field="$v.form.doctor"
          disabledPhrase="Выберите врача"
        />
        <InputCheckBox
          v-model="$v.form.isNotify.$model"
          :field="$v.form.isNotify"
          item="СМС"
          label="Получать СМС-уведомления"
        />
        <InputBasic
          v-model.trim="$v.form.postcode.$model"
          placeholder="Индекс"
          :field="$v.form.postcode"
          :customInputRules="() => true"
          ref="postcode"
        />
        <InputBasic
          v-model.trim="$v.form.country.$model"
          placeholder="Страна"
          :field="$v.form.country"
          :customInputRules="acceptOnlyLetters"
          ref="country"
        />
        <InputBasic
          v-model.trim="$v.form.region.$model"
          placeholder="Регион"
          :field="$v.form.region"
          :customInputRules="acceptOnlyLetters"
          ref="region"
        />
        <InputBasic
          v-model.trim="$v.form.city.$model"
          placeholder="Город"
          :field="$v.form.city"
          :customInputRules="acceptOnlyLetters"
          ref="city"
        />
        <InputBasic
          v-model.trim="$v.form.street.$model"
          placeholder="Улица"
          :field="$v.form.street"
          :customInputRules="acceptOnlyLetters"
          ref="street"
        />
        <InputBasic
          v-model.trim="$v.form.houseNumber.$model"
          placeholder="Номер дома"
          :field="$v.form.houseNumber"
          :customInputRules="acceptOnlyNumbers"
          ref="houseNumber"
        />

        <InputSelect
          :optionsData="typeOfDocumentsData"
          v-model="$v.form.documentType.$model"
          :field="$v.form.documentType"
          disabledPhrase="Выберите тип документа*"
          ref="documentType"
        />

        <section
          class="form__date  form__date__passport-date"
          :class="{
            'form__date--error': $v.form.documentInfo.$anyError,
            'form__date--success':
              !$v.form.documentInfo.$anyError &&
              $v.form.documentInfo.$dirty &&
              $v.form.documentInfo.seriesOfPassport.$model !== '' &&
              $v.form.documentInfo.numberOfPassport.$model !== '',
          }"
          ref="documentInfo"
          tabindex="0"
        >
          <div
            v-if="$v.form.documentInfo.$anyError && !isShowErrorMessages"
            class="form__date__message-error"
          >
            Значение неприемлимо
          </div>
          <h3 class="form__date__headline">Данные документа:</h3>
          <div class="form__date__flex-box">
            <InputBasic
              v-model.trim="$v.form.documentInfo.seriesOfPassport.$model"
              placeholder="Серия"
              :field="$v.form.documentInfo.seriesOfPassport"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              ref="seriesOfPassport"
            />
            <InputBasic
              v-model.trim="$v.form.documentInfo.numberOfPassport.$model"
              placeholder="Номер"
              :field="$v.form.documentInfo.numberOfPassport"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              ref="numberOfPassport"
            />
          </div>
        </section>

        <TextareaBasic
          v-model="$v.form.issuedBy.$model"
          :field="$v.form.issuedBy"
        />

        <section
          class="form__date "
          :class="{
            'form__date--error': $v.form.dateOfIssue.$anyError,
            'form__date--success': !$v.form.dateOfIssue.$invalid,
          }"
          tabindex="0"
          ref="dateOfIssue"
        >
          <div
            v-if="$v.form.dateOfIssue.$anyError && !isShowErrorMessages"
            class="form__date__message-error"
          >
            Поля обязательны к заполнению
          </div>
          <h3 class="form__date__headline">Дата выдачи*</h3>
          <div class="form__date__flex-box">
            <InputBasic
              v-model.trim="$v.form.dateOfIssue.dateOfIssueDay.$model"
              placeholder="День"
              :field="$v.form.dateOfIssue.dateOfIssueDay"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              tip="дд"
              ref="dateOfIssueDay"
            />
            <InputBasic
              v-model.trim="$v.form.dateOfIssue.dateOfIssueMonth.$model"
              placeholder="Месяц"
              :field="$v.form.dateOfIssue.dateOfIssueMonth"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              tip="мм"
              ref="dateOfIssueMonth"
            />
            <InputBasic
              v-model.trim="$v.form.dateOfIssue.dateOfIssueYear.$model"
              placeholder="Год"
              :field="$v.form.dateOfIssue.dateOfIssueYear"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              tip="гггг"
              ref="dateOfIssueYear"
            />
          </div>
        </section>

        <ButtonSubmit>Отправить</ButtonSubmit>
      </form>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxValue,
  minValue,
} from "vuelidate/lib/validators";
import InputBasic from "./components/InputBasic.vue";
import InputCheckBox from "./components/InputCheckbox.vue";
import InputSelect from "./components/InputSelect.vue";
import ButtonSubmit from "./components/ButtonSubmit.vue";
import InputsRadioGender from "./components/InputsRadioGender.vue";
import InputCheckboxMulti from "./components/InputCheckboxMulti.vue";
import TextareaBasic from "./components/TextareaBasic.vue";
import PopUp from "./components/PopUp.vue";
import {
  alphaRuEn,
  firstValueMobilePhoneNumber,
  MobilePhoneNumberLength,
} from "./utils/validateRules";
export default {
  name: "App",
  components: {
    InputBasic,
    InputCheckBox,
    InputSelect,
    ButtonSubmit,
    PopUp,
    InputsRadioGender,
    TextareaBasic,
    InputCheckboxMulti,
  },
  data: () => ({
    doctorsData: ["Иванов", "Захаров", "Чернышева"],
    typeOfDocumentsData: [
      "Паспорт",
      "Свидетельство о рождении",
      "Вод. удостоверение",
    ],
    isShowErrorMessages: false,
    isShowPopUp: true,
    formData: "",
    form: {
      lastName: "",
      firstName: "",
      patronymicName: "",
      multiple: [],
      dayOfBirth: {
        dayOfBirthDay: "",
        dayOfBirthMonth: "",
        dayOfBirthYear: "",
      },
      mobilePhoneNumber: "",
      gender: "",
      isNotify: false,
      doctor: "Не выбрано",

      postcode: "",
      country: "",
      region: "",
      city: "",
      street: "",
      houseNumber: "",
      documentType: "",
      documentInfo: {
        seriesOfPassport: "",
        numberOfPassport: "",
      },
      issuedBy: "",
      dateOfIssue: {
        dateOfIssueDay: "",
        dateOfIssueMonth: "",
        dateOfIssueYear: "",
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
      if (this.$v.$invalid) {
        let invalidFields = Object.keys(this.$v.form).filter(
          (fieldName) => this.$v.form[fieldName].$invalid
        );
        if (invalidFields) {
          this.$refs[invalidFields[0]].focus();
        }
      } else {
        this.isShowPopUp = true;

        // multiple: [],

        this.formData = {
          lastName: this.toUpperCaseFirstLetter(this.$v.form.$model.lastName),
          firstName: this.toUpperCaseFirstLetter(this.$v.form.$model.firstName),
          patronymicName: this.toUpperCaseFirstLetter(
            this.$v.form.$model.patronymicName
          ),
          targetGroup: this.$v.form.multiple.$model,
          mobilePhoneNumber: this.$v.form.$model.mobilePhoneNumber
            .match(/[0-9]/g)
            .join(""),
          dayOfBirth:
            this.$v.form.$model.dayOfBirth.dayOfBirthDay +
            "." +
            this.$v.form.$model.dayOfBirth.dayOfBirthMonth +
            "." +
            this.$v.form.$model.dayOfBirth.dayOfBirthYear,
          gender: this.$v.form.$model.gender,
          isNotify: this.$v.form.$model.isNotify,
          doctor: this.$v.form.$model.doctor,
          postcode: this.$v.form.$model.postcode,
          country: this.$v.form.$model.country,
          region: this.$v.form.$model.region,
          city: this.$v.form.$model.city,
          street: this.$v.form.$model.street,
          houseNumber: this.$v.form.$model.houseNumber,
          documentType: this.$v.form.$model.documentType,
          documentInfo:
            this.$v.form.$model.documentInfo.seriesOfPassport +
            "/" +
            this.$v.form.$model.documentInfo.numberOfPassport,
          issuedBy: this.$v.form.$model.issuedBy,
          dateOfIssue:
            this.$v.form.$model.dateOfIssue.dateOfIssueDay +
            "." +
            this.$v.form.$model.dateOfIssue.dateOfIssueMonth +
            "." +
            this.$v.form.$model.dateOfIssue.dateOfIssueYear,
        };
      }
      return;
    },
  },

  validations: {
    form: {
      lastName: { required, alphaRuEn },
      firstName: { required, alphaRuEn },
      patronymicName: { alphaRuEn },
      multiple: { required },
      mobilePhoneNumber: {
        required,
        MobilePhoneNumberLength,
        firstValueMobilePhoneNumber,
      },
      dayOfBirth: {
        dayOfBirthDay: {
          required,
          maxValue: maxValue(31),
          minValue: minValue(0),
        },
        dayOfBirthMonth: {
          required,
          maxValue: maxValue(12),
          minValue: minValue(1),
        },
        dayOfBirthYear: {
          required,
          maxValue: maxValue(2021),
          minValue: minValue(1800),
        },
      },
      gender: {},
      isNotify: {},
      doctor: {},
      postcode: {},
      country: { alphaRuEn },
      region: { alphaRuEn },
      city: { required, alphaRuEn },
      street: { alphaRuEn },
      houseNumber: {
        minValue: minValue(0),
        maxValue: maxValue(999999999),
      },
      documentType: { required },
      documentInfo: {
        seriesOfPassport: {
          minLength: minLength(4),
          maxValue: maxValue(9999),
        },
        numberOfPassport: {
          minLength: minLength(6),
          maxValue: maxValue(999999),
        },
      },
      issuedBy: {},
      dateOfIssue: {
        dateOfIssueDay: {
          required,
          maxValue: maxValue(31),
          minValue: minValue(0),
        },
        dateOfIssueMonth: {
          required,
          maxValue: maxValue(12),
          minValue: minValue(1),
        },
        dateOfIssueYear: {
          required,
          maxValue: maxValue(2021),
          minValue: minValue(1800),
        },
      },
    },
  },
};
</script>

<style lang="sass" scoped>

.wrapper
  min-height: 100vh
  padding: 50px 5%
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
    .form__date
      display: flex
      flex-direction: column
      margin-bottom: 20px
      position: relative
      box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px transparentize($color-white,.3)
      padding: 16px
      border-radius: 10px
      border: 2px solid transparent
      &--error
        border-color: $color-red
      &--success
        border-color: $color-success
      &__flex-box
        display: flex
        > *
          margin-left: 20px
          max-width: 100px
          @media screen and (max-width: $mobile)
            margin-left: 10px
          &:first-child
            margin-left: 0
      &__passport-date
        > .form__date__flex-box
          > *
            max-width: 400px
            &:first-child
              width: 40%
            &:last-child
              width: 60%
      &__headline
        font-size: 14px
        width: 100%
        color: $color-dark-blue
        text-align: left
        margin-bottom: 24px
        margin-left: 8px
        cursor: default
      &__message-error
        color: $color-red
        font-size: 12px
        position: absolute
        bottom: 16px
        left: 0
        display: flex
        justify-content: center
        width: 100%
</style>
