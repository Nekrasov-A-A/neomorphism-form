<template>
  <div class="wtf">
    <label class="wtf__label">
      <input
        class="wtf__input"
        type="checkbox"
        @change="$emit('input', checked)"
        v-model="checked"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "InputCheckBox",
  data: () => ({
    checked: false,
  }),
  props: {
    value: {
      type: [Boolean, String],
    },

    field: {
      type: Object,
    },
  },
};
</script>

<style lang="sass" scoped></style>
