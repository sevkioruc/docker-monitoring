<template>
  <div class="col">
	<div class="row mb-2 remove-button-wrapper">
		<b-button
			class="remove-button"
			size="md"
			variant="danger"
			@click="removeContainer"
		>
			Remove
		</b-button>
		<b-button
			class="select-all-button"
			size="md"
			variant="danger"
			@click="selectAllContainer"
		>
			Select All
		</b-button>
	</div>
	<div class="row">
			<b-table
			ref="selectableTable"
			selectable
			select-mode="multi"
			@row-selected="onRowSelected"
			:items="containers"
			:fields="fields">
				<template v-slot:cell(running)="container">
					<b-icon-play-fill 
						v-if="!container.item.isRunning"
						class="ml-4 run-button"
						font-scale="1.5"
						@click="startContainer(container.item.containerID)"
					>
					</b-icon-play-fill>
					<b-icon-stop-fill 
						v-if="container.item.isRunning"
						class="ml-4 stop-button"
						font-scale="1.5"
						@click="stopContainer(container.item.containerID)"
					>
					</b-icon-stop-fill>
				</template>
			</b-table>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import {eventBus, eventBusForStatus} from '../main';

export default {
  data() {
		return {
			baseURI: 'http://localhost:3000',

			containers: null,
			images: null,
			selectedContainersID: [],

			fields: [
				'containerID',
				'imageName',
				{ key: 'image', label: 'imageID' },
				'command',
				'created',
				'status',
				'names',
				'ports',
				{ key: 'running', label: 'Run/Stop' }
			],
		}
  },
  methods: {
		startContainer(containerID) {
			axios.post(`${this.baseURI}/api/startContainer`, {containerID})
        .then((response) => {
						axios.get(`${this.baseURI}/api/getContainer/${containerID}`)
							.then((newStartedContainer) => {
								const cID = response.data.replace('\n', '');

								const index = this.containers.findIndex((container) => container.containerID === cID);

								if (index !== -1) {
									this.$delete(this.containers[index], '_rowVariant');
									this.$set(this.containers[index], '_rowVariant', 'success');
									this.$set(this.containers[index], 'ports', newStartedContainer.data.ports)
									this.containers[index].isRunning = true;
								}

							})
        })
        .catch(() => {
          console.log('Could not start container');
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
						this.$set(this.containers[index], 'ports', '');

						this.containers[index].ports = '';
						this.containers[index].isRunning = false;
          }
        })
        .catch(() => {
          console.log('Could not stop container');
        });
			},
		getAllContainers() {
			axios.all([
				axios.get(`${this.baseURI}/api/getAllContainers`),
				axios.get(`${this.baseURI}/api/getAllImages`)
			])
			.then(axios.spread((containers, images) => {
				this.containers = containers.data;

				this.containers.forEach((container) => {
					const index = images.data.findIndex(image => image.imageID === container.image);
					if (index !== -1) {
						container.imageName = images.data[index].repository;
					}
					if (container.status.includes('Up')) {
						container._rowVariant = 'success'
						container.isRunning = true;
					} else {
							container._rowVariant = 'danger';
							container.isRunning = false;
						}
				});
			}))
		},
		getContainerWithID(containerID) {
			axios.get(`${this.baseURI}/api/getContainer/${containerID}`)
			.then((container) => {
				axios.get(`${this.baseURI}/api/getImage/${container.data.image}`)
					.then((image) => {
						container.data.imageName = image.data.repository;
						this.containers.push(container.data);
						const index = this.containers.findIndex((c) => c.containerID === container.data.containerID);
						if (index !== -1) {
							this.$delete(this.containers[index], '_rowVariant');
							this.$set(this.containers[index], '_rowVariant', 'danger');
						}
					})
			})
			.catch(() => {
				console.log('Could not fetch container');
			})
		},
		onRowSelected(items) {
			this.selectedContainersID = [];
			items.forEach((item) => {
				this.selectedContainersID.push(item.containerID);
			});
			console.log(this.selectedContainersID);
			if (this.selectedContainersID.length > 0) {
				eventBusForStatus.$emit('containerID', this.selectedContainersID[this.selectedContainersID.length - 1]);
			}
		},
		removeContainer() {
			axios.post(`${this.baseURI}/api/removeContainers`, {containerIDs: this.selectedContainersID})
			.then((removedContainerIDs) => {
					this.containers = this.containers.filter((container) => (removedContainerIDs.data.indexOf(container.containerID) === -1));
			});
		},
		selectAllContainer() {
			this.$refs.selectableTable.selectAllRows();
		}
	},
	created() {
		eventBus.$on('containerID', (cID) => {
			this.getContainerWithID(cID.data);
		});

		this.getAllContainers();
	}
}
</script>

<style>
	.remove-button-wrapper {
		position: relative;
	}
	.remove-button {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 80px;
	}
	.select-all-button {
		position: absolute;
		right: 100px;
		bottom: 0;
	}
</style>
