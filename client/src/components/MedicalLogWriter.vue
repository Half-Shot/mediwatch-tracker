<template lang="html">
    <div class="container logwriter">
        <h3> Add information to your medical log </h3>
        <section class="stage0" v-if="!canWriteToLog">
            You cannot log records into this room. You should request access from the patient.
        </section>
        <div v-else>
            <section class="stage1">
                <p> What kind of information would you like to enter into the log?</p>
                <select v-model="typeOfInfo">
                  <option value="comment">Leave Comment</option>
                  <option value="taken_meds">Taken Medication</option>
                  <option value="report_problem">Report health problem</option>
                </select>
            </section>
            <section class="stage2 comments" v-if="typeOfInfo === 'comment'">
                <h4> Leave a comment </h4>
                <textarea placeholder="Enter your comment here" v-model="commentText" type="text"></textarea>
                <button v-on:click="submitComment"> Submit </button>
            </section>
        </div>
    </div>
</template>

<script>
export default {
  props: ["room"],
  data: function() {
    return {
        typeOfInfo: "comment",
        commentText: "",
    }
  },
  computed: {
     canWriteToLog() {
         return this.room.currentState._maySendEventOfType(
             "any", this.$store.getters["auth/userId"], false
         );
     }
  },
  methods: {
      async submitComment() {
          if (this.commentText.trim().length === 0) {
              return;
          }
          await this.$store.getters['auth/client'].sendTextMessage(
              this.room.roomId,
              this.commentText,
          );
          this.commentText = "";
      }
  }
}
</script>
<style lang="scss">
.container.logwriter button {
    margin: 0px 5px;
    float: right;
}

.container.logwriter textarea {
    width: 100%;
    resize: vertical;
}
</style>
