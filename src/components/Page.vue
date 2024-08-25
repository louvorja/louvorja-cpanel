<template>
  <alert danger v-if="error">{{ error }}</alert>
  <alert success v-if="success">{{ success }}</alert>

  <form-page
    v-model="data"
    :id="id"
    :messages="messages"
    :fields="fields"
    :insert_buttons="['insert', 'cancel']"
    :update_buttons="['insert_new', 'update', 'delete', 'cancel']"
    @button="actions"
  />

  <data-table
    v-model:refresh="refresh"
    :url="url"
    :sort_by="sort_by"
    :limit="5"
    @button="actions"
    :columns="[
      ...grid_columns,
      {
        buttons: ['edit', 'delete'],
      },
    ]"
  />
</template>

<script>
const Api = require("@/services/Api");

import { mapMutations } from "vuex";

import DataTable from "@/components/DataTable.vue";
import FormPage from "@/components/Form.vue";
import Alert from "@/components/Alert.vue";

export default {
  name: "PageComponent",
  inheritAttrs: false,
  components: {
    DataTable,
    FormPage,
    Alert,
  },
  props: {
    url: String,
    id_field: String,
    fields: Array,
    grid_columns: Array,
    sort_by: String,
  },
  data() {
    return {
      loaded: false,
      refresh: false,
      error: "",
      success: "",
      id: null,
      messages: {},
      data: {},
    };
  },
  methods: {
    ...mapMutations(["setLoading"]),
    reset_messages() {
      this.error = "";
      this.success = "";
      this.messages = {};
    },
    reset() {
      this.id = null;
      this.data = {};
    },
    actions(data) {
      console.log("btn", data);
      if (data.button == "edit") {
        this.reset();
        this.reset_messages();

        let self = this;
        this.setLoading(true);
        Api.get(
          `${this.url}/${data.data[this.id_field] ?? 0}`,
          {},
          function (resp, data) {
            self.setLoading(false);
            self.error = data.error ?? "";
            self.success = data.message ?? "";
            self.data = data.data ?? {};
            self.id = data.data ? data.data[self.id_field] ?? null : null;
          }
        );
      } else if (data.button == "insert" || data.button == "insert_new") {
        this.reset_messages();

        let self = this;
        this.setLoading(true);
        Api.post(`${this.url}`, this.data, function (resp, data) {
          self.setLoading(false);
          self.error = data.error ?? "";
          self.success = data.message ?? "";
          self.data = data.data ?? {};
          self.id = data.data ? data.data[self.id_field] ?? null : null;
          self.refresh = true;
        });
      } else if (data.button == "update") {
        this.reset_messages();

        let self = this;
        this.setLoading(true);
        Api.post(
          `${this.url}/${data.data[this.id_field] ?? 0}`,
          this.data,
          function (resp, data) {
            self.setLoading(false);
            self.error = data.error ?? "";
            self.success = data.message ?? "";
            self.data = data.data ?? {};
            self.id = data.data ? data.data[self.id_field] ?? null : null;
            self.refresh = true;
          }
        );
      } else if (data.button == "delete") {
        this.reset_messages();

        let self = this;
        this.setLoading(true);
        Api.remove(
          `${this.url}/${data.data[this.id_field] ?? 0}`,
          function (resp, data) {
            self.setLoading(false);
            self.error = data.error ?? "";
            self.success = data.message ?? "";
            self.reset();
            self.refresh = true;
          }
        );
      } else if (data.button == "cancel") {
        this.reset();
        this.reset_messages();
      }
    },
  },
};
</script>
