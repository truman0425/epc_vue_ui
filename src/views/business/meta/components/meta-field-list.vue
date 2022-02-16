<template>
  <!--自定义扩展字段-->
  <div class="tzf-main" >
    <div v-if="showContent">
      <el-form ref="metaForm"
               :model="form"
               :rules="rules"
               :label-width="labelWidth+'px'"
               class="form-cls">
        <div v-for="(obj, index) in rowObject" :key="index">
            <el-col :span="obj.dataType == '2' ? 24 : 8">
              <el-form-item
                :label="obj.name"
                :prop="'rowObject.'+index+'.defaultValue'"
                :rules="[
                  {
                    required: obj.required == '1' && !isDetail ? true:false,
                    message: `请${obj.dataType == '5'?'选择':'填写'}${obj.name}` ,
                    trigger: 'blur'
                  }
                ]"
              >

               <!--单选-->
                <el-select
                  v-if="obj.dataType == '6'"
                  style="width: 100%"
                  v-model="obj.defaultValue"
                  :placeholder="isDetail?'':'请选择'"
                  :disabled="isDetail"
                >
                  <el-option
                    v-for="optionsItem in obj.options"
                    :key="optionsItem.value"
                    :label="optionsItem.label"
                    :value="optionsItem.value"
                  >
                  </el-option>
                </el-select>

                <!--多选-->
                <el-select
                  multiple
                  style="width: 100%"
                  v-else-if="obj.dataType == '7'"
                  v-model="obj.defaultValue"
                  :placeholder="isDetail?'':'请选择'"
                  :disabled="isDetail"
                >
                  <el-option
                    v-for="optionsItem in obj.options"
                    :key="optionsItem.value"
                    :label="optionsItem.label"
                    :value="optionsItem.value"
                  >
                  </el-option>
                </el-select>

                <el-date-picker
                  v-else-if="obj.dataType=='8'"
                  v-model="obj.defaultValue"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :disabled="isDetail"
                  style="width: 100%"
                  class="suffix-inner"
                  suffix-icon="el-icon-date"
                  :placeholder="isDetail?'':'选择日期'">
                </el-date-picker>

                <el-date-picker
                  v-else-if="obj.dataType=='5'"
                  v-model="obj.defaultValue"
                  suffix-icon="el-icon-date"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%"
                  placeholder="选择日期时间">
                </el-date-picker>

                <el-switch
                  v-else-if="obj.dataType=='4'"
                  v-model="obj.defaultValue"
                  active-color="#13ce66"
                  :disabled="isDetail"
                  inactive-color="#ff4949"
                  active-value="1"
                  inactive-value="0">
                </el-switch>

                <el-input
                  v-else
                  :disabled="isDetail"
                  v-model="obj.defaultValue"
                  :placeholder="isDetail?'':'请输入' + obj.name"
                  :rows="obj.dataType=='2'?4:1"
                  :type="obj.dataType=='2'?'textarea':obj.dataType=='1'?'text':obj.dataType=='3'?'number':'text'"
                >
                  <i v-show="obj.dataType=='3'" slot="suffix" style="margin-right: 10px;">万</i>
                </el-input>
              </el-form-item>
            </el-col>
        </div>
      </el-form>

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
    businessId:{
      type: String,
      default: "",
    },
    isDetail:{
      type: Boolean,
      default: false,
    }
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
        enable:'1',
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
      this.rowObject.forEach(r=>{
        if(r.dataType == '6' && r.fieldValue && r.fieldValue.length>0){
          let arr = r.fieldValue.split(',')
          let list = arr.map((item,index)=>{
            return{
              value:index+'',
              label:item
            }
          })
          this.$set(r,'options',list)
        }
        if(r.dataType == '7' && r.fieldValue && r.fieldValue.length>0){

          let arr = r.fieldValue.split(',')
          let list = arr.map((item,index)=>{
            return{
              value:index+'',
              label:item
            }
          })
          this.$set(r,'options',list)
          if(r.defaultValue && r.defaultValue.length>0){
            this.$set(r,'defaultValue',r.defaultValue.split(','))
          }
        }
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
        if(this.rowObject[i].dataType == '7'){
          obj["itemData"] = this.rowObject[i].defaultValue.join(',')
        }
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
  margin-right: 50px;
}


</style>
