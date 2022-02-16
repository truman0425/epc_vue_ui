<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default  {
  name:  'App'
}
</script>
<style>

  .scroll-container .el-scrollbar__wrap{
    height:58px !important;
  }
 /* .el-scrollbar__view{
    height:45px !important;
  }*/
  .sidebar-logo-container .sidebar-logo-link .sidebar-logo{
    width: 135px !important;
     height: auto !important;
    vertical-align: middle;
    margin-right: 12px;
  }
  .el-checkbox__inner,.el-input__inner,.el-radio__inner{
    border:1px solid #ccc;
  }
  .searchOperat .el-button{
    border: 1px solid #DCDFE6;
  }

  /*表格线对不齐*/
  body .el-table th.gutter {
    display: table-cell !important
  }

  .el-input.is-disabled .el-input__inner {
    background: #F9FBFE;
    border: 1px solid rgba(82, 90, 104, 0.2);
    color: rgba(65, 135, 242, 0.7);
    cursor: not-allowed;
    height: 46px;
    line-height: 46px;
    border-radius: 8px;
  }
  .el-input--medium .el-input__inner{
    height: 46px;
    line-height: 46px;
    border-radius: 8px;
  }

  .el-textarea.is-disabled .el-textarea__inner{
    background: #F9FBFE;
    border: 1px solid rgba(82, 90, 104, 0.2);
    color: rgba(65, 135, 242, 0.7);
    cursor: not-allowed;
  }
  .el-input__inner{
    font-size: 16px;
  }
 .el-form-item{
    margin-bottom: 25px !important;
  }
  .el-form-item__label {
    font-weight: normal !important;
  }
  body{
    overflow: auto !important;
  }

  /*/deep/ .el-input.is-disabled .el-input__inner , /deep/ .el-textarea.is-disabled .el-textarea__inner{*/
  /*  background-color: rgba(232,243,254,0.3) !important;*/
  /*  border-color: rgba(80,90,105,0.3) !important;*/
  /*  color: rgba(25,137,250,0.5) !important;*/
  /*  cursor: not-allowed;*/
  /*}*/


  .el-textarea__inner{
    border: 1px solid rgba(82, 90, 105, 0.2) !important;
    border-radius: 8px;
  }
  .el-form-item--medium .el-form-item__label {
    line-height: 46px;
    color: #505A69;
  }
  .el-form-item--medium .el-form-item__content {
    line-height: 46px;
  }
  .el-form-item__error {
    top: 90%;
  }
   .el-form-item__label{
    font-size: 18px !important;
     color: #505A69 !important;
     font-family: MicrosoftYaHei;
     font-weight: bold !important;
     font-stretch: normal !important;
     letter-spacing: 0px !important;
     /*height: 46px !important;*/
     line-height: 46px !important;
  }
    .el-breadcrumb__item a{
    font-size: 16px;
    color: rgba(80, 90, 105, 0.5);
  }

  .el-breadcrumb__item:last-child a{
    font-size: 18px;
    color: #1989FA;
  }

  .el-textarea__inner{
    font-size: 16px !important;
  }

  .el-submenu{
    width: 320px;
  }
</style>
