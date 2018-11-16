<template>
<div class="container">
  <h2> Log into Mediwatch </h2>
</div>
</template>

<script>
import MatrixClientPeg from '../MatrixClientPeg'
export default {
  name: "Login",
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
