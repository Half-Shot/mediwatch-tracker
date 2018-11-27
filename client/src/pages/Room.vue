<template>
<div class="container">
    Hello this is a room.
</div>
</template>

<script>
export default {
  props: ['room', 'roomType'],
  metaInfo: {
    title: 'Room'
  },
  data: function() {
    return {

    }
  },
  mounted() {
    console.log("Got room of type", this.roomType, ":", this.room);

  },
  methods: {

  },
}
</script>
