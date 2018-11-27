<template>
<div class="container">
    <BaseRoom v-if="room" :room="room">
    </BaseRoom>
</div>
</template>

<script>
import BaseRoom from "@/components/Room"
export default {
  props: ['roomType'],
  metaInfo: {
    title: 'Room'
  },
  components: {
    BaseRoom,
  },
  data: function() {
    return {
      room: null
    }
  },
  mounted() {
    this.$store.dispatch('room/fetchRooms');
    const roomType = this.$route.params.roomType;
    const r = this.$store.getters['room/roomSet'][roomType];
    console.log("Got room of type", roomType, ":", r);
    if (!r) {
      this.$router.push({
        name: "home"
      });
    }
    this.room = r;
  },
  methods: {

  },
}
</script>
