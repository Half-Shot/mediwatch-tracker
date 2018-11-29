<template lang="html">
    <div class="container logwriter">
        <h3> Add information to your medical log </h3>
        <section class="stage1" v-if="stage === 0">
            <p> What kind of information would you like to enter into the log?</p>
            <label class="radio">
                <input type="radio" value="0" name="typeOfInfo" v-model="typeOfInfo">
                <span>Appointment notes</span>
            </label>
            <label class="radio">
                <input type="radio" value="1" name="typeOfInfo" v-model="typeOfInfo">
                <span>Taken medication</span>
            </label>
        </section>
        <form @submit.prevent="sendLog()">
            <p>
                
            </p>
        </form>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
        stage: 0,
        typeOfInfo: 0,
    }
  },
  computed: {

  }
}
</script>
