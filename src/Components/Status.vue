<template>
	<div class="row">
		<div class="col-3">
			<pie-chart :chart-data="cpuDataCollection"></pie-chart>
		</div>
		<div class="col-3">
			<pie-chart :chart-data="memoryDataCollection"></pie-chart>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import {eventBusForStatus} from '../main';
import PieChart from '../util/PieChart';

export default {
	data() {
		return {
			baseURI: 'http://localhost:3000',

			status: {
				cpuPerc: 0,
				memPerc: 0
			},

			selectedContainerID: null,

			cpuDataCollection: null,
			memoryDataCollection: null
		}
	},
	methods: {
		getStatusOfContainer(containerID) {
			return axios.get(`${this.baseURI}/api/getContainerStatus/${containerID}`);
		},
		fillCpuData () {
			this.cpuDataCollection = {
				labels: ['CPU', 'Free'],
				datasets: [
					{
						backgroundColor: [
							'#f87979',
							'#228B22'
						],
						data: [parseFloat(this.status.cpuPerc), 100 - parseFloat(this.status.cpuPerc)]
					}
				]
			}
		},
		fillMemoryUsage() {
			this.memoryDataCollection = {
				labels: ['Memory', 'Free'],
				datasets: [
					{
						backgroundColor: [
							'#f87979',
							'#228B22'
						],
						data: [parseFloat(this.status.memPerc), 100 - parseFloat(this.status.memPerc)]
					}
				]
			}
		}
	},
	components: {
		PieChart
	},
	created() {
		eventBusForStatus.$on('containerID', (containerID) => {
			try {
				this.getStatusOfContainer(containerID)
					.then((status) => {
						this.status = status.data;
						this.fillCpuData();
						this.fillMemoryUsage();
					})
					.catch(() => {
						console.log('Could not fetch status of container');
					});
			} catch(e) {
				console.log(e);
			}
		});
	},
	mounted() {
		this.fillCpuData();
		this.fillMemoryUsage();
	}
}
</script>

<style>
  .small {
    max-width: 250px;
    margin:  20px;
  }
</style>