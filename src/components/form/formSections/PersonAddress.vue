<template>
  <section class="form__section">
    <h1>Адрес</h1>
    <InputBasic
      v-model.trim="field.postcode.$model"
      placeholder="Индекс"
      :field="field.postcode"
      :customInputRules="() => true"
      ref="postcode"
    />
    <InputBasic
      v-model.trim="field.country.$model"
      placeholder="Страна"
      :field="field.country"
      :customInputRules="acceptOnlyLetters"
      ref="country"
    />
    <InputBasic
      v-model.trim="field.region.$model"
      placeholder="Регион"
      :field="field.region"
      :customInputRules="acceptOnlyLetters"
      ref="region"
    />
    <InputBasic
      v-model.trim="field.city.$model"
      placeholder="Город"
      :field="field.city"
      :customInputRules="acceptOnlyLetters"
      ref="city"
    />
    <InputBasic
      v-model.trim="field.street.$model"
      placeholder="Улица"
      :field="field.street"
      :customInputRules="acceptOnlyLetters"
      ref="street"
    />
    <InputBasic
      v-model.trim="field.houseNumber.$model"
      placeholder="Номер дома"
      :field="field.houseNumber"
      :customInputRules="acceptOnlyNumbers"
      ref="houseNumber"
    />
  </section>
</template>

<script>
import { acceptOnlyLetters, acceptOnlyNumbers } from "@/utils/customInputRules";
import InputBasic from "./formItems/InputBasic.vue";
export default {
  name: "PersonAddress",
  components: { InputBasic },
  props: {
    field: {
      type: Object,
    },
  },
  data: () => ({
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
  },
};
</script>
