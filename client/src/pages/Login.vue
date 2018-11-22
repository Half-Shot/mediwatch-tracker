<template>
<div class="externalWrapper">
  <div class="internalWrapper">
    <div class="container">
      <div class="row">
        <h1 id="header">Mediwatch</h1>
      </div>
      <div class="panel">
        <div class="row">
          <div class="half">
            <form class="" @submit.prevent="login()">
              <div class="row">
                <!-- show errors for username if any -->
                <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
              </div>
              <div class="row">
                <h3>Username:</h3>
                <input name="username" v-validate.disable="'required|min:3'" type="text" v-model="form.username" placeholder="Username">
              </div>
              <div class="row">
                <h3>Password:</h3>
                <input name="password" type="password" v-model="form.password" placeholder="Password">
              </div>
              <div class="row">
                <h3>Server:</h3>
                <select name="url" v-model="form.url">
                  <option value="https://medical.webres.me">medical.webres.me</option>
                  <option value="https://matrix.org">matrix.org</option>
                </select>
                <!-- <input name="url" type="text" v-model="form.url" placeholder="Server url"> -->
              </div>
              <div class="row">
                <router-link :to="{ name: 'forgot' }" class="button">Forgotten password?</router-link>
                <button type="submit" name="button" class="button">Login</button>
              </div>
            </form>
          </div>
          <div class="half">
            <router-link :to="{ name: 'register' }" class="button" id="registration">Click here to register</router-link>
          </div>
        </div>
        <p>.</p>
      </div>
    </div>
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
          this.$store.dispatch('auth/login', this.form)
            .then(res => this.$store.dispatch('auth/getProfile'))
        }
      })
    }
  }
}
</script>
