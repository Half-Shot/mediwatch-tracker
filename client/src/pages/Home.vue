<template>
    <div class="container hello">
      <div v-if="role == 1">
        <h2> Your patients </h2>
        <ul class="contacts">
          <li v-for="patient in patientList">
            <PatientCard :patientId="patient"/>
          </li>
          <li></li>
        </ul>
          <!-- <ul class="user-list" v-if="Object.keys(patients).length > 0">
            <li v-for="patient in Object.keys(patients)">
              {{ patients[patient] }}

            </li>
          </ul> -->
        </div>
      <div v-else-if="role === 0">
        <h2> Your data sources </h2>
        <RoomList></RoomList>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseRoom from "@/components/Room";
import RoomList from "@/components/RoomList";
import PatientCard from "@/components/PatientCard";
export default {
  name: "Home",
  components: {
    BaseRoom,
    RoomList,
    PatientCard
  },
  created() {
    this.$store.dispatch("room/fetchRooms");
    let that = this;
    this.$store.getters["auth/client"].on("Room", function(room) {
      that.$store.dispatch("room/fetchRooms");
    });
    this.$store.getters["auth/client"].on("RoomMember.membership", function(
      event,
      member,
      oldMembership
    ) {
      that.$store.dispatch("room/fetchRooms");
    });

    this.$store.getters["auth/client"].on("RoomState.newMember", function(
      event,
      state,
      member
    ) {
      that.$store.dispatch("room/fetchRooms");
    });
  },
  data: function() {
    return {};
  },
  computed: {
    role() {
      return this.$store.getters["auth/role"];
    },
    patientList() {
      return this.$store.getters["room/patientList"];
    }
  }
};
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
