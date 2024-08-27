<template>
  <title-page :mb="3">Categorias</title-page>

  <div class="card">
    <div class="card-body">
      <category-table />
    </div>
  </div>
</template>

<script>
import TitlePage from "@/components/Title.vue";
import CategoryTable from "@/views/partials/CategoryTable.vue";

export default {
  name: "CategoriesPage",
  components: {
    TitlePage,
    CategoryTable,
  },
};
</script>
