<template>
  <my-dialog ref="editDialog" title="温馨提示" width="197px">
    <div slot="dialogContent" class="dialog-content">
       <div style="display: flex;justify-content: center;align-items: center">
         <i style="color:#4187F2;font-size: 20px" class="el-icon-circle-check"></i>
         <span style="margin-left: 5px">{{ message }}</span>
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
       message:this.msg
    }
  },

  methods: {
    openDialog(msg) {
      this.message = msg
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
  width: 60px;
  height: 24px;
  background:#4187F2;
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

</style>
