<template>
  <div id="app">
    <div class="wrapper">
      <PopUp v-if="isShowPopUp" @closePopUp="closePopUp" />
      <form class="form" @submit.prevent="onSubmit" novalidate>
        <!-- SIMPLE START -->
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
        <section
          class="form__date "
          :class="{
            'form__date--error': $v.form.dayOfBirth.$anyError,
            'form__date--success': !$v.form.dayOfBirth.$invalid,
          }"
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
              v-model.trim="$v.form.dayOfBirth.day.$model"
              placeholder="День"
              :field="$v.form.dayOfBirth.day"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              tip="дд"
            />
            <InputBasic
              v-model.trim="$v.form.dayOfBirth.month.$model"
              placeholder="Месяц"
              :field="$v.form.dayOfBirth.month"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              tip="мм"
            />
            <InputBasic
              v-model.trim="$v.form.dayOfBirth.year.$model"
              placeholder="Год"
              :field="$v.form.dayOfBirth.year"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              tip="гггг"
            />
          </div>
        </section>
        <InputBasic
          v-model.trim="$v.form.mobilePhoneNumber.$model"
          placeholder="Мобильный телефон"
          :field="$v.form.mobilePhoneNumber"
          :customInputRules="acceptOnlyNumbers"
          tip="Начинается с 7"
        />

        <InputsRadioGender
          v-model="$v.form.gender.$model"
          :field="$v.form.gender"
        />
        <InputCheckboxMulti
          v-model="$v.form.multiple.$model"
          :field="$v.form.multiple"
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
        <!-- SIMPLE END -->
        <!-- ADDRESS START -->
        <InputBasic
          v-model.trim="$v.form.address.postcode.$model"
          placeholder="Индекс"
          :field="$v.form.address.postcode"
          :customInputRules="() => true"
        />
        <InputBasic
          v-model.trim="$v.form.address.country.$model"
          placeholder="Страна"
          :field="$v.form.address.country"
          :customInputRules="acceptOnlyLetters"
        />
        <InputBasic
          v-model.trim="$v.form.address.region.$model"
          placeholder="Регион"
          :field="$v.form.address.region"
          :customInputRules="acceptOnlyLetters"
        />
        <InputBasic
          v-model.trim="$v.form.address.city.$model"
          placeholder="Город"
          :field="$v.form.address.city"
          :customInputRules="acceptOnlyLetters"
        />
        <InputBasic
          v-model.trim="$v.form.address.houseNumber.$model"
          placeholder="Номер дома"
          :field="$v.form.address.houseNumber"
          :customInputRules="acceptOnlyNumbers"
        />
        <!-- ADDRESS END -->

        <!-- PASSPORT START -->
        <InputSelect
          :optionsData="typeOfDocumentsData"
          v-model="$v.form.passport.documentType.$model"
          :field="$v.form.passport.documentType"
          disabledPhrase="Выберите тип документа*"
        />
        <section
          class="form__date  form__date__passport-date"
          :class="{
            'form__date--error': $v.form.passport.documentInfo.$anyError,
            'form__date--success':
              !$v.form.passport.documentInfo.$anyError &&
              $v.form.passport.documentInfo.$dirty,
          }"
        >
          <div
            v-if="
              $v.form.passport.documentInfo.$anyError && !isShowErrorMessages
            "
            class="form__date__message-error"
          >
            Значение неприемлимо
          </div>
          <h3 class="form__date__headline">Данные документа:</h3>
          <div class="form__date__flex-box">
            <InputBasic
              v-model.trim="
                $v.form.passport.documentInfo.seriesOfPassport.$model
              "
              placeholder="Серия"
              :field="$v.form.passport.documentInfo.seriesOfPassport"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
            />
            <InputBasic
              v-model.trim="
                $v.form.passport.documentInfo.numberOfPassport.$model
              "
              placeholder="Номер"
              :field="$v.form.passport.documentInfo.numberOfPassport"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
            />
          </div>
        </section>

        <TextareaBasic
          v-model.trim="$v.form.passport.issuedBy.$model"
          :field="$v.form.passport.issuedBy"
        />
        <section
          class="form__date "
          :class="{
            'form__date--error': $v.form.passport.dateOfIssue.$anyError,
            'form__date--success': !$v.form.passport.dateOfIssue.$invalid,
          }"
        >
          <div
            v-if="
              $v.form.passport.dateOfIssue.$anyError && !isShowErrorMessages
            "
            class="form__date__message-error"
          >
            Поля обязательны к заполнению
          </div>
          <h3 class="form__date__headline">Дата выдачи*</h3>
          <div class="form__date__flex-box">
            <InputBasic
              v-model.trim="$v.form.passport.dateOfIssue.day.$model"
              placeholder="День"
              :field="$v.form.passport.dateOfIssue.day"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              tip="дд"
            />
            <InputBasic
              v-model.trim="$v.form.passport.dateOfIssue.month.$model"
              placeholder="Месяц"
              :field="$v.form.passport.dateOfIssue.month"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              tip="мм"
            />
            <InputBasic
              v-model.trim="$v.form.passport.dateOfIssue.year.$model"
              placeholder="Год"
              :field="$v.form.passport.dateOfIssue.year"
              :customInputRules="acceptOnlyNumbers"
              :isShowErrorMessages="isShowErrorMessages"
              tip="гггг"
            />
          </div>
        </section>
        <!-- PASSPORT END -->
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
    isShowPopUp: false,
    form: {
      lastName: "",
      firstName: "",
      patronymicName: "",
      multiple: [],
      dayOfBirth: {
        day: "",
        month: "",
        year: "",
      },
      mobilePhoneNumber: "",
      gender: "",
      isNotify: false,
      doctor: "Не выбрано",
      address: {
        postcode: "",
        country: "",
        region: "",
        city: "",
        street: "",
        houseNumber: "",
      },
      passport: {
        documentType: "",
        documentInfo: {
          seriesOfPassport: "",
          numberOfPassport: "",
        },
        issuedBy: "",
        dateOfIssue: {
          day: "",
          month: "",
          year: "",
        },
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
      console.log(this.$v.form.passport.issuedBy.$model);
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
      multiple: { required },
      mobilePhoneNumber: {
        required,
        MobilePhoneNumberLength,
        firstValueMobilePhoneNumber,
      },
      dayOfBirth: {
        day: {
          required,
          maxValue: maxValue(31),
          minValue: minValue(0),
        },
        month: {
          required,
          maxValue: maxValue(12),
          minValue: minValue(1),
        },
        year: {
          required,
          maxValue: maxValue(2021),
          minValue: minValue(1800),
        },
      },
      gender: {},
      isNotify: {},
      doctor: {},
      address: {
        postcode: {},
        country: { alphaRuEn },
        region: { alphaRuEn },
        city: { required, alphaRuEn },
        street: { alphaRuEn },
        houseNumber: {
          minValue: minValue(0),
          maxValue: maxValue(999999999),
        },
      },
      passport: {
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
          day: {
            required,
            maxValue: maxValue(31),
            minValue: minValue(0),
          },
          month: {
            required,
            maxValue: maxValue(12),
            minValue: minValue(1),
          },
          year: {
            required,
            maxValue: maxValue(2021),
            minValue: minValue(1800),
          },
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
