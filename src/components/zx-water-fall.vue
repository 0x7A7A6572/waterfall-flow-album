<template>
  <el-row :gutter="0" id="_zx_water_fall" class="zx-water-fall">
    <el-col
      class="zx-water-fall__col"
      :span="24 / column"
      v-for="(_item, _index) in artsGroup"
      :key="_item"
    >
      <el-card class="zx-water-fall__card" v-for="(item, index) in _item" :key="item">
        <el-image
          :src="item.src"
          :preview-src-list="artssrc"
          :initial-index="_index + column * index"
          :preview-teleported="true"
          loading="lazy"
        />
        <div class="zx-water-fall__card__desc">
          <span class="__desc_title">{{ item.title }}</span>
          <span class="__desc_summary">{{ item.summary }}</span>
          <span class="__desc_date">{{ item.date }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { ElImage } from "element-plus";
// import { toRaw,markRaw } from '@vue/reactivity';
// import { onMounted, ref } from "vue";
export default {
  data() {
    return {
      artsGroup: groupByColumn(this.arts, this.column),
    };
  },
  props: {
    arts: {
      type: Object,
    },
    artssrc: {
      type: Object,
    },
    column: {
      type: Number,
    },
  },
  mounted() {
    // window.onload=function(){
    // let imgss = document.querySelectorAll("#loadimgss");
    // window.mysize=[];
    // for(let index in imgss){
    //   imgss[index].onload=()=>{
    //   console.log("我加载完成了！",imgss[index].naturalHeight,imgss[index].naturalWidth)
    //    window.mysize.push({width:imgss[index].naturalWidth,height:imgss[index].naturalHeight})
    //   }
    // }
    // console.log( window.mysize)
    // }
  },
  methods: {},
  components: {
    // ElSkeleton,
    ElImage,
  },
};
function groupByColumn(array, column) {
  let indexCount = 0;
  let arr = [];
  for (var i = 0; i < column; i++) {
    arr[i] = [];
  }
  //console.log(array.length,);
  while (indexCount < array.length) {
    for (let i = 0; i < column; i++) {
      arr[i].push(array[indexCount]);
      indexCount++;
      if (indexCount >= array.length) {
        break;
      }
    }
  }
  // console.log("arr:",arr);
  return arr;
}
// function groupByArray(array, column) {
//       console.log("groupByArts-start:",array,column)
//   let newArray = [];
//   let subCount = 0;
//   let index = 0;
//   for (let i = 0; i < array.length / column; i++) {
//     newArray.push([]);
//     for (let j = index; j < array.length; j++) {
//       newArray[i].push(array[j]);
//       subCount++;
//       index++;
//       if (subCount == column) {
//         subCount = 0;
//         break;
//       }
//     }
//   }
//   console.log("groupByArts:",newArray)
//   return newArray;
// }
</script>
<style>
.zx-water-fall {
  flex-wrap: unset !important;
}
.zx-water-fall__col {
  flex: 1;
}

.zx-water-fall__card {
  border-bottom-color: #4499ff !important;
  /* vertical-align: top;
  opacity: 1; */
  border-bottom-style: inset !important;
  border-bottom-width: 5px !important;
  /* border-radius: 3px; */
}
.zx-water-fall__card:hover {
  transform: scale(1.5);
  position: relative;
  z-index: 1;
}
/* .zx-water-fall__card:active {
  position: unset;
  z-index: 0;
} */

.zx-water-fall__card .el-card__body {
  height: fit-content;
  padding: 5px;
}
.zx-water-fall__card .__desc_title {
  font-weight: bold;
}
.zx-water-fall__card .__desc_summary {
  color: gray;
  font-size: 0.5em;
  flex: 1;
  text-align: left;
}
.zx-water-fall__card .__desc_date {
  font-size: 0.8em;
  font-weight: bold;
  color: #4499ff;
}
span.__desc_summary::before {
  content: '"';
  font-size: 1em;
  font-weight: bold;
}
span.__desc_summary::after {
  content: '"';
  font-size: 1em;
  font-weight: bold;
}
.zx-water-fall__card__desc::before {
  content: "|";
  font-weight: bold;
  color: #4499ff;
}
.zx-water-fall__card__desc {
  display: flex;
  flex-wrap: wrap;
}

/* .el-image__inner {

} */
</style>
