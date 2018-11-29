<template>
    <div class="container hello">
      <div v-if="role == 1">
        <h2> Your patients </h2>
          <ul class="user-list">
            <li v-for="patient in Object.keys(patients)">
              <PatientCard :patientId="patient" :patient="patients[patient]"/>
            </li>
          </ul>
        </div>
      <div v-else-if="role === 0">
        <h2> Your data sources </h2>
        <RoomList></RoomList>
      </div>
    </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseRoom from "@/components/Room"
import RoomList from "@/components/RoomList"
import PatientCard from "@/components/PatientCard"
export default {
  name: 'Home',
  components: {
    BaseRoom,
    RoomList,
    PatientCard,
  },
  created() {
    this.$store.dispatch("room/fetchRooms");
    this.$store.getters['auth/client'].on("Room", function(room){
      var roomId = room.roomId;
      alert('new room');
    });
  },
  data: function() {
    return {

    }
  },
  computed: {
    role() {
      return this.$store.getters['auth/role']
    },
    patients() {
        return this.$store.getters['room/patients'];
    }
  }
}
</script>


<style media="screen" lang="scss">
.mx-auto {
    margin: auto;
}
.user-list {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
        margin-bottom: 15px;
    }
}
</style>
