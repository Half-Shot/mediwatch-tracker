<template>
<div class="container">
  <div class="panel">
    <h2> Register for Mediwatch </h2>
    <router-link :to="{ name: 'login' }">Click here to login</router-link>
    <br>
    <form class="" @submit.prevent="register()">
      <p>Fields marked with a <span style="color:red;">*</span> are mandatory</p>
      <span style="color:red;">*</span><input name="username" v-validate.disable="'required|min:3'" type="text" v-model="form.username" placeholder="Username"><br>
      <!-- show errors for username if any -->
      <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
      <span style="color:red;">*</span>
      <input name="password" id="password" ref="password" v-validate="'required|min:6|confirmed:passwordConfirm'" type="password" v-model="form.password" placeholder="Password">
      <br>
      <span style="color:red;">*</span>
      <input name="passwordConfirm" id="passwordConfirm" v-validate="'required|min:6|confirmed:password'" type="password" v-model="form.passwordConfirm" placeholder="Confirm Password">
      <br>
      <!-- <p class="passwordError" v-if="errors.has('password')">{{ errors.first('password')}}</p> -->
      <p class="passwordError" v-if="errors.has('passwordConfirm')">{{ errors.first('passwordConfirm')}}</p>
      <!-- <input type="radio" name="role" id="patient" value="patient" checked></input>
      <label for="patient">Patient</label>
      <br>
      <input type="radio" name="role" id="doctor" value="doctor"></input>
      <label for="doctor">Doctor</label>
      <br> -->
      <select name="url" v-model="form.url">
        <option value="https://medical.webres.me">medical.webres.me</option>
        <option value="https://matrix.org">matrix.org</option>
      </select>
      <br>
      <!-- <input name="url" type="text" v-model="form.url" placeholder="Server url"> -->
      <button type="submit" name="button">Register</button>
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
      this.comparePassword();
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('auth/register', this.form)
            .then(res => this.$store.dispatch('auth/getProfile'))
        }
      })
    },
    comparePassword() {
      var pass0 = document.getElementById("password").value;
      var pass1 = document.getElementById("passwordConfirm").value;
      if (pass0 === pass1) {
        console.log("same");
      } else {
        console.log("different");
      }
    }
  }
}
</script>
