<template>
  <div id="app">
    <nav>
      <router-link to="/">Tasks</router-link> |
      <!-- <router-link to="/LoginAuth">Login</router-link> -->
      <div v-if="isAuthenticated">
        <div>
          hi, {{ user.name }}({{ user.email }})
          <button type="button" @click="submitLogout">LogOut</button>
        </div>
      </div>
      <div v-else>
        <router-link to="/LoginAuth">Login</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import { mapGetters, mapActions } from "vuex";

export default{
  computed: {
    ...mapGetters("Auth", ["isAuthenticated", "user"]),
  },
  mounted() {
    this.attemptAuthentication();
  },
  methods: {
    ...mapActions("Auth", ["attemptAuthentication", "logout"]),
    submitLogout() {
      this.logout();
      this.$router.push("/LoginAuth");
    }
  }

}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
