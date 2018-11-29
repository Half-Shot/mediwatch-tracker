<template lang="html">
    <div class="container roomlist">
        <ul>
            <li v-for="member in members">
                <span>{{member.name}}</span>
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
      }
  }
}
</script>
