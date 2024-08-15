<template>
  <div class="table-container table-responsive" style="position: relative">
    <alert danger v-if="!columns">Parâmetro [columns] não definido</alert>
    <alert danger v-if="!url">Parâmetro [url] não definido</alert>

    {{ options }}

    <table class="table table-striped table-hover" v-if="columns && url">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            scope="col"
            class="table-dark"
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
            :class="{
              'table-sorted':
                options.sort_by &&
                (options.sort_by == column.name ||
                  options.sort_by == column.name + '.asc' ||
                  options.sort_by == column.name + '.desc'),
              'text-end': column.type == 'number',
            }"
          >
            {{ row[column.name] ?? "" }}
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
    headers: Object,
    columns: Object,
    limit: Number,
    sort_by: String,
    page: Number,
  },
  data() {
    return {
      options: {
        limit: null,
        sort_by: null,
      },
      error: "",
      loading: false,
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

        let params = "";
        if (options) {
          params = `?${this.data_to_url(options)}`;
        }

        let url = this.url + params;
        console.log(url);

        let headers = this.headers;

        this.loading = true;

        let response = await fetch(url, {
          method: "get",
          headers,
        }).catch((err) => {
          self.error = err;
          self.loading = false;
          return false;
        });

        if (!response.ok) {
          this.error = `Erro ${response.status} - ${response.statusText} | Atualize a página e tente novamente.`;
          this.loading = false;
          return false;
        }

        if (response.ok) {
          let data = await response.json();
          this.data = data;
          this.loading = false;
          if (data.error != undefined && data.error != "") {
            this.error = data.error;
            return false;
          }
        }
      }
    },
    data_to_url(data) {
      return new URLSearchParams(data).toString();
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
