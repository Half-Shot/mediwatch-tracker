<template lang="html">
    <div class="container roomlist">
        <ul>
            <li v-for="roomType in Object.keys(rooms)">
                <router-link :to="{ name: 'room', params: {roomType} }">{{rooms[roomType].name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "RoomList",
  data: function() {
    return {
      text: "",
      rooms: this.$store.getters['room/roomSet'],
    }
  },
  mounted() {
      console.log("RoomList rooms:", this.rooms);
      //this.rooms.push({name: "Fake Room", roomId: "FakeId"});
  },
  beforeDestroy() {
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>

</style>
