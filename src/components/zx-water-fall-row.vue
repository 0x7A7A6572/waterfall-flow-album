<template>
  <template>
    <el-card class="zx-water-fall__card">
      <el-image loading="lazy" />
      <div class="zx-water-fall__card__desc">
        <span>Delicious hamburger</span>
      </div>
    </el-card>
  </template>
  <div id="_zx_water_fall" class="zx-water-fall">
    <el-card class="zx-water-fall__card" v-for="(item, index) in arts" :key="index">
      <el-image
        :src="item.src"
        :preview-src-list="artssrc"
        :initial-index="index"
        loading="lazy"
      />
      <div class="zx-water-fall__card__desc">
        <span>Delicious hamburger</span>
      </div>
    </el-card>
  </div>
</template>
<script>
import { ElImage } from "element-plus";
// import { onMounted, ref } from "vue";
export default {
  data() {
    return {
      loading: false,
      trueArts: [], //用于展示的列表
    };
  },
  props: {
    arts: {
      type: Object,
    },
    artssrc: {
      type: Object,
    },
  },
  mounted() {},
  methods: {},
  components: {
    // ElSkeleton,
    ElImage,
  },
};

window.onload = function () {
  let column = 4; //设置列数
  // let load = column * 4 //预加载的数量
  let itemsClientHeight = [];
  let cards = document.getElementsByClassName("zx-water-fall__card");
  for (let i = 0; i < cards.length; i++) {
    itemsClientHeight.push(cards[i].clientHeight);
  }
  let grups = groupByArray(itemsClientHeight, column);
  // console.log("grups", grups);
  /* 将分组好的数组进行差异计算并合入一个数组 */
  let allDiffs = calcGrupsDiff(grups, column);
  // applyDiffs(allDiffs, cards, column);
  let options = {
    // root: document.querySelector(".zx-water-fall"),
    rootMargin: "0px",
    threshold: 1.0,
  };
  var observer = new IntersectionObserver((changes) => {
    var container = changes.target;
    console.log("changes", changes, container);

    observer.unobserve(changes[0].target); //结束监听
  }, options);
  /**
   *
   * querySelectorAll 返回NodeList
   */
  //console.log(document.querySelectorAll(".zx-water-fall__card"));
  let list = document
    .querySelector("#_zx_water_fall")
    .querySelectorAll(".zx-water-fall__card")
    .forEach((item) => {
      if (typeof item == "object") {
        observer.observe(item);
      }
      console.log(typeof item, item);
    });
  // for (let index in list) {
  //   console.log("index:", index);
  //   if (typeof list[index] == "object") {
  //     observer.observe(list[index]);
  //   }
  //   console.log(typeof list[index], list[index]);
  // }
};
// /** 改变marginTop */
// window.onload = function () {
//   let row = 4; //设置行数
//   // let load = row * 4 //预加载的数量
//   let itemsClientHeight = [];
//   let cards = document.getElementsByClassName("zx-water-fall__card");
//   for (let i = 0; i < cards.length; i++) {
//     itemsClientHeight.push(cards[i].clientHeight);
//   }
//   let grups = groupByArray(itemsClientHeight, row);
//   // console.log("grups", grups);
//   /* 将分组好的数组进行差异计算并合入一个数组 */
//   let allDiffs = calcGrupsDiff(grups, row);
//   //  applyDiffs(allDiffs, cards, row);
// };

/**
 *
 * @param {*存放差值的数组} diffArray
 * @param {*所有需要修改的item} items
 */
function applyDiffs(diffArray, items, column) {
  /** 第一组的差值应用于第二组的item */
  for (let i = 0; i < items.length - column; i++) {
    setTimeout(() => {
      items[i + column].style.marginTop = -diffArray[i] + "px";
      //console.log(i + row, "set >",-diffArray[i] + 'px');
      //   console.log("最后一张图的坐标：",GetObjPos(items[items.length-1]))
    }, 100 * i);
    // console.log(-diffArray[i] + 'px', items[i + row].style);
  }
}
/**
 *  给数字数组按行数分组
 * @return [ [], ...array.length/row ]
 **/
function groupByArray(array, column) {
  let newArray = [];
  let subCount = 0;
  let index = 0;
  for (let i = 0; i < array.length / column; i++) {
    newArray.push([]);
    for (let j = index; j < array.length; j++) {
      newArray[i].push(array[j]);
      subCount++;
      index++;
      if (subCount == column) {
        subCount = 0;
        break;
      }
    }
  }
  return newArray;
}

/*
 * 计算二维数组中每个值与最大值的差值，并与上一组 对应位置做加法
 */
function calcGrupsDiff(grups, column) {
  let diffs = [];
  for (let index in grups) {
    let maxValue = -1;
    grups[index].forEach((value) => {
      if (value > maxValue) {
        maxValue = value;
      }
    });
    grups[index].forEach((value) => {
      diffs.push(maxValue - value);
    });

    if (index != 0) {
      for (let i = column * index; i < diffs.length; i++) {
        // console.log("index:", index, "i:", i, "diffs[" + (i) + "]:", diffs[i], diffs[i - row]);
        diffs[i] = diffs[i] + diffs[i - column];
        // console.log(">>res>>", diffs[i]);
      }
    }
    // console.log("-----------")
  }
  return diffs;
}

//  function CPos(x, y)
//     {
//         this.x = x;
//         this.y = y;
//     }
//     /**
//      * 得到对象的相对浏览器的坐标
//      */
//     function GetObjPos(ATarget)
//     {
//         var target = ATarget;
//         var pos = new CPos(target.offsetLeft, target.offsetTop);

//          target = target.offsetParent;
//         while (target)
//         {
//             pos.x += target.offsetLeft;
//             pos.y += target.offsetTop;

//             target = target.offsetParent
//         }
//         return pos;
//     }
</script>
<style scoped>
.zx-water-fall {
  /* display: flex; */
  flex-wrap: wrap;
  justify-content: center;

}

.zx-water-fall__card {
  width: 20%;
  height: 430px;
  height: fit-content;
  --el-card-padding: 5px;
  background-color: #2b2b2b;
}
.zx-water-fall__card__desc {
  font-size: 0.8em;
  /* height:430px; */
}
</style>
