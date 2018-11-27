<template lang="html">
    <div class="container room">
        <h1> RoomID: {{this.room.roomId}} </h1>
        <ul>
            <li v-for="event in events">
              {{event.content.body}}
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
  props: ['room', 'force'],
  data: function() {
    return {
      inviteUser: "",
      text: "",
      events: [],
    }
  },
  mounted() {
    this.$store.dispatch("privacy/showingRoom", this.room);
    // Get event contents, and filter for non state events.
    this.events = this.room.timeline.map((e) => e.event).filter((e) => e.state_key == null);

  },
  beforeDestroy() {
    this.$store.dispatch("privacy/hidingRoom", this.room);
  },
  methods: {
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
    border: 1px solid black;
}
</style>
