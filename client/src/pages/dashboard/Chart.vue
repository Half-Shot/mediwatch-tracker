<template lang="html">
  <div class="panel dashboard-fullscreen">
    <div style="width:50%;">
      <line-chart :chart-data="datacollection"></line-chart>
      <button @click="fillData()">Randomize</button>
    </div>


  </div>
</template>

<script>
import LineChart from './LineChart.js'
export default {
  data() {
    return {
      room: this.$store.getters['room/getCurrent'],
      datacollection: null
    }
  },
  components: {
    LineChart
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [{
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [this.getRandomInt(), this.getRandomInt()]
        }, {
          label: 'Data Two',
          backgroundColor: '#000000',
          data: [this.getRandomInt(), this.getRandomInt()]
        }]
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>
<style lang="scss">
.dashboard-fullscreen {
    min-height: calc(100vh - 115px);
}
</style>
