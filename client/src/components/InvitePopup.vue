<template lang="html">
  <div class="overlay" v-if="shown">
    <div class="popup">
      <svg @click="closeInvites" class="closeButton" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z"/></svg>
      <h2> Invites to read data </h2>
      <p> In the future, we would fill this in with invites to view data </p>
      <ul>
        <li v-for="room in invites">
          {{ room.name }}
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "InvitePopup",
  props: {
    shown: Boolean
  },
  data() {
    return {};
  },
  methods: {
    closeInvites() {
      this.$emit("toggleInvites");
    }
  },
  computed: {
    ...mapGetters("room", ["invites"])
  }
};
</script>


<style  lang="scss">
.overlay {
  z-index: 99;
  background: rgba(0, 0, 0, 0.6);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
}
.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow: auto;
  position: relative;
  transition: all 5s ease-in-out;
  z-index: 100;
  h2 {
    margin-top: 0;
  }
}
.closeButton {
  position: absolute;
  top: 15px;
  right: 15px;
  max-width: 30px;
  cursor: pointer;
  z-index: 1;
}
</style>
