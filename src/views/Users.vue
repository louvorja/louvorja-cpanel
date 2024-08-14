<template>
  <title-page :mb="3">Usuários</title-page>

  <div class="row"></div>
</template>

<script>
//const User = require("@/controllers/User");

import TitlePage from "@/components/Title.vue";

export default {
  name: "UsersPage",
  components: {
    TitlePage,
  },
  methods: {
    loadData() {
      // User.list([]);
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
