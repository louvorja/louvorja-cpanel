<template>
  <div class="table-container table-responsive" style="position: relative">
    <alert danger v-if="!columns">Parâmetro [columns] não definido</alert>
    <alert danger v-if="!url">Parâmetro [url] não definido</alert>

    <div class="row p-0 m-0 mb-2 mt-2">
      <div class="p-0 col-0 col-sm-3 col-md-5 col-lg-7 col-xl-8 col-xxl-9" />
      <div class="p-0 col-12 col-sm-9 col-md-7 col-lg-5 col-xl-4 col-xxl-3">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Localizar..."
            aria-label="Localizar..."
            v-model="data_search"
            @change="load"
            @keyup.enter="load"
          />
          <span class="input-group-text">
            <font-awesome-icon icon="magnifying-glass" />
          </span>
        </div>
      </div>
    </div>

    <div class="p-0 m-0 text-end">
      <span v-if="data.total && data.total > 0">
        <span v-if="data.last_page && data.last_page > 1">
          <b>{{ data.from }}</b> a <b>{{ data.to }}</b> de
        </span>
        <b>{{ data.total }}</b>
        <span v-if="data.total > 1"> registros encontrados</span>
        <span v-else> registro encontrado</span>
      </span>
      <span v-else> Nenhum registro encontrado</span>
      <a
        href="javascript:"
        class="ms-1 mb-1 btn btn-sm btn-primary"
        @click="load()"
      >
        Atualizar
      </a>
    </div>

    <table class="table table-striped table-hover" v-if="columns && url">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            scope="col"
            class="table-dark align-middle"
            :class="{
              sortable: !column.name ? false : column.sortable ?? true,
              'table-sorted':
                options.sort_by &&
                (options.sort_by == column.name ||
                  options.sort_by == column.name + '.asc' ||
                  options.sort_by == column.name + '.desc'),
              sorted:
                options.sort_by &&
                (options.sort_by == column.name ||
                  options.sort_by == column.name + '.asc' ||
                  options.sort_by == column.name + '.desc'),
              'sorted-asc':
                options.sort_by &&
                (options.sort_by == column.name ||
                  options.sort_by == column.name + '.asc'),
              'sorted-desc':
                options.sort_by && options.sort_by == column.name + '.desc',
              'text-end': column.type == 'number',
              'text-center': column.type == 'boolean',
            }"
            @click="
              column.name && (column.sortable ?? true)
                ? sort(column.name)
                : null
            "
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody v-if="error">
        <tr>
          <td :colspan="columns.length">
            <alert danger>{{ error }}</alert>
          </td>
        </tr>
      </tbody>
      <tbody v-if="data && data.data">
        <tr v-for="(row, index) in data.data" :key="index">
          <td
            v-for="(column, index) in columns"
            :key="index"
            class="align-middle"
            :class="{
              'table-sorted':
                options.sort_by &&
                (options.sort_by == column.name ||
                  options.sort_by == column.name + '.asc' ||
                  options.sort_by == column.name + '.desc'),
              'text-end': column.type == 'number',
              'text-center': column.type == 'boolean',
            }"
          >
            <span
              v-if="column.type == 'boolean'"
              :class="row[column.name] ? 'text-success' : 'text-danger'"
            >
              <font-awesome-icon :icon="row[column.name] ? 'check' : 'times'" />
            </span>
            <span v-else>
              {{ row[column.name] ?? "" }}
            </span>
            <div
              class="btn-group btn-group-sm float-end"
              role="group"
              v-if="column.buttons"
            >
              <button
                v-for="button in buttonsList(column.buttons)"
                :key="button.id"
                type="button"
                class="btn"
                :class="
                  button.color
                    ? 'btn-' + button.color
                    : button.id == 'edit'
                    ? 'btn-warning'
                    : button.id == 'delete'
                    ? 'btn-danger'
                    : 'btn-primary'
                "
                @click="clickButton(button.id, row)"
              >
                <font-awesome-icon
                  v-if="
                    button.icon || button.id == 'edit' || button.id == 'delete'
                  "
                  :icon="
                    button.icon
                      ? button.icon
                      : button.id == 'edit'
                      ? 'pen'
                      : button.id == 'delete'
                      ? 'trash'
                      : ''
                  "
                />
                {{ button.label ?? "" }}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <nav>
      <ul class="pagination">
        <li
          v-for="page in data.links"
          :key="page.label"
          class="page-item"
          :class="{ disabled: !page.url }"
        >
          <a
            class="page-link"
            :class="{ active: data.current_page == page.label }"
            href="javascript:"
            @click="
              goTo(
                page.label == 'pagination.previous'
                  ? data.current_page - 1
                  : page.label == 'pagination.next'
                  ? data.current_page + 1
                  : page.label
              )
            "
          >
            {{
              page.label == "pagination.previous"
                ? "«"
                : page.label == "pagination.next"
                ? "»"
                : page.label
            }}
          </a>
        </li>
      </ul>
    </nav>

    <div v-if="loading" class="loading-overlay">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
const Api = require("@/services/Api");

import Alert from "@/components/Alert.vue";

export default {
  name: "DataTableComponent",
  inheritAttrs: false,
  components: {
    Alert,
  },
  props: {
    refresh: Boolean,
    url: String,
    columns: Object,
    limit: Number,
    sort_by: String,
    page: Number,
    search: String,
  },
  data() {
    return {
      options: {
        limit: null,
        sort_by: null,
      },
      error: "",
      loading: false,
      data_search: this.search ?? "",
      data: {},
    };
  },
  watch: {
    refresh(newValue) {
      if (!this.loading) {
        if (newValue) {
          this.load();
        }
      } else {
        this.$emit("update:refresh", this.loading);
      }
    },
    loading(newValue) {
      this.$emit("update:refresh", newValue);
      if (!newValue) {
        if (
          this.options.page &&
          this.data.last_page &&
          this.options.page > this.data.last_page
        ) {
          this.options.page = 1;
          this.load();
        }
      }
    },
  },
  methods: {
    sort(name) {
      if (
        this.options.sort_by == name ||
        this.options.sort_by == name + ".asc"
      ) {
        this.options.sort_by = name + ".desc";
      } else {
        this.options.sort_by = name;
      }
      this.load();
    },
    clickButton(button, data) {
      this.$emit("button", { button, data });
    },
    goTo(page) {
      this.options.page = page;
      this.load();
    },
    buttonsList(buttons) {
      if (buttons) {
        return buttons.map((item) => {
          if (typeof item === "string") {
            return { id: item };
          } else {
            return item;
          }
        });
      } else {
        return [];
      }
    },
    async load() {
      this.error = "";

      if (this.columns && this.url) {
        let self = this;

        this.options.limit = this.limit ?? 10;
        this.options.page = this.options.page ?? this.page ?? 1;
        this.options.sort_by = this.options.sort_by ?? this.sort_by ?? null;

        const options = Object.fromEntries(
          Object.entries(this.options).filter(([, value]) => value !== null)
        );

        if (this.data_search) {
          this.columns.map((column) => {
            if (column.name) {
              if (column.type == "number") {
                options[column.name] = "or:" + this.data_search;
              } else {
                options[column.name] = "orlike:*" + this.data_search + "*";
              }
            }
          });
        }

        this.loading = true;
        Api.get(this.url, options, function (resp, data) {
          self.loading = false;
          self.error = data.error ?? "";
          self.data = data;
        });
      }
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style scoped>
.table-container {
  position: relative;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.table th.sortable {
  cursor: pointer;
}
.table th.sorted {
  position: relative;
  padding-right: 25px;
}
.table th.sorted-asc::after {
  content: "▲";
  font-size: 0.8em;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}
.table th.sorted-desc::after {
  content: "▼";
  font-size: 0.8em;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}

.table th.table-sorted {
  --bs-table-bg: #2d2e35;
  color: var(--bs-table-color);
  border-color: var(--bs-table-border-color);
}

.table td.table-sorted {
  --bs-table-striped-bg: #ecedef;
  --bs-table-active-bg: #dfe0e3;
  color: var(--bs-table-color);
  border-color: var(--bs-table-border-color);
}
</style>
