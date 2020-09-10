<template>
  <div id="app">
    <b-table striped hover :items="containers" :fields="fields">
      <template v-slot:cell(running)="container">
        <b-icon-play-fill class="ml-4 run-button" font-scale="1.5" @click="runContainer(container.item.containerID)"></b-icon-play-fill>
      </template>
    </b-table>
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
      stoppedContainers: null,

      fields: [
        'containerID',
        'image',
        'command',
        'created',
        'status',
        'names',
        'ports',
        { key: 'running', label: 'Running' }
      ],
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
    },

    runContainer(containerID) {
      axios.post(`${this.baseURI}/api/runContainer`, {containerID})
        .then((stdout) => {
          const index = this.containers.findIndex((container) => container.value.containerID === 'd3861a716ff3');
          console.log('asdads');
          if (index !== -1) {
            this.containers.value[index]._rowVariant = 'success';
          }
        })
        .catch(() => {
          console.log('Error');
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

  .run-button {
    cursor: pointer;
  }

</style>
