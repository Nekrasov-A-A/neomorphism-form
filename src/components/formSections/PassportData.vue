<template>
  <div>
    <InputSelect
      :optionsData="typeOfDocumentsData"
      v-model="field.documentType.$model"
      :field="field.documentType"
      disabledPhrase="Выберите тип документа*"
      ref="documentType"
    />
    <DocumentInfo
      ref="documentInfo"
      v-model="field.documentInfo.$model"
      :field="field.documentInfo"
    />
    <TextareaBasic v-model="field.issuedBy.$model" :field="field.issuedBy" />
    <DateOfIssue
      ref="dateOfIssue"
      v-model="field.dateOfIssue.$model"
      :field="field.dateOfIssue"
    />
  </div>
</template>

<script>
import "./formSections.sass";
import {
  acceptOnlyLetters,
  acceptOnlyNumbers,
} from "../../utils/customInputRules";
import InputSelect from "../InputSelect.vue";
import DocumentInfo from "../multipleInputs/DocumentInfo.vue";
import TextareaBasic from "../TextareaBasic.vue";
import DateOfIssue from "../multipleInputs/DateOfIssue.vue";
export default {
  name: "PersonData",
  components: { InputSelect, TextareaBasic, DocumentInfo, DateOfIssue },
  props: {
    field: {
      type: Object,
    },
  },
  data: () => ({
    acceptOnlyLetters,
    acceptOnlyNumbers,
    typeOfDocumentsData: [
      "Паспорт",
      "Свидетельство о рождении",
      "Вод. удостоверение",
    ],
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
