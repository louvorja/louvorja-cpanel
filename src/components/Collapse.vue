<template>
  <div class="card mb-4">
    <a
      class="d-block card-header py-3 text-decoration-none"
      data-bs-toggle="collapse"
      :href="'#' + id"
      role="button"
      aria-expanded="false"
      aria-controls="multiCollapseExample1"
    >
      <h6 class="m-0 font-weight-bold text-primary">
        {{ title }}
      </h6>
    </a>

    <div class="collapse" :id="id">
      <div class="card-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "CollapseComponent",
  inheritAttrs: false,
  props: {
    title: String,
  },
  data() {
    return {
      id: uuidv4(),
    };
  },
};
</script>
