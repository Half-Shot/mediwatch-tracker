<template>
<div class="container hello">
  <template v-if="role && role == 1">
    <div class="row align-items-center mx-auto">
      <div class="col-md-8 mx-auto">
        <div class="panel">
          <h2>Your patients:</h2>

          <input type="text" v-model="search" placeholder="Search"/>
          <ul class="user-list">
            <li v-for="patient in patients">
              <router-link :to="{ name: 'dashboard-profile', params: {} }">
                {{ patient.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>

  <template v-if="role === 0">
    Non-Doctor stuff
    <BaseRoom :room="this.rooms.medicalLog"></BaseRoom>
  </template>

</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseRoom from "@/components/Room"
export default {
  name: 'Home',
  components: {
      BaseRoom
  },
  created() {
      this.$store.dispatch("room/fetchRooms");
      this.rooms = this.$store.getters['room/roomSet'];
  },
  data: function() {
    return {
      rooms: {},
      patients: [
        {
          name: 'Test'
        },
        {
          name: 'Johne'
        }

    ],
      search: ''
    }
  },
  computed: {
    role () {
       return this.$store.getters['auth/role']
     }
  }
}
</script>


<style media="screen" lang="scss">
  .mx-auto{
    margin: auto;
  }
  .user-list{
    list-style: none;
    margin: 0;
    padding: 0;
    li{
      margin-bottom: 15px;
    }
  }
</style>
