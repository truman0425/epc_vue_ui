<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="collapse-logo sidebar-logo">
       <!-- <h1 v-else class="sidebar-title">{{ title }} </h1>-->
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo2">
       <!-- <h1 class="sidebar-title">{{ title }} </h1>-->
      </router-link>

    </transition>
  </div>
</template>

<script>
import logoImg from '@/assets/image/ju_logo_big.png'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '聚项云管理系统',
      logo: logoImg
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: #091926;
  text-align: center;
  overflow: hidden;


  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      vertical-align: middle;
      margin-right: 12px;
      width: 199px ;
      //width: 199px !important;
      height: 69px;
    }
    & .sidebar-logo2 {
      vertical-align: middle;
      margin-right: 12px;
      width: 199px !important;
      height: 69px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}

.collapse-logo{
  //width: 100px !important;
}
</style>
