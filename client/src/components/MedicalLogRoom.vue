<template lang="html">
    <div class="container room medicalog">
        <p> This is a list of of medical records filed by you and your doctors </p>
        <virtualList :offset="scrollOffset" :size="events.length + 20" :remain="10" :totop="onScrollTop" :tobottom="onScrollBottom" :debounce="500" :onscroll="onScroll">
            <MedicalLogEvent v-for="event of events" :key="event.getId()" :event="event" :room="room"/>
        </virtualList>
    </div>
</template>

<script>
import BaseRoom from "@/components/Room"
import MedicalLogEvent from "@/components/MedicalLogEvent"
import virtualList from 'vue-virtual-scroll-list'
export default {
  extends: BaseRoom,
  components: {
      virtualList,
      MedicalLogEvent,
  },
  data: function() {
    return {
        
    }
  },
  mounted() {
      console.log(this.events);
  },
  beforeDestroy() {
  },
  methods: {

  }
}
</script>
