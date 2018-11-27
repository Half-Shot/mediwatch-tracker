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
                <input name="username" v-validate.disable="'required|min:3'" type="text" v-model="form.username" placeholder="Username">
                <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>

                <input name="password" id="password" ref="password" v-validate.disable="'required|min:6'" type="password" v-model="form.password" placeholder="Password">
                <p class="passwordError" v-if="errors.has('password')">{{ errors.first('password')}}</p>

                <input name="passwordConfirm" id="passwordConfirm" v-validate.disable="'required|confirmed:password'" type="password" v-model="form.passwordConfirm" placeholder="Confirm Password">
                <p class="passwordError" v-if="errors.has('passwordConfirm')">{{ errors.first('passwordConfirm')}}</p>

                <select name="url" v-model="form.url">
                  <option value="https://medical.webres.me">medical.webres.me</option>
                  <option value="https://matrix.half-shot.uk">half-shot.uk</option>
                </select>

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
import Config from '../Config'
export default {
  name: "Register",
  metaInfo: {
    title: 'Register'
  },
  data: function() {
    return {
      passwordConfirm: false,
      form: {
        username: '',
        password: '',
        url: 'https://medical.webres.me',
      }
    }
  },
  methods: {
    register() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('auth/register', this.form)
            .then(res => this.$store.dispatch('auth/getProfile'))
        }
      })
    }
  }
}
</script>
