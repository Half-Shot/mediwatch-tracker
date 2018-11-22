<template>
<div class="container hello">
  <h2> Logged in = {{loggedIn}} </h2>
</div>
</template>

<script>
import { E_NOLOGIN } from '../MatrixClientPeg'

export default {
  name: 'HelloWorld',
  data: function() {
    return { loggedIn: "Unknown" }
  },
  created() {
   
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
