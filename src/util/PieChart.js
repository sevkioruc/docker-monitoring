import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: ['chartData'],
  mounted () {
    this.renderChart(this.chartData)
  }
}
