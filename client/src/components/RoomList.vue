<template lang="html">
    <div class="container roomlist">
        <ul>
            <li v-for="roomType in Object.keys(rooms)" v-if="rooms[roomType] != null">
                <router-link :to="{ name: 'room', params: {roomType, patientId: userId} }">{{rooms[roomType].name}}</router-link>
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
        userId: (this.$store.getters['auth/userId']),
    }
  },
  computed: {
    rooms() {
      return this.$store.getters['room/roomSet']
    }
  }
}
</script>
