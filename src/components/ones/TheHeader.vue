<template>
  <div class="body-bg py-4 border-b flex justify-between sticky pin-t">
    <div class="flex items-center">
      <p class="uppercase font-medium text-2xl">Polaroid</p>
    </div>
    <div>
      <nav class="h-full flex items-center">
        <template v-if="accessToken === null">
          <RLink to="/account/login">Login</RLink>
        </template>
        <template v-else>
          <RLink to="/">Feed</RLink>
          <RLink to="/account/details" class="ml-4">Account</RLink>
          <button @click="logout" class="ml-4 font-medium">Logout</button>
        </template>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: mapState({
    accessToken: state => state.auth.accessToken
  }),
  methods: {
    ...mapMutations(["setAccessToken"]),
    logout() {
      this.setAccessToken(null);
      this.$router.push("/account/login");
    }
  }
};
</script>
