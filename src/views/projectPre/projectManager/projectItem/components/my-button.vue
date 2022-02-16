<template>
  <div class="btn-main">
    <div class="btn-sty">
      <i class="el-icon-plus"></i>
      <span>{{ title }}</span>
    </div>
  </div>

</template>

<script>

export default {
  components: {},
  props: {
    title:{
      type:String,
      default:''
    }
  },
  data () {
    return {

    }
  },
  created () {
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
.btn-main{
  .btn-sty{
    height: 46px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 2px #1989fa;
    color: #1989fa;
    width:fit-content;
    padding: 0 10px;
    width:-webkit-fit-content;
    width:-moz-fit-content;
    cursor: pointer;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #1989fa;
    >i{
      margin-right: 5px;
      font-weight: bold;
    }
  }
  .btn-sty:hover{
    border: 2px solid #0F87F0;
    color: #0F87F0;
  }


}

</style>
