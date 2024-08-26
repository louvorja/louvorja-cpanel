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
      v-if="type == 'select' || type == 'multiple'"
      :multiple="type == 'multiple'"
      :options="options"
      :id="id"
      :modelValue="selectValue"
      :selectable="
        (option) => (modelValue ? !modelValue.includes(option.code) : true)
      "
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
import { v4 as uuidv4 } from "uuid";

export default {
  name: "InputComponent",
  inheritAttrs: false,
  props: {
    modelValue: [String, Array],
    label: String,
    type: String,
    help: String,
    error: [String, Array],
    options: Array,
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
      return this.options.filter((item) => this.modelValue.includes(item.code));
    },
  },
  methods: {
    onInput(event) {
      console.log("emit", event.target.value);
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
};
</script>
