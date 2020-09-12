<template>
  <div>

    <!--
      <div v-show="this.$store.state.loginStatus">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#66ccff"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/courses">
            <el-badge value="管理员" class="item" type="warning" width="200px"
              >课程管理</el-badge
            >
          </el-menu-item>

          <el-menu-item index="/students">
            <el-badge value="管理员" class="item" type="warning">学生管理</el-badge>
          </el-menu-item>

          <el-menu-item index="/enrollments">
            <el-badge value="学生" class="item">我要选课</el-badge>
          </el-menu-item>
        </el-menu>

        -->
    <el-row class="tac">
      <el-col :span="12">
        <el-menu default-active="2" class="el-menu-vertical-demo" router style="width : 200px;">

          <!--管理员-->
          <el-menu-item index="/courses" v-show="this.$store.state.adminType">
            <i class="el-icon-s-order"/>
            <span slot="title">课程管理</span>
          </el-menu-item>

          <el-menu-item index="/students" v-show="this.$store.state.adminType">
            <i class="el-icon-s-custom"/>
            <span slot="title">学生管理</span>
          </el-menu-item>

          <el-menu-item index="/results" v-show="this.$store.state.adminType">
            <i class="el-icon-s-platform"/>
            <span slot="title">成绩管理</span>
          </el-menu-item>

          <el-menu-item index="/notification" v-show="this.$store.state.adminType">
            <i class="el-icon-s-platform"/>
            <span slot="title">通知管理</span>
          </el-menu-item>

          <el-menu-item @click="logOut('admin')" v-show="this.$store.state.adminType">
            <i class="el-icon-switch-button"/>
            <span slot="title">退出系统</span>
          </el-menu-item>
          <!--学生-->
          <el-menu-item index="/homePage" v-show="this.$store.state.studentType" style="width : 180px;">
            <i class="el-icon-user-solid"/>
            <span slot="title">个人主页</span>
          </el-menu-item>

          <el-submenu index="1" v-show="this.$store.state.studentType" style="width : 180px;">
            <template slot="title">
              <i class="el-icon-s-order"/>
              <span>选课管理</span>
            </template>

            <el-menu-item-group>

              <el-menu-item index="/enrollments">
                <i class="el-icon-s-order"/>
                <span slot="title">所有课程</span>
              </el-menu-item>

              <el-menu-item index="/selected">
                <i class="el-icon-s-claim"/>
                <span slot="title">已选课程</span>
              </el-menu-item>

            </el-menu-item-group>

          </el-submenu>

          <el-menu-item index="/passwordManager" v-show="this.$store.state.studentType" style="width : 180px;">
            <i class="el-icon-key"/>
            <span slot="title">修改密码</span>
          </el-menu-item>

          <el-menu-item index="/scoreList" v-show="this.$store.state.studentType" style="width : 180px;">
            <i class="el-icon-key"/>
            <span slot="title">学分汇总</span>
          </el-menu-item>

          <el-menu-item @click="logOut('student')" v-show="this.$store.state.studentType" style="width : 180px;">
            <i class="el-icon-switch-button"/>
            <span slot="title">退出系统</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logOut (e) {
      switch (e) {
        case 'admin':
          this.$store.state.loginStatus = false
          this.$store.state.adminType = false
          break
        case 'student':
          this.$store.state.loginStatus = false
          this.$store.state.studentType = false
          break
      }
    }
  }
}
</script>

<style scoped>
  .header {
    padding: 0;
    margin: 0;
  }

  .el-aside {
    text-align: center;
    line-height: 200px;
  }
</style>
