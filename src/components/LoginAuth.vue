<template>
  <div>
    <form @submit.prevent="submitLogin">
      email
      <br />
      <input type="email" v-model="authDetails.email" />
      <br /><br />
      password
      <br />
      <input type="password" v-model="authDetails.password" />
      <br /><br />
      <button type="submit">Login</button>
      <div v-show="error" style="color: red;">Invalid Credentials</div>
    </form>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
// import axios from "axios";
import { mapActions } from "vuex";
// import router from '@/router';

export default {
  name: "LoginAuth",
  data() {
    return {
      authDetails: {
       email: '',
       password: ''
      },
      error: false
    };
  },
  methods: {
    ...mapActions("Auth", ["login"]),
    submitLogin() {
      // axios
      // .post(process.env.VUE_APP_SERVER_HTTP + "/api/sanctum/token", {
      //   email: this.email,
      //   password: this.password,
      //   device_name: navigator.userAgent
      // })
      // .then(async (response) => {
      //   console.log("token:" + response.data);
      //   this.$router.push('/');
      // })
      // .catch((error) => console.log(error));
      this.error = false;
      this.login(this.authDetails) 
      .then(() => {
        this.$router.push('/');
      })
      .catch((error) => {
        this.error = true;
        console.log(error);
      });
    }
  }

}
</script>

