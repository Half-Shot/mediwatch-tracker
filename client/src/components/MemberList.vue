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
  props: ['room'],
  data: function() {
    return {

    }
  },
  computed: {
    members() {
        return this.room.currentState.getMembers();
    },
    memberPowers() {
        const map = new Map();
        this.room.currentState.getMembers().forEach((member) => {
            map.set(
                member.userId,
                this.room.currentState._maySendEventOfType("any", member.userId, false) ? "write" : "read"
            );
        });
        return map;
    },
  }
}
</script>
