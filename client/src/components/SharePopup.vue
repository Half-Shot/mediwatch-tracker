<template lang="html">
  <div class="overlay" v-if="shown">
    <div class="popup share">
      <svg @click="closeShare" class="closeButton" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z"/></svg>
      <h2> Share your data </h2>

      <div class="suggestions-wrapper">
        <input @input="search" type="text" name="" placeholder="Find People" v-model="term">

        <ul class="suggestions" v-if="suggestions.length > 0">
          <li @click="addContact(user)" v-for="user in suggestions">
            <span> {{ user.display_name }}</span>
          </li>
        </ul>
        <ul class="suggestions" v-if="suggestions.length == 0">
          <li v-for="user in suggestions">
            <span>No results.</span>
          </li>
        </ul>

      </div>


      <form class="form">
          <h2>Your contacts:</h2>
          <ul>
            <li v-for="contact in contacts">
              {{ contact.display_name }}
            </li>
          </ul>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SharePopup',
  props: {
    shown: Boolean,
  },
  data() {
    return {
      term: null,
      doctors: [
        {
          avatar_url: '',
          disaplayName: 'Kanye West',
          userId: 'r56789'
        },
        {
          avatar_url: '',
          disaplayName: 'Kanye West 2',
          userId: 'r567891'
        }
      ],
      suggestions: []
    }
  },
  mounted(){

  },
  methods: {
    closeShare(){
      this.$emit('toggleShare')
    },
    addContact(user){
      this.$store.dispatch("contacts/add", user).then(r => this.suggestions = [])

    },
    search(){
      this.suggestions = (this.term.length > 3) ? this.$store.dispatch("contacts/search", this.term).then(r => this.suggestions = r.results) : [];
    }
  },
  computed: {
    contacts() {
      return this.$store.getters['contacts/getAll']
    }
  }
}
</script>


<style  lang="scss">
.popup.share{
  min-height: 90vh;
}
.form{
  float: left;
  width: 100%;
}
  .avatar{
    width: 40px;
    height: auto;
    float: left;
    display: block;
    border-radius: 50%;
  }
  .suggestions-wrapper{
    position: relative;
    z-index: 9;
  }
  .suggestions{
    float: left;
    width: 100%;
    margin: 0;
    padding: 0;
    position: absolute;
    background: white;
    top: 40px;
    border-radius: 4px;
    box-shadow: 0 1px 20px 0 rgba(46,61,73,.2);
    max-height: 400px;
    overflow: auto;
    li {
      width: 100%;
      float: left;
      display: block;
      padding: 10px;
      cursor: pointer;
      position: relative;
      &:hover{
        background: #efefef;
      }

    }
    span{
      display: block;
      float: left;
      margin: 10px;
    }
  }
</style>
