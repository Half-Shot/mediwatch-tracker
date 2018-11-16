<template lang="html">
  <aside class="sidebar">
    <div class="rooms">

    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      rooms: []
    }
  },
  mounted() {
    this.getRooms();
  },
  computed: {
    getRooms: function() {
      return this.$store.rooms.get;
    }
  }

}
</script>

<style lang="css">
</style>
