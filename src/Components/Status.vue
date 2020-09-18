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

			status: null,

			datacollection: null
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
		},
		fillData () {
			this.datacollection = {
				labels: ['Usage', 'Available'],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: [
							'#f87979',
							'#228B22'
						],
						data: [1, 99]
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
			this.getStatusOfContainer(containerID);
		});
	},
	mounted () {
    this.fillData()
  }
}
</script>

<style>
  .small {
    max-width: 250px;
    margin:  20px;
  }
</style>