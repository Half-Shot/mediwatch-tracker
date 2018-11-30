<template lang="html">
  <div class="container-full">
    <Sidebar></Sidebar>
    <main class="dashboard">
      <Chart></Chart>
      <!-- <Chat></Chat> -->
    </main>
  </div>
</template>

<script>
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
