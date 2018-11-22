<template>
<div class="container">
  <div class="panel">
    <h2> Register for Mediwatch </h2>
    <a href="Login">Click here to login</a>
    <br>
    <form class="" @submit.prevent="register()">
      <input type="radio" name="role" id="patient" value="patient" checked></input>
      <label for="patient">Patient</label>
      <br>
      <input type="radio" name="role" id="doctor" value="doctor"></input>
      <label for="doctor">Doctor</label>
      <br>
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
