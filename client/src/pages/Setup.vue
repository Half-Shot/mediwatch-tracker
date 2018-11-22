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
      <input type="number" name="height" placeholder="180" min="46" max="2720">Height(CM)</input>
      <br>
      <input type="number" name="weight" placeholder="60" max="635" min="2" step="0.1">Weight(KG)</input>
      <br>
      <input type="text" name="displayname">Display name</input>
      <br>
      <button type="submit" name="button">Submit</button>
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
