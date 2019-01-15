<template>
  <label class="my-5 block">
    <div class="mb-1 uppercase text-sm text-grey-darker tracking-wide font-medium">{{ label }}</div>
    <slot />
    <div class="mt-2 text-pink-dark w-48" v-show="showError">{{ firstError }}</div>
  </label>
</template>

<script>
const errorGenerator = {
  required(label) {
    return `${label} is required`;
  },
  minLength(label, properties) {
    return `${label} must have atleast ${properties.min} letters`;
  },
  usernameValidator(label) {
    return `${label} can only have alphabets, numericals, dots, dashes, and underscores`;
  }
};

export default {
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String
    }
  },
  computed: {
    elementName() {
      return this.name ? this.name : this.$slots.default[0].data.attrs.name;
    },
    showError() {
      return (
        this.fieldsError[this.elementName].$dirty &&
        this.fieldsError[this.elementName].$invalid
      );
    },
    firstError() {
      const validationNames = Object.keys(
        this.fieldsError[this.elementName].$params
      );
      let failedValidationName = null;
      for (const validationName of validationNames) {
        if (!this.fieldsError[this.elementName][validationName]) {
          failedValidationName = validationName;
          break;
        }
      }
      if (failedValidationName === null) {
        return "";
      }
      return errorGenerator[failedValidationName](
        this.label,
        this.fieldsError[this.elementName].$params[failedValidationName]
      );
    }
  },
  inject: ["fieldsError"]
};
</script>

