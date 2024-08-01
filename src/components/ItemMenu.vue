<template>
  <li :class="['nav-item', { active }]">
    <a
      v-if="!hasSlot"
      :class="['nav-link', { collapsed: !active }]"
      :href="href"
    >
      <font-awesome-icon :icon="icon" class="icon" />
      <span>{{ label }}</span>
    </a>
    <a
      v-else
      :class="['nav-link', { collapsed: !active }]"
      data-bs-toggle="collapse"
      :href="'#' + id"
      role="button"
      aria-expanded="false"
      :aria-controls="id"
    >
      <font-awesome-icon :icon="icon" class="icon" />
      <span>{{ label }}</span>
      <font-awesome-icon icon="angle-right" class="arrow" />
    </a>

    <div v-if="hasSlot" :class="['collapse', { show: active }]" :id="id">
      <div class="bg-white py-2 collapse-inner rounded">
        <slot />
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "ItemMenu",
  props: {
    label: String,
    icon: String,
    href: String,
    active: Boolean,
  },
  data() {
    return {
      id: `menu-${Math.random().toString(36).substr(2, 9)}`,
    };
  },
  computed: {
    hasSlot() {
      return !!this.$slots.default;
    },
  },
};
</script>

<style scoped>
.nav-link .icon {
  padding-right: 5px;
}

.nav-link .arrow {
  text-align: center;
  float: right;
  transition: transform 0.3s ease;
}
.nav-link:not(.collapsed) .arrow {
  transform: rotate(90deg);
}
</style>
