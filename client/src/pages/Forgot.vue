<template>
<div class="container">
  <div class="panel">
    <div class="row">
      <h1> Forgotten password? </h1>
    </div>
    <div class="row">
      <div class="half">
        <form class="" @submit.prevent="login()">
          <div class="row">
            <h3>Email address:</h3>
            <input name="username" v-validate.disable="'required|min:3'" type="text" v-model="form.username">
          </div>
          <div class="row">
            <button type="submit" name="button" class="button">Reset password</button>
            <!-- show errors for username if any -->
            <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
          </div>
        </form>
      </div>
      <div class="half">
        <router-link :to="{ name: 'login' }" class="button full">Click here to return to login</router-link>
      </div>
    </div>
    <p>.</p>
  </div>
</div>
</template>

<script>
import Config from "../Config";
export default {
  name: "Forgot",
  data: function() {
    return {
      form: {
        username: "",
        password: "",
        url: Config.getDefaultHomeserver()
      }
    };
  },
  methods: {
    login() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch("auth/login", this.form)
            .then(res => this.$store.dispatch("auth/getProfile"));
        }
      });
    }
  }
};
</script>
