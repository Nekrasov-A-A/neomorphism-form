<template>
  <div id="app">
    <div class="wrapper">
      <div>{{ "TEST" + form.mobilePhoneNumber }}</div>
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
        />
        <!--  -->
        <InputCheckBox
          v-model="$v.form.isNotify.$model"
          :field="$v.form.isNotify"
        />

        <!--  -->
        <button type="submit">Sub</button>
        <!--  -->
      </form>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import InputBasic from "./components/InputBasic.vue";
import InputCheckBox from "./components/InputCheckbox.vue";
import {
  alphaRuEn,
  firstValueMobilePhoneNumber,
  MobilePhoneNumberLength,
} from "./utils/validateRules";
export default {
  name: "App",
  data: () => ({
    form: {
      lastName: "",
      firstName: "",
      patronymicName: "",
      mobilePhoneNumber: "",
      isNotify: false,
    },
  }),
  methods: {
    acceptOnlyLetters: function(prop) {
      return /[а-яa-z]/gi.test(prop);
    },
    toUpperCaseFirstLetter: function(value) {
      if (value !== "") return value.slice(0, 1).toUpperCase() + value.slice(1);
      return value;
    },
    onSubmit: function() {
      // if valid
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
      };
      this.$v.$touch();
      console.log(formData);
      // console.log(this.$v.form.$model)
    },
  },
  components: { InputBasic, InputCheckBox },
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

    .form-group
      position: relative
      padding-bottom: 20px
      margin-bottom: 16px
      &__error-message
        position: absolute
        bottom: 4px
        left: 16px
        font-size: 12px
        color: $color-red
      &__label
        position: absolute
        top: 50%
        left: 16px
        transform: translateY(-50%)
        color: $color-grayish-blue
        cursor: text
        display: none
        font-size: 14px
        &--success
            color: $color-success
            top: -10px
            display: flex

      &__input
          border: 1px solid transparent
          padding: 16px
          font-size: 16px
          border-radius: 50px
          outline: 0
          background-color:$color-bg
          text-shadow: 1px 1px 0 $color-white
          box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px transparentize($color-white,.3)
          width: 100%
          box-sizing: border-box
          transition: all 0.2s ease-in-out
          appearance: none
          -webkit-appearance: none
          color: $color-dark-blue
          &:focus
            box-shadow:  inset 1px 1px 2px $color-shadow, inset -1px -1px 2px $color-white
          &:focus::placeholder
            opacity: 0
          &:focus + .form-group__label
            display: flex
            animation: moveToTop .5s ease forwards
            @keyframes moveToTop
              from
                top: 50%
                opacity: .7
              to
                top: -10px
                opacity: 1
          &::placeholder
            color: $color-grayish-blue
            font-size: 14px
          &--error
            border-color: $color-red
            box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px transparentize($color-white,.3), inset 0 0 2px transparentize($color-red,.5), 0 0 2px  transparentize($color-red,.5)
            &::placeholder
              color: $color-red
</style>
