<template>
<div class="container">
  <div class="panel">
    <h2> Your information </h2>
    <br>
    <form class="" @submit.prevent="setup()">
      <!-- <input type="text" name="" value=""> -->
      <input type="radio" name="role" id="patient" value="0" v-model="form.role">
      <label for="patient">Patient</label>
      <br>
      <input type="radio" name="role" id="doctor" value="1" v-model="form.role">
      <label for="doctor">Doctor</label>
      <!-- <br>
      <input type="number" name="height" placeholder="180" min="46" max="2720">Height(CM)</input>
      <br>
      <input type="number" name="weight" placeholder="60" max="635" min="2" step="0.1">Weight(KG)</input>
      <br> -->
      <br>
      Display name
      <input type="text" name="displayname" v-model="profile.displayname">
      <br>
      <button type="submit" name="button">Submit</button>
    </form>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  name: "Setup",
  data: function() {
    return {
      form: {
        role: 0
      }
    }
  },
  mounted() {
    //this.$store.dispatch('auth/login')
  },
  methods: {
    setup() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('auth/setRole', this.form)
          this.$store.dispatch('auth/setDisplayName', this.profile.displayname)
            .then(r => {
              this.$store.dispatch('auth/getProfile')
            })

          //.then( res => this.$store.dispatch('auth/getProfile') )
        }
      })
    }
  },
  computed: {
    ...mapGetters("auth", [
      "profile"
    ])
  }
}
</script>
