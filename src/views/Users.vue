<template>
  <title-page :mb="3">Usuários</title-page>

  ..{{ refresh }}..
  <a href="javascript:" @click="refresh = !refresh">REFRESH</a>
  <div class="card">
    <div class="card-body">
      <data-table
        v-model:refresh="refresh"
        v-if="!loading"
        :url="url"
        :headers="headers"
        sort_by="name"
        :limit="5"
        @button="actions"
        :columns="[
          { name: 'id', label: 'ID', type: 'number' },
          { name: 'name', label: 'Nome' },
          { name: 'username', label: 'Usuário' },
          { name: 'email', label: 'Email' },
          { name: 'phone', label: 'Telefone' },
          {
            name: 'is_temporary_password',
            label: 'Senha Provisória?',
            type: 'boolean',
          },
          {
            buttons: ['edit', 'delete'],
          },
        ]"
      />
    </div>
  </div>
</template>

<script>
const Api = require("@/services/Api");
const User = require("@/controllers/User");

import { mapGetters } from "vuex";

import TitlePage from "@/components/Title.vue";
import DataTable from "@/components/DataTable.vue";

export default {
  name: "UsersPage",
  components: {
    TitlePage,
    DataTable,
  },
  data() {
    return {
      refresh: false,
    };
  },
  computed: {
    url() {
      return User.url();
    },
    headers() {
      return Api.headers();
    },
    ...mapGetters(["loading"]),
  },
  methods: {
    actions(data) {
      console.log(data);
    },
  },
  mounted() {
    //this.loadData();
  },
};
</script>
