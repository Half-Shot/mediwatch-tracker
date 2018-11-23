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
            <form  @submit.prevent="login()">
              <h2>Login</h2>
              <div class="input-group">
                <input name="username" v-validate.disable="'required|min:3'" type="text" v-model="form.username" placeholder="Username">
                <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
              </div>
              <div class="input-group">
                <input name="password" type="password" v-model="form.password" placeholder="Password">
              </div>
              <div class="input-group">
                <label>Server:</label>
                <select name="url" v-model="form.url">
                  <option value="https://medical.webres.me">medical.webres.me</option>
                  <option value="https://matrix.half-shot.uk">half-shot.uk</option>
                  <option value="https://matrix.org">matrix.org</option>
                </select>
              </div>
              <div class="input-group">
                <button type="submit" name="button" class="btn full">Login</button>
              </div>
              <ul class="secondary-links">
                <li>
                  <router-link :to="{ name: 'forgot' }" class="underlined">Forgotten password</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'register' }" class="underlined">Register</router-link>
                </li>
              </ul>
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
  name: "Login",
  metaInfo: {
    title: 'Login'
  },
  data: function() {
    return {
      form: {
        username: '',
        password: '',
        url: "https://medical.webres.me", //Config.getDefaultHomeserver(),
      }
    }
  },
  methods: {
    login() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('auth/login', this.form)
            .then(res => this.$store.dispatch('auth/getProfile'))
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login{
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 100%;
}
.secondary-links{
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
  text-align: center;
  li{
    display: inline-block;
    margin: 0 10px 0 0;
  }
}
  .background-section{
    background: url('../assets/background.jpg') no-repeat center center;
    background-size: cover;
    margin-top: 50px;
    padding: 30px 0;
    position: relative;
    border-radius: 5px;
    .col-md-4{
      min-height: 260px;
      .panel{
        position: absolute;
        right: -15px;
        top: 10px;
        left: 0;
      }
    }
    h2{
      margin-top: 0;
    }

    .row{
      z-index: 1;
      position: relative;
    }

    &:after{
      content: '';
      position: absolute;
      z-index: 0;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background: -moz-linear-gradient(left, rgba(255,255,255,0.80) 0%, rgba(0,0,0,0) 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(left, rgba(255,255,255,0.80) 0%,rgba(0,0,0,0) 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to right, rgba(255,255,255,0.80) 0%,rgba(0,0,0,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6ffffff', endColorstr='#00000000',GradientType=1 ); /* IE6-9 */
    }
  }
</style>
