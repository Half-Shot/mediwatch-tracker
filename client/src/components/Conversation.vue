<template lang="html">
  <div class="">
    Is it active: {{ isActive }}
    <button type="button" name="button" @click="alertMe"></button>
  </div>
</template>

<script>
export default {
  name: "Conversation",
  data() {
    return {
      isActive: true
    };
  },
  methods: {
    alertMe() {
      this.isActive = false;
      alert(this.isActive);
    }
  }
};
</script>

<style lang="css">
</style>
