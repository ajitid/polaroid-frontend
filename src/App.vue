<template>
  <div id="app" class="text-black antialiased font-sans container mx-auto">
    <TheHeader />
    <div class="mb-4"></div>
    <router-view />
  </div>
</template>

<script>
import "@/assets/css/tailwind.css";
import TheHeader from "@/components/ones/TheHeader";

export default {
  components: { TheHeader }
};
</script>

<style>
:root {
  --body-bg-color: #f9f9f9;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--body-bg-color);
}

.body-bg {
  background-color: var(--body-bg-color);
}

h1,
h2,
h3,
h4,
h5,
h6,
b,
strong {
  @apply font-medium;
}
</style>
