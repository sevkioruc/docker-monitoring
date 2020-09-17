<template>
	<div></div>
</template>

<script>
import axios from 'axios';
import {eventBusForStatus} from '../main';

export default {
	data() {
		return {
			baseURI: 'http://localhost:3000',

			status: null
		}
	},
	methods: {
		getStatusOfContainer(containerID) {
			axios.get(`${this.baseURI}/api/getContainerStatus/${containerID}`)
			.then((status) => {
				this.status = status.data;
			})
			.catch(() => {
				console.log('Could not fetch status of container');
			});
		}
	},
	created() {
		eventBusForStatus.$on('containerID', (containerID) => {
			this.getStatusOfContainer(containerID);
		});
	}
}
</script>

<style>

</style>