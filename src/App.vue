<template>
  <div id="wrapper">
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
</template>

<script>
import SideBar from "./layout/SideBar.vue";
import TopBar from "./layout/TopBar.vue";
import FooterPage from "./layout/Footer.vue";

export default {
  name: "App",
  components: {
    SideBar,
    TopBar,
    FooterPage,
  },
};
</script>
