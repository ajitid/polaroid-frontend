<template>
  <form @submit.prevent="$emit('submit')">
    <slot />
    <div class="mt-2 text-pink-dark w-48" v-show="!!formError">{{ formError }}</div>
  </form>
</template>

<script>
export default {
  props: {
    fieldsError: {
      type: Object,
      required: true
    },
    formError: {
      type: String,
      default: ""
    }
  },
  provide: function() {
    return {
      fieldsError: this.fieldsError
    };
  }
};
</script>

<style scoped>
</style>
