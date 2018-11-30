<template lang="html">
  <aside class="sidebar">
    <ul v-if="rooms">
      <li v-for="room in rooms" v-if="room.type == 'medicalInfo' ">
        <template v-if="room.avatar">
          <!-- <img src="." alt=""> -->
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 119c0-13.3-9.4-23-22.8-23H198.9c-2.8 0-4.3-.6-6.1-2.4l-22.5-22.5-.2-.2c-4.9-4.6-8.9-6.9-17.3-6.9H56.7C42.9 64 32 74.3 32 87v73.7c0 1.6 1.7 1.5 3 .7s5-1.4 7-1.4h428c2 0 5.7.6 7 1.4 1.3.8 3 .9 3-.7V119zM32 416.4c0 17.5 14.2 31.6 31.6 31.6H448c17.6 0 32-14.4 32-32V204c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16v212.4z"/></svg>
        </template>
        <span>
          {{ room.title }}
        </span>

      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      rooms: this.$store.getters["room/getAll"]
    };
  }
};
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  top: 55px;
  left: 0;
  height: 100vh;
  bottom: 0;
  width: 75px;
  background: blue;
  color: white;
  overflow-y: scroll;
  background: #00b4db;
  background: -webkit-linear-gradient(to bottom, #00b4db, #0083b0);
  background: linear-gradient(to bottom, #00b4db, #0083b0);
  text-align: center;
  padding: 20px 5px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: 0.5em 0;
    }
  }
  svg {
    fill: #ffff;
    max-width: 35px;
  }
}
</style>
