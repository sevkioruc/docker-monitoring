<template>
  <div id="app">
    <div>
      <b-table striped hover :items="containers" :fields="fields">
        <template v-slot:cell(running)="container">
          <b-icon-play-fill v-if="!container.item.isRunning" class="ml-4 run-button" font-scale="1.5" @click="startContainer(container.item.containerID)"></b-icon-play-fill>
          <b-icon-stop-fill v-if="container.item.isRunning" class="ml-4 stop-button" font-scale="1.5" @click="stopContainer(container.item.containerID)"></b-icon-stop-fill>
        </template>
      </b-table>
    </div>

    <div>
      <b-table striped hover :items="images" :fields="imageFields">
        <template v-slot:cell(runContainer)="image">
          <b-icon-plus-square-fill class="ml-2 create-container-button" @click="createContainer(image.item.imageID)"></b-icon-plus-square-fill>
        </template>
      </b-table>
    </div>
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

      fields: [
        'containerID',
        'image',
        'command',
        'created',
        'status',
        'names',
        'ports',
        { key: 'running', label: 'Run/Stop' }
      ],

      imageFields: [
        'repository',
        'tag',
        'imageID',
        'created',
        'size',
        {key: 'runContainer', label: 'Run'}
      ]
    }
  },
  methods: {
    getAllContainers() {
      axios.get(`${this.baseURI}/api/getAllContainers`)
        .then((containers) => {
          this.containers = containers.data;

          this.containers.forEach((container) => {
            if (container.status.includes('Up')) {
              container._rowVariant = 'success'
              container.isRunning = true;
            } else {
              container._rowVariant = 'danger';
              container.isRunning = false;
            }
          });
        })
        .catch(() => {
          console('Containers could not fetch');
        });
    },

    getImages() {
      axios.get(`${this.baseURI}/api/getAllImages`)
        .then((images) => {
          this.images = images.data;
        })
        .catch(() => {
          console('Images could not fetch');
        });
    },

    startContainer(containerID) {
      axios.post(`${this.baseURI}/api/startContainer`, {containerID})
        .then((response) => {
          const cID = response.data.replace('\n', '');
          const index = this.containers.findIndex((container) => container.containerID === cID);          
          if (index !== -1) {
            this.$delete(this.containers[index], '_rowVariant');
            this.$set(this.containers[index], '_rowVariant', 'success');
            this.containers[index].isRunning = true;
          }
        })
        .catch(() => {
          console.log('Error');
        });
    },

    stopContainer(containerID) {
      axios.post(`${this.baseURI}/api/stopContainer`, {containerID})
        .then((response) => {
          const cID = response.data.replace('\n', '');
          const index = this.containers.findIndex((container) => container.containerID === cID);          
          if (index !== -1) {
            this.$delete(this.containers[index], '_rowVariant');
            this.$set(this.containers[index], '_rowVariant', 'danger');
            this.containers[index].isRunning = false;
          }
        })
        .catch(() => {
          console.log('Error');
        });
    },

    createContainer(imageID) {
      axios.post(`${this.baseURI}/api/createContainer`, {imageID})
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        })
    }


  },
  created() {
    this.getAllContainers();
    this.getImages();
  }
}
</script>

<style>
  .container-list {
    width: 60%
  }

  .run-button, 
  .stop-button,
  .create-container-button {
    cursor: pointer;
  }

</style>
