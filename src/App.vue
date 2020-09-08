<template>
  <div id="app">
      <b-table class="container-list" striped hover :items="containers"></b-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      baseURI: 'http://localhost:3000',

      containers: null,
      images: null,
      runnigContainers: null,
      stoppedContainers: null
    }
  },
  methods: {
    getAllContainers() {
      axios.get(`${this.baseURI}/api/getAllContainers`)
        .then((containers) => {
          this.containers = containers.data;
          this.stoppedContainers = this.containers.filter((container) => !container.status.includes('Up'));
          this.runnigContainers = this.containers.filter((container) => container.status.includes('Up'));

          this.stoppedContainers.map((container) => container._rowVariant = 'danger');
          this.runnigContainers.map((container) => container._rowVariant = 'success');
        })
        .catch(() => {
          console('Containers could not fetch');
        });
    },

    getImages() {
      axios.get(`${this.baseURI}/api/getAllImages`)
        .then((images) => {
          console.log(images);
        })
        .catch(() => {
          console('Images could not fetch');
        });
    }
  },
  created() {
    this.getAllContainers();
  }
}
</script>

<style>
  .container-list {
    width: 60%
  }
</style>
