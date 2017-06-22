<style>
    .course{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .course .box-card {
        width: 600px;
        margin-top: 24px;
    }
</style>

<template>
    <div class="course">
        <div style="flex:1;">
            <el-card class="box-card">     
                <div slot="header" class="clearfix">
                    <el-row type="flex" class="row-bg" justify="space-between">
                        <el-col :span="5"><span>{{title}}</span></el-col>
                        <el-col :span="3">
                            <el-button type="success" @click="createmyCourse">提 交<i class="el-icon-upload el-icon--right"></i></el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-transfer v-model="mycoures" :data="data"
                    :titles="['课程', '选课']"
                    :filterable="true"
                    filter-placeholder="请输入搜索课程.."
                    :button-texts="['移除','添加']"
                ></el-transfer>
            </el-card>
        </div>
    </div>
</template>

<script>
import CourseService from '../services/courseService.js'
import localsession from '../js/commons/localsession.js'
export default {
    data() {
        return {
            data: [],
            mycoures: [],
            title:'选 课'
        };
    },
    methods:{
        initCourse(){
            let that=this;
            let _user=localsession.sessionGet('user');
            CourseService.GetCourses({}).then((res)=>{
                if(res.result && res.data.length>0){
                    res.data.forEach((item,i)=>{
                        if(_user.courses.length>0){
                            for(var j=0;j<_user.courses.length;j++){
                                if(item.name==_user.courses[j]){
                                    this.mycoures.push(i);
                                }
                            }
                        }
                        that.data.push({
                            key: i,
                            label: item.name,
                            disabled: false
                        })
                    })
                }
            });
        },
        // 提交我的选课
        createmyCourse(){
            let _mycourses=[];
            if(this.mycoures.length>0){
                for(var i=0;i<this.mycoures.length;i++){
                    _mycourses.push(this.data[this.mycoures[i]].label)
                }
                let _user=localsession.sessionGet('user');
                let _params={
                    username:_user.username,
                    courses:_mycourses.join(',')
                }
                CourseService.Course(_params).then((res)=>{
                    if(res.result){
                        this.$message.success(res.msg);
                        _user.courses=_mycourses;
                        localsession.sessionSet('user',_user);
                    }
                    else
                        this.$message.error(res.msg);
                }).catch((err)=>{
                    this.$message.error('更新失败！');
                })
            }else
                this.$message.error(`请选择课程！`);
        }
    },
    mounted(){
        this.initCourse();
    }
}
</script>
