<template>
  <loading v-if="loading" />
  <div v-if="auth && start" id="wrapper">
    <side-bar />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <top-bar />
        <div class="container-fluid">
          <router-view />
        </div>
      </div>
      <footer-page />
    </div>
  </div>
  <login v-else-if="start" />
</template>

<script>
import { mapGetters } from "vuex";

import Loading from "./layout/Loading.vue";
import SideBar from "./layout/SideBar.vue";
import TopBar from "./layout/TopBar.vue";
import FooterPage from "./layout/Footer.vue";

import Login from "./views/Login.vue";

const Auth = require("@/controllers/Auth.js");

export default {
  name: "App",
  components: {
    SideBar,
    TopBar,
    FooterPage,
    Loading,
    Login,
  },
  computed: {
    ...mapGetters(["start", "loading", "auth"]),
  },
  mounted() {
    Auth.refresh();
  },
};
</script>
