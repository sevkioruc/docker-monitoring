<template>
  <div id="app">
      <b-table striped hover :items="containers"></b-table>
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
      runnigContainers: null
    }
  },
  methods: {
    getAllContainers() {
      axios.get(`${this.baseURI}/api/getAllContainers`)
        .then((containers) => {
          this.containers = containers.data;
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
    },
    
    getRunningContainers() {
      axios.get(`${this.baseURI}/api/getRunningContainers`)
        .then((runnigContainers) => {
          this.runnigContainers = runnigContainers.data;
          console.log(this.runnigContainers);
        })
        .catch(() => {
          console.log('Running containers could not fetch');
        })
    }
  },
  created() {
    this.getRunningContainers();
  }
}
</script>

<style>

</style>
