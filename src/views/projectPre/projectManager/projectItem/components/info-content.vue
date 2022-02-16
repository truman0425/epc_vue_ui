<template>
  <div class="info-main">

    <div class="hart-top"  :style="{'margin-top':isMarginTop?'30px':''}" >
      <i class="el-icon-document"></i>
      <span>{{title}}</span>
    </div>

    <div class="info-content">
<!--      <div class="info-item" v-for="item in projectList">-->
<!--        <div class="item-list" v-for="obj in item.list">-->
<!--          <span>{{ obj.fldName }}{{ obj.fldName.indexOf('：') == -1 ? '：':'' }}</span>-->
<!--          <span>{{ obj.fldValue || '&#45;&#45;' }}</span>-->
<!--        </div>-->
<!--      </div>-->

      <div class="info-item" v-for="(item, index) in projectList" :key="index">
        <template v-for="obj in item.list">
          <el-col class="item-list" :span="obj.fldType == '2' ? 24 : 8">
            <span>{{ obj.fldName }}{{ obj.fldName.indexOf('：') == -1 ? '：':'' }}</span>
            <span>{{ obj.fldValue || '--' }}</span>
          </el-col>
        </template>
      </div>

    </div>


  </div>
</template>
<script>

import {chanceParticipantsList} from '@/api/projectPre/chanceLib/chanceLib'

export default {
  name: "projectInfo",
  components: {},
  props:{
    listData:{
      type:Array,
      default:()=>[]
    },
    title:{
      type:String,
      default:''
    },
    isMarginTop:{
      type:Boolean,
      default:false
    },
  },
  data(){
    return {
      epcproject:{},
      // listData:[],
      projectList:[],
      list:[{
        data:[
          {
            label:'项目机会名称',
            value:''
          }
        ]
      }]
    }
  },
  created() {
     this.handlerData()
  },
  mounted(){

  },
  methods:{
    handlerData(){

      this.splitData()

    },

    getData(){
      let url = window.location.href;
      if(url.indexOf('chanceSharDetail') == -1){
        chanceParticipantsList(this.projId).then(res=>{
          if(res.code == 200){
            this.listData = res.data
            this.splitData()
          }
        })
      }

    },
    splitData(){
      let tempList = []
      // this.listData.forEach((res,index)=>{
      //   if(tempList.length == 3){
      //     this.projectList.push({
      //       list:tempList
      //     })
      //     tempList = []
      //     tempList.push(res)
      //     if(index == this.listData.length -1){
      //       this.projectList.push({
      //         list:tempList
      //       })
      //     }
      //   }else{
      //     tempList.push(res)
      //     if(index == this.listData.length -1){
      //       this.projectList.push({
      //         list:tempList
      //       })
      //     }
      //   }
      // })


      let list = []
      this.listData.forEach((item, index) => {
        if (item.fldType == 2) {
          if (list.length == 0) {
            list.push(item);
            this.projectList.push({
              index:index,
              list: list,
            });
            list = [];
          } else {
            this.projectList.push({
              index:index,
              list: list,
            });
            list = [];
            list.push(item);
            this.projectList.push({
              index:index,
              list: list,
            });
            list = [];
          }
        } else if (list.length == 3) {
          this.projectList.push({
            index:index,
            list: list,
          });
          if (index == this.listData.length - 1) {
            list = [];
            list.push(item);
            this.projectList.push({
              index:index,
              list: list,
            });
          } else {
            list = [];
            list.push(item);
          }
        } else {
          list.push(item);
          if (index == this.listData.length - 1) {
            this.projectList.push({
              index:index,
              list:list,
            });
            list = [];
          }
        }
      });


    }
  }

}
</script>
<style lang="scss" scoped>

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
}

.info-content{
  display: flex;
  padding: 0 30px 35px 35px;
  margin-top: 20px;
  flex-direction: column;

  min-height: 140px;
  background-color: #f8fbff;
  border: solid 1px rgba(210,210,210,0.3);

  //width: 100%;
  .info-item{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    >div{
      margin-top: 30px;
    }
    //>div:first-child{
    //  margin-top: 0;
    //}
    .item-list{
      display: flex;
      align-items: center;
      font-family: MicrosoftYaHei;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(80,90,105,0.8);
      //
      //
      //>span:first-child{
      //  font-weight: bold;
      //}
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

 .text-wrap{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 100%;                  /* IE6 需要定义宽度 */
  -o-text-overflow: ellipsis;    /* Opera */
  text-overflow:    ellipsis;    /* IE, Safari (WebKit) */
}

.white-space{
  white-space: nowrap;/*一行显示*/
  overflow: hidden;/*超出部分隐藏*/
  text-overflow: ellipsis;
}

</style>

