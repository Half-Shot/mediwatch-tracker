<template lang="html">
    <div class="container logwriter">
        <h3> Add information to your medical log </h3>
        <section class="stage0" v-if="!canWriteToLog">
            <p>You cannot log records into this room. You should request access from the patient.</p>
        </section>
        <div v-else>
            <section class="stage1">
                <p> What kind of information would you like to enter into the log?</p>
                <select v-model="typeOfInfo">
                  <option value="comment">Leave Comment</option>
                  <option value="taken_meds">Taken Medication</option>
                  <option value="report_problem">Report health problem</option>
                  <option v-if="isDoctor" value="record_appointment">Record appointment details</option>
                  <option v-if="isDoctor" value="prescription_updates">Prescription update</option>
                </select>
            </section>
            <section class="stage2 comment" v-if="typeOfInfo === 'comment'">
                <!-- <label> Leave a comment </label> -->
                <textarea placeholder="Enter your comment here" v-model="commentText" type="text"></textarea>
                <button v-on:click="submitComment" class="btn"> Submit </button>
            </section>
            <section class="stage2 taken_meds" v-if="typeOfInfo === 'taken_meds'">
                <label> Placeholder for taking medication </label>
            </section>
            <section class="stage2 report_problem" v-if="typeOfInfo === 'report_problem'">
                <label> Placeholder for reporting a health problem </label>
            </section>
            <section class="stage2 record_appointment" v-if="typeOfInfo === 'record_appointment'">
                <label> Placeholder for recording appointment details </label>
            </section>
            <section class="stage2 prescription_updates" v-if="typeOfInfo === 'prescription_updates'">
                <label> Placeholder for updating a prescription </label>
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
      isDoctor: this.$store.getters["auth/role"] === 1,
      hasRequestedAccess: false
    };
  },
  computed: {
    canWriteToLog() {
      return this.room.currentState._maySendEventOfType(
        "any",
        this.$store.getters["auth/userId"],
        false
      );
    }
  },
  methods: {
    async submitComment() {
      if (this.commentText.trim().length === 0) {
        return;
      }
      await this.$store.getters["auth/client"].sendTextMessage(
        this.room.roomId,
        this.commentText
      );
      this.commentText = "";
    }
  }
};
</script>
<style lang="scss">
.container.logwriter button {
    margin: 0 5px;
    float: right;
}

.container.logwriter textarea {
    width: 100%;
    resize: vertical;
}
</style>
