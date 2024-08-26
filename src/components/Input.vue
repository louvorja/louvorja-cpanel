<template>
  <div
    :class="
      'form-group ' +
      (col ? ' col-' + col : '') +
      (colSm ? ' col-sm-' + colSm : '') +
      (colMd ? ' col-md-' + colMd : '') +
      (colLg ? ' col-lg-' + colLg : '') +
      (colXl ? ' col-xl-' + colXl : '') +
      (colXxl ? ' col-xxl-' + colXxl : '')
    "
  >
    <label :for="id" class="form-label">{{ label }}</label>
    <v-select
      v-if="type == 'select' || type == 'multiple' || type == 'lang'"
      :multiple="type == 'multiple'"
      :options="local_options"
      :class="{
        'is-invalid': error,
      }"
      :id="id"
      :modelValue="selectValue"
      :selectable="
        (option) => (modelValue ? !modelValue.includes(option.code) : true)
      "
      :disabled="disabled"
      @update:modelValue="onSelect"
    />
    <input
      v-else
      :type="type ?? 'text'"
      class="form-control"
      :class="{
        'is-invalid': error,
      }"
      :id="id"
      :aria-describedby="id + 'Help'"
      :value="modelValue"
      :disabled="disabled"
      @input="onInput"
    />
    <div v-if="help" :id="id + 'Help'" class="form-text">
      {{ help }}
    </div>
    <div v-if="error && error_list" class="invalid-feedback">
      <div v-for="(message, index) in error_list" :key="index">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
const Langs = require("@/helpers/Langs");

import { v4 as uuidv4 } from "uuid";

export default {
  name: "InputComponent",
  inheritAttrs: false,
  props: {
    modelValue: [String, Array, Number],
    label: String,
    type: String,
    help: String,
    error: [String, Array],
    options: Array,
    disabled: Boolean,
    col: Number,
    colSm: Number,
    colMd: Number,
    colLg: Number,
    colXl: Number,
    colXxl: Number,
  },
  data() {
    return {
      id: uuidv4(),
      local_options: [],
    };
  },
  computed: {
    error_list() {
      if (this.error) {
        if (typeof this.error === "string") {
          return [this.error];
        } else {
          return this.error;
        }
      } else {
        return [];
      }
    },
    selectValue() {
      if (!this.modelValue) {
        return [];
      }
      return this.local_options.filter((item) =>
        this.modelValue.includes(item.code)
      );
    },
    langs() {
      return Langs.list();
    },
  },
  methods: {
    onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    onSelect: function (value) {
      let emit;
      if (this.type == "multiple") {
        emit = [];
        emit = value.map((item) => {
          if (typeof item == "object") {
            return item.code ?? "";
          }
          return item;
        });
      } else {
        emit = null;
        if (value) {
          if (typeof value == "object") {
            emit = value.code ?? "";
          } else {
            emit = value;
          }
        }
      }
      this.$emit("update:modelValue", emit);
    },
  },
  mounted() {
    if (this.type == "lang") {
      console.log("ffff");
      this.local_options = Langs.list();
    } else {
      this.local_options = this.options ?? [];
    }
  },
};
</script>
