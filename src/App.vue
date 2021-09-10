<template>
  <div id="app">
    <div class="wrapper">
      <PopUp v-if="isShowPopUp" @closePopUp="closePopUp" :formData="formData" />
      <form class="form" @submit.prevent="onSubmit" novalidate>
        <PersonData
          :field="$v.form.personData"
          v-if="currentStep === 0"
          ref="personData"
        />
        <PersonAddress
          :field="$v.form.address"
          v-else-if="currentStep === 1"
          ref="address"
        />
        <PassportData
          :field="$v.form.passport"
          v-else-if="currentStep === 2"
          ref="passport"
        />
        <AppointmentDoctor
          v-else-if="currentStep === 3"
          :field="$v.form.appointmentDoctor"
          ref="appointmentDoctor"
        />
        <section class="form-control">
          <button
            @click="currentStep -= 1"
            type="button"
            :disabled="currentStep === 0"
          >
            Пред.
          </button>
          <ButtonSubmit v-if="currentStep === 3">Отправить</ButtonSubmit>
          <button @click="checkInvalidFormGroup" type="button" v-else>
            След.
          </button>
        </section>
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
import {
  alphaRuEn,
  firstValueMobilePhoneNumber,
  MobilePhoneNumberLength,
} from "./utils/validateRules";
import PersonData from "./components/formSections/PersonData.vue";
import PersonAddress from "./components/formSections/PersonAddress.vue";
import PassportData from "./components/formSections/PassportData.vue";
import AppointmentDoctor from "./components/formSections/AppointmentDoctor.vue";
import ButtonSubmit from "./components/ButtonSubmit.vue";
import PopUp from "./components/PopUp.vue";
export default {
  name: "App",
  components: {
    ButtonSubmit,
    PopUp,
    PersonData,
    PersonAddress,
    PassportData,
    AppointmentDoctor,
  },
  data: () => ({
    formSectionsData: [
      "personData",
      "address",
      "passport",
      "appointmentDoctor",
    ], // Изменить когда будут готовы все секции
    // на $v.form.$params or something else IN METHODS > checkInvalidGroupField
    currentStep: 0,
    maxStep: 0,

    isShowErrorMessages: false,
    isShowPopUp: false,
    formData: "",
    form: {
      personData: {
        lastName: "",
        firstName: "",
        patronymicName: "",
        dateOfBirth: {
          day: "",
          month: "",
          year: "",
        },
        mobilePhoneNumber: "",
        gender: "",
      },
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
      appointmentDoctor: {
        doctor: "Не выбрано",
        multiple: [],
        isNotify: false,
      },
    },
  }),
  methods: {
    checkInvalidFormGroup() {
      this.$v.form[this.formSectionsData[this.currentStep]].$touch();
      if (this.$v.form[this.formSectionsData[this.currentStep]].$invalid) {
        this.$refs[this.formSectionsData[this.currentStep]].focus();
      } else {
        this.currentStep += 1;
        if (this.currentStep >= this.formSectionsData.length)
          this.currentStep = this.formSectionsData.length - 1;
      }
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

        this.formData = {
          lastName: this.toUpperCaseFirstLetter(
            this.$v.form.personData.$model.lastName
          ),
          firstName: this.toUpperCaseFirstLetter(
            this.$v.form.personData.$model.firstName
          ),
          patronymicName: this.toUpperCaseFirstLetter(
            this.$v.form.personData.$model.patronymicName
          ),
          targetGroup: this.$v.form.appointmentDoctor.multiple.$model,
          mobilePhoneNumber: this.$v.form.personData.$model.mobilePhoneNumber
            .match(/[0-9]/g)
            .join(""),
          dayOfBirth:
            this.$v.form.personData.$model.dateOfBirth.day +
            "." +
            this.$v.form.$model.personData.dateOfBirth.month +
            "." +
            this.$v.form.$model.personData.dateOfBirth.year,
          gender: this.$v.form.personData.$model.gender,
          isNotify: this.$v.form.appointmentDoctor.$model.isNotify,
          doctor: this.$v.form.appointmentDoctor.$model.doctor,
          postcode: this.$v.form.address.$model.postcode,
          country: this.$v.form.address.$model.country,
          region: this.$v.form.address.$model.region,
          city: this.$v.form.address.$model.city,
          street: this.$v.form.address.$model.street,
          houseNumber: this.$v.form.address.$model.houseNumber,
          documentType: this.$v.form.passport.$model.documentType,
          documentInfo:
            this.$v.form.passport.$model.documentInfo.seriesOfPassport +
            "/" +
            this.$v.form.passport.$model.documentInfo.numberOfPassport,
          issuedBy: this.$v.form.passport.$model.issuedBy,
          dateOfIssue:
            this.$v.form.passport.$model.dateOfIssue.day +
            "." +
            this.$v.form.passport.$model.dateOfIssue.month +
            "." +
            this.$v.form.passport.$model.dateOfIssue.year,
        };
      }
      return;
    },
  },
  watch: {
    currentStep: function(val, oldVal) {
      if (val > oldVal) this.maxStep = this.currentStep;
    },
  },
  validations: {
    form: {
      personData: {
        lastName: { required, alphaRuEn },
        firstName: { required, alphaRuEn },
        patronymicName: { alphaRuEn },
        dateOfBirth: {
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
        mobilePhoneNumber: {
          required,
          MobilePhoneNumberLength,
          firstValueMobilePhoneNumber,
        },
        gender: {},
      },
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
      appointmentDoctor: {
        doctor: {},
        multiple: { required },
        isNotify: {},
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
  .form
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    &-control
      display: flex
      > button
        font-size: 16px
        font-weight: 700
        padding: 1em 3em
        border: 2px dashed transparent
        outline: 0
        color: $color-dark-blue
        background-color: $color-bg
        box-shadow: -5px -5px 20px $color-white,  5px 5px 20px $color-shadow
        transition: all 0.2s ease-in-out
        cursor: pointer
        border-radius: 50px
        &:hover
          box-shadow: -2px -2px 5px $color-white, 2px 2px 5px $color-shadow
        &:active
          box-shadow: inset 1px 1px 2px $color-shadow, inset -1px -1px 2px $color-white
        &:disabled
          box-shadow: inset 1px 1px 2px $color-shadow, inset -1px -1px 2px $color-white
          opacity: .5
          cursor: default
        &:focus
          animation: showBorder 0s .1s linear forwards
          @keyframes showBorder
            0%
              border-color: transparent
            100%
              border-color: $color-dark-blue
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
