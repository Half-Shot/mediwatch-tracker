<template>
<div class="login">
  <section>
    <div class="container background-section">
      <div class="row">
        <div class="col-md-8">
          <h1>Mediwatch</h1>
          <p>You're the owner of your medical data!</p>
        </div>
        <div class="col-md-4">
          <div class="panel">
            <form class="" @submit.prevent="register()">
              <h2>Register</h2>
              <div class="input-group">
                <input name="username" v-validate.disable="'required|min:3'" type="text" v-model="form.username" placeholder="Username">
                <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
              </div>
              <div class="input-group">
                <input name="password" id="password" ref="password" v-validate.disable="'required|min:6'" type="password" v-model="form.password" placeholder="Password">
                <p class="text-danger" v-if="errors.has('password')">{{ errors.first('password')}}</p>
              </div>
              <div class="input-group">
                <input name="passwordConfirm" id="passwordConfirm" v-validate.disable="'required|confirmed:password'" type="password" v-model="form.passwordConfirm" placeholder="Confirm Password">
                <p class="text-danger" v-if="errors.has('passwordConfirm')">{{ errors.first('passwordConfirm')}}</p>
              </div>
              <div class="input-group">
                <label>Choose a server or enter your own:</label>
                <div class="row" style="float: left;">
                  <div class="col-md-6">
                    <dropdown :options="servers" :selected="servers[0]" v-on:updateOption="selectServer" :placeholder="'Select an Item'">
                    </dropdown>
                  </div>
                  <div class="col-md-6">
                    <input type="text" placeholder="Your server" v-model="form.url_field">
                  </div>
                </div>
              </div>
              <button type="submit" name="button" class="btn">Register</button>
              <router-link :to="{ name: 'login' }" class="underlined">Login</router-link>

            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

</div>
</template>

<script>
import {
  mapGetters
} from "vuex";
import dropdown from "vue-dropdowns";

export default {
  name: "Register",
  metaInfo: {
    title: "Register"
  },
  data: function() {
    return {
      form: {
        username: "",
        password: "",
        url: "https://medical.webres.me"
      }
    };
  },
  components: {
    dropdown: dropdown
  },
  methods: {
    register() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch("auth/register", this.form)
            .then(res => this.$store.dispatch("auth/getProfile"));
        }
      });
    },
    selectServer(payload) {
      this.form.url = payload.value;
    }
  },
  computed: {
    ...mapGetters("auth", ["servers"])
  }
};
</script>
