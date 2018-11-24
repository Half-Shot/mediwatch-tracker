<template lang="html">
    <div class="container room">
        <h1> RoomID: {{this.room.roomId}} </h1>
        <h1> Name: {{this.room.name}} </h1>
        <p>This is a room, baaa. 🐑</p>
    </div>
</template>

<script>
export default {
  name: "BaseRoom",
  props: ['room'],
  data: function() {
    return {

    }
  },
  mounted() {
      this.$store.dispatch("privacy/showingRoom", this.room);
  },
  beforeDestroy() {
      this.$store.dispatch("privacy/hidingRoom", this.room);
  },
  methods: {

  }
}
</script>

<style lang="scss">

    h1 {
        font-size: 12pt;
    }

    .container.room {
        border: 1px solid black;
    }

</style>
