<template>
  <div  >
  <!-- <zx-image-grup-vue >
  </zx-image-grup-vue> -->
  <zx-water-fall :artssrc="onlySrc" :arts="arts.photography">
  </zx-water-fall>
  </div>
</template>

<script>
// import zxImageGrupVue from './components/zx-image-grup.vue'
import zxWaterFall from './components/zx-water-fall.vue'

let titleArry = [];
let summaryArray = [];
let dataArray = [];
export default {
  name: 'App',
  data() {
    return {
      arts: {
        "illustration": creatArtsName("illustration", 19, titleArry, summaryArray, dataArray),
        "oil_painting": creatArtsName("oil_painting", 0, titleArry, summaryArray, dataArray),
        "photography": creatArtsName("photography", 57, titleArry, summaryArray, dataArray),
        "pixel_painting": creatArtsName("pixel_painting", 24, titleArry, summaryArray, dataArray),
        "wall_painting": creatArtsName("wall_painting", 9, titleArry, summaryArray, dataArray)
      },
      onlySrc: creatArtsSrc("photography",57)
    }
  },
  components: {
    zxWaterFall,
  }
}
function creatArtsName(type, max, titleArry, summaryArray, dataArray) {
    let arts = [];
    if (titleArry != null && summaryArray != null && dataArray != null
        && titleArry.length == summaryArray.length &&
        summaryArray.length == dataArray.length && dataArray.length == max) {
          console.log("come on!")
    } else {
        for (let i = 1; i <= max; i++) {
            let artobj = {
                src: "./art/" + type + "/" + type + i + ".png",
                title: "",
                summary: "",
                date: ""
            }
            arts.push(artobj);
        }
    }
    return arts;
}

function creatArtsSrc(type, max) {
  let arts = [];
    for (let i = 1; i <= max; i++) {
      arts.push( "./art/" + type + "/" + type + i + ".png");
    }
  return arts;
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
