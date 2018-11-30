<template lang="html">
    <div class="security-button" v-bind:class="{
        unknown: (this.securityLevel === 'unknown'),
        shared: (this.securityLevel === 'shared'),
        nobody: (this.securityLevel === 'safe')
    }">
        🔒 {{ SECURITY_LEVEL_MAP[this.securityLevel] }}
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      SECURITY_LEVEL_MAP: {
        unknown: "Unknown",
        shared: "Shared with Doctor",
        safe: "Visible to you only"
      }
    };
  },
  computed: {
    ...mapGetters("privacy", ["securityLevel"])
  }
};
</script>

<style lang="scss">
$warn: #c90000; // Main Primary color */
$warn-border: #ff4545;
$unknown: #c9a200; // Main Secondary color (1) */
$unknown-border: #c9a200;
$shared: #26108b; // Main Secondary color (2) */
$shared-border: #543fb0;
$nobody: #00a000; // Main Secondary color (2) */
$nobody-border: #37cc37;

.security-button {
  border: 1.5px solid black;
  border-radius: 5px;
  min-height: 2.5vh;
  min-width: 2.5vw;
  padding: 5px;
  color: white;
}
.security-button.mixed {
  background: $warn-border;
  border-color: $warn;
}

.security-button.unknown {
  background: $unknown-border;
  border-color: $unknown;
}

.security-button.shared {
  background: $shared-border;
  border-color: $shared;
}

.security-button.nobody {
  background: $nobody-border;
  border-color: $nobody;
}
</style>
