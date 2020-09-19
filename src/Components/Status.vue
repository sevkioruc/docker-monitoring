<template>
	<div class="row">
		<div class="col-3">
			<pie-chart 
				:chart-data="cpuDataCollection"
			>
			</pie-chart>
			<p class="cpu-label">CPU</p>
		</div>
		<div class="col-3">
			<pie-chart 
				:chart-data="memoryDataCollection"
			>
			</pie-chart>
			<p class="memory-label">Memory</p>
		</div>
		<div class="col-6">
			<b-table 
				:items="[status]"
				:fields="fields"
			>
			</b-table>
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
				pIDs: null,
				cpuPerc: 0,
				memPerc: 0,
				memUsage: '',
				netIO: '',
				blockIO: ''
			},

			fields: [
				{key: 'pIDs', label: 'PID'},
				{key: 'memUsage', label: 'Memory'},
				'netIO',
				'blockIO'
			],

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
				labels: ['Used', 'Free'],
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
				labels: ['Used', 'Free'],
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
		this.getStatusOfContainer(containerID)
			.then((status) => {
				this.status = status.data;
				console.log(this.status)
				this.fillCpuData();
				this.fillMemoryUsage();
			})
			.catch(() => {
				console.log('Could not fetch status of container');
			});
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
	.cpu-label,
	.memory-label {
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
		font-size: 14px;
		margin-top: 10px;
	}
</style>