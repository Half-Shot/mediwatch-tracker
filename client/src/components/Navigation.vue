<template lang="html">
  <nav class="main-nav">
    <ul>
      <li>
        <router-link :to="{ name: 'index' }">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M258.5 104.1c-1.5-1.2-3.5-1.2-5 0l-156 124.8c-.9.8-1.5 1.9-1.5 3.1v230c0 1.1.9 2 2 2h108c1.1 0 2-.9 2-2V322c0-1.1.9-2 2-2h92c1.1 0 2 .9 2 2v140c0 1.1.9 2 2 2h108c1.1 0 2-.9 2-2V232c0-1.2-.6-2.4-1.5-3.1l-156-124.8z"/><path d="M458.7 204.2l-189-151.4C265.9 49.7 261 48 256 48s-9.9 1.7-13.7 4.8L160 119.7V77.5c0-1.1-.9-2-2-2H98c-1.1 0-2 .9-2 2v92.2l-42.7 35.1c-3.1 2.5-5.1 6.2-5.3 10.2-.2 4 1.3 7.9 4.1 10.7 2.6 2.6 6.1 4.1 9.9 4.1 3.2 0 6.3-1.1 8.8-3.1l183.9-148c.5-.4.9-.4 1.3-.4s.8.1 1.3.4l183.9 147.4c2.5 2 5.6 3.1 8.8 3.1 3.7 0 7.2-1.4 9.9-4.1 2.9-2.8 4.4-6.7 4.2-10.7-.3-4-2.2-7.7-5.4-10.2z"/></svg>
          <span>home</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'dashboard' }">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M434.6 272.1c-22.4-1.2-41.6 13.2-48.2 32.9h-38.9l-28.4-85.4c-2.2-6.6-8.3-11-15.2-11h-.3c-7 .1-13.1 4.8-15 11.6l-44.5 155.3-52.3-314.1c-1.2-7.5-7.6-13.1-15.2-13.4-7.6-.3-14.3 4.8-16.2 12.1l-53 244.9H48c-8.8 0-16 7.2-16 16s7.2 16 16 16h72c7.3 0 13.8-5 15.5-12.1l37.4-182.2 51.3 307.9c1.2 7.4 7.4 12.9 14.9 13.3h.9c7.1 0 13.4-4.7 15.4-11.6l49.7-173.6 15.7 47.3c2.2 6.5 8.3 11 15.2 11h51.1c6.9 18 24.4 31 44.9 31 27 0 48.8-22.3 48-49.5-.8-24.8-20.7-45.1-45.4-46.4z"/></svg>
          <span>dashboard</span>
        </router-link>
      </li>
      <li class="sub-menu-wrapper" @click="openSubmenu">
        <a href="#">
          <div>
            <svg v-if="profile.avatar === null" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48C148.5 48 60.1 129.5 49.2 234.1c-.8 7.2-1.2 14.5-1.2 21.9 0 7.4.4 14.7 1.2 21.9C60.1 382.5 148.5 464 256 464c114.9 0 208-93.1 208-208S370.9 48 256 48zm135.8 326.1c-22.7-8.6-59.5-21.2-82.4-28-2.4-.7-2.7-.9-2.7-10.7 0-8.1 3.3-16.3 6.6-23.3 3.6-7.5 7.7-20.2 9.2-31.6 4.2-4.9 10-14.5 13.6-32.9 3.2-16.2 1.7-22.1-.4-27.6-.2-.6-.5-1.2-.6-1.7-.8-3.8.3-23.5 3.1-38.8 1.9-10.5-.5-32.8-14.9-51.3-9.1-11.7-26.6-26-58.5-28h-17.5c-31.4 2-48.8 16.3-58 28-14.5 18.5-16.9 40.8-15 51.3 2.8 15.3 3.9 35 3.1 38.8-.2.7-.4 1.2-.6 1.8-2.1 5.5-3.7 11.4-.4 27.6 3.7 18.4 9.4 28 13.6 32.9 1.5 11.4 5.7 24 9.2 31.6 2.6 5.5 3.8 13 3.8 23.6 0 9.9-.4 10-2.6 10.7-23.7 7-58.9 19.4-80 27.8C91.6 341.4 76 299.9 76 256c0-48.1 18.7-93.3 52.7-127.3S207.9 76 256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256c0 43.9-15.6 85.4-44.2 118.1z"/></svg>
            <img class="profile-img" v-else :src="profile.avatar"></img>
          </div>
          <span>{{profile.displayname}}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M296 136c0-22.002-17.998-40-40-40s-40 17.998-40 40 17.998 40 40 40 40-17.998 40-40zm0 240c0-22.002-17.998-40-40-40s-40 17.998-40 40 17.998 40 40 40 40-17.998 40-40zm0-120c0-22.002-17.998-40-40-40s-40 17.998-40 40 17.998 40 40 40 40-17.998 40-40z"/></svg>
        </a>
        <ul class="sub-menu" v-bind:class="{ active : submenu}">
          <li>
            <router-link :to="{ name: 'profile' }">profile</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'settings' }">settings</router-link>
          </li>
          <li>
            <a @click="onLogout">logout</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import MatrixClientPeg from '../MatrixClientPeg'

export default {
  name: 'Navigation',
  data() {
    return {
      profile: {
        displayname: "",
        avatar: null,
      },
      submenu: false,
      async onLogout() {
        console.log("User requested logout.");
        const cli = await MatrixClientPeg.getClient();
        // XXX: Because will doesn't want to invalidate the token just yet, don't actually call logout.
        // We should do this once we have a login screen.
        // This removes the client from the Peg and deletes the tokens
        MatrixClientPeg.unsetClient(true);
        // IVAN PLEASE REDIRECT ME TO LOGIN :)
      }
    }
  },
  methods: {
    openSubmenu() {
      this.submenu = (this.submenu) ? false : true
    }
  },
  async created() {
    // Get the user's profile name & avatar.
    const cli = await MatrixClientPeg.getClient();
    const profile = await cli.getProfileInfo(cli.getUserId());
    console.log(profile);
    this.profile.displayname = profile.displayname;
    this.profile.avatar = profile.avatar_url ? cli.mxcUrlToHttp(profile.avatar_url, 64, 64, "scale") : null;
  }
}
</script>

<style lang="scss">
.main-nav {
    float: left;
    width: 100%;
    background: #fff;
    box-shadow: 0 1px 20px 0 rgba(46,61,73,.2);
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        float: right;
        .profile-img,
        svg {
            position: absolute;
            left: 0.6em;
            top: 0.85em;
            width: 1.5em;
            height: 1.5em;
        }

        span {
            padding-left: 1.5em;
        }
        &.sub-menu {
            display: none;
            opacity: 0;
            position: absolute;
            top: 52px;
            background: #fff;
            z-index: 999;
            box-shadow: 0 1px 20px 0 rgba(46,61,73,.2);
        }
        li {
            position: relative;
            display: inline-block;
            &:first-child {
                border-left: none;
            }
            &.sub-menu-wrapper {
                span {
                    padding-right: 0.5em;
                }
                .active {
                    display: block;
                    opacity: 1;
                }
                svg:last-child {
                    right: 0;
                    left: initial;
                }
                li {
                    width: 100%;
                }
            }
            a {
                display: block;
                padding: 1.1em 1.3em;
            }
        }
    }
}
</style>
