<template>
  <title-page :mb="3">Álbuns das Categorias</title-page>

  <div class="card">
    <div class="card-body">
      <category-album-table />
    </div>
  </div>
</template>

<script>
import TitlePage from "@/components/Title.vue";
import CategoryAlbumTable from "@/views/partials/CategoryAlbumTable.vue";

export default {
  name: "CategoriesAlbumsPage",
  components: {
    TitlePage,
    CategoryAlbumTable,
  },
};
</script>
