<template>
  <!--自定义扩展字段-->
  <div class="tzf-main" >

    <!-- 机会详情-->
    <div v-if="businessType == 'epc_project_chance'">
      <div class="hart-top"  >
        <span>扩展信息</span>
      </div>
      <div class="info-content"  >
        <div class="info-item" v-for="obj in rowObject">
          <el-col class="item-list" :span="obj.dataType == '2' ? 24 : 8">
            <span>{{ obj.name }}{{ obj.name.indexOf('：') == -1 ? '：':'' }}</span>
            <span>{{ obj.defaultValue || '--' }} {{obj.dataType == 3?'万':''}}</span>
          </el-col>
        </div>
      </div>
    </div>

    <!-- 项目详情-->
    <div v-if="businessType == 'epc_project_approve' && metaType == '1'">
      <div class="info-main">

        <div class="hart-top"  :style="{'margin-top':'30px'}" >
          <i class="el-icon-document"></i>
          <span>扩展信息</span>
        </div>

        <div class="info-content">
          <el-row class="info-item2" >
            <el-col v-for="(obj, index) in rowObject" :key="index" class="item-list" :span="obj.dataType == '2' ? 24 : 8">
              <span>{{ obj.name }}{{ obj.name.indexOf('：') == -1 ? '：':'' }}</span>
              <span>{{ obj.defaultValue || '--' }}{{ obj.dataType=='3' && obj.defaultValue?'万':''}}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <!--项目线索-->
    <div v-if="businessType == 'epc_project_clue' || businessType == 'epc_project_clue_seas'">

      <div  class="left-center">
        <div class="left-bottom">
          <div class="file-list-top">
            <span>扩展信息</span>
          </div>
          <el-row class="item-text" >
            <el-col v-for="(obj, index) in rowObject" :key="index" class="item-list" :span="obj.dataType == '2' ? 24 : 8">
              <span>{{ obj.name }}{{ obj.name.indexOf('：') == -1 ? '：':'' }}</span>
              <span>{{ obj.defaultValue || '--' }}{{ obj.dataType=='3' && obj.defaultValue?'万':''}}</span>
            </el-col>
          </el-row>
        </div>
      </div>

    </div>



  </div>
</template>

<script>
// epc_project_approve

import { getAddInfo, getItemDataList, getxItemlist, savexItemData } from '@/api/system/meta'
import { saveProjectAndContent } from '@/api/projectPlanning/projectRegistration'

export default {
  components: {  },
  props: {
    title: {
      type: String,
      default: "",
    },
    businessType:{
      type: String,
      default: "",
    },
    metaType:{
      type: String,
      default: "",
    },
    businessId:{
      type: String,
      default: "",
    },
  },

  data() {
    return {
      rowObject: [],
      form:{},
      showContent:true,
      epcproject:{},
      queryParams:{
        pageNum: 1,
        pageSize: 10,
        businessType:this.businessType
      },
      fieldList: [],
      dataTypeOptions:[],
      orgbusinessOptions:[],
      rules:{
        defaultValue:[
          { required: true, message: '请输入项目名称', trigger: 'blur' },
        ]

      },
      labelWidth:200,
    };
  },
  created() {
    let width = window.document.documentElement.getBoundingClientRect().width
    let scale = width/1920
    this.labelWidth = (this.labelWidth*scale).toFixed(2)
    this.getBaseData()
    // this.handleData();
  },
  methods: {
    getBaseData() {
      getAddInfo().then(response => {
        let mydata = response.data;
        let arr1 = [];
        let arr2 = [];
        let mydata1 = mydata.XItenEnumList;
        let mydata2 = mydata.businessConfigList;
        for(let i=0;i<mydata1.length;i++){
          let obj1={};
          obj1["dictLabel"]=mydata1[i].name;
          obj1["dictValue"]=mydata1[i].type;
          arr1.push(obj1);
        }
        for(let i=0;i<mydata2.length;i++){
          let obj2={};
          obj2["dictLabel"]=mydata2[i].businessName;
          obj2["dictValue"]=mydata2[i].id;
          obj2["businessType"]=mydata2[i].businessType;
          arr2.push(obj2);
        }
        this.dataTypeOptions = arr1;
        this.orgbusinessOptions = arr2;
        this.getList()
      });
    },
    getList() {
      this.loading = true;
      this.projectData = [];

      if(this.businessId && this.businessId.length>0){
        getItemDataList({
          businessId:this.businessId,
          businessType:this.businessType
         }).then(res=>{
          this.fieldList = res.data;
          this.rowObject = res.data;
          this.rowObject.forEach(row=>{
            this.$set(row,'defaultValue',row.xitemData?row.xitemData.itemData:row.defaultValue)
          })
          this.sortList()
          this.$set(this.form,'rowObject',this.rowObject)
          this.showContent = true
        })
      }else{
        getxItemlist(this.queryParams).then((res) => {
          this.fieldList = res.rows;
          this.rowObject = res.rows;
          this.sortList()
          this.$set(this.form,'rowObject',this.rowObject)
          this.showContent = true

        });
      }


    },
    getDefaultValue(row,value){
      if(row.dataType == '6'){
        let fieldValue = row.fieldValue
        if(fieldValue && fieldValue.length>0){
          return fieldValue.split(',')[parseInt(value)]
        }
      }
      if(row.dataType == '7'){
        let fieldValue = row.fieldValue
        let arr = fieldValue.split(',')
        let values = value.split(',')
        if(arr && arr.length>0 && values && values.length>0){
          return values.map(res=> arr[parseInt(res)]).join(',')
        }
      }
      return value
    },
    sortList(){
      let list = JSON.parse(JSON.stringify(this.rowObject))
      let list1 = list.filter(res=> res.dataType == '2')
      let list2 = list.filter(res=> res.dataType != '2')
      if(list1 && list1.length>0){
        list1.forEach(res=>{
          list2.push(res)
        })
      }
      this.rowObject = list2

      this.rowObject.forEach(res=>{
        this.$set(res,'defaultValue',this.getDefaultValue(res,res.defaultValue))
      })
    },
    checkValue(){
      let checkValue = false
      this.$refs.metaForm.validate(valid=> {
        if (valid) {
            checkValue = true
         }else{
            checkValue = false
        }
      })
      return checkValue
    },
    saveMetaData(businessId){
      let params = {};
      let arr = [];
      for(let i=0;i<this.rowObject.length;i++){
        let obj = {}
        obj["itemId"] = this.rowObject[i].xitemId
        obj["dataId"] = businessId
        obj["itemData"] = this.rowObject[i].defaultValue
        arr.push(obj)
      }
      params=arr;
      console.log("获取附加信息的参数："+JSON.stringify(params));
      savexItemData(params).then(response => {
      });
    },
    handleData() {
      this.showContent = false
      let list = [];
      this.rowObject = [];

      //处理字段列表数据 文本域单独占一行 其他三个占一行
      // 1 文本类型
      // 2 文本域类型
      // 3 数值类型
      // 4 布尔类型
      // 5 时间类型

      this.fieldList.forEach((item, index) => {
        if (item.dataType == 2) {
          if (list.length == 0) {
            list.push(item);
            this.rowObject.push({
              index:index,
              rowList: list,
            });
            list = [];
          } else {
            this.rowObject.push({
              index:index,
              rowList: list,
            });
            list = [];
            list.push(item);
            this.rowObject.push({
              index:index,
              rowList: list,
            });
            list = [];
          }
        } else if (list.length == 3) {
          this.rowObject.push({
            index:index,
            rowList: list,
          });
          if (index == this.fieldList.length - 1) {
            list = [];
            list.push(item);
            this.rowObject.push({
              index:index,
              rowList: list,
            });
          } else {
            list = [];
            list.push(item);
          }
        } else {
          list.push(item);
          if (index == this.fieldList.length - 1) {
            this.rowObject.push({
              index:index,
              rowList:list,
            });
            list = [];
          }
        }
      });
      this.$set(this,'rowObject',this.rowObject)
      this.$forceUpdate()
      this.form.rowObject = this.rowObject
      // this.epcproject.projectChanceBiddingList = this.fieldList
      console.log("list=>" + JSON.stringify(this.rowObject));
      this.showContent = true
    },
  },
};
</script>
<style lang="scss" scoped>
.tzf-main {
  margin-top: 20px;
  //margin-right: 50px;
}


.hart-top{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  >span{
    font-family: MicrosoftYaHei;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #505a69;
    margin-left: 10px;
  }
  .hart-img{
    width: 24px;
    height: 25px;
  }
}
.info-content{
  display: flex;
  margin: 30px 35px;
  width: 100%;
  flex-direction: column;
  //width: 100%;
  .info-item{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .item-list{
      flex: 1;
      display: flex;
      align-items: center;
      font-family: MicrosoftYaHei;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 42px;
      letter-spacing: 0px;
      color: rgba(80,90,105,0.8);
      >span:first-child{
        font-weight: bold;
      }
    }
  }
  .lines{
    width:100%;
    margin-top: 20px;
    .line{
      height: 1px;
      margin-right: 80px;
      background-color: rgba(80,90,105,0.2);
    }
  }
}



.info-main{
  background-color: white;
  margin: 20px;
  border-radius: 10px;

  .hart-top{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    >span{
      font-family: MicrosoftYaHei;
      font-size: 24px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #505a69;
    }
    >i{
      font-size: 24px;
      color: #1989fa;
      margin-right: 10px;
    }
  }

  .info-content{
    display: flex;
    padding: 0 30px 35px 35px;
    margin-top: 20px;
    flex-direction: column;
    margin: 30px 0;

    min-height: 140px;
    background-color: #f8fbff;
    border: solid 1px rgba(210,210,210,0.3);


    .info-item2{

      >div{
        margin-top: 30px;
      }

      .item-list{
        display: flex;
        align-items: center;
        font-family: MicrosoftYaHei;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: rgba(80,90,105,0.8);

      }
    }
    .lines{
      width:100%;
      margin-top: 20px;
      .line{
        height: 1px;
        margin-right: 80px;
        background-color: rgba(80,90,105,0.2);
      }
    }

  }
}


.left-center{
  background-color: #ffffff;
  box-shadow: 0px 1px 10px 0px #ececec;
  border-radius: 12px;
  margin-top: 20px;
  padding-bottom: 10px;
  padding-top: 1px;
  .page-top{
    display: flex;
    height: 70px;
    background-color: rgba(25,137,250,0.1);
    align-items: center;
  }
  .right-table{
    padding-right: 20px;
    margin-top: 86px;

    .table-sty{
      height: 303px;
      background-color: #ffffff;
      border-radius: 8px;
      border: solid 1px rgba(80,90,105,0.1);
    }
  }

  .left-bottom{
    margin-left: 20px;
    margin-top: 40px;
    .file-list-top{
      display: flex;
      align-items: center;
      >span{
        font-family: MicrosoftYaHei;
        font-size: 24px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #505a69;
        margin-left: 10px;
      }

      .file-title-img{
        width: 21px;
        height: 23px;
      }
    }
    .file-no-data{
      display: flex;
      width: 300px;
      height: 80px;
      background-color: #f3f2f4;
      margin-top: 35px;
      justify-content: center;
      div{
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
        color: rgba(80,90,105,0.5);
        .file-no-data-img{
          width: 29px;
          height: 27px;
          margin-right: 10px;
        }
      }
    }
  }


.item-text{

  width: 100%;

  font-family: MicrosoftYaHei;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 48px;
  letter-spacing: 0px;
  color: #505a69;
  margin: 30px 20px;
  .text-gs{
    letter-spacing: 0px;
    color: #1989fa;
    cursor: pointer;
  }
}

}

</style>
