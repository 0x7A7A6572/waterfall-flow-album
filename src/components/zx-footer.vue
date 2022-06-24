<template>
  <footer class="zx-footer">
    <a :href="ownerlink" target="_blank">
      <p>
        Copyright©2022 <span class="zx-footer-text">{{ owner }}</span>
      </p>
    </a>
    <span class="style-none">|</span>
    <a
      target="_blank"
      :href="'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' + icp"
    >
      <!-- <img src="https://zzerx.cn/images/beian.png" style="float:left;box-shadow: none;"> -->
      <p><span class="zx-footer-text">ICP</span>{{ icp }}</p>
    </a>
    <span class="style-none">|</span>
    <a target="_blank" :href="'mailto:' + email">
      <p><span class="zx-footer-text">Email</span>{{ email }}</p>
    </a>
  </footer>
</template>

<script>
export default {
  props: {
    owner: { type: String },
    ownerlink: { type: String },
    icp: { type: String },
    email: { type: String },
  },
  data() {
    return {};
  },
};
</script>

<style scope>
.style-none {
  margin: 0;
  padding: 0;
}
.zx-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  text-align: center;
  font-size: 0.8em;
  margin-top: 5em;
  margin-bottom: -3em;
}
.zx-footer p {
  float: left;
  height: 20px;
  line-height: 20px;
  margin: 0px 0px 0px 0px;
  color: #939393;
}
.zx-footer span {
  margin: 0em 0.5em;
}
.zx-footer-text {
  font-weight: bold;
  color: #4499ff;
}
</style>
