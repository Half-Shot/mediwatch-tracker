<template>
    <div>
        <div if="error">
            {{error}}
        </div>
        <div v-if="room" class="container">
            <h2> Contents </h2>
            <div>
                <MedicalLogRoom showControls=true :room="room" v-if="_roomType === 'medicalLog'"></MedicalLogRoom>
                <BaseRoom :room="room" v-else></BaseRoom>
            </div>
            <h2> Members </h2>
            <MemberList :room="room"/>
        </div>
    </div>
</template>

<script>
import BaseRoom from "@/components/Room";
import MedicalLogRoom from "@/components/MedicalLogRoom";
import MemberList from "@/components/MemberList";
export default {
  props: ["roomType", "patientId"],
  metaInfo: {
    title: "Room"
  },
  components: {
    BaseRoom,
    MemberList,
    MedicalLogRoom
  },
  data: function() {
    return {
      room: null,
      _roomType: null,
      _patientId: null,
      error: null
    };
  },
  computed: {},
  mounted() {
    this._roomType = this.roomType || this.$route.params.roomType;
    this._patientId = this.patientId || this.$route.params.patientId;
    this.$store.dispatch("room/fetchRooms");
    let r;
    if (this._patientId === this.$store.getters["auth/userId"]) {
      r = this.$store.getters["room/roomSet"][this._roomType];
    } else {
      console.log("Attempting to open another patients records");
      let p = this.$store.getters["room/patients"][this._patientId];
      if (!p) {
        this.error =
          "Patient not found. You may no longer have access to view their data.";
        return;
      }
      r = p[this._roomType];
      if (!r) {
        this.error =
          "Datasource not found. You may no longer have access to view this dataset.";
        return;
      }
      console.log("Got room", r);
    }
    console.log("Got room of type", this._roomType, ":", r);
    if (!r) {
      this.$router.push({
        name: "home"
      });
    }
    this.room = r;
  },
  methods: {}
};
</script>
