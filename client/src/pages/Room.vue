<template>
<div v-if="room" class="container">
    <h2> Contents </h2>
    <BaseRoom :room="room">
    </BaseRoom>
    <h2> Members </h2>
    <MemberList :room="room">
    </MemberList>
</div>
</template>

<script>
import BaseRoom from "@/components/Room"
import MemberList from "@/components/MemberList"
export default {
  props: ['roomType'],
  metaInfo: {
    title: 'Room'
  },
  components: {
    BaseRoom,
    MemberList,
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
