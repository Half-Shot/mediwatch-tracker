<template>
<div id="app">
  <Navigation></Navigation>
  <h1 style="color:red;" v-if="error !== false">Error while loading config: {{error}}</h1>
  <div class="container-full">
    <div v-if="waitingToLogIn !== 'PREPARED'">
      <b> waiting to log in {{waitingToLogIn}} </b>
    </div>
    <b> waiting to log in {{waitingToLogIn}} </b>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Config from './Config'

export default {
  name: 'app',
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s | WebRes'
  },
  components: {
    Navigation
  },
  computed: {
    waitingToLogIn: function() {
      console.log("Is it gonna be smart?");
      return this.$store.getters['auth/syncState'];
    }
  },
  created: function() {
    this.$store.dispatch('auth/login');
    Config.result.then((res) => {
      if (res !== true) {
        this.error = res;
      }
    });
  },
  data() {
    return {
      error: false,
    }
  },
}
</script>

<style lang="scss">
@import "../node_modules/normalize.css/normalize.css";
@import "../stylesheet.css";

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    float: left;
    width: 100%;
}

html {
    box-sizing: border-box;
}
*,
*:after,
*:before {
    box-sizing: inherit;
}

a {
    text-decoration: none;
    font-weight: bold;
    color: #000;
    border-bottom: 2px solid transparent;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    &.router-link-exact-active,
    &:hover {
        text-decoration: none;
        border-color: #000;
    }
    &:focus {
        text-decoration: none;
    }
}

body {
    background: #faf9f9;
}

.panel {
    background: #fff;
    box-shadow: 0 1px 20px 0 rgba(46,61,73,.2);
    padding: 15px;
    margin: 20px 0;
    border-radius: 5px;
}

.container {
    max-width: 1140px;
    width: 100%;
    margin: 0 auto;
}
.container-full {
    width: 100%;
    float: left;
}
</style>
