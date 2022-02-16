<template>
  <my-dialog ref="editDialog" title="温馨提示" width="295px">
    <div slot="dialogContent" class="dialog-content">
       <div style="display: flex;justify-content: center;align-items: center">
         <i   class="icon-cls el-icon-warning"></i>
         <span class="warn-info" style="margin-left: 5px">{{info||'请填写必选项'}}</span>
       </div>
    </div>

    <div slot="footer" class="btn-foot">
      <div @click="onSure" class="foot-btn">
        <span>确定</span>
      </div>
    </div>
  </my-dialog>
</template>

<script>


export default {
  name: "dialogSaveSucess",
  props:{
    msg:{
      type:String,
      default:'保存成功'
    }
  },
  data() {
    return {
       message:this.msg,
      info:'请填写必选项'
    }
  },

  methods: {
    openDialog(msg) {
      this.message = msg
      this.info = msg
      this.$refs.editDialog.openDialog();
    },
    closeDialog() {
      this.$refs.editDialog.closeDialog();
    },
    onSure() {
      this.closeDialog();
    },
  }
}
</script>

<style lang="scss" scoped>

.dialog-content {
  margin-top: 15px;
  .table-people {
    margin: 10px 0px;
  }
}

.btn-foot {
  display: flex;
  justify-content: center;
}
/deep/ .dialog-bottom-top-line {
  height: 0px;
}

.foot-btn{
  display: flex;
  justify-content: center;
  width: 90px;
  height: 30px;
  background:#ff2e3e;
  border-radius: 3px;
  font-size: 11px;
  color: white;
  text-align: center;
  cursor: pointer;
  span{
    display: flex;
    align-items: center;

  }
}

/deep/ .title-top {
  padding: 10px 20px;
}
/deep/ .i-close{
  visibility: hidden;
}

.icon-cls{
  color:#ff2e3e;
  font-size: 20px
}

/deep/ .title-top{
  height: 48px !important;
  background: #ddd;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #525A68;
}
.warn-info{
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ff2e3e;
}

</style>
