<template>
  <title-page :mb="3">Categorias</title-page>
  <div class="card">
    <div class="card-body">
      <category-table v-model="categories">
        <collapse title="Álbuns nessa Categoria" v-if="categories.id_category">
          <category-album-table
            :filter="{
              id_category: categories.id_category
            }"
          />
        </collapse>
      </category-table>
    </div>
  </div>
</template>

<script>
import TitlePage from "@/components/Title.vue";
import Collapse from "@/components/Collapse.vue";
import CategoryTable from "@/views/partials/CategoryTable.vue";
import CategoryAlbumTable from "@/views/partials/CategoryAlbumTable.vue";

export default {
  name: "CategoriesPage",
  components: {
    TitlePage,
    Collapse,
    CategoryTable,
    CategoryAlbumTable,
  },
  data() {
    return {
      categories: {},
    };
  },
};
</script>
