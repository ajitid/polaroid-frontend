<template>
  <button
    v-on="$listeners"
    v-bind="$attrs"
    type="button"
    class="px-3 py-1 bg-teal-light rounded uppercase font-medium tracking-wide"
  >
    <slot />
  </button>
</template>
