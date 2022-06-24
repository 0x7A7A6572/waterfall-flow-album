<template>
  <el-row :gutter="0" id="_zx_water_fall" class="zx-water-fall">
    <el-col :span="24 / column" v-for="(_item, _index) in artsGroup" :key="_item">
      <el-skeleton :loading="getLoad([_index + column * index])" :animated="true"  v-for="(item, index) in _item" :key="item">
        <template #template>
          <el-card class="zx-water-fall__card">
            <el-image
              id="loadedimg"
              :src="item.src"
              :preview-src-list="artssrc"
              :initial-index="_index + column * index"
              loading="lazy"
              class="image"
            />
            <div class="zx-water-fall__card__desc">
              <span class="__desc_title">{{ item.title }}</span>
              <span class="__desc_summary">{{ item.summary }}</span>
              <span class="__desc_date">{{ item.date }}</span>
            </div>
          </el-card>
        </template>
        <template #default>
          <el-card class="zx-water-fall__card" >
            <el-skeleton-item
              variant="image"
              :style="{
                backgroundColor: 'rgb(65 147 245 / 59%)',
                width: tureSize(item.size).width,
                height: tureSize(item.size).height,
              }"
            />
            <div class="zx-water-fall__card__desc">
              <el-skeleton-item class="__desc_title" variant="h3" />
              <el-skeleton-item class="__desc_summary" variant="text" />
              <el-skeleton-item class="__desc_date" variant="text" />
            </div>
          </el-card>
        </template>
      </el-skeleton>
      <!-- <el-card class="zx-water-fall__card" v-for="(item, index) in _item" :key="item">
        <el-image
          :src="item.src"
          :preview-src-list="artssrc"
          :initial-index="_index + column * index"
          loading="lazy"
        />
        <div class="zx-water-fall__card__desc">
          <span class="__desc_title">{{ item.title }}</span>
          <span class="__desc_summary">{{ item.summary }}</span>
          <span class="__desc_date">{{ item.date }}</span>
        </div>
      </el-card> -->
    </el-col>
  </el-row>
</template>
<script>
import { ElImage } from "element-plus";
// import axios from "axios";
// import { toRaw,markRaw } from '@vue/reactivity';
// import { onMounted, ref } from "vue";
export default {
  data() {
    return {
      loadStatus:new Array(120),
    //   loading: false,
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
    window.onload =  ()=> {
    let imgss = document.querySelectorAll("#loadimgss");
      for(let index in imgss){
        //   this.loadStatus[index] = true;   //非响应式
        // Object.assign({}, this.loadStatus, true)
        // console.log("what the fuck",this)
          this.loadStatus.set(index,true); //响应式
      }



    //   axios.get("/json/data.json").then(
    //     (response) => {
    //       console.log(response.data);
    //     },
    //     (response) => {
    //       console.log("error");
    //     }
    //   );

      // window.mysize=[];
      // for(let index in imgss){
      //   imgss[index].onload=()=>{
      //   console.log("我加载完成了！",imgss[index].naturalHeight,imgss[index].naturalWidth)
      //    window.mysize.push({width:imgss[index].naturalWidth,height:imgss[index].naturalHeight})
      //   }
      // }
      // console.log( window.mysize)
    };
  },
  computed: {
    tureSize() {
      let column = this.column;
      return (size) => {
        // console.log("sss::",size)
        let clientWidth = document.documentElement.clientWidth;
        // let clientHeight = document.documentElement.clientHeight;
        let trueWidth = clientWidth / column - (10 + 8); //10:card-margin,16:body-margin
        let trueHeight = size.height * (trueWidth / size.width);
        // console.log(,document.documentElement.clientHeight,size);
        return { width: trueWidth + "px", height: trueHeight + "px" };
      };
    },
    getLoad() {
        // let that = this;
        // let loadStatus = this.loadStatus;
        return (index) => {
            console.log(this.loadStatus)
        if(this.loadStatus[index] == true){
           return true;
        }else{
            return false;
        }
      };
    }
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
<style scope>
.zx-water-fall {
  flex-wrap: unset !important;
}
.zx-water-fall__card {
  border-bottom-color: #4499ff !important;
  /* vertical-align: top;
  opacity: 1; */
  border-bottom-style: inset !important;
  border-bottom-width: 5px !important;
  /* border-radius: 3px; */
}

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
/* span.__desc_summary::before {
  content: '"';
  font-size: 1em;
  font-weight: bold;
} */
/* span.__desc_summary::after {
  content: '"';
  font-size: 1em;
  font-weight: bold;
}
.zx-water-fall__card__desc::before {
  content: "|";
  font-weight: bold;
  color: #4499ff;
} */
.zx-water-fall__card__desc {
  display: flex;
  flex-wrap: wrap;
}

/* .el-image__inner {

} */
</style>
