<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
               @toggleClick="toggleSideBar"/>

    <!--        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />-->

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <div class="tooltips">
<!--           <span>-->
<!--              <img src="../../assets/image/warn.png">-->
<!--             <a class="red-y">3</a>-->
<!--            </span>-->
<!--          <span>-->
<!--                <img src="../../assets/image/bell.png">-->
<!--                <a class="red-y">3</a>-->
<!--            </span>-->
<!--          <span>-->
<!--              <img src="../../assets/image/letter.png">-->
<!--                     <a class="red-y">4</a>-->
<!--            </span>-->

          <span>
            <publice-select-dept ref="selectDept" class="company_name" :setTitle="'切换组织层级'" :switchCompanyOptions="this.switchCompanyOptions" @onSelectCompanyCallback="selectCompanyCallback">
              <span slot="referenceSlot" class="company_name">{{this.$store.getters.deptName}}
                <el-image class="user-change" :src="require('@/assets/image/qiehuang.png')"></el-image>
              </span>
            </publice-select-dept>
          </span>

        </div>

        <!--<search id="header-search" class="right-menu-item" />-->

        <!--<el-tooltip content="源码地址" effect="dark" placement="bottom">
          <ruo-yi-git id="ruoyi-git" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip content="文档地址" effect="dark" placement="bottom">
          <ruo-yi-doc id="ruoyi-doc" class="right-menu-item hover-effect" />
        </el-tooltip>-->
        <!--删除xpm-->
        <!--切换层级-->
        <!-- <div style="float:left;width:auto;height:100%;cursor: pointer;" @click="switchLevel">
           <img src="../../views/xpm/orgtree.png" style="float:left;height: 30px;margin:5px;"/>
           <span style="float:left;">{{this.xpmlevelItem.text}}</span></div>-->



        <el-dialog :title="xpmleveltitle" :visible.sync="xpmlevelopen" width="750px" append-to-body class="levelClass">

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
            style="width: 100%;height:340px;overflow: auto;border: 0px;"
          >

            <el-table-column prop="code" label="编号" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-radio
                  v-model="radio"
                  :label="scope.row.code"
                >
                  {{ scope.row.code }}
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="text" label="名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="typename" label="类型" :formatter="statusFormat" width="100"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center" width="200" :show-overflow-tooltip="true">
            </el-table-column>
          </el-table>

          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitxpmlevel">确 定</el-button>
            <el-button @click="cancelxpmlevel">取 消</el-button>
          </div>
        </el-dialog>


        <!--<screenfull id="screenfull" class="right-menu-item hover-effect" />-->

        <!--        <el-tooltip content="布局大小" effect="dark" placement="bottom">-->
        <!--          <size-select id="size-select" class="right-menu-item hover-effect" />-->
        <!--        </el-tooltip>-->

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar  shape="circle" :src="avatar" class="user-avatar"/>
          <span style="color: #FFFFFF">{{this.$store.getters.nickName}}</span>
          <i class="el-icon-arrow-down" style="color: #FFFFFF"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'

/*xpm层级*/
//import leveloptions from '@/views/xpm/xpmlevel.json'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { mapActions } from 'vuex'
import { showDepart, showModules, getXpm } from '@/api/system/xpm'
import { switchCompanyTreeSelect, switchCompany } from '@/api/system/dept'

export default {
  data() {
    return {
      //获取xpm系统层级
      loading: false,
      xpmleveloptions: [],
      xpmlevelItem: {},
      xpmlevel: undefined,

      //切换层级
      xpmleveltitle: '',
      xpmlevelopen: false,
      radio: null,

      //当前用户在xpm中的信息
      userxpmInfo: {},
      switchCompanyOptions: []
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc
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
    },
    //获取当前xpm层级对象
    listenshowpage() {
      return this.$store.state.xpm.level
    }
  },
  created() {
    /*清空xpm*/
    //this.initxpmLevel();

    this.getSwitchCompanyTreeSelect();
  },
  watch: {
    /*清空xpm*/
    /*'listenshowpage':function (old,newd) {
      this.xpmlevelItem = old;
    },
    $route: {
      handler: function(newVal, oldVal){
        //如果不是xpm系统
        if(newVal.path != '/xpm'){
          //console.log("跳转到聚项云");
          this.$nextTick().then(() => {
            /!*if($('#browsocx').length == 0){ //如果ocx插件隐藏
              //清空含有xpm的ocx插件，
            }*!/
          })
          if(oldVal && oldVal.path == '/xpm'){
            //console.log("xpm跳转聚项云");

          }

        }else if((newVal.path == '/xpm') && (oldVal.path == '/xpm')){
          // console.log("xpm同菜单跳转");
        }else  if((newVal.path == '/xpm') && (oldVal.path != '/xpm')){
          //console.log("聚项云跳转xpm");
          let xpmPath = newVal.fullPath;
          /!* this.$router.push({
             path:xpmPath,
           })*!/
          //xpm首页
          /!*let isChangeLevel = localStorage.getItem('isChangeLevel');
          if(isChangeLevel) {
            localStorage.setItem('isChangeLevel', false);
            let xpmIndex = '/xpm?modSid=homepage&modName=首页';
            this.$router.push({
              path: xpmIndex,
            })
          }*!/
          location.reload()

        }else{

        }
      },
      deep: true,
      /!* immediate: true*!/
    },*/

  },
  methods: {
    ...mapActions({
      'cacc': 'xpm/setLevelaction'
    }),
    // 查询当前用户可以切换公司树形集合
    getSwitchCompanyTreeSelect() {
      switchCompanyTreeSelect().then(response => {
        this.switchCompanyOptions = response.data;
      });
    },
    selectCompanyCallback(data) {
      let req = { deptId: data.id, deptName: data.label};
      switchCompany(req).then(res => {
          if (res.code == 200) {
            this.$store.commit('SET_DEPTID', data.id);
            this.$store.commit('SET_DEPTNAME', data.label);
            location.reload();
          }
      });
    },
    initxpmLevel() {
      this.loading = true

      //获取xpm部门
      let leveloptions = this.$store.state.xpm.leveloptions
      //this.$store.commit('setLeveloptions',leveloptions);
      //this.leveloptions = response.data;
      //原层级数据数组
      let levelList = JSON.parse(JSON.stringify(leveloptions)) || []
      //改为树结构数组
      //let treelevelList = this.arrayTOTree(levelList)|| [];
      let treelevelList = levelList || []
      this.xpmleveloptions = treelevelList

      //如果存在level
      let levelstorage = localStorage.getItem('Level')
      if (levelstorage) {
        //使用store更新全局变量参数xpm层级
        this.xpmlevelItem = JSON.parse(levelstorage)
        this.$store.commit('setLevel', this.xpmlevelItem)
      } else {
        if (this.xpmleveloptions && this.xpmleveloptions.length > 0) {
          this.xpmlevel = this.xpmleveloptions[0].id
          this.xpmlevelItem = this.xpmleveloptions[0]
          this.$store.commit('setLevel', this.xpmlevelItem)
        }
      }

      this.loading = false
      //使用store更新全局变量参数xpm层级
      //this.xpmlevelItem = this.$store.state.xpm.level;

      let modulesparams = {}
      modulesparams['userSid'] = this.$store.state.xpm.xpmData.user_sid
      modulesparams['humanSid'] = this.$store.state.xpm.xpmData.human_sid
      let type = this.$store.state.xpm.level.type
      modulesparams['type'] = type
      modulesparams['xpmObjSid'] = this.$store.state.xpm.level.id
      showModules(modulesparams).then(response => {
        //获取xpm部门
        let xpmmenuJson = response.data
        this.$store.commit('setXpmmenuJson', xpmmenuJson)

        let newXpmMenu = [
          {
            'children': xpmmenuJson,
            'modName': 'XPM系统菜单',
            'modSid': 'other',
            'parentSid': '-1',
            'meta': {
              'icon': 'monitor',
              'title': 'XPM系统菜单'
            }
          }
        ]
        newXpmMenu = this.getTreeData(newXpmMenu, 'xpm')
        //添加xpm菜单
        this.$store.dispatch('setnewXpmMenuaction', newXpmMenu)

      }).catch(response => {
        console.log('没有查询到相关xpm信息')
      })

    },
    /*initxpmLevel(){
      this.loading = true;

      //使用接口获取动态码
      getXpm().then(response => {
        let msg = response.msg;
        let userxpmInfo = JSON.parse(msg);

        this.$store.commit('setXpmData',userxpmInfo);

        if(userxpmInfo.ocxConn){

          this.userxpmInfo = userxpmInfo;
          this.$store.commit('setUserxpmInfo', this.userxpmInfo);

          //获取ocx userId
          let userId = this.userxpmInfo.user_sid;
          let params = {};
          params["userId"] = userId;
          showDepart(params).then(response => {
            //获取xpm部门
            let leveloptions = response.data;
            this.$store.commit('setLeveloptions',leveloptions);

            //this.leveloptions = response.data;
            //console.log(this.leveloptions);
            //原层级数据数组
            let levelList = JSON.parse(JSON.stringify(leveloptions)) || [];
            //改为树结构数组
            let treelevelList = this.arrayTOTree(levelList)|| [];
            this.xpmleveloptions = treelevelList;

            if(this.xpmleveloptions && this.xpmleveloptions.length>0){
              this.xpmlevel = this.xpmleveloptions[0].id;
              this.xpmlevelItem = this.xpmleveloptions[0];
              //this.xpmLevelValue.xpmlevelItem = this.xpmlevelItem;
              this.$store.commit('setLevel',this.xpmlevelItem);
              /!* console.log("初始化层级：");
               console.log(this.$store.state.xpm.level);*!/
            }
            this.loading = false;
            //使用store更新全局变量参数xpm层级
            this.xpmlevelItem = this.$store.state.xpm.level;
          }).catch(response => {
            this.msgWarning("没有查询到相关xpm部门信息");
          });

          let modulesparams = {};
          modulesparams["userSid"] = this.userxpmInfo.user_sid;
          modulesparams["humanSid"] = this.userxpmInfo.human_sid;
          modulesparams["type"] = '1';
          showModules(modulesparams).then(response => {
            //获取xpm部门
            let xpmmenuJson = response.data;
            this.$store.commit('setXpmmenuJson', xpmmenuJson);

            //let xpmmenuJson = this.$store.state.xpm.xpmmenuJson;
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
            this.msgWarning("没有查询到相关xpm信息");
          });


        }else{
          this.msgWarning("没有查询到相关xpm登录信息");
        }

      });


    },*/


    getTreeData(data, type) {
      // 循环遍历json数据
      for (var i = 0; i < data.length; i++) {
        if (!data[i].children || data[i].children == null) {
          data[i].children = []
        } else {

        }
        //如果是xpm系统首页首页
        if (data[i].modSid == 'homepage') {
          data[i].path = 'xpmhome'
          data[i].component = ''
        } else {
          data[i].path = data[i].modSid
        }
        data[i].name = data[i].modName
        if (!data[i].meta) {
          data[i].meta = {
            icon: 'ZZZZ',
            title: data[i].name
          }
        }
        data[i].type = 'xpm'
        if (data[i].component) {
          // Layout组件特殊处理
          if (data[i].component === 'Layout') {
            data[i].component = Layout
          } else {
            data[i].component = loadView(data[i].component)
          }
        } else {
          data[i].component = 'Layout'
        }

        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = []
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children, data[i].modSid)
        }
      }
      return data
    },
    statusFormat() {
    },
    arrayTOTree(list) {
      const map = list.reduce((res, v) => {
        res[v.id] = v
        return res
      }, {})
      const res = []
      for (let item of list) {
        if (item._parentId === '') {
          res.push(item)
          continue
        }
        if (item._parentId in map) {
          const parent = map[item._parentId]
          parent.children = parent.children || []
          parent.children.push(item)
        }
      }
      return res
    },
    //点击显示切换层级
    switchLevel() {
      /*this.xpmlevelopen = true;*/
      this.$router.push({
        path: '/system/xpmLevelSplite'
      })
    },
    handleCurrentChange(val) {
      this.checkxpmItem = val
      this.radio = val.code
    },
    chooseone(row) {
      this.checkxpmItem = row
      this.radio = row.code
    },
    handledbClick(row, event, column) {
      this.checkxpmItem = row
      this.radio = row.code

    },
    submitxpmlevel() {
      this.xpmlevel = this.checkxpmItem.id
      this.xpmlevelItem = this.checkxpmItem
      // this.xpmLevelValue.xpmlevelItem = this.xpmlevelItem;
      // this.xpmLevelValue.setxpmlevelItem(this.xpmlevelItem);
      this.$store.commit('setLevel', this.xpmlevelItem)
      /*console.log("修改层级：");
      console.log(this.$store.state.xpm.level);*/

      this.xpmlevelopen = false
    },
    cancelxpmlevel() {
      this.xpmlevelopen = false
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
/deep/ .el-table--border th, .el-table--border td {
  border: 0px !important;
  border-right: 0px !important;
}

.navbar {
  height: 100px;
  background: #1D2C41;
  line-height: 100px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 1px #4187F2;
  font-size: 20px;
  color: #FFFFFF;


  .hamburger-container {
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    color: #FFFFFF;
    -webkit-tap-highlight-color: transparent;

    .hamburger .is-active {
      background: #FFFFFF;
      width: 22px;
      height: 22px;
    }

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
    line-height: 99px;

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

        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 54px;
          height: 54px;
          //background: #525A68;
          vertical-align: middle;
          //border-radius: 8px;
          // margin-top: 35px;
          margin-left: 10px;
          margin-right: 20px;
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

.iconss {
  transform: rotate(90deg);
  margin: 0 25px 0 14px;
}

.tooltips {
  float: left;
  margin-right: 56px;
  span{
    vertical-align: top;
    cursor: pointer;
  }
  span:first-child {
    position: relative;
    margin-right: 47px;
     width: 33px;
     height: 33px;
    img {
      width: 33px;
    }
  }

  span:nth-of-type(2) {
    position: relative;
    img {
      width: auto;
      height: 28px;
    }
  }

  span:nth-of-type(3) {
    position: relative;
    margin-left: 47px;
    img {
      width: 28px;
    }
  }
  span:nth-of-type(4){
    margin-left: 60px;
    position: relative;
    cursor: pointer;
  }

  .company_name{
    margin-right: 0!important;
  }
  .red-y {
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: #D5562E;
    border-radius:50%;
    position: absolute;
    top: -15px;
    right: 0px;
    color: #FFFFFF;
    font-size: 16px;
    transform: scale(.9);
  }
}
.user-change{
  width: 30px;
  height: 30px;
  top: 5px;
}
</style>
