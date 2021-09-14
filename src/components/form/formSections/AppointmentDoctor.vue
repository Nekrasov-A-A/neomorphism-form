<template>
  <section class="form__section">
    <h1>Запись к специалисту</h1>
    <InputCheckboxMulti
      v-model="field.multiple.$model"
      :field="field.multiple"
      ref="multiple"
    />
    <InputSelect
      :optionsData="doctorsData"
      v-model="field.doctor.$model"
      :field="field.doctor"
      disabledPhrase="Выберите врача"
      ref="doctor"
    />
    <InputCheckbox
      v-model="field.isNotify.$model"
      :field="field.isNotify"
      item="СМС"
      label="Получать СМС-уведомления"
    />
  </section>
</template>
<script>
import { acceptOnlyLetters, acceptOnlyNumbers } from "@/utils/customInputRules";
import InputSelect from "./formItems/InputSelect.vue";
import InputCheckboxMulti from "./formGroups/InputCheckboxMulti.vue";
import InputCheckbox from "./formItems/InputCheckbox.vue";
export default {
  name: "PersonData",
  components: { InputSelect, InputCheckboxMulti, InputCheckbox },
  props: {
    field: {
      type: Object,
    },
  },
  data: () => ({
    acceptOnlyLetters,
    acceptOnlyNumbers,
    doctorsData: ["Иванов", "Захаров", "Чернышева"],
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
