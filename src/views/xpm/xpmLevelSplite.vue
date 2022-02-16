<template>
  <div id="xpmLevelListVue">
    <div class="app-box">
      <div class="app-container">

        <div class="page-header" style="height: 60px">
          <div class="header-left" style="height: 60px;padding-left: 20px;line-height: 60px;">
            <div style="left: 0px;width: auto;height: 60px;display: flex;align-items: center;line-height: 60px;">

            </div>
          </div>

          <div class="header-right" style="height: 60px;line-height: 60px;margin-right: 20px">
            <el-button type="primary" @click="submitxpmlevel"   style="height:32px;font-size:12px;">确定</el-button>
            <el-button @click="cancelxpmlevel"  style="height:32px;font-size:12px;">返回</el-button>

          </div>

        </div>
        <div style="width: 100%;height:calc(100% - 55px);margin-top:10px;overflow: scroll;">

          <el-table
            v-loading="loading"
            :data="xpmleveloptions"
            row-key="id"
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            @current-change="handleCurrentChange"
            @row-click="chooseone"
            @row-dblclick="handledbClick"
            stripe
            border
            :row-style="{height: '35px'}"
            style="width: 100%;"
          >

            <el-table-column prop="code" label="编号"  width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-radio
                  v-model="radio"
                  :label="scope.row.code"
                >
                  {{scope.row.code}}
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="text" label="名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="typename" label="类型" :formatter="statusFormat" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="remark"  label="备注" align="center" :show-overflow-tooltip="true">
            </el-table-column>
          </el-table>

        </div>


      </div>

    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  /*xpm层级*/
  //import leveloptions from '@/views/xpm/xpmlevel.json'
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import { mapActions  } from 'vuex'

  import {showDepart,showModules,getXpm} from "@/api/system/xpm";
  export default {
    data() {
      return {
        //获取xpm系统层级
        loading:false,
        xpmleveloptions:[],
        xpmlevelItem:{},
        xpmlevel:undefined,

        //切换层级
        xpmleveltitle:'',
        xpmlevelopen:false,
        radio:null,
      };
    },
    components: {

    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'device',
        'xpm'
      ]),

      setting: {
        get() {
          return this.$store.state.settings.showSettings
        },
        set(val) {
          this.$store.dispatch('settings/changeSetting', {
            key: 'showSettings',
            value: val
          })
        }
      }
    },
    created(){
      this.initxpmLevel();
    },
    watch:{
    },
    methods: {
      ...mapActions({
        'cacc': 'xpm/setLevelaction'
      }),
      initxpmLevel(){
        this.loading = true;
        //原层级数据数组
        let leveloptions = this.$store.state.xpm.leveloptions;
        let levelList = JSON.parse(JSON.stringify(leveloptions)) || [];

        //改为树结构数组
        let treelevelList = this.arrayTOTree(levelList) || [];
        this.xpmleveloptions = treelevelList;
        /*console.log("层级系统树结构数据");
        console.log(JSON.stringify( this.xpmleveloptions));*/

      /*  if(this.xpmleveloptions && this.xpmleveloptions.length>0){
          this.xpmlevel = this.xpmleveloptions[0].id;
          this.xpmlevelItem = this.xpmleveloptions[0];
          //this.xpmLevelValue.xpmlevelItem = this.xpmlevelItem;
          //this.$store.commit('setLevel',this.xpmlevelItem);
        }*/
        this.loading = false;

      },
      arrayTOTree(list){
    let map = list.reduce((res,v)=>{
      res[v.id] = v;
      return res;
    },{})
        let res = [];
    for(let item of list){
      if(!item.children){
        item.children = [];
      }
      if(item._parentId === ''){
        res.push(item);
        continue;
      }
      if(item._parentId in map){
        let parent = map[item._parentId];
        parent.children = parent.children || [];
        parent.children.push(item);
      }
    }
    return res;
   },
      handleCurrentChange(val) {
        this.checkxpmItem = val;
        this.radio = val.code;
      },
      chooseone(row){
        this.checkxpmItem = row;
        this.radio = row.code;
      },
      handledbClick(row, event, column) {
       /* this.checkxpmItem = row;
        this.radio = row.code;*/

       /*修改双击事件为*/
        this.xpmlevel = this.checkxpmItem.id;
        this.xpmlevelItem = this.checkxpmItem;
        this.$store.commit('setLevel',this.xpmlevelItem);
        localStorage.setItem('Level',JSON.stringify(this.xpmlevelItem));
        localStorage.setItem('isChangeLevel',true);
        this.back();

      },
      //点击显示切换层级
      switchLevel(){
        this.xpmlevelopen = true;
        this.xpmleveltitle = "系统选择";
      },
      submitxpmlevel(){
        this.xpmlevel = this.checkxpmItem.id;
        this.xpmlevelItem = this.checkxpmItem;
        /*this.xpmLevelValue.xpmlevelItem = this.xpmlevelItem;
        this.xpmLevelValue.setxpmlevelItem(this.xpmlevelItem);*/
        this.$store.commit('setLevel',this.xpmlevelItem);
        localStorage.setItem('Level',JSON.stringify(this.xpmlevelItem));
        localStorage.setItem('isChangeLevel',true);
        /*console.log("修改层级：");
        console.log(this.$store.state.xpm.level);*/

        let modulesparams = {};
        modulesparams["userSid"] = this.$store.state.xpm.xpmData.user_sid;
        modulesparams["humanSid"] = this.$store.state.xpm.xpmData.human_sid;
        let type = this.$store.state.xpm.level.type;
        modulesparams["type"] = type;
        modulesparams["xpmObjSid"] = this.$store.state.xpm.level.id;
        showModules(modulesparams).then(response => {
          //获取xpm部门
          let xpmmenuJson = response.data;
          this.$store.commit('setXpmmenuJson', xpmmenuJson);

          let newXpmMenu = [
            {
              "children":xpmmenuJson,
              "modName":"XPM系统菜单",
              "modSid":"other",
              "parentSid":"-1",
              "meta":{
                "icon":'monitor',
                "title":"XPM系统菜单",
              },
            }
          ];
          newXpmMenu = this.getTreeData(newXpmMenu,'xpm');
          //添加xpm菜单
          this.$store.dispatch('setnewXpmMenuaction',newXpmMenu);

        }).catch(response => {
          console.log("没有查询到相关xpm信息");
        });

        //this.xpmlevelopen = false;
        this.back();
      },
      getTreeData(data,type) {
        // 循环遍历json数据
        for (var i = 0; i < data.length; i++) {
          if(!data[i].children || data[i].children == null){
            data[i].children = [];
          }else{

          }
          //如果是xpm系统首页首页
          if(data[i].modSid=='homepage'){
            data[i].path = 'xpmhome';
            data[i].component = '';
          }else{
            data[i].path = data[i].modSid;
          }
          data[i].name = data[i].modName;
          if(!data[i].meta){
            data[i].meta = {
              icon:'ZZZZ',
              title:data[i].name,};
          }
          data[i].type = "xpm";
          if (data[i].component) {
            // Layout组件特殊处理
            if (data[i].component === 'Layout') {
              data[i].component = Layout
            } else {
              data[i].component = loadView(data[i].component)
            }
          }else{
            data[i].component = 'Layout';
          }

          if (data[i].children.length < 1) {
            // children若为空数组，则将children设为undefined
            data[i].children = [];
          } else {
            // children若不为空数组，则继续 递归调用 本方法
            this.getTreeData(data[i].children,data[i].modSid);
          }
        }
        return data;
      },

      cancelxpmlevel(){
        //this.xpmlevelopen = false;
        this.back();
      },
      back(){
        if (this.$route.query.noGoBack) {
          this.$router.push({ path: '/' })
        } else {
          this.$router.go(-1)
        }
        //关闭
        this.$store.dispatch('tagsView/delView', this.$route)
      },
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        this.$confirm('确定注销并退出系统吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('LogOut').then(() => {
            location.reload()
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../publicStyle/style.css";
  /deep/ .el-table--border th, .el-table--border td{
    border: 0px !important;
    border-right:0px !important;
  }
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,21,41,.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 4px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
  #xpmLevelListVue .app-box {

   /* position: absolute;
    width: 100%;
    height: 100%;*/
    /*background-color: gray;*/
    .newAdd {
      color: white;
      background-color: #1989FA;
    }
    .dels {
      background-color: #F56C6C;
      color: #fff;
    }
    .mores {
      background-color: #F1F2F3;
      color: #999999;
    }
    .page-header {
      margin-left: -20px;
      margin-right: -20px;
      margin-top: -20px;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #eee;
      background: #fff;

      padding: 0 0px;
    }
    .header-left, .header-right, .filter-header-right {
      display: inline-block;
      color: #555555;
    }
    .header-left span {
      padding-left: 20px;
    }
    .header-right {
      padding-right: 20px;
      float: right;
    }
    .filter-header-right{
      padding-right: 0px;
      float: right;
    }
    .container-box {
      padding: 10px;
    }
    .page-title {
      height: 46px;
      line-height: 46px;
      position: relative;
    }
    .page-title::before {
      content: "";
      position: absolute;
      width: 5px;
      height: 18px;
      background: #1989FA;
      top: 14px;
    }
    .page-title span {
      padding-left: 10px;
    }
    .el-select, .el-cascader, .el-date-editor {
      width: 100%;
    }
    .app-container {
      width: calc(100% - 40px);
      height: calc(100% - 40px);
    }
    .listTable{
      /*border: 1px solid #dfe6ec;*/
      border:none;
    }
    .listTable th, .el-table--border td{
      border-right:none;
    }
    .listTable tr td{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  /deep/ ::-webkit-scrollbar {
    width: 0 !important;
  }
  /deep/ ::-webkit-scrollbar {
    width: 0 !important;height: 0;
  }
</style>
