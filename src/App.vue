<template>
  <el-tabs v-model="activeName" class="heard-tabs" :stretch="true" tab-position="left">
    <el-tab-pane name="first">
      <template #label>
        <span class="custom-tabs-label">
          <!-- <img class="__label_icon" :src="imgs.inclined" /><br /> -->
          <span>摄<br />影</span>
        </span>
      </template>
      <zx-water-fall
        :artssrc="onlySrc.photography"
        :arts="artslow.photography"
        :column="autoColumn"
      >
      </zx-water-fall>
    </el-tab-pane>
    <el-tab-pane name="second">
      <template #label>
        <span class="custom-tabs-label">
          <!-- <img class="__label_icon" :src="imgs.inclined" /><br /> -->
          <span>插 <br />画</span>
        </span>
      </template>
      <zx-water-fall
        :artssrc="onlySrc.illustration"
        :arts="arts.illustration"
        :column="autoColumn"
      >
      </zx-water-fall>
    </el-tab-pane>
    <el-tab-pane name="third">
      <template #label>
        <span class="custom-tabs-label">
          <!-- <img class="__label_icon" :src="imgs.inclined" /><br /> -->
          <span>像 <br />素</span>
        </span>
      </template>
      <zx-water-fall
        :artssrc="onlySrc.pixel_painting"
        :arts="arts.pixel_painting"
        :column="autoColumn"
      >
      </zx-water-fall
    ></el-tab-pane>
    <el-tab-pane name="fourth">
      <template #label>
        <span class="custom-tabs-label">
          <!-- <img class="__label_icon" :src="imgs.inclined" /><br /> -->
          <span>墙 <br />绘</span>
        </span>
      </template>
      <zx-water-fall
        :artssrc="onlySrc.wall_painting"
        :arts="arts.wall_painting"
        :column="autoColumn"
      >
      </zx-water-fall
    ></el-tab-pane>
    <!-- <el-tab-pane name="five">
      <template #label>
        <span class="custom-tabs-label">
          <span>测<br />试 </span>
        </span>
      </template>
      <zx-water-fall-skeleton
        :artssrc="onlySrc.photography"
        :arts="artslow.photography"
        :column="autoColumn"
      ></zx-water-fall-skeleton>
    </el-tab-pane> -->
  </el-tabs>
  <zx-footer
    owner="zzerX"
    ownerlink="https://zzerx.cn"
    icp="45010502000772"
    email="zzerx@qq.com"
  ></zx-footer>

  <el-affix class="el-affix__parent" position="bottom" :offset="10">
    <img class="el-affix__img" :src="imgs.exit" @click="sidebarShow" />
  </el-affix>
</template>

<script>
import { toRaw } from "@vue/reactivity";
import zxWaterFall from "./components/zx-water-fall.vue";
import zxFooter from "./components/zx-footer.vue";

// import zxWaterFallSkeleton from "./components/zx-water-fall-skeleton.vue";
import indexedDBUtil from "./utils/indexedDBUtil.js";
import imgData from "./utils/imgData.js";
import { ElMessage } from "element-plus";
// import { Expand } from "@element-plus/icons-vue";
// import img_inclined from "@/assets/Inclined.png";
import img_menu from "@/assets/menu.png";
import img_exit from "@/assets/exit.png";
//  console.log(imgData)
// import img_ollwall from "@/assets/ollwall.png";
// import img_photography from "@/assets/photography.png";
// import img_pixel from "@/assets/pixel.png";
// import img_illustration from "@/assets/illustration.png";

export default {
  name: "App",
  data() {
    return {
      column: 4,
      sidebarStatus: true,
      activeName: "first",
      imgs: { /*inclined: img_inclined,*/ menu: img_menu, exit: img_exit },
      artslow: {
        photography: creatArtsName(
          "photography",
          57,
          imgData.titleArry.photography,
          imgData.summaryArray.photography,
          imgData.dataArray.photography,
          imgData.imgSize.photography,
          true
        ),
      },
      arts: {
        illustration: creatArtsName(
          "illustration",
          19,
          imgData.titleArry.illustration,
          imgData.summaryArray.illustration,
          imgData.dataArray.illustration,
          imgData.imgSize.illustration
        ),
        // oil_painting: creatArtsName(
        //   "oil_painting",
        //   0,
        //   titleArry.oil_painting,
        //   summaryArray.oil_painting,
        //   dataArray.oil_painting
        // ),
        photography: creatArtsName(
          "photography",
          57,
          imgData.titleArry.photography,
          imgData.summaryArray.photography,
          imgData.dataArray.photography,
          imgData.imgSize.photography
        ),
        pixel_painting: creatArtsName(
          "pixel_painting",
          24,
          imgData.titleArry.pixel_painting,
          imgData.summaryArray.pixel_painting,
          imgData.dataArray.pixel_painting
        ),
        wall_painting: creatArtsName(
          "wall_painting",
          9,
          imgData.titleArry.wall_painting,
          imgData.summaryArray.wall_painting,
          imgData.dataArray.wall_painting
        ),
      },
      onlySrc: {
        photography: creatArtsSrc("photography", 57),
        illustration: creatArtsSrc("illustration", 57),
        pixel_painting: creatArtsSrc("pixel_painting", 57),
        wall_painting: creatArtsSrc("wall_painting", 57),
      },
      aminMeunTimeout: null,
    };
  },
  methods: {
    sidebarShow: function () {
      this.sidebarStatus = !this.sidebarStatus;
      let tabsHeader = document.querySelector(".el-tabs__header");
      let fixedImg = document.querySelector(".el-affix__img");
      // console.log(
      //   "tabsHeader.className",
      //   tabsHeader.className,
      //   tabsHeader.className.match("sidebar-anim")
      // );
      if (tabsHeader.className.match("sidebar-show-anim") != null) {
        tabsHeader.classList.remove("sidebar-show-anim");
        tabsHeader.classList.add("sidebar-hide-anim");
        setTimeout(() => {
          tabsHeader.style.display = this.sidebarStatus ? "block" : "none";
        }, 2000);
      } else {
        tabsHeader.style.display = this.sidebarStatus ? "block" : "none";
        tabsHeader.classList.remove("sidebar-hide-anim");
        tabsHeader.classList.add("sidebar-show-anim");
      }
      // tabsHeader.style.display = this.sidebarStatus ? "block" : "none";
      // clearTimeout(this.aminMeunTimeout);
      // if (fixedImg.className.match("el-affix__img__anim") != null) {
      //   fixedImg.classList.remove("el-affix__img__anim");
      //   this.aminMeunTimeout = setTimeout(() => {
      //     fixedImg.classList.add("el-affix__img__anim");
      //   }, 500);
      // } else {
      //   fixedImg.classList.add("el-affix__img__anim");
      // }

      clearTimeout(this.aminMeunTimeout);
      if (this.sidebarStatus) {
        fixedImg.src = this.imgs.exit;
      } else {
        this.aminMeunTimeout = setTimeout(() => {
          fixedImg.src = this.imgs.menu;
        }, 500);
      }

      img_exit;
    },
  },
  components: {
    zxWaterFall,
    zxFooter,
    // zxWaterFallSkeleton,
  },
  mounted() {
    let db;
    let objStore;
    // let request = indexedDB.open("waterFallImgDatabase", 8); //版本号是一个 unsigned long long 数字，这意味着它可以是一个特别大的数字，但不能使用浮点数，否则它将会被转变成离它最近的整数，
    // request.onerror = function (event) {
    //   ElMessage("you didn't allow  web app to use IndexedDB.");
    //   console.warn("you didn't allow  web app to use IndexedDB", event, db);
    // };
    // request.onsuccess = function (event) {
    //   db = event.target.result;
    //   console.log(event, db);
    //   if (db.objectStoreNames.length == 0) {
    //     /**数据库不存在 */
    //   } else {
    //     /**数据库已存在 */
    //     let transaction = db.transaction(["ass"], "readonly");
    //     console.log("数据库已存在 *",transaction.objectStore("ass"))
    //     transaction.objectStore("ass").get(0).onsuccess = function (
    //       event
    //     ) {
    //       alert("Name for SSN 444-44-4444 is " + event.target.result);
    //     };
    //   }
    // };

    // request.onupgradeneeded = (event) => {
    //   var db = event.target.result;
    //   // 设置 autoIncrement 标志为 true 来创建一个名为 names 的对象仓库
    //   var objStore = db.createObjectStore("ass", { autoIncrement: true });
    //   // 因为 names 对象仓库拥有键生成器，所以它的键会自动生成。
    //   // 被插入的数据可以表示如下：
    //   // key : 1 => value : "Bill"
    //   // key : 2 => value : "Donna"
    //   let rowObj = toRaw(this.arts);
    //   console.log("onupgradeneeded", rowObj);
    //   Object.keys(rowObj).forEach((key) => {
    //      console.log("add", rowObj[key]);
    //     objStore.add(rowObj[key]);
    //   });
    // };
    indexedDBUtil.createindexDB(
      "waterFallImgDatabase",
      1,
      /**success */
      (event) => {
        db = event.target.result;
        // console.log(event, db);
        if (db.objectStoreNames.length == 0) {
          /**数据库空表 */
        } else {
          /**数据库已存在表 */
          db
            .transaction(["photography"], "readonly")
            .objectStore("photography")
            // .index("sex")
            .openCursor().onsuccess = function (e) {
            //条件查询
            //成功执行回调
            var cursor = e.target.result;
            if (cursor) {
              //如果存在
              //  console.info(cursor.value)
              // newArr.push(cursor);
              cursor.continue(); //继续下一个
            }
          };
          // .get(0).onsuccess = function (event) {
          //   alert("Name for  " + event.target.result);
          // };
        }
      },
      /**failed */
      (event) => {
        ElMessage("you didn't allow  web app to use IndexedDB.");
        console.warn("you didn't allow  web app to use IndexedDB", event, db);
      },
      /* onupgradeneeded */
      (event) => {
        db = event.target.result;
        // 设置 autoIncrement 标志为 true 来创建一个名为 names 的对象仓库
        objStore = db.createObjectStore("photography", { autoIncrement: true });
        objStore.createIndex("src", "src", { unique: true });
        objStore.transaction.oncomplete = (/*event*/) => {
          // 将数据保存到新创建的对象仓库
          objStore = db
            .transaction("photography", "readwrite")
            .objectStore("photography");

          let rowObj = toRaw(this.arts);
          console.log("onupgradeneeded", rowObj);
          Object.keys(rowObj).forEach((key) => {
            console.log("add", rowObj[key]);
            rowObj[key].forEach((element) => {
              objStore.add(element);
            });
          });
        };
      }
    );
    let tabsHeader = document.querySelector(".el-tabs__header");
    tabsHeader.classList.add("sidebar-show-anim");
  },
  computed: {
    autoColumn: function () {
      // console.log("screen is :", window.innerWidth);
      if (window.innerWidth <= 768) {
        return 3;
      } else {
        return 5;
      }
    },
  },
  created() {},
};
function creatArtsName(
  type,
  max,
  titleArry,
  summaryArray,
  dataArray,
  sizeArray,
  isLowImg
) {
  let arts = [];

  // if (
  //   titleArry != null &&
  //   summaryArray != null &&
  //   dataArray != null &&
  //   titleArry.length == summaryArray.length &&
  //   summaryArray.length == dataArray.length
  // ) {
  let path = isLowImg ? "./artslow/" : "./art/";
  if (sizeArray == null) {
    sizeArray = [];
  }
  for (let i = 0; i < max; i++) {
    // console.log(typeof titleArry[i], titleArry[i], type, i);
    titleArry[i] = titleArry[i] == undefined ? "Title" : titleArry[i];
    summaryArray[i] = summaryArray[i] == undefined ? "Summary..." : summaryArray[i];
    dataArray[i] = dataArray[i] == undefined ? "????/??/??" : dataArray[i];
    if (sizeArray[i] == undefined) {
      sizeArray[i] = { width: 400, height: 500 };
    }
    let artobj = {
      src: path + type + "/" + type + (i + 1) + ".png",
      title: titleArry[i],
      summary: summaryArray[i],
      date: dataArray[i],
      class: type,
      size: sizeArray[i],
    };
    arts.push(artobj);
  }
  // } else {
  //   for (let i = 1; i <= max; i++) {
  //     let artobj = {
  //       src: "./art/" + type + "/" + type + i + ".png",
  //       title: "",
  //       summary: "",
  //       date: "",
  //     };
  //     arts.push(artobj);
  //   }
  // }
  return arts;
}

function creatArtsSrc(type, max) {
  let arts = [];
  for (let i = 1; i <= max; i++) {
    arts.push("./art/" + type + "/" + type + i + ".png");
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
}
/**居中对齐 */
.el-tabs__content {
  margin: 0 auto;
  width: 90%;
  overflow: visible !important;
}
@media screen and (max-width: 600px) {
  .el-tabs__content {
    width: 100%;
  }
}
.el-image {
  display: block;
}
.el-tabs__item {
  padding: 0 10px !important;
}
.custom-tabs-label {
  font-size: 1.3em;
  font-weight: bold;
  text-align: center;
}
/*
.__label_icon {
  transform: rotate(45deg);
  height: 1em;
} */

/** tabs 分隔斜杠 */
.el-tabs__item:not(:last-child)::after {
  content: "|";
  display: block;
  transform: rotate(45deg);
  color: #2b2b2b !important;
  text-align: center;
  /* height: 1em; */
  font-size: 1.3em;
}
.el-tabs__header {
  top: 0;
  padding: 0;
  width: 80px;
  position: fixed !important;
  padding-top: 20px !important;
  margin: 0 0 15px;
  /* height: auto !important; */
  z-index: 9;
  background-image: linear-gradient(to right, rgb(255 255 255), rgb(255 255 255 / 0%));
}
.el-tabs__nav-wrap::after {
  display: none;
}
.el-tabs--left .el-tabs__active-bar.is-left {
  right: auto !important;
  left: auto;
}

/** el-tabs__header 宽度100px 之后左移文字 */
.el-tabs--left .el-tabs__nav.is-left,
.el-tabs--left .el-tabs__nav.is-right,
.el-tabs--right .el-tabs__nav.is-left,
.el-tabs--right .el-tabs__nav.is-right {
  float: left !important;
}
.el-tabs__item {
  height: auto !important;
}

.el-affix--fixed {
  width: auto !important;
}

.el-affix__img {
  height: 3em;
  z-index: 3;
  margin-left: -3em;
  transform: rotate(360deg);
  transition: 0.5s;
}

.el-affix__img:active {
  transform: rotate(0);
  transition: 0s;
}

.el-affix--fixed:before {
  content: "三";
  font-size: 3em;
  color: #ffffff;
  background-color: #4499ff;
  filter: blur(0.6em);
}
/* .el-affix__img__shadow {
  height: 3em;
  margin-right: -3.2em;
  filter: blur(6px);
  z-index: 2;
} */
.el-affix__img__anim {
  animation: rotate 1s;
}

.sidebar-show-anim {
  animation: fadenum-show 2s;
}
.sidebar-hide-anim {
  animation: fadenum-hide 2s;
}

@keyframes fadenum-hide {
  /*设置内容由显示变为隐藏*/
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fadenum-show {
  /*设置内容由隐藏变为显示*/
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
