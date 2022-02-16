<template>
  <my-dialog ref="editDialog" title="温馨提示" class="my-dialog" :width="dialogWidth+'px'">
    <div slot="dialogContent" class="dialog-content">
       <div class="warn-txt"  >
         <i   class="warn-img el-icon-warning"></i>
         <span style="margin-left: 5px">确认要删除此列表数据吗？</span>
       </div>
    </div>

    <div slot="footer" >

      <div class="btns-list-bottom">
        <div @click="closeDialog" class="foot-btn-cancel">
          <span>取消</span>
        </div>
        <div @click="onSure" class="foot-btn">
          <span>确定</span>
        </div>
      </div>

    </div>
  </my-dialog>
</template>

<script>


export default {
  name: "dialogSaveSucess",
  data() {
    return {
      dialogWidth:380
    }
  },
  created() {
    let width = window.document.documentElement.getBoundingClientRect().width
    let scale = width/1920
    this.dialogWidth = this.dialogWidth*scale
  },
  methods: {
    openDialog() {
      this.$refs.editDialog.openDialog();
    },
    closeDialog() {
      this.$refs.editDialog.closeDialog();
    },
    onSure() {
      this.$emit('onSureDel')
      this.closeDialog()
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
  justify-content: flex-end;
}
/deep/ .dialog-bottom-top-line {
  height: 0px;
}

.foot-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 30px;
  background:#4187F2;
  border-radius: 4px;
  font-size: 11px;
  margin-left: 20px;
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

.foot-btn-cancel{
  background: white;
  border-radius: 4px;
  border: 1px solid #DDDDDD;
  color: #525A68;
  font-size: 12px;
  width: 65px;
  height: 30px;
  cursor: pointer;
  margin-left: 10px;
 display: flex;
  align-items: center;
  justify-content: center;
  span{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.warn-img{
  color:#d81f06;
  font-size: 20px;
}
.warn-txt{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #000000;
  line-height: 51px
}
/deep/ .el-dialog__header {
  height: 48px !important;
  background: #ddd;
}
/deep/ .title-top{
  height: 48px !important;
  background: #ddd;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #525A68;
}

/deep/ .el-dialog{
  height: 200px;
  background: #FFFFFF;
  border-radius: 8px;
}

.btns-list-bottom{
  display: flex;
  justify-content: flex-end;
}

</style>
