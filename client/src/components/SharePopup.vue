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
          <ul class="contacts">
            <li v-for="contact in contacts">
              <div>
                <svg class="avatar" v-if="!contact.avatar_url" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48C148.5 48 60.1 129.5 49.2 234.1c-.8 7.2-1.2 14.5-1.2 21.9 0 7.4.4 14.7 1.2 21.9C60.1 382.5 148.5 464 256 464c114.9 0 208-93.1 208-208S370.9 48 256 48zm135.8 326.1c-22.7-8.6-59.5-21.2-82.4-28-2.4-.7-2.7-.9-2.7-10.7 0-8.1 3.3-16.3 6.6-23.3 3.6-7.5 7.7-20.2 9.2-31.6 4.2-4.9 10-14.5 13.6-32.9 3.2-16.2 1.7-22.1-.4-27.6-.2-.6-.5-1.2-.6-1.7-.8-3.8.3-23.5 3.1-38.8 1.9-10.5-.5-32.8-14.9-51.3-9.1-11.7-26.6-26-58.5-28h-17.5c-31.4 2-48.8 16.3-58 28-14.5 18.5-16.9 40.8-15 51.3 2.8 15.3 3.9 35 3.1 38.8-.2.7-.4 1.2-.6 1.8-2.1 5.5-3.7 11.4-.4 27.6 3.7 18.4 9.4 28 13.6 32.9 1.5 11.4 5.7 24 9.2 31.6 2.6 5.5 3.8 13 3.8 23.6 0 9.9-.4 10-2.6 10.7-23.7 7-58.9 19.4-80 27.8C91.6 341.4 76 299.9 76 256c0-48.1 18.7-93.3 52.7-127.3S207.9 76 256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256c0 43.9-15.6 85.4-44.2 118.1z"/></svg>
                <img class="avatar " v-else :src="contact.avatar_url"></img>
              </div>
              <span class="name">{{ contact.display_name }}</span>
              <button type="button" name="button" class="btn btn-delete" @click="removeContact(contact)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M128 405.429C128 428.846 147.198 448 170.667 448h170.667C364.802 448 384 428.846 384 405.429V160H128v245.429zM416 96h-80l-26.785-32H202.786L176 96H96v32h320V96z"/></svg>
              </button>
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
      suggestions: []
    }
  },
  methods: {
    closeShare(){
      this.$emit('toggleShare')
    },
    addContact(user){
      this.$store.dispatch("contacts/add", user).then(r => this.suggestions = [])
    },
    removeContact(user){
      this.$store.dispatch("contacts/remove", user)
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
.contacts{
  list-style: none;
  margin: 0;
  padding: 0;
  li{
    width: 100%;
    float: left;
    padding: 10px 0;
    margin-right: 15px;
    position: relative;
    border-bottom: 1px solid;
  }
  .name{
    display: block;
    float: left;
    margin: 7px 15px;
    font-size: 1.5em;
    font-weight: bold;
    text-transform: capitalize;
  }
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
