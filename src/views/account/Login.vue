<template>
  <div>
    <div class="form-container">
      <Form @submit="login" :fieldsError="$v" :formError="formError">
        <Label label="Username">
          <Input name="username" v-model.trim="$v.username.$model" v-focus />
        </Label>
        <Label label="Password">
          <Input type="password" name="password" v-model="$v.password.$model" />
        </Label>
        <div class="flex justify-center mt-6">
          <Button type="submit">Login to Polaroid</Button>
        </div>
      </Form>
    </div>
    <input type="text" class="mcdmkd" />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { validationMixin } from "vuelidate";
import { helpers, required, minLength } from "vuelidate/lib/validators";

import { apiWithoutAuth } from "@/utils/api.js";

const usernameValidator = value =>
  !helpers.req(value) || value.replace(/[a-zA-Z_\-.0-9]/g, "").length === 0;

export default {
  mixins: [validationMixin],
  data() {
    return {
      username: "",
      password: "",
      formError: ""
    };
  },
  validations: {
    username: {
      required,
      usernameValidator
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    ...mapMutations(["setAccessToken"]),
    async login() {
      this.formError = "";
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        const res = await apiWithoutAuth.post("/auth/login", null, {
          auth: {
            username: this.username,
            password: this.password
          }
        });
        const { token } = res.data;
        this.setAccessToken(token);
        this.$router.push("/");
      } catch (e) {
        if (e.response && e.response.status === 401) {
          this.formError = "Invalid username or password";
        }
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 360px;
  @apply mx-auto flex justify-center;
}
</style>
