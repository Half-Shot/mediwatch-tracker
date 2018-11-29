<template lang="html">
    <div class="container room">
        <h1> RoomID: {{this.room.roomId}} </h1>
        <ul>
            <li v-for="event in events">
              {{event.getContent().body}}
            </li>
        </ul>
        <form @submit.prevent="addToLog()">
          <input type="text" v-model="text" name="displayname" placeholder="Some text to send">
          <button type="submit" name="button" class="btn">Send</button>
        </form>
        <form @submit.prevent="inviteToView()">
          <input type="text" v-model="inviteUser" name="displayname" placeholder="@userid:example.com">
          <button type="submit" name="button" class="btn">Invite to view</button>
        </form>
    </div>
</template>

<script>
export default {
  name: "BaseRoom",
  props: ['room', 'force', 'showControls'],
  data: function() {
    return {
      inviteUser: "",
      text: "",
      timeline: null,
      scrollOffset: 0,
    }
  },
  mounted() {
    this.timeline = this.room.getLiveTimeline();
    this.$store.dispatch("privacy/showingRoom", this.room);
    this.scrollOffset = this.events.length;
  },
  beforeDestroy() {
    this.$store.dispatch("privacy/hidingRoom", this.room);
  },
  computed: {
      events() {
          return this.room.getLiveTimeline().getEvents().filter((e) => {
            return ![
              "me.webres.medical.roomtype",
              "m.room.join_rules",
              "m.room.guest_access",
              "m.room.name",
              ].includes(e.getType());
          });
      }
  },
  methods: {
    async onScrollTop() {
        console.log("User scrolled to top, fetching events");
        await this.$store.getters["auth/client"].scrollback(this.room);
        console.log("Got some more events");
    },
    async onScrollBottom() {
        console.log("User scrolled to bottom, fetching events");
    },
    async onScroll(event, data) {
        this.scrollOffset = data.offset;
    },
    async addToLog() {
      await this.$store.dispatch("room/addToLog", {
        room: this.room,
        body: this.text,
      });
      this.events.push({
        content: {
          body: this.text,
        }
      });
    },
    async inviteToView() {
      await this.$store.dispatch("room/invite", {
        room: this.room,
        user: this.inviteUser,
      });
      this.events.push({
        content: {
          body: `Invited ${this.inviteUser} to view your data`,
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
    font-size: 12pt;
}

.container.room {

}
</style>
