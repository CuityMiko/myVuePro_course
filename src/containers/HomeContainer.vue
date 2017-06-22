<style>
    .home{
        margin: 24px;
    }
    .el-table .positive-row {
        background: #e2f0e4;
    }
</style>

<template>
    <div class="home">
        <el-input
        placeholder="请输入姓名..."
        icon="search"
        v-model.trim="search"
        :keyup.enter="searchByName"
        :on-icon-click="searchByName" style="width: 300px;margin-bottom: 24px;">
        </el-input>
        <div class="line"></div>
        <el-table
            :data="tableData"
            stripe
            :resizable="false"
            border
            fit
            style="width: 100%;height:100%;"
            :row-class-name="tableRowClassName"
            v-loading="loading" element-loading-text="玩命加载中...">
            <el-table-column
                prop="username"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="age"
                label="年龄"
                width="90">
            </el-table-column>
            <el-table-column
                prop="courses"
                label="选课">
                <template scope="scope">
                    <el-tag type="success" v-for="tag in scope.row.courses" close-transition style="margin: 9px;">{{tag}}</el-tag>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align:center;margin-top:24px;" v-if="total>0">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import CourseService from '../services/courseService.js'
import localsession from '../js/commons/localsession.js'
export default {
    data(){
        return {
            title:'首页',
            tableData: [],
            total:0,
            search:'',
            loading:true,
            currentPage:1,
            pagesize:10,
        }
    },
    methods:{
        getpagedata(){
            let _condition=this.search.length>0?{username:this.search}:{};
            let _params={
                conditions:JSON.stringify(_condition),
                pageindex:this.$route.params.page,
                pagesize:this.pagesize
            }
            let that=this;
            CourseService.GetPageData(_params).then((res)=>{
                if(res.result){
                    that.total=res.data.total;
                    that.tableData=res.data.result;
                }   
                this.loading=false;
            })
        },
        searchByName(){
            if(this.search.length>0)
                this.getpagedata()
        },
        // 分页
        handleCurrentChange(val) {
            this.loading=true;
            this.$router.push(`/home/${val}`)
        },
        tableRowClassName(row, index) {
            let _user=localsession.sessionGet('user');
            if (row.username == _user.username) {
                return 'positive-row';
            }
            return '';
        }
    },
    watch:{
        '$route' (to, from) {
            this.getpagedata();
        }
    },
    mounted(){
        this.getpagedata();
    }
}
</script>
