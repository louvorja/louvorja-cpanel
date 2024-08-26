<template>
  <title-page :mb="3">Usuários</title-page>

  <div class="card">
    <div class="card-body">
      <page
        v-if="loaded"
        url="admin/users"
        id_field="id"
        :can_view="can_view"
        :can_insert="can_insert"
        :can_update="can_update"
        :can_delete="can_delete"
        :fields="[
          [
            {
              type: 'number',
              name: 'id',
              label: 'ID',
              disabled: true,
              col: [12, 2, 2, 2, 2, 2],
            },
            { name: 'name', label: 'Nome', col: [12, 10, 10, 5, 5, 5] },
            { name: 'email', label: 'E-mail', col: [12, 12, 12, 5, 5, 5] },
            {
              name: 'username',
              label: 'Nome de Usuário',
              col: [12, 6, 6, 6, 6, 6],
            },
            {
              type: 'password',
              name: 'password',
              label: 'Senha Provisória',
              help: 'Deixe em branco para não alterar',
              col: [12, 6, 6, 6, 6, 6],
            },
            {
              type: 'multiple',
              name: 'permissions',
              label: 'Permissões',
              options: [
                { label: 'users | Usuários', code: 'users' },
                {
                  label: 'users.insert | Usuários - Cadastro',
                  code: 'users.insert',
                },
                {
                  label: 'users.update | Usuários - Alteração',
                  code: 'users.update',
                },
                {
                  label: 'users.delete | Usuários - Exclusão',
                  code: 'users.delete',
                },
                { label: 'categories | Categorias', code: 'categories' },
                {
                  label: 'categories.insert | Categorias - Cadastro',
                  code: 'categories.insert',
                },
                {
                  label: 'categories.update | Categorias - Alteração',
                  code: 'categories.update',
                },
                {
                  label: 'categories.delete | Categorias - Exclusão',
                  code: 'categories.delete',
                },
              ],
              col: [12],
            },
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
    can_view() {
      return (
        (this.user.permissions ?? []).includes("users") || this.user.is_admin
      );
    },
    can_insert() {
      return (
        (this.user.permissions ?? []).includes("users.insert") ||
        this.user.is_admin
      );
    },
    can_update() {
      return (
        (this.user.permissions ?? []).includes("users.update") ||
        this.user.is_admin
      );
    },
    can_delete() {
      return (
        (this.user.permissions ?? []).includes("users.delete") ||
        this.user.is_admin
      );
    },
    ...mapGetters(["loading", "user"]),
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
