<template>
  <div class="collapse-main">
    <div class="header-item" @click="openCollapse">
      <div>
        <el-image style="width:14px;height:14px;" :src="require('@/assets/image/collapse_info.png')"></el-image>
        <span class="tit_b" style="margin-left: 5px">{{title}}</span>
      </div>
      <div> <i :class="{ 'arrowTransform': activeNames == '', 'arrowTransformReturn': activeNames == '1'}"
                                                                                 class="el-icon-caret-top"></i></div>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="title"
                        name="1">
        <slot name="content"></slot>
      </el-collapse-item>
    </el-collapse>
  </div>

</template>

<script>

export default {
  components: {},
  props: {
    detailObj: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    switchState: {
      type: Number,
      default: -1
    },
    open: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      activeNames: '',
      value: false
    }
  },
  created () {
    this.switchState == 1 ? this.value = true : this.value = false;
    this.open == true ? this.activeNames = '1' : this.activeNames = '';
  },
  methods: {
    openCollapse () {
      this.activeNames == '' ? this.activeNames = '1' : this.activeNames = '';
    },
    change (e) {
      this.$emit('switchChange', this.value)
    }
  }
};
</script>
<style lang="scss" scoped>
.collapse-main {
  margin-bottom: 20px;
  min-height: 48px;
  background-color: #ffffff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  width: 100%;

}
.header-item {
  display: flex;
  width: 100%;
  min-height: 70px;
  color: #505A69;
  cursor: pointer;
  padding: 0 15px;
  flex: 1;
  background: #e8f3fe;
  font-size: 24px;
  box-shadow: 0px 5px 6px 1px rgba(91, 91, 91, 0.1);
  border-radius: 2px;
  border-bottom: 1px solid #f0f3fa;
  margin-bottom: 32px;
  > div:last-child {
    display: flex;
    align-items: center;
    color: #BFBFBF;
    margin-left: 12px;
    font-size: 16px;
    span {
      margin-right: 2px;
    }
  }
  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}

::v-deep .el-collapse-item__header {
  height: 0px !important;
  opacity: 0;
  pointer-events: none;
}

::v-deep .el-collapse {
  border-top: 0px solid #e6ebf5;
  border-bottom: 0px solid #e6ebf5;
}

::v-deep .el-collapse-item__wrap {
  border-bottom: 0px solid #e6ebf5;
}
.tit_b{
  font-size: 24px;
}
.arrowTransform {
  transition: 0.2s;
  transform-origin: center;
  transform: rotateZ(90deg);
}
.arrowTransformReturn {
  transition: 0.2s;
  transform-origin: center;
  transform: rotateZ(180deg);
}
</style>
