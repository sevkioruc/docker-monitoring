<template>
  <div id="app">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      baseURI: 'http://localhost:3000',

      containers: [{
        id: '',
        image: '',
        command: '',
        runningFOr: '',
        status: '',
        names: '',
        ports: ''
      }],

      images: [{
        repository: '',
        tag: '',
        id: '',
        createdSince: '',
        size: ''
      }]
    }
  },
  methods: {
    getContainers() {
      axios.get(`${this.baseURI}/api/getAllContainers`)
        .then((containers) => {
          console.log(containers);
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
          console('Containers could not fetch');
        });
    }
  },
  created() {
  /* this.getContainers();*/ 
    this.getImages();
  }
}
</script>

<style>

</style>
