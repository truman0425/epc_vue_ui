<template>
  <div>
  <div class="app-box">
    <div id="showHomepage" style="background-color: rgb(255, 255, 255); overflow: hidden; width: 1321px; height: 669px;">
      <!--<iframe id="showPageIframe" src="http://pccs.ceedi.cn/portal-sjy/anasysing/gotoAnasysing.action" width="100%" height="669" frameborder="0">
      </iframe>-->

    </div>
  </div>
  </div>
</template>

<script>
/*import ElCol from "element-ui/packages/col/src/col";*/

export default {
  components: {
   /* ElCol*/
  },
  name: "xpmhome",
  data() {
    return {

    };
  },
  mounted() {

  },
  watch(){},
  created() {
    this.xpmFunc();
  },
  methods: {
    xpmFunc() {

    },

  }
};
</script>
<style scoped lang="scss">
  @import "../../publicStyle/style.css";
</style>

