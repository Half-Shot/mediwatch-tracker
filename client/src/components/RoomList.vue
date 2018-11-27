<template lang="html">
    <div class="container roomlist">
        <ul>
            <li v-for="room in rooms">
                <router-link :to="{ name: 'room', params: {roomId: room.roomId} }">{{room.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "RoomList",
  props: ['room', 'force'],
  data: function() {
    return {
      text: "",
      rooms: [],
    }
  },
  mounted() {
      this.rooms.push({name: "Fake Room", roomId: "FakeId"});
  },
  beforeDestroy() {
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>

</style>
