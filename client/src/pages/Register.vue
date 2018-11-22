<template>
<div class="container">
  <div class="panel">
    <h2> Register for Mediwatch </h2>
    <router-link :to="{ name: 'login' }">login</router-link>
    <br>
    <form class="" @submit.prevent="register()">

      <input name="username" v-validate.disable="'required|min:3'" type="text" v-model="form.username" placeholder="Username">

      <!-- show errors for username if any -->
      <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
      <input name="password" type="password" v-model="form.password" placeholder="Password"><br>

      <select name="url" v-model="form.url">
        <option value="https://medical.webres.me">medical.webres.me</option>
        <option value="https://matrix.org">matrix.org</option>
      </select>
      <br>
      <!-- <input name="url" type="text" v-model="form.url" placeholder="Server url"> -->
      <button type="submit" name="button">register</button>
    </form>
  </div>
</div>
</template>

<script>
import Config from '../Config'
export default {
  name: "Register",
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
    register() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('auth/register', this.form)
          // .then(res => this.$store.dispatch('auth/getProfile'))
        } else {
          // probably needs improvement
          document.getElementById("credentialsIncorrect").style.display = "block";
        }
      })
    }
  }
}
</script>
