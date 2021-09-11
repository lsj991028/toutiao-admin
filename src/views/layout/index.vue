<template>
    <el-container class="layout-container">
      <el-aside
        width="200px"
        class="aside"
      >
      <!-- 左侧导航栏组件 -->
        <App-aside class="aside-menu"/>
      </el-aside>
      <!-- 右边部分 -->
      <el-container>
        <!-- 头部 -->
        <el-header class="header">
          <div>
            <i class="el-icon-s-fold"></i>
            <span>云边小卖部-管理系统</span>
          </div>
          <el-dropdown>
            <div class="avatar-wrap">
              <img class="avatar" :src="user.photo" alt="">
              <span>{{ user.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <!-- <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span> -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!-- 内容区 -->
        <el-main class="main">
          <!-- 展示内容区 -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import AppAside from './components/aside.vue'
import { getUserProfile } from '../../api/user'
export default {
  name: 'LayoutIndex',
  components: { AppAside },
  data () {
    return {
      user: {} // 当前登录用户信息
    }
  },
  created () {
    // 组件初始化,请求获取用户资料
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      // 报错401  需要往后端传输token，在请求头中，axios可以携带请求头
      getUserProfile().then(res => {
        console.log(res) // 后端会返回token，找到并在user.js加到请求头中
        this.user = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .aside-menu{
    height: 100%;
  }
}

.aside{
  background-color: skyblue;
}

.header{
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  // background-color: skyblue;
}

.main{
  background-color: springgreen;
}

.avatar-wrap{
  display: flex;
  align-items: center;
  .avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
