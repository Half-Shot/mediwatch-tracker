<template>
<div class="container">
  <div class="panel">
    <h1> Register for Mediwatch </h1>
    <div class="row">
      <div class="half">
        <form class="" @submit.prevent="register()">
          <div class="row">
            <p>Fields marked with a <span class="required">*</span> are mandatory</p>
          </div>
          <div class="row">
            <div class="half">
              <!-- show errors for username if any -->
              <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
            </div>
            <div class="half">
              <span class="required">*</span><input name="username" v-validate.disable="'required|min:3'" type="text" v-model="form.username" placeholder="Username" style="width:95%;">
            </div>
          </div>
          <div class="row">
            <div class="half">
              <p class="passwordError" v-if="errors.has('password')">{{ errors.first('password')}}</p>
            </div>
            <div class="half">
              <span class="required">*</span>
              <input name="password" id="password" ref="password" v-validate="'required|min:6'" type="password" v-model="form.password" placeholder="Password">
            </div>
          </div>
          <div class="row">
            <div class="half">
              <p class="passwordError" v-if="errors.has('passwordConfirm')">{{ errors.first('passwordConfirm')}}</p>
            </div>
            <div class="half">
              <span class="required">*</span>
              <input name="passwordConfirm" id="passwordConfirm" v-validate="'required|confirmed:password'" type="password" v-model="form.passwordConfirm" placeholder="Confirm Password">
            </div>
          </div>
          <div class="row">
            <span class="required">*</span>
          </div>
          <div class="row">
            <select name="url" v-model="form.url">
              <option value="https://medical.webres.me">medical.webres.me</option>
              <option value="https://matrix.org">matrix.org</option>
            </select>
          </div>
          <div class="row">
            <button type="submit" name="button" class="button">Register</button>
          </div>
        </form>
      </div>
      <div class="half">
        <router-link :to="{ name: 'login' }" class="button">Click here to login</router-link>
      </div>
    </div>
    <p>.</p>
  </div>
</div>
</template>

<script>
import Config from '../Config'
export default {
  name: "Register",
  data: function() {
    return {
      passwordConfirm: false,
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
            .then(res => this.$store.dispatch('auth/getProfile'))
        }
      })
    }
  }
}
</script>
