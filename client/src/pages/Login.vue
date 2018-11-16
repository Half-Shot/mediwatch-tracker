<template>
<div class="container">
  <div class="panel">
    <h2> Log into Mediwatch </h2>
    <form class="" @submit.prevent="login()">
      <input type="text" v-model="form.username" placeholder="Username">
      <input type="password" v-model="form.password" placeholder="Password">
      <input type="text" v-model="form.url" placeholder="Server url">
      <button type="submit" name="button">login</button>
    </form>
  </div>
</div>
</template>

<script>
import MatrixClientPeg from '../MatrixClientPeg'
import Config from '../Config'
export default {
  name: "Login",
  data: function() {
    return {
      form: {
        username: '',
        password: '',
        url: Config.getDefaultHomeserver(),
      },
      loggedIn: "Unknown"
    }
  },
  created() {

  },
  methods: {
    login() {
      MatrixClientPeg.loginWithPassword(
        this.form.url,
        this.form.username,
        this.form.password
      ).then(() => {
        // This just means we will login properly when we refresh
        MatrixClientPeg.unsetClient();
        this.$router.push({name: 'dashboard'});
      }).catch(() => {

      });
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
