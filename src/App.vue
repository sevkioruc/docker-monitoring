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

          this.containers.map((container) => container._rowVariant = null);
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
        .then((response) => {
          const index = this.containers.findIndex((container) => container.containerID === response.data.containerID);          
          if (index !== -1) {
            this.$delete(this.containers[index], '_rowVariant')
            this.$set(this.containers[index], '_rowVariant', 'success')
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
