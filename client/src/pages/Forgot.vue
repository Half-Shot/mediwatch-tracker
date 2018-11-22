<template>
<div class="container">
  <div class="panel">
    <h2> Forgotten password? </h2>
    <router-link :to="{ name: 'login' }">Click here to return to login</router-link>
    <br>
    <form class="" @submit.prevent="login()">

      <input name="username" v-validate.disable="'required|min:3'" type="text" v-model="form.username" placeholder="Username/Email address">
      <!-- show errors for username if any -->
      <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
      <button type="submit" name="button">Reset password</button>
    </form>
  </div>
</div>
</template>

<script>
import Config from '../Config'
export default {
  name: "Forgot",
  data: function() {
    return {
      form: {
        username: '',
        password: '',
        url: Config.getDefaultHomeserver(),
      }
    }
  },
  methods: {
    login() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('auth/login', this.form)
            .then(res => this.$store.dispatch('auth/getProfile'))
        } else {
          document.getElementById("credentialsIncorrect").style.display = "block";
        }
      })
    }
  }
}
</script>
