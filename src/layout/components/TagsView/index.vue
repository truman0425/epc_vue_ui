<template>
  <div id="tags-view-container" ref="tagList" class="tags-view-container">
    <div v-show="showMore" class="tags-more">
      <el-popover
        placement="bottom"
        popper-class="pop-class"
        trigger="click" >
        <div class="more-content" style="display: flex;flex-direction: column">
          <router-link
            v-for="(tag,index) in moreViews"
            ref="tag"
            :key="tag.path"
            :class="isActive(tag)?'more-active':''"
            :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
            tag="span"
            class="tags-view-item tag-more-item"
            :style="activeStyle(tag)"
            @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
            @contextmenu.prevent.native="openMenu(tag,$event)"
          >
            <span  class="tag-title"  v-if="!isAffix(tag)">{{ tag.title }}</span>
            <span v-show="isActive(tag)" class="tag-left-line"></span>
            <span v-show="isActive(tag)" class="el-icon-close tag-title-close" @click.prevent.stop="closeSelectedTag(tag)"/>
          </router-link>
        </div>
        <div slot="reference" class="more-btn">
           <i class="el-icon-caret-bottom"></i>
        </div>
      </el-popover>
    </div>
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="(tag,index) in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        :style="activeStyle(tag)"
        @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        <span class="tag-div" v-if="isAffix(tag)">
          <img src="../../../assets/image/Home.png"/>
        </span>
        <span v-if="!isAffix(tag)">{{ tag.path.includes("projectPro/culising")?(JSON.stringify(tag.query)!="{}"?"线索公海修改":tag.title):tag.title }}</span>
        <span class="bottm-line"></span>
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"/>
        <span :ref="'tagLine'+index" class="line"></span>

      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新页面</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭当前</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      vas: false,
      showMore:false,
      moreIndex:-1,
      moreViews:[],
      tabViews:[],
      allViews:[]
    }
  },
  computed: {
    visitedViews() {

      if(this.moreIndex == -1){
        return this.$store.state.tagsView.visitedViews
      }else{
        let views = this.$store.state.tagsView.visitedViews
        let arrays = []
        views.forEach((res,index)=>{
          if(index <= this.moreIndex){
            arrays.push(res)
          }
        })
        return arrays
      }

    },
    routes() {
      return this.$store.state.permission.routes
    },
    theme() {
      return this.$store.state.settings.theme
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()

    // const eWidth = this.$refs.tagList.clientWidth
    // console.log('tag-width='+eWidth)

  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    activeStyle(tag) {
      if (!this.isActive(tag)) return {}
      return {
        // "background-color": this.theme,
        // "border-color": this.theme
      }
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }


      let views = this.$store.state.tagsView.visitedViews
      const eWidth = this.$refs.tagList.clientWidth
      if (views.length > 2) {
        let tagLine = this.$refs[`tagLine` + (views.length - 2)]
        if (tagLine) {
          let offsetLeft = tagLine[0].offsetParent.offsetLeft
          if (offsetLeft > eWidth - 220) {
             if(this.moreIndex == -1){
               this.moreIndex = views.length - 2
             }
             this.showMore = true
             let arrays = []
            views.forEach((res,index)=>{
              if(index > this.moreIndex){
                arrays.push(res)
              }
            })
            this.moreViews = arrays
          } else {
             this.moreViews = []
             this.moreIndex = -1
             this.showMore = false
          }
          //console.log('offsetLeft='+offsetLeft)
        }else{
          if(this.moreIndex != -1){
            let arrays = []
            views.forEach((res,index)=>{
              if(index > this.moreIndex){
                arrays.push(res)
              }
            })
            this.moreViews = arrays
          }

        }
      }

      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY + 20
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
      this.vas = true
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 74px;
   line-height: 74px;
  border-radius: 8px;
  margin: 28px 20px 0 20px;
  background: #fff;
  box-shadow: 0px 1px 5px 0px rgba(236, 236, 236, 0.75);

  .tags-view-wrapper {
    position: relative;

    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 74px;
      line-height: 74px;
      color: #505A69;
      background: #fff;
      padding: 0 23px;
      font-size: 18px;
      position: relative;
      border-radius: 2px;

      &:first-of-type {
        background: #FFFFFF;
        text-align: center;
        height: 74px;
        line-height: 74px;
        padding: 0;
        width: 80px;
        color: #1989FA;
        position: absolute;
        z-index: 11;

        .tag-div {
          width: 100%;
          height: 100%;
          display: inline-block;
          background: rgba(25, 137, 250, 0.1);

          img {
            width: 31px;
            height: 31px;
            vertical-align: middle;
          }
        }

        .line {
          display: none;
        }

        .bottm-line {
          display: none;
        }
      }

      &:nth-of-type(2) {
        margin-left: 71px;
      }

      &:last-of-type {
        margin-right: 21px;
      }

      &.active {
        color: #1989FA;
        border-color: #1989FA;

        .el-icon-close {
          display: inline-block;
          color: #525A68;
          font-size: 10px;
        }

        .bottm-line {
          width: 70%;
          height: 4px;
          background: #1989FA;
          border-radius: 4px;
          position: absolute;
          bottom: 0;
          left: 15%;
        }

        /*&::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }*/
      }

      .line {
        width: 2px;
        height: 20px;
        background: #505A69;
        opacity: 0.2;
        position: absolute;
        right: 0;
        top: 28px;
        display: inline-block;
      }

    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

    li {
      margin: 0;
      padding: 0px 16px;
      cursor: pointer;
      line-height: 42px;
      font-size: 14px;

      &:hover {
        background: #eee;
      }
    }
  }

}


.tags-more{
  position: absolute;
  right: 20px;
  z-index: 9999;
  /deep/ .el-popper {
    padding: 0;
  }
}

.pop-more{
  min-width: 200px;
  height: auto;
  /deep/ .el-popper {
    padding: 0;
  }
}

.more-content{
  display: flex;
  flex-direction: column;

  .tag-more-item{
    height: 42px;
    width: 100%;
    font-size: 18px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .tag-left-line{
      position: absolute;
      left: 0;
      width: 2px;
      height: 42px;
      background-color:  #1989FA;;
    }
    .tag-title{
      padding-left: 15px;
    }
    .tag-title-close{
      margin-left: 15px;
    }
  }

}

.more-btn{
  width: 20px;
  height: 74px;
  background: #e8f3fe;
  border-radius: 0px 8px 8px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  i{
    font-size: 20px;
    color:#1989FA;
  }
}

.more-active{
  color: #1989FA;
  border-color: #1989FA;
  background-color: #f3f9ff;
}

</style>

<style lang="scss" >

.pop-class{
  width: 220px;
  height: auto;
  padding: 0 !important;
}

//reset element css of el-icon-close
.tags-view-wrapper {
  .el-icon-close {
    display: none;
  }

  .tags-view-item:hover {
    .el-icon-close {
      //display: inline-block;
      //width: 16px;
      //height: 16px;
      //vertical-align: 1px;
      //border-radius: 50%;
      //text-align: center;
      //transition: all .3s cubic-bezier(.645, .045, .355, 1);
      //transform-origin: 100% 50%;
      &:before {
        //transform: scale(.8);

        //vertical-align: -1px;
      }

      &:hover {
        //background-color: #b4bccc;
        //color: #fff;
      }
    }
  }
}


</style>
