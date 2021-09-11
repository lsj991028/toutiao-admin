<template>
  <div class="login-container">
    <!--
      el-from 表单组件
      每个表单项都必须使用 el-form-item 组件包装
     -->
     <div class="login-head"></div>

    <el-form
      class="login-form"
      ref="login-form"
      :model="user"
      :rules="formRules"
    >
      <el-form-item prop="mobile"> <!-- prop值写下方v-model绑定值 -->
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-brn" type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '../../api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      // checked: false, // 是否同意的选中状态
      loginLoading: false, // 登陆的loading状态
      formRules: { // 表单验证给规则配置
      // 要验证的规则名称：规则列表[]
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'change' }
        ],
        agree: [
          {
            // 自定义校验规则
            // 验证通过：callback()
            // 验证失败：callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选用户协议'))
              }
            },
            // message: '请勾选用户协议',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 获取表单数据
      // const user = this.user

      // 表单验证 validate方法是异步的(此步骤根据上方验证规则检测哪个字段没通过验证)
      // validate有两个参数,valid 是布尔值，返回true则通过，false不通过， err 是验证失败的字段信息
      this.$refs['login-form'].validate((valid) => {
        // 如果表单提交失败，停止请求提交
        if (!valid) {
          return
        }
        // 验证通过，请求登录
        this.login()
      })

      // 处理后端响应结果
    },

    login () {
      // 开启登陆中,loading...
      this.loginLoading = true

      // 请求接口
      // 下面的login() 是封装在api/user.js 中的请求数据方法
      login(this.user).then(res => {
        console.log(res)

        // 登陆成功
        this.$message({
          message: '登陆成功',
          type: 'success',
          center: true
        })
        // 关闭loading
        this.loginLoading = false

        // 跳转到首页
        this.$router.push({
          name: 'home'
        })
      }).catch(err => { // 登录失败
        console.log('登录失败', err)
        this.$message.error({ message: '登陆失败,手机号或验证码错误', center: true })
        // 关闭 loading
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login-container{
    position:fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('./login_bg.jpg') no-repeat;
    background-size: cover;
    .login-head{
      width: 300px;
      height: 57px;
      background: url('./logo_index.jpeg') no-repeat;
      position: relative;
      // bottom: 158px;
      // left: 800px;
      bottom: -62px;
      background-position: 0 -18px;
    }
    .login-form{
      background-color: #fff;
      padding: 75px 50px 20px 50px;
      min-width: 300px;
      .login-brn{
        width: 100%;
      }
    }
  }
</style>
