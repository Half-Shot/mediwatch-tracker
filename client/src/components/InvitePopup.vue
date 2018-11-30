<template lang="html">
  <div class="overlay" v-if="shown">
    <div class="popup invite-popup">
      <svg @click="closeInvites" class="closeButton" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z"/></svg>
      <h2> Invites from patients </h2>
      <p>Your username is: <strong>{{ userId }}</strong></p>
      <ul class="inivte-popup--list contacts" v-if="invites.length > 0">
        <li v-for="room in invites">
          <button type="button" name="button" class="btn" @click="accept(room.roomId)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.6 192.9L345 174.8c-.7-.8-1.8-1.2-2.8-1.2-1.1 0-2.1.4-2.8 1.2l-122 122.9-44.4-44.4c-.8-.8-1.8-1.2-2.8-1.2-1 0-2 .4-2.8 1.2l-17.8 17.8c-1.6 1.6-1.6 4.1 0 5.7l56 56c3.6 3.6 8 5.7 11.7 5.7 5.3 0 9.9-3.9 11.6-5.5h.1l133.7-134.4c1.4-1.7 1.4-4.2-.1-5.7z"/></svg>
          </button>
          <button type="button" name="button" class="btn remove" @click="reject(room.roomId)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"/></svg>
          </button>
          <strong>{{ room.sender.displayName }}</strong>: {{ room.name }}
        </li>
        <li style="display:none;">

        </li>
      </ul>
      <p v-if="invites.length == 0">No invites yet.</p>
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
    },
    accept(roomId) {
      this.$store.dispatch("room/join", roomId).then(r => {
        this.closeInvites();
      });
    },
    reject(roomId) {
      this.$store.dispatch("room/reject", roomId).then(r => {
        this.closeInvites();
      });
    }
  },
  computed: {
    ...mapGetters("room", ["invites"]),
    ...mapGetters("auth", ["userId"])
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
.inivte-popup--list {
  margin: 0;
  padding: 0;
  li {
    padding: 5px 0;
  }
}
.invite-popup {
  .btn {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    position: relative;
    &:first-child {
      margin-left: 10px;
    }
    &.remove {
      background: red;
      border-color: red;
    }
    svg {
      display: block;
      position: absolute;
      left: -3px;
      width: 30px;
      height: 30px;
      top: -2px;
      fill: #fff;
    }
  }
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
