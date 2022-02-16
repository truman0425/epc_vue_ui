
export default {
  init: function (_this) {
    return {
      cursorVal: 'default',
      panning: false,
      startX: 0,
      startY: 0,
      transformVal: '',
      // 弹出层标题
      title: "",
      title2: "",
      title3:"",
      // 是否显示弹出层
      open: false,
      open2: false,
      // 表单参数
      form: {
        organzationType:"",
        organzationName:undefined,
        organizationUserList:[],
      },
      index1:0,
      // 表单校验
      rules: {
        organzationType:[
          { required: true, message: "节点类型不能为空", trigger: "blur" }
        ],
        organzationName:[
          { required: true, message: "节点名称不能为空", trigger: "blur" }
        ],
        /*subjectName:[
          { required: true, message: "主体名称不能为空", trigger: "blur" }
        ],*/
      },
      //新增内部外部人员信息
      addPerson:false,
      //搜索人员
      // 用户表格数据
      userList: null,
      loading:false,
      queryId:undefined,
      total:0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      ids:[],
      selectedItem:[],
      curNodeType:undefined,
      personType:undefined,//0内部 1外部
      //获取当前节点中重复的用户id
      existIds:[],
      //所有岗位信息
      positionOptions:[],
      refer:false,

      chartData:{},
    }
  }
}


