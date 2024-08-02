<template>
  <div>
    <h1>About</h1>
    <p>This is the About page.</p>
    <a @click="_loading()" href="#">LOADING</a>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "AboutPage",
  methods: {
    ...mapMutations(["setLoading"]),
    _loading() {
      this.setLoading(true);
      let self = this;
      setTimeout(function () {
        self.setLoading(false);
      }, 5000);
    },
  },
};
</script>
