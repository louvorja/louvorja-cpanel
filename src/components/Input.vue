<template>
  <div
    :class="
      'form-group ' +
      (col ? ' col-' + col : '') +
      (colSm ? ' col-sm-' + colSm : '') +
      (colMd ? ' col-md-' + colMd : '') +
      (colLg ? ' col-lg-' + colLg : '') +
      (colXl ? ' col-xl-' + colXl : '') +
      (colXxl ? ' xxl-xl-' + colXxl : '')
    "
  >
    <label :for="id" class="form-label">{{ label }}</label>
    <input
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
    <div v-if="error" class="invalid-feedback">
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
    modelValue: String,
    label: String,
    type: String,
    help: String,
    error: String,
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
  },
  methods: {
    onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
