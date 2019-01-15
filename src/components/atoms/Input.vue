<template>
  <!-- FIXME v-model lazy is not working  -->
  <input
    @input="$emit('input', $event.target.value)"
    v-bind="$attrs"
    type="text"
    class="rounded border leading-normal py-1 px-2"
  />
</template>
