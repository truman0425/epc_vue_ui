<!--
 * @Description: 
 * @Version: 1.0
 * @Author: truman
 * @Date: 2022-02-15 22:03:15
 * @LastEditors: Truman
 * @LastEditTime: 2022-02-16 11:07:09
-->
<template>
  <div class="aside-bar">
      <span v-for="(item,index) in region" :key="item" @click="regionClick(item,index)" :class="{'aside-active':active === index}">{{item}}</span>
  </div>
</template>

<script>
export default {
  name: "AsideBar",
  data(){
      return {
          active:0,
          region:["众鼎机械","湖南","湖北",'广东']
      }
  },
  methods:{
      regionClick(item,index){
          this.active = index
          this.$emit('regionChange',item)
      }
  }
};
</script>

<style lang="scss" scoped>
.aside-bar {
  border-right: 1px solid #e9eaf2;
  border-left: 1px solid #757f92;
  margin-top: 60px;

  span {
    font-size: 0.25rem;
    letter-spacing: 50px;
    text-align: right;
    display: inline-block;
    margin-top: 10px;
    color: hsl(220, 5%, 89%);
    letter-spacing: 30px;
    margin-left: 10px;
    padding: 20px 0;
    padding-left: 10px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 15px;
    transition: background-color 0.5s;
    transition-timing-function:linear;
  }
}

.aside-active{
    color: #1989f9 !important;
    background-color: #d1e7fe;
    font-weight: bold;
}
</style>
