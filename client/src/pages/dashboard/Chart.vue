<template lang="html">
  <div class="panel dashboard-fullscreen">
    <h1>Chart</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room: this.$store.getters['room/getCurrent']
    }
  }
}
</script>
<style lang="scss">
.dashboard-fullscreen {
    min-height: calc(100vh - 115px);
}
</style>
