<template>
  <el-tabs
    v-model="activeName"
    class="heard-tabs"
    @tab-click="handleClick"
    stretch="true"
    tab-position="left"
  >
    <el-tab-pane name="first">
      <template #label>
        <span class="custom-tabs-label">
          <!-- <img class="__label_icon" :src="imgs.inclined" /><br /> -->
          <span
            >摄
            <br />
            影</span
          >
        </span>
      </template>
      <zx-water-fall
        :artssrc="onlySrc.photography"
        :arts="artslow.photography"
        column="3"
      >
      </zx-water-fall>
    </el-tab-pane>
    <el-tab-pane name="second">
      <template #label>
        <span class="custom-tabs-label">
          <img class="__label_icon" :src="imgs.inclined" /><br />
          <span>插 <br />画</span>
        </span>
      </template>
      <zx-water-fall :artssrc="onlySrc.illustration" :arts="arts.illustration" column="3">
      </zx-water-fall>
    </el-tab-pane>
    <el-tab-pane name="third">
      <template #label>
        <span class="custom-tabs-label">
          <img class="__label_icon" :src="imgs.inclined" /><br />
          <span>像 <br />素</span>
        </span>
      </template>
      <zx-water-fall
        :artssrc="onlySrc.pixel_painting"
        :arts="arts.pixel_painting"
        column="3"
      >
      </zx-water-fall
    ></el-tab-pane>
    <el-tab-pane name="fourth">
      <template #label>
        <span class="custom-tabs-label">
          <img class="__label_icon" :src="imgs.inclined" /><br />
          <span>墙 <br />绘</span>
        </span>
      </template>
      <zx-water-fall
        :artssrc="onlySrc.wall_painting"
        :arts="arts.wall_painting"
        column="3"
      >
      </zx-water-fall
    ></el-tab-pane>
  </el-tabs>
  <el-affix class="el-affix__parent" position="bottom" :data-url="imgs.exit" :offset="20">
    <!-- <img class="el-affix__img__shadow" :src="imgs.exit" /> -->
    <img class="el-affix__img" :src="imgs.exit" @click="sidebarShow" />

    <!-- <el-button type="primary">
      <el-icon><Expand /></el-icon>
    </el-button> -->
  </el-affix>
</template>

<script>
import zxWaterFall from "./components/zx-water-fall.vue";
// import { Expand } from "@element-plus/icons-vue";
import img_inclined from "@/assets/Inclined.png";
import img_menu from "@/assets/menu.png";
import img_exit from "@/assets/exit.png";

// import img_ollwall from "@/assets/ollwall.png";
// import img_photography from "@/assets/photography.png";
// import img_pixel from "@/assets/pixel.png";
// import img_illustration from "@/assets/illustration.png";
let titleArry = [
  // "亭子码头",
  // "酷酷的猫咪",
  // "电塔",
  // "编织帽",
  // "无题",
  // "阳光早餐",
  // "百盛",
  // "",
  // "",
  // "",
];
let summaryArray = [
  // "夜景",
  //  ""
];
let dataArray = [
  // "2021/05/03",
  //  "2020/04/09"
];
export default {
  name: "App",
  data() {
    return {
      sidebarStatus: true,
      activeName: "first",
      imgs: { inclined: img_inclined, menu: img_menu, exit: img_exit },
      artslow: {
        photography: creatArtsName(
          "photography",
          57,
          titleArry,
          summaryArray,
          dataArray,
          true
        ),
      },
      arts: {
        illustration: creatArtsName(
          "illustration",
          19,
          titleArry,
          summaryArray,
          dataArray
        ),
        oil_painting: creatArtsName(
          "oil_painting",
          0,
          titleArry,
          summaryArray,
          dataArray
        ),
        photography: creatArtsName("photography", 57, titleArry, summaryArray, dataArray),
        pixel_painting: creatArtsName(
          "pixel_painting",
          24,
          titleArry,
          summaryArray,
          dataArray
        ),
        wall_painting: creatArtsName(
          "wall_painting",
          9,
          titleArry,
          summaryArray,
          dataArray
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
    // Expand,
  },
  mounted() {
    let tabsHeader = document.querySelector(".el-tabs__header");
    tabsHeader.classList.add("sidebar-show-anim");
  },
  created() {},
};
function creatArtsName(type, max, titleArry, summaryArray, dataArray, isLowImg) {
  let arts = [];
  // if (
  //   titleArry != null &&
  //   summaryArray != null &&
  //   dataArray != null &&
  //   titleArry.length == summaryArray.length &&
  //   summaryArray.length == dataArray.length
  // ) {
  let path = isLowImg ? "./artslow/" : "./art/";
  for (let i = 0; i < max; i++) {
    let artobj = {
      src: path + type + "/" + type + (i + 1) + ".png",
      title: titleArry[i],
      summary: summaryArray[i],
      date: dataArray[i],
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
.custom-tabs-label {
  font-size: 1.3em;
  font-weight: bold;
  text-align: center;
}
.__label_icon {
  transform: rotate(45deg);
  height: 1em;
}
.el-tabs__header {
  top: 0;
  padding: 0;
  width: 80px;
  position: fixed !important;
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
  transform: rotate(360deg);
  transition: 0.5s;
}

.el-affix__img:active {
  transform: rotate(0);
  transition: 0s;
}

.el-affix--fixed:after {
  content: arr(data-url);
  height: 3em;
  width: 3em;
  background-color: #4499ff;
  margin-right: -3.2em;
  filter: blur(6px);
  z-index: 2;
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
