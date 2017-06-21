<style>
    body{
        margin: 0px;
    }
    .logo{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100%;
        margin-left: 9px;
    }
    .logo a{
        color: white;
        font-size: 24px;
        font-weight: bold;
    }
    .loginbtn{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        height: 100%;
        margin-right: 9px;
    }
    .container a{
        text-decoration:none;
    }
</style>

<template>
    <div class="container">
        <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal">
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                    <div class="logo">
                        <router-link to="/home">{{title}}</router-link>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-menu-item index="1">
                        <router-link to="/home">首页</router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <router-link to="/course">选课</router-link>
                    </el-menu-item>
                    <el-menu-item index="3" v-if="isadmin">
                        <router-link to="/coursemag">课程管理</router-link>
                    </el-menu-item>
                </el-col>
                <el-col :span="6">
                    <div class="loginbtn" v-if="username!=''">
                        <span style="color: white;margin-right: 24px;">{{ '你好，'+username}}</span>
                        <el-button type="text" @click="loginout">退出</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-menu>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="16">
                <!--路由渲染的页面容器-->
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import localsession from '../js/commons/localsession.js'
    export default{
        data(){
            return {
                title:'VuePro---选课',
                username:'',
                isadmin:false
            }
        },
        methods:{
            loginout(){
                let that=this;
                that.$confirm('是否确定退出?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    localsession.sessionDel('user');
                    this.username='';
                    that.$router.push('/login')
                }).catch(() => {          
                });
            },
            getuser(){
                let _user=localsession.sessionGet('user');
                if(_user){
                    this.username=_user.username;
                    this.isadmin=_user.isadmin;
                }
            }
        },
        watch:{
            '$route' (to, from) {
                this.getuser();
            }
        },
        mounted(){
            this.getuser();
        }
    }
</script>