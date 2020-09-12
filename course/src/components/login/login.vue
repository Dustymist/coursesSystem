<template>
  <el-container>
    <el-header>
      <!--<div v-show="this.$store.state.loginStatus">
            <div class="header" v-show="this.$store.state.adminType">
              课程信息系统(管理员)
            </div>
            <div class="header" v-show="this.$store.state.studentType">
              课程信息系统(学生)
            </div>
          </div>
      -->
      <div>
        <span style="float:left; color:black; font-size: 26px;">课程信息系统</span>
        <el-dropdown style="float:right; vertical-align: top;" @command="handleCommand"
                     v-show="this.$store.state.studentType">
          <el-button type="primary">
            欢迎您,{{currentStudentName}}<i class="el-icon-arrow-down el-icon--right"/>
          </el-button>
          <el-dropdown-menu trigger="click">
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
            <el-dropdown-item command="b">注销账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </el-header>

    <el-main>
      <div style="height:100px"></div>
      <!--错误-->
    </el-main>

    <div class="login-form-box" v-show="!this.$store.state.loginStatus">
      <el-form  label-suffix='：' label-width="100px" class="login-form">
        <el-form-item label="账号">
          <el-input
            v-model="inputId"
            placeholder="请输入账号"
            clearable
            class="formInput"/>
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            v-model="inputPassword"
            placeholder="请输入密码"
            clearable
            class="formInput"/>
        </el-form-item>

        <el-form-item>
          <el-button
            class="formButton"
            @click="login()"
            icon="el-icon-check"
            type="primary"
          >登录
          </el-button
          >
        </el-form-item>
      </el-form>
    </div>

  </el-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      inputId: '',
      inputPassword: '',
      accountFound: false
    }
  },
  computed: {
    ...mapState(['currentStudentName'])
  },
  methods: {

    handleCommand (command) {
      switch (command) {
        case 'a':
          this.$router.push('/PasswordManager')
          break
        case 'b':
          alert('退出系统')
          break
      }
    },
    login () {
      if (this.inputId === 'admin') {
        this.$store.state.loginStatus = true
        this.$store.state.adminType = true
        alert('登录成功')
        this.$router.push('/courses')
      } else {
        for (let item of this.$store.state.students) {
          if (
            item.studentId === this.inputId &&
            item.studentPassword === this.inputPassword
          ) {
            this.$store.state.loginStatus = true
            this.$store.state.studentType = true
            this.accountFound = true;
            [
              this.$store.state.currentStudentId,
              this.$store.state.currentStudentName,
              this.$store.state.currentStudentPassword,
              this.$store.state.currentRegId,
              this.$store.state.currentRegCourse
            ] = [
              item.studentId,
              item.studentName,
              item.studentPassword,
              item.regId,
              item.regCourse
            ]
            alert('登录成功')
            console.log(this.$store.state.studentName)
            this.$router.push('/enrollments')
          }

          if (
            item.studentId === this.inputId &&
            item.studentPassword !== this.inputPassword
          ) {
            this.accountFound = true
            alert('密码错误')
          }
        }
        if (this.accountFound === false) {
          alert('账号不存在')
        }
      }
    },
    logOut () {
      this.$store.state.loginStatus = false
      this.$store.state.adminType = true
        ? (this.$store.state.adminType = false)
        : (this.$store.state.studentType = false)
      /*啥意思。。。*/
    }
  }
}
</script>

<style scoped>
  .form {
    position: relative;
    margin: 30px auto;
  }

  .formInput {
    float: left;
    width: 350px;
  }

  .formButton {
    float: left;
  }

  .header {
    color: black;
    font-size: 26px;
    width: 300px;
    height: 100px;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

 /* .login-form {

  }
*/
  .login-form-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
