<style>
    .login{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .login .box-card {
        width: 500px;
        margin-top: 24px;
    }
</style>

<template>
    <div class="login">
        <div style="flex:1;">
            <el-card class="box-card">     
                <div slot="header" class="clearfix">
                    <span>{{title}}</span>
                </div>
                <el-form :model="loginForm" ref="loginForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="用户名" prop="username"
                      :rules="[
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                      ]">
                      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名..."></el-input>
                  </el-form-item>
                  <el-form-item label="密 码" prop="pwd"
                      :rules="[
                        { required: true, message: '请输入密码', trigger: 'blur' }
                      ]">
                      <el-input type="password" v-model="loginForm.pwd" auto-complete="off" placeholder="请输入密码..."></></el-input>
                  </el-form-item>
                  <el-form-item label="记住用户名" prop="jzuname">
                      <el-switch
                        v-model="loginForm.jzuname"
                        on-text="是"
                        off-text="否"
                        on-color="#13ce66"
                        off-color="#ff4949">
                      </el-switch>  
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="login('loginForm')">登 录</el-button>
                      <el-tooltip class="item" effect="dark" content="点击立即注册" placement="right">
                        <router-link to='/register'>没有账号？</router-link>
                      </el-tooltip>
                  </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
  import CourseService from '../services/courseService.js'
  import Util from '../js/commons/util.js'
  import localsession from '../js/commons/localsession.js'
  export default {
    data() {
      return {
        loginForm: {
          username: '',
          pwd: '',
          jzuname:false
        },
        title:'登录'
      };
    },
    methods: {
      // 登录
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let user={
              username:this.loginForm.username,
              pwd:Util.GetMD5(this.loginForm.pwd)
            }
            let that=this;
            CourseService.Login(user).then((res)=>{
              if(res.result){
                localsession.sessionSet("user",res.data)
                if(that.loginForm.jzuname){
                  localsession.localSet("username",user.username)
                }else{
                  let _username= localsession.localGet("username");
                  if(_username)
                    localsession.localDel("username");
                }
                that.$router.push('/home/1');
              }
              else{
                this.$message.error(res.msg);
                return false;
              }
            },(err)=>{
              this.$message.error('登录失败！');
              return false;
            }).catch((err)=>{
              this.$message.error('登录失败！');
              return false;
            })
          } else {
            this.$message.warning('请输入用户名或密码！');
            return false;
          }
        });
      }
    },
    mounted(){
      // 是否记住用户名
      let username= localsession.localGet("username");
      if(username){
        this.loginForm.username=username;
        this.loginForm.jzuname=true;
      }
    }
  }
</script>