<template>
  <div class="login">
    <div class=" login-bg">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="login-main">
            <div class="left-div">
              <el-image class="left-img" :src="require('@/assets/image/login_left.png')"></el-image>
            </div>
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
              <div class="form-top">
                <el-image class="form-top-img" :src="require('@/assets/image/login_form_top.png')"></el-image>
              </div>
              <div class="login-form-content">
                <el-form-item prop="username" class="form-item-cls"  >
                  <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
                    <el-image slot="prefix" class="input-pre-img" :src="require('@/assets/image/login_user_img.png')"></el-image>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password" class="form-item-cls"  >
                  <el-input
                    v-model="loginForm.password"
                    type="password"
                    auto-complete="off"
                    placeholder="密码"
                    @keyup.enter.native="handleLogin"
                  >
                    <el-image slot="prefix" class="input-pre-img" :src="require('@/assets/image/login_user_pwd.png')"></el-image>
                  </el-input>
                </el-form-item>
                <el-form-item prop="code"  class="yazm-item form-item-cls">
                  <div class="yazm-input">
                    <el-input
                      v-model="loginForm.code"
                      auto-complete="off"
                      class="yzm-input"
                      placeholder="请输入验证码"
                      style="width: 67%;"
                      @keyup.enter.native="handleLogin"
                    >
                      <el-image slot="prefix" class="input-pre-img" :src="require('@/assets/image/login_user_yzm.png')"></el-image>
                    </el-input>
                    <div class="login-code">
                      <img :src="codeUrl" @click="getCode" />
                    </div>
                  </div>

                </el-form-item>
                <div class="pwd-cls">
                  <el-checkbox class="ck-cls" v-model="loginForm.rememberMe" >记住密码</el-checkbox>
                </div>

                <el-form-item  >
                  <el-button
                    :loading="loading"
                    size="medium"
                    type="primary"
                    class="login-btn"
                    @click.native.prevent="handleLogin"
                  >
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                  </el-button>
                </el-form-item>
              </div>

            </el-form>
          </div>

        </el-col>

      </el-row>
    </div>
    <div class="el-login-footer">
      <span>Copyright © 2020陕西聚米华信息科技有限公司</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        // username: "admin",
        password: "",
        // password: "admin123",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              //this.$router.push({ path: this.redirect || "/" });
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
              this.getCode();
            });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  height: 100%;
  background-image: url("../assets/image/login_bg.png");
  background-size: cover;
}
.login-bg{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  //background: rgba(0, 0, 0, 0.47);
}
.title {
  margin: 0px auto 46px auto;
  text-align: left;
  color: #606266;
  font-size: 24px;
}
.login-form {
  width: 522px;
  height: 480px;
  background-color: #ffffff;
  border-radius: 0px 20px 20px 0px;

  .form-top{
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 40px;
    .form-top-img{
      width: 308px;
      height: 49px;

    }
  }

  .login-form-content{
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .el-input {
     width: 361px ;
    //height: 70px;
    //border-radius: 3px;
    input {
      width: 361px;
      height: 49px;
      background-color: #ffffff;
      border-radius: 8px;
      border: solid 1px #e5e5e5;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 30px;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  letter-spacing: 1px;

  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 2px;
  color: #ffffff;
}
.login-btn{
  width: 240px;
  height: 53px;
  margin-top: 30px;
  background-image: linear-gradient(135deg,
    #5ea1fe 0%,
    #3589fd 100%);
  box-shadow: 0px 0px 20px 0px
  rgba(11, 21, 54, 0.1);
  border-radius: 12px;
  >span{
    font-family: PingFang-SC-Regular;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #ffffff;
  }
}
.login-main{
  display: flex;
  align-items: center;
  justify-content: center;
}
.left-div{
  //height: 400px;
  //width: 834px;
  //padding: 141px 200px 0 0;
  .left-img{
    width: 429px;
    height: 510px;
    //background-image: linear-gradient(45deg,
    //  #78b1fe 0%,
    //  #3589fd 100%);
    border-radius: 20px;
  }
}
.left-logo{
  height: 102px;
  width: 403px;
  background-image: url("../assets/logo/logo.png");
  background-size: 100% 100%;
  margin-bottom: 66px;
}
.left-line{
  width: 571px;
}
.left-span{
  margin-top: 37px;
}
.left-span,.right-span{
  width: 571px;
  height: 67px;
  font-size: 48px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 67px;
  letter-spacing: 2px;
}
.right-span{
  text-align: right;
}
.pwd-cls{
  display: flex;
  width: 100%;
  align-items: center;
  .ck-cls{
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #505a69;
    margin-left: 100px;

    .el-checkbox__inner{
      width: 17px !important;
      height: 17px !important;
      border-radius: 4px !important;
      border: solid 1px #1989fa !important;
      text-align: center;
    }
    el-checkbox__inner::after{
      width: 17px !important;
      height: 17px !important;
    }
  }
}


  /deep/ .el-radio__inner {
   width: 17px !important;
   height: 17px !important;
   border-radius: 4px !important;
   border: solid 1px #1989fa !important;
}

.form-item-cls{
  margin-bottom: 15px !important;
  .input-pre-img{
    width: 23px;
    height: 24px;

  }
  .el-input__prefix{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    left: 0px;
  }
  .el-input--prefix .el-input__inner {
    padding-left:50px!important;
  }
}
.yazm-item{
  width: 361px;
  .yazm-input{
    display: flex;
    align-items: center;
    .yzm-input {
      flex: 1;
      /deep/ .el-input{
        width: 100% !important;
      }
      input{
        width: 100% !important;
        border-top-right-radius:0 !important;
        border-bottom-right-radius: 0 !important;
      }

    }
    .login-code {
      width: 108px;
      height: 48px;
      img {
        cursor: pointer;
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
    }
  }
}

.yzm-input{
  /deep/ .el-input__inner{
    border-top-right-radius:0;
    border-bottom-right-radius: 0
  }
}


//多选框
.login .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%) !important;
}
.login .el-checkbox__inner::after {
  left: 50% !important;
  top: 43% !important;
  width: 4px !important;
  transform: translate(-50%, -50%) rotate(45deg) !important;
}
.login  .el-checkbox__inner {
  padding: 5px !important;
}


</style>
