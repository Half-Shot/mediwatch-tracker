<template>
<div class="container">
  <div class="panel">
    <h2> Your information </h2>
    <br>
    <form class="" @submit.prevent="setup()">
      <!-- <input type="text" name="" value=""> -->
      <input type="radio" name="role" id="patient" value="0" v-model="form.role"></input>
      <label for="patient">Patient</label>
      <br>
      <input type="radio" name="role" id="doctor" value="1" v-model="form.role"></input>
      <label for="doctor">Doctor</label>
      <br>
      <button type="submit" name="button">login</button>
    </form>
  </div>
</div>
</template>

<script>
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
          //.then( res => this.$store.dispatch('auth/getProfile') )
        }
      })
    }
  }
}
</script>
