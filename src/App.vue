<template>
  <div id="app">
    <div class="col">
      <div class="row mb-5">
        <div class="col-7"></div>
        <div class="col-5">          
          <app-images></app-images>
        </div>
      </div>
      <div class="row">
        <div class="col-9">
          <app-containers></app-containers>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>

import containers from './Components/Containers'
import images from './Components/Images'

export default {
  data () {
    return {
    }
	},
	components: {
		appContainers: containers,
		appImages: images
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

  .image-list-wrapper {
    position: relative;
  }

  .image-list {
    position: absolute;
  }

</style>
