<template>
  <title-page :mb="3">Músicas</title-page>

  <div class="card">
    <div class="card-body">
      <music-table v-model="music">
        <collapse title="Álbuns" v-if="music.id_music" v-model="active_music">
          <album-music-table
            v-if="active_music"
            :filter="{
              id_music: music.id_music,
            }"
          />
        </collapse>
      </music-table>
    </div>
  </div>
</template>

<script>
import TitlePage from "@/components/Title.vue";
import Collapse from "@/components/Collapse.vue";
import MusicTable from "@/views/partials/MusicTable.vue";
import AlbumMusicTable from "@/views/partials/AlbumMusicTable.vue";

export default {
  name: "MusicsPage",
  components: {
    TitlePage,
    Collapse,
    MusicTable,
    AlbumMusicTable,
  },
  data() {
    return {
      music: {},
      active_music: false,
    };
  },
};
</script>
