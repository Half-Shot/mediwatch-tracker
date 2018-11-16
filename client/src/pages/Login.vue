<template>
<div class="container">
  <div class="panel">
    <h2> Log into Mediwatch </h2>
    <form class="" @submit.prevent="login()">
      this.$validator.validateAll();
      <input name="username" v-validate.disable="'required|min:3'" type="text" v-model="form.username" placeholder="Username">
      <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
      <input name="password" type="password" v-model="form.password" placeholder="Password">
      <input name="url" type="text" v-model="form.url" placeholder="Server url">
      <button type="submit" name="button">login</button>
    </form>
  </div>

</div>
</template>

<script>
import MatrixClientPeg from '../MatrixClientPeg'
export default {
  name: "Login",
  data: function() {
    return {
      form: {
        username: '',
        password: '',
        url: 'https://medical.webres.me'
      },
      loggedIn: "Unknown"
    }
  },
  created() {

  },
  methods: {
    login() {
      alert();
      console.log(this.form);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
