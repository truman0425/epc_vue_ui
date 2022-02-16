import $ from 'jquery'
var curMenu = null, zTree_Menu = null;
var setting = {
	view: {
		showLine: false,
		showIcon: false,
		selectedMulti: false,
		expandSpeed: "",
        removeHoverDom: false
	},
	check: {
        enable: false
    },
    edit: {
        enable: false,//禁止左侧主列表功能按钮拖拽
        showRenameBtn:false,//显示隐藏删除图标
        showRemoveBtn: false,
        isMove:false
    },
	data: {
		key: {
			name: "modName"
		},
		simpleData: {
			enable: true,
			idKey: "modSid",
			pIdKey: "parentSid",
			rootPId: ""
		}
	},
	callback: {
		onNodeCreated: this.onNodeCreated,
		beforeClick: this.beforeClick,
		onClick: this.onClick,
		onDblClick: false
	}
};
let appPath = 'http://pccs.ceedi.cn/portal-sjy';
function getShowModuleSize(){
	$.ajax({
		type: "POST",
		url: appPath+"/getShowModuleSize.action",
//		async : false,
		success:function(msg){
			var jo = JSON.parse(msg);
			$.each($("a.level1"), function(i,val){ //side-menu
				var name = undefined;
				if($(this).text().indexOf("我的在办") != -1){
					name = '我的在办('+jo.mychecking+')';
				}else if($(this).text().indexOf("我的已办结") != -1){
					name = '我的已办结('+jo.mychecked+')';
				}else if($(this).text().indexOf("已办结") != -1){
					name = '已办结('+jo.checkover+')';
				}else if($(this).text().indexOf("已审批") != -1){
					name = '已审批('+jo.checked+')';
				}else if($(this).text().indexOf("已查阅") != -1){
					name = '已查阅('+jo.read+')';
				}else if($(this).text().indexOf("待审批") != -1){
					name = '待审批('+jo.checking+')';
				}else if($(this).text().indexOf("待查阅") != -1){
					name = '待查阅('+jo.reading+')';
				}
				if(name != undefined){
					$(this).find('span').eq(1).html(name);
				}
			});

		}
	});
}
function xpmFunc(){

  $(document).ready(function()
  {
    //5秒定时刷新待办个数
//	setInterval("getShowModuleSize()",5000);
   //window.open("http://pccs.ceedi.cn/portal-sjy/manage.action");
    $.ajax(
      {
        type: "POST",
        url: appPath+"/showModule.action",
//				date: "",
//				async : false,
         success:function(msg)
        {
          zNodes = eval(msg.split(";")[1]);
          $.fn.zTree.init($("#side-menu"), setting, zNodes);
          $(".ico_open").addClass("fa fa-angle-right");
          $(".ico_close").addClass("fa fa-angle-right");
        }
      }
    );
    //checkOcxInstallStatus();
//	alert(2);
//	$("#showpageIfa").attr("src", appPath + "/anasysing/gotoAnasysing.action");
    //systree(2);
//	zTree_Menu = $.fn.zTree.getZTreeObj("side-menu");
//	curMenu = zTree_Menu.getNodes()[0].children[0].children[0];
//	zTree_Menu.selectNode(curMenu);
//	var a = $("#" + zTree_Menu.getNodes()[0].tId + "_a");
//	a.addClass("cur");
  });
}


function checkOcxInstallStatus() {
    try {
        var obj = new ActiveXObject("xPMBrows.coActiveForm");//"E80A2A71-0A34-4301-A65E-9593C8DC6265"
        if(obj!=null);
    } catch(e) {
        alert("请先下载安装OCX插件！");
        window.open(appPath+"/ocx/OCX.rar");
    }
}
var deptSize;
var userClass;
function lookMain(){
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
    var html = '<iframe id="showPageIframe" src="'+ appPath + "/anasysing/gotoAnasysing.action"+'"  width="100%"  height="'+ iframeHeight +'" frameborder="0" ></iframe>';
    $("#showpage").html(html);

    //打开指定功能菜单
    var functionId = $("#functionId").val();
    if(functionId){
    	console.log("功能菜单id" + functionId);
    	openMorePageOCX(functionId);
    }
    //打开指定待办
    var todoSid = $("#todoSid").val();
	if(todoSid != ""){
		console.log("单点待办id" + todoSid);
		if($("#ocxVersion").val() == ""){
			var jmocx = document.getElementById("browsocx");
	        if(jmocx!=null && jmocx.OcxVersion != undefined){
	        	var v_jmocxcox = (jmocx.OcxVersion).split(".");
	        	var v_jmocxcoxR=convertVersionData(v_jmocxcox);
	    	   	$("#ocxVersion").val(v_jmocxcoxR);
	        }
		}
		$.ajax({
			type : "POST",
			url : appPath + "/anasysing/getTodoInfoById.action",
//			url : appPath + "/anasysing/getTodoInfoById.action?todoSid=" + todoSid + "&subType=" + $("#portalUrlType").val(),
			data : {
				"todoSid" : todoSid,
				"todoStype" : $("#todoStype").val(),
				"subType" : $("#todoSubType").val(),
			},
			error : function(request) {
				toastr.error("加载任务失败...");
			},
			success : function(resData) {
				console.log(resData);
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
}

function convertVersionData(ocxVer){
	var v_coxR='';
	$.each(ocxVer,function(index,value){
		if(index==(ocxVer.length-1)){
			v_coxR = v_coxR+parseFloat(value);
		}else{
			v_coxR = v_coxR+parseFloat(value)+',';
		}
	});
	return v_coxR;
}
var ocxPage = '';
/**
 *
 * @param bizSid  	主键sid
 * @param bizName	主键列名称
 * @param modSid	模组sid
 * @param sysState	系统数据状态 1 主系统、2子系统
 */
function showInfo(bizSid,bizName,modSid,rec_sid, rec_code, mod_name, sysState){
	var type = $("#type").val();
	var xpmObjSid = $("#xpmObjSid").val();
	var ocxConn = $("#ocxConn").val();			//主系统的id

	if(sysState == '2'){
		ocxConn = $("#ocxConn_sub").val();	//子系统的id
	}
	var OCXVersion = $("#OCXVersion").val();
    if ($('#browsocx').length == 0)
    {
    	var height = window.screen.height;
    	var width = window.screen.width;
        var str_obj = "<object id=\"browsocx\" name=\"xpmocx\" style=\"width:"+($(window).width()-205)+"px;height:"+($(window).height()-90)+"px;z-index:-1\"  classid=\"CLSID:E80A2A71-0A34-4301-A65E-9593C8DC6265\"><param name=\"wmode\" value=\"transparent\"></object>";
        $("#menu").html("<div style=\"width: "+($(window).width()-205)+"px; height: "+($(window).height()-90)+"px; display: none; border:0px solid;position:relative;z-index:-100;\" id=\"container\"></div>");
        $('#container').html(str_obj).show();
//        每次点击都去初始化jmocx
//        if(jmocx == null)
//        {
        	jmocx = document.getElementById("browsocx");
        	// start 数据格式处理，处理版本中前面o的问题，比如 1.69.70.207 和 版本    1.69.70.0207一致问题
//        	var v_jmocxcox = (jmocx.OcxVersion).split(".");
//        	var v_jmocxcoxR=convertVersionData(v_jmocxcox);
//        	var v_cox =  OCXVersion.split(",");
//        	var v_coxR=convertVersionData(v_cox);
//        	if(v_jmocxcoxR!=v_coxR){
        	if(!checkOcxVersion(jmocx.OcxVersion, OCXVersion)){
        		ocxPage = 'update';
        		alert('请下载ocx:'+OCXVersion+'新版本！');
        		window.open(appPath+"/ocx/OCX.rar");
        		return;
        	}
        	jmocx.initOCX('cn.language', type, xpmObjSid, ocxConn, '', 'Whiteprint');
//        }
    }

    if('update'==ocxPage){
    	alert('请下载ocx:'+v_coxR+'新版本！');
    	window.open(appPath+"/ocx/OCX.rar");
    	return;
    }
	$("#menu").css("display","block");
	$("#showpage").css("display","none");
//    jmocx.OpenModuleRec(modSid, bizName+"='"+bizSid+"'",2);
    jmocx.OpenModuleRec_CheckFlow(modSid, bizName+"='"+bizSid+"'",'2','TRecSheet_frm',rec_sid,rec_code,mod_name); //参数3 表示每次打开表单 刷新数据。
}

function onClick(e, treeId, node) {
	var OCXVersion = $("#OCXVersion").val();
	//jmocx = document.getElementById("browsocx");
	//alert(JSON.stringify(node));
	//alert(node.isParent + "==" + node.level);
	if(node.isParent == true && node.level == '0'){
		$("#side-menu").find(".level0.active").removeClass("active");
		$("#side-menu").find(".noline_open").removeClass("noline_open").addClass("noline_close");
		$("#side-menu > li > ul").css("display","none");
		var isclo = $("#side-menu").find(".curSelectedNode > span:eq(0)").attr("class");
		$("#side-menu").find(".ico_open").removeClass("ico_open").addClass("ico_close");
		if(isclo.indexOf("ico_open") < 0){
    		$.fn.zTree.getZTreeObj("side-menu").expandNode(node, !node.open);
    		$("#side-menu").find(".curSelectedNode").prev().removeClass("noline_close").addClass("noline_open");
    		$("#side-menu").find(".curSelectedNode").next().css("display","block");
    		$("#side-menu").find(".noline_open").parent().addClass("active");
    		$("#side-menu").find(".curSelectedNode > span:eq(0)").removeClass("ico_close").addClass("ico_open");
    		$("#side-menu > li > ul").addClass("nav");
		}
		$(".ico_open").addClass("fa fa-angle-right");
		$(".ico_close").addClass("fa fa-angle-right");
	}else if(node.isParent == true && node.level == '1'){
		$.fn.zTree.getZTreeObj("side-menu").expandNode(node, !node.open);
		$("#side-menu > li > ul > li > ul").find(".noline_docu").remove();
		$("#side-menu > li > ul > li > ul").addClass("nav");
		$("#side-menu > li > ul > li > ul > li > a").addClass("sj");
		$("#side-menu > li > ul > li").find(".curSelectedNode").parent().toggleClass("active");
		$("#side-menu > li > ul > li").find(".curSelectedNode > span:eq(0)").toggleClass("ico_close").toggleClass("ico_open").addClass("fa fa-angle-right");
		$(".ico_open").addClass("fa fa-angle-right");
		$(".ico_close").addClass("fa fa-angle-right");
	}else if(node.isParent == true && node.level == '2'){
		$.fn.zTree.getZTreeObj("side-menu").expandNode(node, !node.open);
		$("#side-menu > li > ul > li > ul > li > ul").find(".noline_docu").remove();
		$("#side-menu > li > ul > li > ul > li > ul").addClass("nav");
		$("#side-menu > li > ul > li > ul > li").find(".curSelectedNode").parent().toggleClass("active");
		$("#side-menu > li > ul > li > ul > li").find(".curSelectedNode > span:eq(0)").toggleClass("ico_close").toggleClass("ico_open").addClass("fa fa-angle-right");
		$(".ico_open").addClass("fa fa-angle-right");
		$(".ico_close").addClass("fa fa-angle-right");
	}
	var itemId = node.modSid;
//	console.log(itemId);
	//alert("itemId="+itemId+"    node.isParent="+node.isParent);
	if("homepage" == itemId)
	{
		$("#showpage").show(0,function(){
//			console.log(211);
			var childWindow = $("#showPageIframe")[0].contentWindow; //表示获取了嵌入在iframe中的子页面的window对象。  []将JQuery对象转成DOM对象，用DOM对象的contentWindow获取子页面window对象。
			if(childWindow != undefined && typeof(childWindow.ininListHtml) == 'function'){
				childWindow.ininListHtml();  //调用子页面中的subFunction方法。
			}
		});
		$("#menu").css("display","none");
//		$("#showpage").css("display","");
	}else if(node.isParent == false){
		checkOcxInstallStatus();
		var type = $("#type").val();
		var xpmObjSid = $("#xpmObjSid").val();
		var ocxConn = $("#ocxConn").val();
//		$("#menu").show();
//		$("#showpage")hide();
	    if ($('#browsocx').length == 0)
	    {
	    	var height = window.screen.height;
	    	var width = window.screen.width;
	        var str_obj = "<object id=\"browsocx\" name=\"xpmocx\" style=\"width:"+($(window).width()-205)+"px;height:"+($(window).height()-90)+"px;z-index:-1\"  classid=\"CLSID:E80A2A71-0A34-4301-A65E-9593C8DC6265\"><param name=\"wmode\" value=\"transparent\"></object>";
	        $("#menu").html("<div style=\"width: "+($(window).width()-205)+"px; height: "+($(window).height()-90)+"px; display: none; border:0px solid;position:relative;z-index:-100;\" id=\"container\"></div>");
	        $('#container').html(str_obj).show();
//	        每次点击都去初始化jmocx
//	        if(jmocx == null)
//	        {
	        	jmocx = document.getElementById("browsocx");

	        	// start 数据格式处理，处理版本中前面o的问题，比如 1.69.70.207 和 版本    1.69.70.0207一致问题
//	        	var v_jmocxcox = (jmocx.OcxVersion).split(".");
//	        	var v_jmocxcoxR=convertVersionData(v_jmocxcox);
//	        	var v_cox =  OCXVersion.split(",");
//	        	var v_coxR=convertVersionData(v_cox);
//	        	if(v_jmocxcoxR!=v_coxR){
	        	if(!checkOcxVersion(jmocx.OcxVersion, OCXVersion)){
	        		ocxPage = 'update';
	        		alert('请下载ocx:'+OCXVersion+'新版本！');
	        		window.open(appPath+"/ocx/OCX.rar");
	        		return;
	        	}
	        	jmocx.initOCX('cn.language', type, xpmObjSid, ocxConn, '', 'Whiteprint');
//	        }
	    }
	    if('update'==ocxPage){
	    	alert('请下载ocx:'+v_coxR+'新版本！');
	    	window.open(appPath+"/ocx/OCX.rar");
	    	return;
	    }
	    $("#menu").css("display","block");
		$("#showpage").css("display","none");
		if(node.modName.indexOf("已审批")>=0){//打开已审批列表包含 撤回 操作
			jmocx.OpenModuleRec_CheckFlow('checked', '', '1', 'TworkflowMsg_frm', 'checked', 'checked', node.modName);
		}else if(node.modName.indexOf("我的在办")>=0){//打开我的在办列表包含 撤回 操作
			jmocx.OpenModuleRec_CheckFlow('mychecking', '', '1', 'TworkflowMsg_frm', 'mychecking', 'mychecking', node.modName);
		}else{
			jmocx.OpenModuleRec(itemId, '');
		}
	}
}
//检测ocx版本是否一致
function checkOcxVersion(ocxVersion, serverVersion){
	var flag = true;
	var arry = ocxVersion.split(".");
	var arry1 = serverVersion.split(",");
	console.log(arry);
	console.log(arry1);
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
}
//其他页面打开指定菜单wdz 2020年4月16日12:39:14
function openMorePageOCX(modSid){
	checkOcxInstallStatus();
	var type = $("#type").val();
	var xpmObjSid = $("#xpmObjSid").val();
	var ocxConn = $("#ocxConn").val();
	if ($('#browsocx').length == 0){
    	var height = window.screen.height;
    	var width = window.screen.width;
        var str_obj = "<object id=\"browsocx\" name=\"xpmocx\" style=\"width:"+($(window).width()-205)+"px;height:"+($(window).height()-90)+"px;z-index:-1\"  classid=\"CLSID:E80A2A71-0A34-4301-A65E-9593C8DC6265\"><param name=\"wmode\" value=\"transparent\"></object>";
        $("#menu").html("<div style=\"width: "+($(window).width()-205)+"px; height: "+($(window).height()-90)+"px; display: none; border:0px solid;position:relative;z-index:-100;\" id=\"container\"></div>");
        $('#container').html(str_obj).show();
        	jmocx = document.getElementById("browsocx");
        	// start 数据格式处理，处理版本中前面o的问题，比如 1.69.70.207 和 版本    1.69.70.0207一致问题
//        	var v_jmocxcox = (jmocx.OcxVersion).split(".");
//        	var v_jmocxcoxR=convertVersionData(v_jmocxcox);
//        	var v_cox =  OCXVersion.split(",");
//        	var v_coxR=convertVersionData(v_cox);
        	if(!checkOcxVersion(jmocx.OcxVersion, OCXVersion)){
//    		if(v_jmocxcoxR!=v_coxR){
        		ocxPage = 'update';
        		alert('请下载ocx:'+OCXVersion+'新版本！');
        		window.open(appPath+"/ocx/OCX.rar");
        		return;
        	}
        	jmocx.initOCX('cn.language', type, xpmObjSid, ocxConn, '', 'Whiteprint');

    }
    if('update'==ocxPage){
    	alert('请下载ocx:'+v_coxR+'新版本！');
    	window.open(appPath+"/ocx/OCX.rar");
    	return;
    }
    $("#menu").css("display","block");
	$("#showpage").css("display","none");
    jmocx.OpenModuleRec(modSid, '');
}

//数据格式处理，处理版本中前面0的问题，比如 1.69.70.207 和 版本    1.69.70.0207不一致问题
/*function convertVersionData(ocxVer){
	var v_coxR='';
	$.each(ocxVer,function(index,value){
		if(index==(ocxVer.length-1)){
			v_coxR = v_coxR+parseFloat(value);
		}else{
			v_coxR = v_coxR+parseFloat(value)+'.';
		}
	});
	return v_coxR;
}*/

//function test001(accot, passwod){
//	if ($('#browsocx1').length == 0){
//    	var height = window.screen.height;
//    	var width = window.screen.width;
//        var str_obj = "<object id=\"browsocx1\" name=\"xpmocx\" style=\"width:"+($(window).width()-205)+"px;height:"+($(window).height()-90)+"px;z-index:-1\"  classid=\"CLSID:E80A2A71-0A34-4301-A65E-9593C8DC6265\"><param name=\"wmode\" value=\"transparent\"></object>";
//        $("#menu").html("<div style=\"width: "+($(window).width()-205)+"px; height: "+($(window).height()-90)+"px; display: none; border:0px solid;position:relative;z-index:-100;\" id=\"container\"></div>");
//        $('#container').html(str_obj).show();
////        	jmocx.initOCX('cn.language', type, xpmObjSid, ocxConn, '', 'Whiteprint');
//        	var jmocx = document.getElementById("browsocx1");
//        	jmocx.initconnection('127.0.0.1','7006','HTTP',"0",'cn.language','F36D9D50-E8FD-4FDE-B7A1-D87009DCC199','group','admin','admin@pccs');
////        	jmocx.initconnection('pccs.ceedi.cn','8016','HTTP',"0",'cn.language',$("#xpmObjSid").val(),'group',accot,passwod);
//    }
//}
//获取客户端操作系统类型
function detectOS() {
  var sUserAgent = navigator.userAgent;
  alert(navigator.platform)
  var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
  var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
  if (isMac) return "Mac";
  var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
  if (isUnix) return "Unix";
  var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
  if (isLinux) return "Linux";
  if (isWin) {
    var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
    if (isWin2K) return "Win2000";
    var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
    if (isWinXP) return "WinXP";
    var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
    if (isWin2003) return "Win2003";
    var isWin2003 = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
    if (isWin2003) return "WinVista";
    var isWin2003 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
    if (isWin2003) return "Win7";
  }
  return "None";
}

function systree(deptSize) {
	if(1 == deptSize){
		return;
	}else if(2 == deptSize)
    {
		//弹出层的时候隐藏ocx
	    var browsocx = $("#browsocx");
	    if (browsocx[0]) browsocx.hide();
	    if($("#org_window"))
	    {
			$("#org_window").remove();
		}
	    $("body").append('<div id="org_window" style="position:relative;z-index:9999" title="系统选择" iconCls="icon-ok"><table id="orgPopTree"></table></div>');
	    $("#org_window").window({
	        width: 650,
	        height: 380,
	        collapsible: false,
	        minimizable: false,
	        maximizable: false,
	        onClose: function () {
	            if (browsocx[0]) browsocx.show();
	        }
	    });
	    $("#orgPopTree").treegrid({
	        border: false,
	        striped: true,
	        fit: true,
	        lines: true,
	        rownumbers: false,
	        fitColumns: true,
	        idField: 'id',
	        treeField: 'code',
	        collapsible: true,
	        loadMsg: "加载数据，请稍候...",
	        singleSelect: true,
	        url: appPath + "/showTree.action",
	        columns: [[
		                   { title: '编号', field: 'code', width: 100,
		                  	 formatter:function(value){
		                           return '<span style="color:red">'+value+'</span>';
		                        }
		                  },
		                  { title: '名称', field: 'text', width: 150 },
		                  { title: '类型', field: 'typename', width: 60 },
		                  { title: '备注', field: 'remark', width: 100 }
					 ]],
	        onLoadError: function (xmpRequst,errorCode,errorMsg) {
	        	alert("error occurs.....");
	        	if('600' == xmpRequst.status){
	        		eval(xmpRequst.responseText);
	        	}
	            return false;
	        },
	        onDblClickRow: function (row) {
	            location.href = appPath+"/manage.action?type="+row.type+"&xpmObjSid="+row.id+"&d="+encodeURI(row.text);
	        },
	        onBeforeLoad:function(row,param){
	        	//alert("send request to loading systree success:"+JSON.stringify(param));
	        },
	        onLoadSuccess:function(row,data){
	        	//alert("loading systree success:"+data);
	        }
	    });
    }
}

function loginout()
{
	if(window.confirm("确定是否退出系统?"))
	{
		$.ajax(
				{
					type: "POST",
					url: appPath+"/logout.action",
	 				date: "",
					success:function(msg)
					{
						jmocx = null;
						location.href = appPath+"/login.jsp";
					}
				}
			 );
	}
}

function downLoad()
{
	window.open(appPath+"/down.jsp","","height=200px,width=400px, resizable=no,status=yes,center=yes,top=200,left=200");
}
//切换组织
function changeOBS()
{
//	window.open(appPath+"/gotoSysDept.action","","");
	showSysDeptModal();
//	$("#myModalmd").modal({
//		remote : appPath+"/gotoSysDeptModal.action"
//	});
}
//切换系统
function changeREGM(obj){
	console.log(obj.value);
	$.ajax({
		dataType : "json",
		url : appPath + "/getSessionUser.action",
		type : "post",
		success : function(data) {
			console.info(obj.value);
			console.info(appPath);
			console.info(data);
			if(data.portalUrlType == obj.value){
				return;
			}
			$("#ocxVersion").val(data.ocxVersion);
			$("#userName").val(data.userName);
			$("#password").val(data.password);
			$("#portalUrlType").val(obj.value);
			document.register.action=data.portalUrl+"/login.action";
//			if(obj.value=="1"){
//			}else if(obj.value=="2"){
//				document.register.action=data.portalUrl_sub+"/login.action";
//			}
			register.submit();
		}
	});


}

function showSysDeptModal() {
	$("body").append('<div id="org_window" style="position:relative;z-index:9999" title="系统选择" iconCls="icon-ok"><table id="orgPopTree"></table></div>');
	$("#org_window").show();
		//弹出层的时候隐藏ocx
	    var browsocx = $("#browsocx");
	    if (browsocx[0]) browsocx.hide();
	    $("#org_window").window({
	        width: 650,
	        height: 380,
	        collapsible: false,
	        minimizable: false,
	        maximizable: false,
	        onClose: function () {
	        	$("#org_window").remove();
	            if (browsocx[0]) browsocx.show();
	        }
	    });
	    $("#orgPopTree").treegrid({
	        border: false,
	        striped: true,
	        fit: true,
	        lines: true,
	        rownumbers: false,
	        fitColumns: true,
	        idField: 'id',
	        treeField: 'code',
	        collapsible: true,
	        loadMsg: "加载数据，请稍候...",
	        singleSelect: true,
	        url: appPath + "/showTree.action",
	        columns: [[
		                   { title: '编号', field: 'code', width: 100,
		                  	 formatter:function(value){
		                           return '<span style="color:red">'+value+'</span>';
		                        }
		                  },
		                  { title: '名称', field: 'text', width: 150 },
		                  { title: '类型', field: 'typename', width: 60 },
		                  { title: '备注', field: 'remark', width: 100 }
					 ]],
	        onLoadError: function (xmpRequst,errorCode,errorMsg) {
	        	alert("error occurs.....");
	        	if('600' == xmpRequst.status){
	        		eval(xmpRequst.responseText);
	        	}
	            return false;
	        },
	        onDblClickRow: function (row) {
	            location.href = appPath+"/manage.action?type="+row.type+"&xpmObjSid="+row.id+"&d="+encodeURI(row.text);
	        },
	        onBeforeLoad:function(row,param){
	        	//alert("send request to loading systree success:"+JSON.stringify(param));
	        },
	        onLoadSuccess:function(row,data){
	        	//alert("loading systree success:"+data);
	        }
	    });
}

export { //很关键
  xpmFunc
}
