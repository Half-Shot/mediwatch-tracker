<template>
<div id="app" class="bootstrap-wrapper">
  <Navigation @toggleInvites="showInvites()" @toggleShare="showShares()"></Navigation>
  <h1 style="color:red;" v-if="error !== false">Error while loading config: {{error}}</h1>
  <div class="container-full">
    <div v-if="!syncStateOk && isSyncingPage">
      <b> Synchronising, please wait: {{syncState}} </b>
      <spinner class="spinner" :color="'#444444'" :size="128" :depth="5" :rotation="true" :speed="5"></spinner>
    </div>
    <main class="main" v-else>
      <router-view></router-view>
    </main>
    <notifications group="foo" position="top right" ></notifications>
    <InvitePopup :shown="invites" @toggleInvites="showInvites()"></InvitePopup>
    <SharePopup :shown="shares" @toggleShare="showShares()"></SharePopup>
  </div>
</div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import InvitePopup from "@/components/InvitePopup.vue";
import Config from "./Config";
import Spinner from "vue-spinner-component/src/Spinner.vue";
import SharePopup from "@/components/SharePopup.vue";
import { mapGetters } from "vuex";

export default {
  name: "app",
  metaInfo: {
    title: "Home",
    titleTemplate: "%s | Mediwatch"
  },
  components: {
    Navigation,
    Spinner,
    InvitePopup,
    SharePopup
  },
  computed: {
    ...mapGetters("auth", ["syncState"]),
    syncStateOk: function() {
      console.log("The state is:", this.$store.getters["auth/syncState"]);
      return ["PREPARING", "SYNCING", "null", "undefined"].includes(
        String(this.$store.getters["auth/syncState"])
      );
    },
    isSyncingPage: function() {
      return !["register"].includes(this.$route.name);
    }
  },
  created: function() {
    this.$store.dispatch("auth/login");
  },
  methods: {
    showInvites() {
      this.invites = this.invites ? false : true;
    },
    showShares() {
      this.shares = this.shares ? false : true;
      this.$store.dispatch("contacts/get");
    }
  },
  data() {
    return {
      error: false,
      invites: false,
      shares: false
    };
  }
};
</script>

<style lang="scss">
@import "../node_modules/normalize.css/normalize.css";
@import "../node_modules/bootstrap-grid-only-css/dist/css/bootstrap-grid.min.css";

main.main {
  min-height: 100vh;
  position: relative;
  float: left;
  width: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  float: left;
  width: 100%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  position: relative;
}
html {
  box-sizing: border-box;
}
*,
*:after,
*:before {
  box-sizing: inherit;
}
hr {
  border: none;
  width: 75%;
  margin: 10px auto;
  display: block;
  background: red;
  height: 2px;
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
  background: #fffefe;
}
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  cursor: pointer;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #00b4db;
  border-color: #00b4db;
  margin: 10px 10px 10px 0;
  &.btn-delete {
    background: white;
    border-color: white;
    color: red;
    position: absolute;
    margin: 0;
    right: 0;
    top: 10px;
    svg {
      fill: red;
      width: 20px;
    }
  }
  &.full {
    width: 100%;
    margin: 10px 0;
  }
  &:hover {
    background-color: #00b4db;
    border-color: #00b4db;
  }
}
label {
  margin-bottom: 5px;
  float: left;
  width: 100%;
}

input {
  float: left;
  width: 100%;
  border: none;
  border-bottom: 2px solid #071e3d;
  padding: 10px 0;
  margin-bottom: 15px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  &:focus {
    outline: none;
    border-bottom-color: #aedefc;
  }
}
select {
  float: left;
  width: 100%;
  margin-bottom: 15px;
}
.panel {
  background: #fff;
  box-shadow: 0 1px 20px 0 rgba(46, 61, 73, 0.2);
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

.inputGroup {
  background-color: #fff;
  display: block;
  margin: 10px 0;
  position: relative;
  float: left;
  width: 50%;
  label {
    padding: 20px 30px 20px 40px;
    width: 100%;
    display: block;
    text-align: left;
    color: #3c454c;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: color 200ms ease-in;
    overflow: hidden;

    &:after {
      width: 32px;
      height: 32px;
      content: "";
      border: 2px solid #d1d7dc;
      background-color: #fff;
      background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
      background-repeat: no-repeat;
      background-position: 2px 3px;
      border-radius: 50%;
      z-index: 2;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      transition: all 200ms ease-in;
    }
  }

  input:checked ~ label {
    //color: #fff;

    &:after {
      background-color: #00b4db;
      border-color: #00b4db;
    }
  }

  input {
    width: 32px;
    height: 32px;
    order: 1;
    z-index: 2;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    visibility: hidden;
  }
}
body {
  .dropdown-menu,
  .btn-group {
    border: none;
    width: 100%;
    margin-top: 0;
  }
  .dropdown-toggle {
    border-bottom: 2px solid #071e3d;
    background: none;
  }
  .dropdown-toggle:hover {
    background: none;
  }
  .dropdown-menu > li > a {
    border: none;
    &:hover {
      color: black;
      border: none;
    }
  }
}
</style>
