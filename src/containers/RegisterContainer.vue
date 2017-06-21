<style>
    .register{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .register .box-card {
        width: 500px;
        margin-top: 24px;
    }
</style>

<template>
    <div class="register">
        <div style="flex:1;">
            <el-card class="box-card">     
                <div slot="header" class="clearfix">
                    <span>{{title}}</span>
                </div>
                <el-form :model="registerForm" ref="registerForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="用户名" prop="username"
                      :rules="[
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                      ]">
                      <el-input type="text" v-model="registerForm.username" auto-complete="off" placeholder="请输入用户名..."></el-input>
                  </el-form-item>
                  <el-form-item label="密 码" prop="pwd"
                      :rules="[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: checkpwd, trigger: 'blur' }
                      ]">
                      <el-input type="password" v-model="registerForm.pwd" auto-complete="off" placeholder="请输入密码..."></></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="repwd"
                      :rules="[
                        { required: true, message: '请输入确认密码', trigger: 'blur' },
                        { validator: checkrepwd, trigger: 'blur' }
                      ]">
                      <el-input type="password" v-model="registerForm.repwd" auto-complete="off" placeholder="请输入确认密码..."></></el-input>
                  </el-form-item>
                  <el-form-item label="年龄" prop="age"
                      :rules="[
                        { required: true, message: '请输入年龄', trigger: 'blur' },
                        { validator: checkAge, trigger: 'blur' }
                      ]">
                      <el-input type="number" min="7" v-model="registerForm.age" auto-complete="off" placeholder="请输入年龄..."></></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="register('registerForm')">注 册</el-button>
                      <el-button @click="resetForm('registerForm')">重 置</el-button>
                  </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>


<script>
  import CourseService from '../services/courseService.js'
  import Util from '../js/commons/util.js'
  export default {
    data() {
      return {
        registerForm: {
          username: '',
          pwd: '',
          repwd:'',
          age:''
        },

        title:'注册'
      };
    },
    methods: {
      // 验证密码一致
      checkpwd(rule, value, callback){
        if(value!='')
          this.$refs.registerForm.validateField('repwd');
        callback();
      },
      // 验证密码一致
      checkrepwd(rule, value, callback){
        if(value === this.registerForm.pwd)
          callback();
        else
          callback(new Error('两次密码不一致'));
      },
      // 验证年龄
      checkAge(rule, value, callback){
        if (parseInt(value) < 7)
          callback(new Error('年龄必须大于7岁'));
        else
          callback();
      },
      // 提交注册
      register(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _user=this.registerForm;
            _user.pwd=Util.GetMD5(_user.pwd);
            _user.repwd=Util.GetMD5(_user.repwd);
            let that=this;
            CourseService.Register(_user).then((res)=>{
              if(res && res.result){
                that.$message.success({
                  showClose: true,
                  message: res.msg,
                  onClose:()=>{
                    that.$router.push('/login');
                  }
                });
              }else
                this.$message.error(res.msg);
            }).catch((err)=>{
              this.$message.error('注册失败！');
              return false;
            });
          } else {
            this.$message.warning('请完善信息！');
            return false;
          }
        });
      },
      // 重置
      resetForm(formName) {
          this.$refs[formName].resetFields();
      }
    },
    mounted(){
      
    }
  }
</script>