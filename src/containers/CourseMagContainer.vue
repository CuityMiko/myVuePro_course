<style>
    .coursemag{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .coursemag .box-card {
        width: 720px;
        height: 630px;
        margin-top: 24px;
    }
    .coursemag .el-tag{
        margin: 9px;
    }
    .coursemag .el-input{
        margin: 9px;
    }
</style>

<template>
    <div class="coursemag">
        <div style="flex:1;">
            <el-card class="box-card">     
                <div slot="header" class="clearfix">
                    <el-row type="flex" class="row-bg" justify="space-between">
                        <el-col :span="5"><span>{{title}}</span></el-col>
                        <el-col :span="3">
                            <el-button type="success" @click="createCourse">生 成<i class="el-icon-upload el-icon--right"></i></el-button>
                        </el-col>
                    </el-row>
                </div>
                    <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    :closable="true"
                    :close-transition="false"
                    @close="handleClose(tag)"
                    type="success"
                    >
                    {{tag}}
                    </el-tag>
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        @keyup.enter.native="handleInputConfirm"
                        placeholder="请输入课程名称..."
                        @blur="handleInputConfirm">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加课程</el-button>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import CourseService from '../services/courseService.js'
    export default {
        data() {
            return {
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            title:'课程管理'
            };
        },
        methods: {
            handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
            },
            handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                if(this.dynamicTags.indexOf(inputValue)>-1)
                    this.$message.error(`${inputValue}课程已经存在！`);
                else
                    this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
            },
            // 生成课程
            createCourse(){
                let that=this;
                if(this.dynamicTags.length>0){
                    that.$confirm('是否确定添加课程?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let _courses=that.dynamicTags.join(',')
                        CourseService.AddCourses({courses:_courses}).then((res)=>{
                            that.$message.success(`课程添加成功！`);
                        })
                    }).catch(() => {});
                }else
                that.$message.error('课程不能为空！');
            },
            initCourse(){
                let that=this;
                CourseService.GetCourses({}).then((res)=>{
                    if(res.result && res.data.length>0){
                        res.data.forEach((item)=>{
                            that.dynamicTags.push(item.name)
                        })
                    }
                })
            }
        },
        watch:{
            // '$route' (to, from) {
            //     this.initCourse();
            // }
        },
        mounted(){
            this.initCourse();
        }
    }
</script>