<template lang="html">
  <nav class="main-nav">
    <ul>
      <li>
        <router-link :to="{ name: 'index' }">home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'dashboard' }">dashboard</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="css">
</style>
