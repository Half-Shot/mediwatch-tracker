<template lang="html">
  <div class="container-full">
    <Sidebar :rooms="roomSet"></Sidebar>
    <main class="dashboard">
      <Chart></Chart>
      <!-- <Chat></Chat> -->
    </main>
  </div>
</template>

<script>
import {
  mapGetters
} from "vuex";
import Sidebar from "@/pages/dashboard/Sidebar.vue";
import Chart from "@/pages/dashboard/Chart.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Chart
  },
  metaInfo: {
    title: "Dashboard"
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
  computed: {
    ...mapGetters("room", ["roomSet"]),
  }
};
</script>

<style lang="scss">
.dashboard {
    float: left;
    display: block;
    width: calc(100% - 75px);
    margin-left: 75px;
    padding: 10px 30px;
}
</style>
