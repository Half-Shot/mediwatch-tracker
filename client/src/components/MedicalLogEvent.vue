<template lang="html">
    <div class="container event medicallog">
        <div class="sender">
            <p>{{eventSender}}</p>
        </div>
        <div class="contents">
            <p>{{eventText}}</p>
        </div>
        <div class="timestamp">
            <p>{{eventTimestamp}}</p>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
  props: ['room', 'event'],
  data: function() {
    return {

    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  computed: {
      renderable() {
          return [
              "m.room.message",
              "m.room.create"
          ].includes(this.event.getType());
      },
      eventSender() {
          const member = this.room.getMember(this.event.getSender())
          if (!member) {
              return this.event.getSender();
          }
          return member.name;

      },
      eventTimestamp() {
          const duration = moment.duration(Date.now() - this.event.getTs());
          return duration.humanize() + " ago";
      },
      eventText() {
          const content = this.event.getContent();
          if (this.event.getType() === "m.room.message") {
              return `${this.event.getContent().body}`;
          }
          if (this.event.getType() === "m.room.create") {
              return `Log was created`;
          }
          if (this.event.getType() === "m.room.member") {
              console.log(this.event);
              switch(content.membership) {
                  case "join":
                    if (this.event.getPrevContent().membership !== "join") {
                        return "was given access to this log";
                    } else {
                        return "updated thier profile";
                    }
                  case "leave":
                    return `revoked ${this.event.getStateKey()}'s access to this log`;
                  case "invite":
                    return `invited ${this.event.getStateKey()} to this log`;
                  case "ban":
                    return `banned ${this.event.getStateKey()} from accessing this log`;
                  default:
                    return "membership event!";
              }
          }
          if (this.event.getType() === "m.room.power_levels") {
              return "Powerlevels were modified"
          }
          if (this.event.getType() === "m.room.history_visibility") {
              return "History visibility settings were modified"
          }
          return "Unknown type " + this.event.getType();
      }
  }
}
</script>

<style lang="scss" scoped>

.container.event.medicallog {
      display: grid;
      grid-template-columns: 10% auto 14%;
      grid-gap: 10px;
      background-color: #fff;
      color: #444;
      font-size: 1em;
}

.container.event.medicallog > .sender {
  color: #000000;
  overflow-x: hidden;
}

.container.event.medicallog > .contents {
  color: #000000;
}

.container.event.medicallog > .timestamp {
  color: #000000;
  overflow-x: hidden;
}
</style>
