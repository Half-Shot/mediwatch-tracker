<template>
<div class="container">
  <div class="pane setup">
    <h1> Setting up your account </h1>
    <br>
    <div v-if="setupStage == -1">
        <Spinner class="spinner"
          :color="'#444444'"
          :size="128"
          :depth="5"
          :rotation="true"
          :speed="5"></Spinner>
    </div>
    <h2 v-bind:class="{ active: (setupStage == 1) }"> Setup your profile </h2>
    <div v-if="setupStage == 1">
        <form @submit.prevent="sendDataForm()">
          <!-- <input type="text" name="" value=""> -->
          <input type="radio" name="role" id="patient" value="0" v-model="form.role">
          <label for="patient">Patient</label>
          <br>
          <input type="radio" name="role" id="doctor" value="1" v-model="form.role">
          <label for="doctor">Doctor</label>
          <!-- <br>
          <input type="number" name="height" placeholder="180" min="46" max="2720">Height(CM)
          <br>
          <input type="number" name="weight" placeholder="60" max="635" min="2" step="0.1">Weight(KG)
          <br> -->
          <br>
          Display name
          <input v-if="profile" type="text" name="displayname" v-model="profile.displayname">
          <br>
          <button type="submit" name="button">Submit</button>
        </form>
    </div>
    <h2 v-bind:class="{ active: (setupStage == 2) }"> Creating your data views </h2>
    <p>{{roomCreatingStatement}}</p>
    <div v-if="setupStage == 2">
        <Spinner class="spinner"
          :color="'#444444'"
          :size="32"
          :depth="5"
          :rotation="true"
          :speed="5"></Spinner>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import Spinner from 'vue-spinner-component/src/Spinner.vue'
export default {
  name: "Setup",
  metaInfo: {
    title: 'Setup'
  },
  components: {
      Spinner
  },
  data: function() {
    return {
      form: {
        role: 0
      },
      setupStage: -1, // 0 - personal deets, 1 - creating rooms, 2 - we don't need to do anything, go to dashboard
      roomCreatingStatement: "Preparing"
    }
  },
  mounted() {
    //this.$store.dispatch('auth/login')
    // Determine the stage we should be on.
    this.$store.dispatch('room/fetchRooms');
    const role = this.$store.getters['auth/role'];
    const rooms = this.$store.getters['room/roomSet'];
    const isRoomsIncomplete = rooms.medicalLog === null;
    console.log("role:", role, "rooms:", rooms);
    if (role == null || role == undefined) {
        this.setupStage = 1;
    } else if (isRoomsIncomplete) {
        this.setupStage = 2;
        this.createRooms().then(() => {
            this.$store.dispatch('room/fetchRooms');
            this.$router.push({name: "dashboard"});
        }).catch((err) => {
            this.roomCreatingStatement = "Encountered an error while creating. Ask someone for help!";
            console.error("Ran into an error while creating rooms:", err);
        })
    } else { // All set, redirect to home.
        this.$router.push({name: "dashboard"});
    }
  },
  methods: {
    sendDataForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('auth/setRole', this.form)
          this.$store.dispatch('auth/setDisplayName', this.profile.displayname)
            .then(r => {
              this.$store.dispatch('auth/getProfile');
              const rooms = this.$store.getters['room/roomSet'];
              const isRoomsIncomplete = rooms.medicalLog === null;
              if (isRoomsIncomplete) {
                  this.setupStage = 2;
              } else {
                  this.$router.push({name: "dashboard"});
              }
            })

          //.then( res => this.$store.dispatch('auth/getProfile') )
        }
      })
    },
    async createRooms() {
        const rooms = this.$store.getters['room/roomSet'];
        if (rooms.medicalLog === null) {
            this.roomCreatingStatement = "Creating Medical Log";
            await this.$store.dispatch('room/create', {type: "medicallog"});
        }
        // Create some rooms.
    }
  },
  computed: {
    ...mapGetters("auth", [
      "profile"
    ])
  }
}
</script>

<style type="scss">
.spinner {
    margin-left: auto;
    margin-right: auto;
}

.pane.setup h2 {
    color:grey;
}

.pane.setup h2.active {
    color: black;
}

</style>
