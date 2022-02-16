<template>
  <div id="templateDiv" >
    <div class="app-box">

      <!--展示的页面-->
      <div id="showpage" style="display: block;">
        <iframe id="showPageIframe" src="http://pccs.ceedi.cn/portal-sjy/anasysing/gotoAnasysing.action"
                scrolling="auto" frameborder="0" style="width:100%;height:100%;" marginheight="0" marginwidth="0">
        </iframe>
      </div>

      <div id="menu" style="width: 1323px; height: 555px; display: block;" v-loading="xpmloading">

      </div>

    </div>

    <!--隐藏参数-->
    <input id="OCXVersion" type="hidden" value="1,79,1,214">
    <input id="xpmObjSid" type="hidden" value="F36D9D50-E8FD-4FDE-B7A1-D87009DCC199">
    <input id="ocxConn" type="hidden" value="668DA949FE03101DD448C2798856DF1E2CD77AB147CE50EE05383CD361FD0460978FEB74958D86EC65E20763E848DD43C452D6768EB25595AC4EC86B918CB5BA4AC540FE363DDB1C2B0A0F0918D241FD5F3DF47C9E85B3B2A840C44DC61435FB191E38F163E57DB0B9A2">
    <input id="ocxConn_sub" type="hidden" value="668DA949FE03101DD448C2798856DF1E2CD77AB147CE50EE05383CD361FD0460978FEB74958D86EC65E20763E848DD43C452D6768EB25595AC4EC86B918CB5BA4AC540FE363DDB1C2B0A0F0918D241FD5F3DF47C9E85B3B2A840C44DC61435FB191E38F163E57DB0B9A2">

    <input id="type" type="hidden" value="0">
    <input id="deptSize" type="hidden" value="1">
    <input id="userClass" type="hidden" value="">
    <input id="todoSid" type="hidden" value="">
    <input id="todoStype" type="hidden" value="">
    <input id="todoSubType" type="hidden" value="1">
    <input id="functionId" type="hidden" value="">
  </div>
</template>
<!--<script src="../../../public/static/jquery.min.js" type="text/javascript"></script>-->
<script>
  import { mapGetters } from 'vuex'
  /*import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";*/
  import {getXpm} from "@/api/system/xpm";
/*  import $ from "../../../public/static/jquery.min.js";*/
  export default {
    components: {
      /*ElButton*/
    },
    computed:{
      ...mapGetters([
        'test'
      ]),
      listenshowpage() {
        return this.$store.state.xpm.level;
      }
    },
    name: "xpmpage",
    data() {
      return {
        modName:undefined,
        modSid:undefined,
        appPath:'http://pccs.ceedi.cn/portal-sjy',
        //appPath:'http://113.142.143.184:7006/portal-sjy',
        jmocx:undefined,
        //xpm系统页面容器元素
        container_obj:'',
        //获取当前层级对象
        //curxpmlevelItem:this.xpmLevelValue.xpmlevelItem,
        xpmObj:undefined,
        //当前用户在xpm中的信息
        userxpmInfo:{},
        xpmloading:false,
        destroy:false,
      };
    },
    watch:{
      $route: {
        handler: function(newVal, oldVal){
          this.modSid = this.$route.query.modSid;
          this.modName = this.$route.query.modName;
          //第一次访问xpm菜单跳转
          if(newVal && !oldVal){
            this.$nextTick().then(() => {
              this.getCurXpmInfo();
            })

          }else{//菜单内跳转
            this.$nextTick().then(() => {
              this.xpmFunconClick();
            })
          }

        },
        deep: true,
        immediate: true

      },
      modSid(val){
        //this.xpmFunconClick();
      },
      'listenshowpage':function (old,newd) {
        this.xpmObj = old;
      },

    },
    mounted(){
      /**
       * iframe-宽高自适应显示
       */
      function changeMobsfIframe(){
        const mobsf = document.getElementById('showPageIframe');
        const deviceWidth = document.body.clientWidth;
        //const deviceHeight = document.documentElement.offsetHeight;
        const deviceHeight =  document.body.offsetHeight;
        mobsf.style.width = 100 + "%";
        mobsf.style.height = Number(deviceHeight)+130 + 'px'; //数字是页面布局高度差
      }


      changeMobsfIframe();
      /*document.getElementById("mobsf").onload = function () {
        changeMobsfIframe();
      }*/

      window.onresize = function(){
        changeMobsfIframe();
      }
    },
    created() {
      //xpm首页
      let isChangeLevel = localStorage.getItem('isChangeLevel');
      if(isChangeLevel) {
        localStorage.setItem('isChangeLevel', false);
        let xpmIndex = '/xpm?modSid=homepage&modName=首页';
        this.$router.push({
          path: xpmIndex,
        })
      }

      //判断是否有ie浏览器
      this.isIEFunc();
      // this.lookMain();
      //获取用户有的对应的xpm信息
      this.userxpmInfo = this.$store.state.xpm.userxpmInfo;
      //this.xpmFunconClick();
    },
    beforeDestroy(){
    },
    destroyed(){
      //清空含有xpm的ocx插件，
      /*let jmocx = document.getElementById("browsocx");
      jmocx = null;*/
    },
    methods: {
      isIEFunc(){
        //判断浏览器
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;

        if (!!window.ActiveXObject || "ActiveXObject" in window) {//判断是否IE浏览器,只有ie浏览器支持ActiveX插件
          //this.msgSuccess("IE或360浏览器");
          return "IE";
        }else{
          this.msgWarning("xpm系统请使用IE或360浏览器");
          if (isOpera) {
            //判断是否Opera浏览器
            return "Opera"
          }
          if (userAgent.indexOf("Firefox") > -1) {//判断是否Firefox浏览器
            return "FF";
          }
          if (userAgent.indexOf("Chrome") > -1){//判断是否Chrome浏览器
            return "Chrome";
          }
          if (userAgent.indexOf("Safari") > -1) {//判断是否Safari浏览器
            return "Safari";
          }
        }


      },
      lookMain(){
        var height = window.screen.height;
        var width = window.screen.width;
        //$("#showpageIfa").attr("src","http://123.59.133.202:8086/projects.html");
        $("#showpageIfa").attr("src","");
        $('#main').height($(window).height()-85);//
        //$('#side-menu').height($(window).height()-119);//87
        $('#menu').width($(window).width()-190);
        $('#menu').height($(window).height()-65);//65
        /*$('#overhover').height($(window).height()-85);*///65
        $('#showpage').width($(window).width()-198);
        $('#showpageIfa').width($(window).width()-198);
        var height = $(window).height()-85;
        $('#showpage').height(height);//65
        $('#leftT').height($(window).height()-70);
//    $('#bottom').marginTop($(window).height()-90);
        $('#bottom').css({"margin-top":($(window).height()-25),"width":($(window).width()-217)});

        var iframeHeight = 300;
        if($("#side-menu").height() && ($("#side-menu").height() >= height)){
          $('#showpage').height($("#side-menu").height());
          iframeHeight = $("#side-menu").height();
        }else{
          iframeHeight = height;
        }
        //添加iframe元素
        var html = '<iframe id="showPageIframe" src="'+ this.appPath + "/anasysing/gotoAnasysing.action"+'"  width="100%"  height="'+ iframeHeight +'" frameborder="0" ></iframe>';
        $("#showpage").html(html);

        //打开指定功能菜单
        var functionId = $("#functionId").val();
        if(functionId){
          //console.log("功能菜单id" + functionId);
          this.openMorePageOCX();
        }
        //打开指定待办
        var todoSid = $("#todoSid").val();
        if(todoSid != ""){
          //console.log("单点待办id" + todoSid);
          if($("#ocxVersion").val() == ""){
            jmocx = document.getElementById("browsocx");
            if(jmocx!=null && jmocx.OcxVersion != undefined){
              var v_jmocxcox = (jmocx.OcxVersion).split(".");
              var v_jmocxcoxR=convertVersionData(v_jmocxcox);
              $("#ocxVersion").val(v_jmocxcoxR);
            }
          }
          $.ajax({
            type : "POST",
            url : this.appPath + "/anasysing/getTodoInfoById.action",
//			url : this.appPath + "/anasysing/getTodoInfoById.action?todoSid=" + todoSid + "&subType=" + $("#portalUrlType").val(),
            data : {
              "todoSid" : todoSid,
              "todoStype" : $("#todoStype").val(),
              "subType" : $("#todoSubType").val(),
            },
            error : function(request) {
              toastr.error("加载任务失败...");
            },
            success : function(resData) {
              //console.log(resData);
              var reData = JSON.parse(resData);
              if(reData.data == "success"){
//					console.log(reData.todo);
                var todo = reData.todo;

                var keyValue=todo.bill_sid;
                var itemId =todo.mod_sid;
                var keyName=todo.p_tbfdkey;
                var rec_sid =todo.rec_sid;
                var rec_code =todo.rec_code;
                var mod_name =todo.mod_name;
                var sysState =todo.state;

                showInfo(keyValue,keyName,itemId,rec_sid,rec_code,mod_name,sysState);
//					showInfo(keyValue,keyName,itemId,rec_sid,rec_code,mod_name,sysState);
              }else{
                toastr.error("获取待办数据出错");
              }
            }
          });

        }
      },
      //获取接口返回的动态码数据
      getCurXpmInfo(){
        getXpm().then(response => {

          if(response.msg){
            let msg = response.msg;
            //console.log("动态链接码："+JSON.stringify(response));
            this.userxpmInfo = JSON.parse(msg);

            this.xpmFunconClick();
            //this.openMorePageOCX();
          }else{
            this.msgWarning("没有查询到相关xpm登录信息");
          }

        });
      },
      //执行ocx插件加载xpm系统
      xpmFunconClick() {

        //如果是首页
        if(this.modSid == 'homepage'){
          $("#menu").css("display","none");
          //隐藏显示模块(不需要)
          $("#showpage").css("display","block");
        }
        else{
          $("#menu").css("display","block");
          //隐藏显示模块(不需要)
          $("#showpage").css("display","none");

          //获取层级对象
          this.xpmObj = this.$store.state.xpm.level;
          //ocx页面是否需要更新插件
          var ocxPage = '';
          //写死当前ocx插件最新版本
          //var OCXVersion = $("#OCXVersion").val();
          var OCXVersion = '1,79,1,214';

          //获取当前菜单的modSid
          var itemId = this.modSid;
          //检测是否有ocx插件
          this.checkOcxInstallStatus();

          /*当前登录层级信息*/
          //层级id
          var xpmObjSid = this.xpmObj.id;
          //层级中类型：公司部门
          var type = this.xpmObj.type;
          //链接值
          var ocxConn = this.userxpmInfo.ocxConn;
          /*ocx插件引入的xpm页面*/
          var height = window.screen.height;
          var width = window.screen.width;
          //判断是否已有ocx插件object
          if ($('#browsocx').length == 0){

            var str_obj = "<object id=\"browsocx\" name=\"xpmocx\" style=\"width:"+($(window).width()-205)+"px;height:"+($(window).height()-90)+"px;z-index:-1\"  classid=\"CLSID:E80A2A71-0A34-4301-A65E-9593C8DC6265\"><param name=\"wmode\" value=\"transparent\"></object>";
            var container_obj = '<div id="container" style="border: 0px solid currentColor; display: none;border-image: none; width: '+($(window).width()-205)
              +'px; height: '+($(window).height()-90)+'px; position: relative; z-index: -100;"></div>';
            //拼接页面元素
            $("#menu").html(container_obj);
            $('#container').html(str_obj).show();
            var jmocx = document.getElementById("browsocx");

            //测试用，检测ocx插件环境是否正常
            //jmocx.initconnection('127.0.0.1','7006','HTTP',"0",'cn.language','F36D9D50-E8FD-4FDE-B7A1-D87009DCC199','group','admin','');
            // start 数据格式处理，处理版本中前面o的问题，比如 1.69.70.207 和 版本    1.69.70.0207一致问题
//	        	var v_jmocxcox = (jmocx.OcxVersion).split(".");
//	        	var v_jmocxcoxR=convertVersionData(v_jmocxcox);
//	        	var v_cox =  OCXVersion.split(",");
//	        	var v_coxR=convertVersionData(v_cox);
//	        	if(v_jmocxcoxR!=v_coxR){
            //判断ocx插件
            if(!this.checkOcxVersion(jmocx.OcxVersion, OCXVersion)){
              //console.log("当前ocx部署最新的参数");
              ocxPage = 'update';
              this.msgWarning('请下载ocx:'+OCXVersion+'新版本！');
              window.open(this.appPath+"/ocx/OCX.rar");
              return;
            }
            //ocx插件初始化
            /*console.log("ocx插件初始化参数9");
            console.log("接口地址："+this.appPath);
            console.log( "层级类型："+type, "层级id："+xpmObjSid, "动态链接码："+ocxConn, "菜单id："+itemId);*/
            //jmocx.initconnection('127.0.0.1','7006','HTTP',"0",'cn.language','F36D9D50-E8FD-4FDE-B7A1-D87009DCC199','group','admin','');
            if(jmocx == null){
              //console.log("为空");
            }
            jmocx.initOCX('cn.language', type, xpmObjSid, ocxConn, '', 'Whiteprint');
          }
          else{
            // console.log("browsocx有值");
          }
          let newjmocx = document.getElementById("browsocx");
          if('update'==ocxPage){
            //this.msgWarning('请下载ocx:'+v_coxR+'新版本！');
            this.msgWarning('请下载ocx最新版本！');
            window.open(this.appPath+"/ocx/OCX.rar");
            return;
          }

          if(this.modName.indexOf("已审批")>=0){//打开已审批列表包含 撤回 操作
            newjmocx.OpenModuleRec_CheckFlow('checked', '', '1', 'TworkflowMsg_frm', 'checked', 'checked', this.modName);
          }else if(this.modName.indexOf("我的在办")>=0){//打开我的在办列表包含 撤回 操作
            newjmocx.OpenModuleRec_CheckFlow('mychecking', '', '1', 'TworkflowMsg_frm', 'mychecking', 'mychecking', this.modName);
          }else{
            //console.log("获取菜单的id："+itemId);
            newjmocx.OpenModuleRec(itemId, '');

            // jmocx.OpenModuleRec(xpmObjSid, '');
          }

        }




      },
      checkOcxVersion(ocxVersion, serverVersion){
        var flag = true;
        var arry = ocxVersion.split(".");
        var arry1 = serverVersion.split(",");
        if(arry.length == arry1.length){
          for (var i = 0; i < arry.length; i++) {
            var n1 = parseInt(arry[i]);
            var n2 = parseInt(arry1[i]);
            if(n1 != n2){
              flag = false;
              break;
            }
          }
        }
        return flag;
      },

      //其他页面打开指定菜单
      openMorePageOCX(){

        //获取层级对象
        this.xpmObj = this.$store.state.xpm.level;
        //ocx页面是否需要更新插件
        var ocxPage = '';
        //写死当前ocx插件最新版本
        //var OCXVersion = $("#OCXVersion").val();
        var OCXVersion = '1,79,1,214';

        //获取当前菜单的modSid
        var itemId = this.modSid;
        //检测是否有ocx插件
        this.checkOcxInstallStatus();

        /*当前登录层级信息*/
        //层级id
        var xpmObjSid = this.xpmObj.id;
        //层级中类型：公司部门
        var type = this.xpmObj.type;
        //链接值
        var ocxConn = this.userxpmInfo.ocxConn;
        /*ocx插件引入的xpm页面*/
        var height = window.screen.height;
        var width = window.screen.width;

        //执行加载ocx插件，展示xpm系统
        var jmocx1 = document.getElementById("browsocx");
        jmocx1 = null;

        var str_obj = "<object id=\"browsocx\" name=\"xpmocx\" style=\"width:"+($(window).width()-205)+"px;height:"+($(window).height()-90)+"px;z-index:-1\"  classid=\"CLSID:E80A2A71-0A34-4301-A65E-9593C8DC6265\"><param name=\"wmode\" value=\"transparent\"></object>";
        var container_obj = '<div id="container" style="border: 0px solid currentColor; display: none;border-image: none; width: '+($(window).width()-205)
          +'px; height: '+($(window).height()-90)+'px; position: relative; z-index: -100;"></div>';
        //拼接页面元素
        $("#menu").html(container_obj);
        $('#container').html(str_obj).show();
        var jmocx = document.getElementById("browsocx");

        //判断ocx插件
        if(!this.checkOcxVersion(jmocx.OcxVersion, OCXVersion)){
          //console.log("当前ocx部署最新的参数");
          ocxPage = 'update';
          this.msgWarning('请下载ocx:'+OCXVersion+'新版本！');
          window.open(this.appPath+"/ocx/OCX.rar");
          return;
        }
        //ocx插件初始化
        /*console.log("接口地址："+this.appPath);
        console.log( "层级类型："+type, "层级id："+xpmObjSid, "动态链接码："+ocxConn, "菜单id："+itemId);*/
        if(jmocx == null){
          //console.log("为空");
        }
        jmocx.initOCX('cn.language', type, xpmObjSid, ocxConn, '', 'Whiteprint');

        let newjmocx = document.getElementById("browsocx");
        if('update'==ocxPage){
          this.msgWarning('请下载ocx最新版本！');
          window.open(this.appPath+"/ocx/OCX.rar");
          return;
        }
        $("#menu").css("display","block");
        //隐藏显示模块(不需要)
        $("#showpage").css("display","none");
        if(this.modName.indexOf("已审批")>=0){//打开已审批列表包含 撤回 操作
          newjmocx.OpenModuleRec_CheckFlow('checked', '', '1', 'TworkflowMsg_frm', 'checked', 'checked', this.modName);
        }else if(this.modName.indexOf("我的在办")>=0){//打开我的在办列表包含 撤回 操作
          newjmocx.OpenModuleRec_CheckFlow('mychecking', '', '1', 'TworkflowMsg_frm', 'mychecking', 'mychecking', this.modName);
        }else{
          //console.log("获取菜单的id："+itemId);
          newjmocx.OpenModuleRec(itemId, '');
        }


      },

      checkOcxInstallStatus() {
        try {
          var obj = new ActiveXObject("xPMBrows.coActiveForm");//"E80A2A71-0A34-4301-A65E-9593C8DC6265"
          if(obj!=null);
        } catch(e) {
          this.msgWarning("请先下载安装OCX插件！");
          window.open(this.appPath+"/ocx/OCX.rar");
        }
      },

    }
  };
</script>
<style scoped lang="scss">
  @import "../../publicStyle/style.css";
</style>

