<template lang="html">
    <div class="container roomlist">
        <ul>
            <li v-for="roomType in Object.keys(rooms)" v-if="rooms[roomType] != null">
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
        rooms: {},
    };
  },
  mounted() {
      console.log("RoomList rooms:", this.rooms, this.$store.getters['room/roomSet']);
      console.log(this.$store.getters['room/roomSet']["medicalInfo"])
      this.rooms = this.$store.getters['room/roomSet'];
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
