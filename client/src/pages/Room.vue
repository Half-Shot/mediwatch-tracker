<template>
<div v-if="room" class="container">
    <h2> Contents </h2>
    <div>
        <MedicalLogRoom :room="room" v-if="_roomType === 'medicalLog'"></MedicalLogRoom>
        <BaseRoom :room="room" v-else></BaseRoom>
    </div>
    <h2> Members </h2>
    <MemberList :room="room"/>
</div>
</template>

<script>
import BaseRoom from "@/components/Room"
import MedicalLogRoom from "@/components/MedicalLogRoom"
import MemberList from "@/components/MemberList"
export default {
  props: ['roomType'],
  metaInfo: {
    title: 'Room'
  },
  components: {
    BaseRoom,
    MemberList,
    MedicalLogRoom,
  },
  data: function() {
    return {
      room: null,
      _roomType: null,
    }
  },
  computed: {

  },
  mounted() {
    this._roomType = this.roomType || this.$route.params.roomType;
    this.$store.dispatch('room/fetchRooms');
    const r = this.$store.getters['room/roomSet'][this._roomType];
    console.log("Got room of type", this._roomType, ":", r);
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
