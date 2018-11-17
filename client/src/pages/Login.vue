<template>
<div class="container">
  <div class="panel">
    <h2> Log into Mediwatch </h2>
    <form class="" @submit.prevent="login()">

      <input name="username" v-validate.disable="'required|min:3'" type="text" v-model="form.username" placeholder="Username">
      <!-- show errors for username if any -->
      <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
      <input name="password" type="password" v-model="form.password" placeholder="Password">

      <input name="url" type="text" v-model="form.url" placeholder="Server url">
      <button type="submit" name="button">login</button>
    </form>
  </div>
</div>
</template>

<script>
import Config from '../Config'
export default {
  name: "Login",
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
          // this is my issue dispatches are not happening async. Can you apply JS magic?

          this.$store.dispatch('auth/login', this.form)
          .then( res => this.$store.dispatch('auth/getProfile') )
        }
      })
    }
  }
}
</script>
