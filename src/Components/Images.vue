<template>
  <div>
    <b-table striped hover :items="images" :fields="fields">
      <template v-slot:cell(runContainer)="image">
        <b-icon-plus-square-fill 
          class="ml-2 create-container-button"
          @click="createContainer(image.item.imageID)"
        >
        </b-icon-plus-square-fill>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios';
import {eventBus} from '../main';

export default {
  data() {
    return {
			baseURI: 'http://localhost:3000',

			images: null,

			fields: [
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
    getImages() {
      axios.get(`${this.baseURI}/api/getAllImages`)
      .then((images) => {
          this.images = images.data;
      })
      .catch(() => {
        console('Images could not fetch');
      });
    },
    createContainer(imageID) {
      axios.post(`${this.baseURI}/api/createContainer`, {imageID})
      .then((containerID) => {
        eventBus.$emit('containerID',containerID);
      })
      .catch(() => {
        console.log('Could not create image');
      })
    }
  },
	created() {
		this.getImages();
	}
}
</script>

<style>

</style>