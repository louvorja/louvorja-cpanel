<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="/"
    >
      <div class="sidebar-brand-icon">
        <img src="@/assets/img/logo.svg" style="height: 60px" />
      </div>
      <div class="sidebar-brand-text mx-3">
        <div>Louvor JA</div>
        <div style="font-weight: 100">CPanel</div>
      </div>
    </a>

    <hr class="sidebar-divider my-0" />

    <item-menu label="Dashboard" icon="tachometer-alt" href="/" active />

    <hr class="sidebar-divider" />

    <div class="sidebar-heading">APLICAÇÃO</div>

    <item-menu label="Músicas" icon="cog" active>
      <h6 class="collapse-header">Custom Components:</h6>
      <router-link class="collapse-item" to="/">Buttons</router-link>
      <router-link class="collapse-item" to="/users">Sobre</router-link>
    </item-menu>

    <item-menu label="Utilitários" icon="wrench">
      <h6 class="collapse-header">Custom Utilities:</h6>
      <a class="collapse-item" href="utilities-color.html">Colors</a>
      <a class="collapse-item" href="utilities-border.html">Borders</a>
      <a class="collapse-item" href="utilities-animation.html">Animations</a>
      <a class="collapse-item" href="utilities-other.html">Other</a>
    </item-menu>

    <!-- Divider -->
    <hr class="sidebar-divider" />
  </ul>
</template>

<script>
import ItemMenu from "@/components/ItemMenu.vue";

export default {
  name: "SideBarLayout",
  components: {
    ItemMenu,
  },
};
</script>
