<template>
  <el-dialog
    :title="title"
    :width="width"
    :show-close="false"
    :lock-scroll="false"
    :append-to-body="true"
    :visible.sync="visible"
    :show="show"
    class="scrollTab"
    @close="$emit('update:show', false)"
    center>
    <div v-if="titleTabs && titleTabs.length > 0" slot="title">
      <el-radio-group v-model="titleTabModel" class="top-title-tab">
        <el-radio-button v-for="(btn,index) in titleTabs"
                         :key="'radiobutton'+index"
                         :label="btn.name">
        </el-radio-button>
      </el-radio-group>
      <i class="el-icon-close i-close" @click="closeDialog"></i>
    </div>
    <div v-else slot="title" class="title-top">
      <div><span>{{title}}</span></div>
      <i class="el-icon-close i-close" @click="closeDialog"></i>
    </div>
    <div class="container">
      <slot name="dialogContent"  ></slot>
    </div>
    <div class="dialog-bottom-top-line"> </div>
    <div v-if="hasFoot" slot="footer" class="dialog-footer">
      <slot name="footer"></slot>
      <!--<my-button title="取消" btnType="1" @btnClick="closeDialog"></my-button>-->
      <!--<my-button title="确定"  style="margin-left: 50px" @btnClick="confirmDialog"></my-button>-->
    </div>
  </el-dialog>
</template>

<script>

export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    titleTabs:{
      type:Array,
      default:()=> new Array()
    },
    title: {
      type: String,
      default: ''
    },
    hasFoot: {
      type: Boolean,
      default: true
    },
    isConfirmClose: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '550px'
    },
    disabledScoll:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.show,
      activeName: 'first',
      dialogScore: false,
      pointsList: [],
      titleTabModel:'',
    }
  },
  watch:{
    show() {
      this.visible = this.show;
    },
    titleTabModel:{
      handler(old,news){
        this.$emit("onTitleTabChange",this.titleTabModel)
      },
      immediate:true
    }
  },
  created() {
    this.titleTabModel = this.titleTabs.length > 0 && this.titleTabs[0].name || ''
  },
  methods: {
    openDialog() {
      this.visible = true;
     // !this.disabledScoll && this.noScroll()
    },
    confirmDialog() {
      if (this.isConfirmClose) {
        this.visible = false;
      }
      this.$emit('confirmDialog')
    },
    closeDialog() {
      this.visible = false;
     // !this.disabledScoll && this.canScroll()
      this.$emit('closeDialog')
    },
    noScroll(){

      var mo = function (e) { e.preventDefault() }
      //document.body.style.overflow = 'hidden'
      // openSidebar
      let dom = window.document.getElementsByClassName('app-wrapper openSidebar')
      if(dom){
        dom[0].style.overflow = 'hidden'
      }
      document.addEventListener('touchmove', mo, false)// 禁止页面滑动
    },
    canScroll(){
      var mo = function (e) {
        e.preventDefault()
      }
      let dom = window.document.getElementsByClassName('app-wrapper openSidebar')
      if(dom){
        dom[0].style.overflow = ''
      }
      //document.body.style.overflow = ''// 出现滚动条
      document.removeEventListener('touchmove', mo, false)
    },
  }
};
</script>
<style lang="scss" scoped>

.container {
  width: 100%;
  padding: 0 6px;
  background-color: #ffffff;
}

.i-close {
  position: absolute;
  right: 2px;
  top: 0;
  bottom: 0;
  width: 44px;
  height: 44px;
  font-size: 18px;
  line-height: 44px;
  cursor: pointer;
  color: #c1c1c1;
}

.title-top {
  background-color: #f2f2f2;
  display: flex;
  position: relative;
  padding: 15px 20px;
  height: 72px;
  font-size: 24px;
  border-radius: 5px;
  color: #525A68;
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

  }
}

::v-deep .el-dialog__header {
  padding: 0px;
}

::v-deep .el-dialog {
  display: flex;
  display: -ms-flex; /* 兼容IE */
  flex-direction: column;
  -ms-flex-direction: column; /* 兼容IE */
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
  border-radius: 10px !important;
}

::v-deep .el-dialog .el-dialog__body {
  flex: 1;
  -ms-flex: 1 1 auto; /* 兼容IE */
  overflow: auto;
  padding: 10px 10px 50px 10px !important;
}

::v-deep .el-dialog__wrapper {
  overflow: hidden; /*隐藏ie和edge中遮罩的滚动条*/
}

.dialog-bottom-top-line {
  height: 1px;
  width: 100%;
  background-color: #f2f2f2;
}
.top-title-tab{
  margin: 8px 0;
}

//页面滚动条修改 开始
.scrollTab{

}

.scrollTab .el-scrollbar {
  height: 100%;
}
.scrollTab {
  overflow: overlay;
}
/* 最为关键得两个样式代码，可以设置全局滚动条样式，也可以按需设置 */
.scrollTab ::-webkit-scrollbar {
  /* 设置竖向滚动条的宽度 */
  width: 5px !important;
  /* 设置横向滚动条的高度 */
  height: 5px !important;
}
.scrollTab ::-webkit-scrollbar-thumb {
  /*滚动条的背景色*/
  background-color: rgba(144,147,153,.3);
  border-radius: 35px !important;
  position: relative;
}

//页面滚动条修改结束


</style>
