<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-title">监利市农业产品后台管理系统</div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login-form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import userService from '../globals/service/user';
import DataStore from '@/globals/storage/index';

export default {
  data() {
    return {
      //登录表单数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      //表单验证规则对象
      loginFormRules: {
        //验证用户名
        username: [
          {
            required: true,
            message: '请输入登录名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        //验证密码
        password: [
          {
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.login(); // 登录方法名
        return false;
      }
    };
  },
  methods: {
    //点击重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return;
        let params = {
          username: this.loginForm.username,
          password: this.loginForm.password
        };
        userService
          .login(params)
          .then(res => {
            if (res.status === 200) {
              let token = res.data;
              let tk = {
                Authorization: token
              };
              DataStore.setToken(res.data);
              userService.getUserInfo(tk).then(res => {
                console.log(res.data);
                if (res.status === 200) {
                  if (res.data.targetSystem === '后台管理系统') {
                    this.$message.success('登录成功！');
                    localStorage.setItem('token', token);
                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                    this.$router.push('/commerce-article');
                  } else {
                    this.$message.warning('您没有使用后台管理系统的权限，请联系管理员！');
                  }
                }
              });
            } else if (res.status === 500) {
              this.$message.info('该用户不存在或密码错误！');
            }
          })
          .catch(ex => {
            this.$message.error('登录异常！', ex);
          });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  background-color: #345298;
  height: 100%;
}

.login-box {
  width: 450px;
  height: 360px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;

  .login-title {
    position: absolute;
    width: 450px;
    height: 50px;
    line-height: 50px;
    font-size: 34px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    top: -80px;
    left: 0;
  }
}

.login-form {
  margin-top: 100px;
  padding: 0 30px;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
