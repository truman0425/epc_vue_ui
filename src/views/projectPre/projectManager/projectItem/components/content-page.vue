<template>
  <div class="page-main">
    <div class="page-content" :class="[isMarginTop?'margin-top':'']">
      <div class="page-top">
        <div class="top-title">
          <span>{{ title }}</span>
          <span v-if="isDetail && !isTask && !isTaskDetail" class="remark-txt">（ 注：红色字体为跟进修改内容 ）</span>
        </div>
        <div  class="top-edit" v-show="!isLook && !isTask && !isTaskDetail">
           <span @click="editPage" :style="{'color':!isEdit?'#1989fa':'#dddddd'}">{{isFild?'排序':'编辑'}}</span>
           <span @click="delFild" :style="{'color':!isDel?'#1989fa':'#dddddd'}" class="del-top-btn" v-show="isFild">删除</span>
        </div>
        <div  class="top-edit" v-show="isTask">
          <span @click="delFild" :style="{'color':!isDel?'#1989fa':'#dddddd'}" class="del-top-btn" >删除</span>
        </div>
        <div class="xq-add-btn" v-show="actionBtn && !isDetail">
          <MyButton  @click.native="addActionBtn()"  :title="actionBtnTitle"></MyButton>
        </div>
      </div>
      <div class="page-slot-content">
        <slot name="pageContent"></slot>
      </div>
      <div v-show="showBottom" class="page-line"></div>

        <el-collapse-transition>
          <div v-show="showBottom">

            <div class="page-bottom" >
              <div >
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="字段名称">
                      <el-input v-model="currentFieldObj.fldName" maxlength="15" show-word-limit></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="控件类型">
                      <el-select  @change="onSelectFldType"
                                  v-model="currentFieldObj.fldType" placeholder="请选择" style="width: 100%">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>

                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="page-btn">
                  <el-button @click="onSure" type="text">确定</el-button>
                  <el-button @click="onCancle" type="text">取消</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-transition>



    </div>

  </div>

</template>
<script>
import MyButton from './my-button'

export default {
  name: "ContentPage",
  components: {MyButton},
  props:{
    title:{
      type:String,
      default:''
    },
    isFild:{
      type:Boolean,
      default:false
    },
    isMarginTop:{
      type:Boolean,
      default:false
    },
    isLook:{
      type:Boolean,
      default:false
    },
    actionBtn:{
      type:Boolean,
      default:false
    },
    actionBtnTitle:{
      type:String,
      default:''
    },
    isDetail:{
      type:Boolean,
      default:false
    },
    isTask:{
      type:Boolean,
      default:false
    },
    isTaskDetail:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      showBottom:false,
      isEdit:false,
      isDel:false,
      currentFieldObj:{},
      options: [{
        value: '1',
        label: '文本输入框',
      }, {
        value: '2',
        label: '多行文本框'
      },
        //   {
        //   value: '3',
        //   label: '下拉列表'
        // },
        {
          value: '4',
          label: '金额'
        }, {
          value: '5',
          label: '日期选择'
        }],
    }
  },
  computed:{

  },
  created() {
    //this.getData()
  },
  mounted(){
  },
  methods:{
    showContentBottom(){
      this.showBottom = true
      this.isEdit = false
      this.isDel = false
    },
    hideContentBottom(){
      this.showBottom = false
    },
    onSure(){
      if(!this.currentFieldObj.fldName || this.currentFieldObj.fldName == ''
        || !this.currentFieldObj.fldType || this.currentFieldObj.fldType == ''){
        this.$message.warning('请先填写完整字段名称和字段类型')
      }else{
        this.$emit('onFiledSure',this.currentFieldObj)
        // this.restFiled()
      }

    },
    onCancle(){
      this.showBottom = false
    },
    restFiled(){
      this.currentFieldObj = {}
      setTimeout(()=>{
        this.showBottom = false
      },200)
    },
    onSelectFldType(val){
      console.log(JSON.stringify(val))
    },
    addActionBtn(){
      this.$emit('addAction')
    },
    editPage(){
      !this.isEdit && this.$emit('editPage')
      this.isEdit = true
      this.hideDel()
    },
    hideEdit(){
      this.isEdit = false
    },
    hideDel(){
      this.isDel = false
    },
    delFild(){
     !this.isDel && this.$emit('delFild')
      this.isDel = true
      this.hideEdit()
    }
  }

}
</script>
<style lang="scss" scoped>

.page-main{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

 .page-content{
   width: 872px;
   background-color: #ffffff;
   border-radius: 8px;
   //border: solid 1px rgba(80,90,105,0.2);
   display: flex;
   flex-direction: column;
   .page-top{
     width: 872px;
     height: 60px;
     //background-color: rgba(232,243,254,0.3);
     display: flex;
     padding: 0 35px;
     align-items: center;
     justify-content: space-between;
     .top-title{
       font-family: MicrosoftYaHei;
       font-size: 22px;
       font-weight: bold;
       font-stretch: normal;
       letter-spacing: 0px;
       color: #505a69;
       .remark-txt{
         font-size: 16px;
         font-weight: normal;
         font-stretch: normal;
         letter-spacing: 0px;
         color: #505a69;
         opacity: 0.5;
         margin-left: 20px;
       }
     }
     .top-edit{
       font-family: MicrosoftYaHei;
       font-size: 16px;
       font-weight: normal;
       font-stretch: normal;
       letter-spacing: 0px;
       color: #1989fa;
       cursor: pointer;
       span:first-child{

       }
       .del-top-btn{
         margin-left: 10px;
       }
     }
   }
   .page-line{
     width: 100%;
     height: 1px;
     background-color: rgba(80,90,105,0.2);
   }
   .page-bottom{
     width: 100%;
     height: 126px;
     background: rgba(25,137,250,0.05);
     padding-top: 20px;
     padding-right: 20px;

     /deep/ .el-form-item__label{
       font-size: 16px!important;
       font-weight: normal!important;
       font-stretch: normal!important;
       letter-spacing: 0px!important;
       color:rgba(80,90,105,0.5) !important;
     }
     /deep/ .el-form-item{
       margin-bottom: 6px !important;
     }
     .text-view{
       font-family: MicrosoftYaHei;
       font-size: 16px;
       font-weight: normal;
       font-stretch: normal;
       letter-spacing: 0px;
       color: #505a69;
       margin-left: 15px;
     }
   }
   .page-btn{
     width: 100%;
     display: flex;
     justify-content: flex-end;
     margin-top: 5px;
   }
 }
 .margin-top{
   margin-top: 20px;
 }
 .page-slot-content{
   background: rgba(25,137,250,0.05);
   border-radius: 8px;
 }
</style>

