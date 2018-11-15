<template>
<div id="app">
  <Navigation></Navigation>
  <router-view></router-view>
</div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
  name: 'app',
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s | WebRes'
  },
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
@import "../node_modules/normalize.css/normalize.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  float: left;
  width: 100%;
}

a{
  text-decoration: none;
  font-weight: bold;
  color: #000;
  border-bottom: 2px solid transparent;
  -webkit-transition: all .3s ease-in-out;
  -moz-transition: all .3s ease-in-out;
  -o-transition: all .3s ease-in-out;
  transition: all .3s ease-in-out;
  &:hover, &.router-link-exact-active{
    text-decoration: none;
    border-color: #000;
  }
  &:focus{
    text-decoration: none;
  }
}

body{
  background: #faf9f9;
}

.container{
  max-width: 1140px;
  width: 100%;
  margin: 0 auto;
}
</style>
