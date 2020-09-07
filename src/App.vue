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
      }]
    }
  },
  methods: {
    getContainers() {
      axios.get(`${this.baseURI}/api/getAllContainers`).then((containers) => {
        console.log(containers);
      });
    }
  },
  created() {
    this.getContainers();
  }
}
</script>

<style>

</style>
