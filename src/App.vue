<template>
  <div id="app">
		<app-containers></app-containers>
  </div>
</template>

<script>

import containers from './Components/Containers'
// import images from './Components/Images'

export default {
  data () {
    return {
    }
	},
	components: {
		appContainers: containers,
		// appImages: images
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
