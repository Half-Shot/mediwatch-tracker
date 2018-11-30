<template lang="html">
    <div class="container roomlist">
        <ul>
            <li v-for="member in members">
                <span>{{member.name}} (Access Level: {{memberPowers.get(member.userId)}})</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ["room"],
  data: function() {
    return {
      members: this.room.currentState
        .getMembers()
        .filter(m => ["join", "invite"].includes(m.membership))
    };
  },
  computed: {
    memberPowers() {
      const map = new Map();
      this.members.forEach(member => {
        const invited = member.membership === "invite";
        map.set(
          member.userId,
          invited
            ? "invited"
            : this.room.currentState._maySendEventOfType(
                "any",
                member.userId,
                false
              )
              ? "write"
              : "read"
        );
      });
      return map;
    }
  }
};
</script>
