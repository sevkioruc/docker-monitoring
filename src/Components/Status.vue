<template>
	<div class="small">
		<pie-chart :chart-data="datacollection"></pie-chart>
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
				cpuPerc: 0
			},

			datacollection: null,
			selectedContainerID: null
		}
	},
	methods: {
		getStatusOfContainer(containerID) {
			return axios.get(`${this.baseURI}/api/getContainerStatus/${containerID}`);
		},
		fillData () {
			this.datacollection = {
				labels: ['Usage', 'Available'],
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
						this.fillData();
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
		this.fillData();
	}
}
</script>

<style>
  .small {
    max-width: 250px;
    margin:  20px;
  }
</style>