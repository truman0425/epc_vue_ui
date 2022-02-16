<template>
  <div class="peoject-title tit_bg_color">
    <i class="el-icon-tickets text_color file_icon"></i>
    <span class="title_b">{{big_tit}}</span>
    <i class="el-icon-caret-bottom down_icon"></i>
  </div>
</template>
<script>
export default {
  name:"titleNav",
  props: {
    big_tit:{
        type: String,
        default: "",
    }
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.peoject-title {
  height: 72px;
  box-shadow: 0px 5px 6px 1px rgba(91, 91, 91, 0.1);
  line-height: 72px;
  border-radius: 2px;
  padding-left: 25px;
  width: 100%;
  .title_b {
    color: "#5B5B5B";
    font-size: 24px;
    font-weight: bold;
    padding: 0 8px 0 10px;
  }
  .down_icon {
    color: #bfbfbf;
    font-size: 20px;
  }
  .file_icon {
    // color: #1989FA;
    font-size: 20px;
  }
}
</style>