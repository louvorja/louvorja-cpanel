<template>
  <title-page :mb="3">Usuários</title-page>

  <a href="javascript:" @click="refresh = !refresh">REFRESH</a>
  <div class="card">
    <div class="card-body">
      <page
        v-if="loaded"
        url="admin/users"
        id_field="id"
        :fields="[
          [
            { name: 'name', label: 'Nome' },
            { name: 'username', label: 'Nome de Usuário' },
            { name: 'email', label: 'E-mail' },
            { type: 'password', name: 'password', label: 'Senha Provisória' },
          ],
        ]"
        sort_by="name"
        :grid_columns="[
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
        ]"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import TitlePage from "@/components/Title.vue";
import Page from "@/components/Page.vue";

export default {
  name: "UsersPage",
  components: {
    TitlePage,
    Page,
  },
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  watch: {
    loading(newValue) {
      if (!newValue) {
        this.loaded = true;
      }
    },
  },
  mounted() {
    if (!this.loading) {
      this.loaded = true;
    }
  },
};
</script>
