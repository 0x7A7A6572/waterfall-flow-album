<template>
  <el-space direction="vertical" alignment="flex-start">
    <el-skeleton  style="width: 240px" :loading="loading" animated :count="3">
      <template   #default>
        <div class="zx-water-fall lazy-loaded">
          <!-- <template> -->
          <el-card class="zx-water-fall__card lazy-loaded" v-for="(item, index) in arts" :key="item">
            <el-skeleton-item  v-for="(item, index) in arts":key="item" variant="image" style="width: 400px; height: 267px"  />
             <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
          </el-card>
          
          </div>
        
      </template>
      <template #template>
        <div class="zx-water-fall lazy-loaded">
          <!-- <template> -->
          <el-card
            class="zx-water-fall__card lazy-loaded"
            v-for="(item, index) in arts"
            :key="item"
          >
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
          <!-- </template> -->
        </div>
      </template>
    </el-skeleton>
  </el-space>
</template>
<script>
import { ElImage } from "element-plus";
import { onMounted, ref } from "vue";
export default {
  data() {
    return {
      loading: false,
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
  mounted() {
    console.log("i'm mounted");

    var observer = new IntersectionObserver(function (changes) {
      changes.forEach(function (change) {
        var container = change.target;
        var content = container.querySelector(".zx-water-fall__card.lazy-loaded template")
          .content;
        container.appendChild(content);
        observer.unobserve(container);
      });
    });

    //    this.query('.lazy-loaded').forEach(function (item) {
    //        observer.observe(item);
    //    });
  },
  methods: {
    query: function (selector) {
      return Array.from(document.querySelectorAll(selector));
    },
  },
  components: {
    // ElSkeleton,
    ElImage,
  },
};

/** 改变marginTop */
window.onload = function () {
  let row = 4; //设置行数
  // let load = row * 4 //预加载的数量
  let itemsClientHeight = [];
  let cards = document.getElementsByClassName("zx-water-fall__card");
  for (let i = 0; i < cards.length; i++) {
    itemsClientHeight.push(cards[i].clientHeight);
  }
  let grups = groupByArray(itemsClientHeight, row);
  // console.log("grups", grups);
  /* 将分组好的数组进行差异计算并合入一个数组 */
  let allDiffs = calcGrupsDiff(grups, row);
  //  applyDiffs(allDiffs, cards, row);
};

/**
 *
 * @param {*存放差值的数组} diffArray
 * @param {*所有需要修改的item} items
 */
function applyDiffs(diffArray, items, row) {
  /** 第一组的差值应用于第二组的item */
  for (let i = 0; i < items.length - row; i++) {
    setTimeout(() => {
      items[i + row].style.marginTop = -diffArray[i] + "px";
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
function groupByArray(array, row) {
  let newArray = [];
  let subCount = 0;
  let index = 0;
  for (let i = 0; i < array.length / row; i++) {
    newArray.push([]);
    for (let j = index; j < array.length; j++) {
      newArray[i].push(array[j]);
      subCount++;
      index++;
      if (subCount == row) {
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
function calcGrupsDiff(grups, row) {
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
      for (let i = row * index; i < diffs.length; i++) {
        // console.log("index:", index, "i:", i, "diffs[" + (i) + "]:", diffs[i], diffs[i - row]);
        diffs[i] = diffs[i] + diffs[i - row];
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.zx-water-fall__card {
  width: 30%;
  height: fit-content;
  --el-card-padding: 5px;
}
.zx-water-fall__card__desc {
  font-size: 0.8em;
}
</style>
