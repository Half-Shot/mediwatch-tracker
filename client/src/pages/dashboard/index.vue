<template lang="html">
  <div class="container-full">
    <Sidebar></Sidebar>
  </div>
</template>

<script>
import Sidebar from '@/pages/dashboard/Sidebar.vue'

export default {
  name: 'Dashboard',
  components: {
    Sidebar
  },
  metaInfo: {
    title: 'Dashboard'
  }
}
</script>
