<template lang="html">
    <div class="container room medicallog">
        <p> This is a list of of medical records filed by {{patientName}} </p>
        <virtualList :offset="scrollOffset" :size="events.length + 20" :remain="10" :totop="onScrollTop" :tobottom="onScrollBottom" :debounce="500" :onscroll="onScroll">
            <MedicalLogEvent v-for="event of events" :key="event.getId()" :event="event" :room="room"/>
        </virtualList>
        <hr/>
        <div class="logcontrols" v-if="showControls">
            <MedicalLogWriter :room=room class="amendLog"/>

        </div>
    </div>
</template>

<script>
import BaseRoom from "@/components/Room";
import MedicalLogEvent from "@/components/MedicalLogEvent";
import MedicalLogWriter from "@/components/MedicalLogWriter";
import virtualList from "vue-virtual-scroll-list";
export default {
  extends: BaseRoom,
  components: {
    virtualList,
    MedicalLogEvent,
    MedicalLogWriter
  },
  data: function() {
    return {
      isDoctor: this.$store.getters["auth/role"] === 1
    };
  },
  computed: {
    patientName() {
      return this.isDoctor ? "the patient" : "you";
    }
  }
};
</script>

<style lang="scss" scoped>
.container.room.medicallog hr {
    background-color: black;
}
.container.room.medicallog .logcontrols {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 10px;
    font-size: 1em;
}
</style>
