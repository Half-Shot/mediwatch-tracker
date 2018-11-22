<template>
<div class="container">
  <div class="panel">
    <h2> Register for Mediwatch </h2>
    <a href="Login">Click here to login</a>
    <br>
    <form class="" @submit.prevent="register()">

      <input name="username" v-validate.disable="'required|min:3'" type="text" v-model="form.username" placeholder="Username"><br>
      <!-- show errors for username if any -->
      <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
      <input name="password" type="password" v-model="form.password" placeholder="Password"><br>
      <!-- <input type="radio" name="role" id="patient" value="patient" checked></input>
      <label for="patient">Patient</label>
      <br>
      <input type="radio" name="role" id="doctor" value="doctor"></input>
      <label for="doctor">Doctor</label>
      <br> -->
      <select name="url">
        <option>medical.webres.me</option>
        <option>matrix.org</option>
      </select>
      <br>
      <!-- <input name="url" type="text" v-model="form.url" placeholder="Server url"> -->
      <button type="submit" name="button">login</button>
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
    login() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('auth/login', this.form)
          .then( res => this.$store.dispatch('auth/getProfile') )
        }else{
          document.getElementById("credentialsIncorrect").style.display ="block";
        }
      })
    }
  }
}
</script>
