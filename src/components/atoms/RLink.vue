<template>
  <router-link :to="to" v-on="$listeners" v-bind="$attrs" class="no-underline text-black font-medium"><slot /></router-link>
</template>

<script>
export default {
  props: {
    to: {
      required: true
    }
  }
};
</script>
