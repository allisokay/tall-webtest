<template>
    <div>
        <el-container>
            <el-header height="733px"><strong>管理员主界面</strong>
                <div>
                    <el-button type="primary" @click="download()">邀请码管理</el-button>
                </div>
                <div>
                    <el-button type="primary" @click="downloadData()">下载数据</el-button>
                </div>
                <div>
                  <el-button type="primary" @click="downLoadReport()">下载成绩单</el-button>
                </div>

            </el-header>


        </el-container>

    </div>
</template>

<script>
    export default {
        name: "Adminindex",
        data() {
            return {
                // user不一定能用到
                admin: {
                    id: '',
                    account: '',
                    pwd: '',
                },
            };
        },
        methods: {
            download() {
                this.$router.push('/AdminCode');
            },
            downloadData(){
                this.$router.push("/AdminDownloadData")
            },
            downLoadReport() {
                this.$router.push("/AdminDownloadReport")
            }

        },
        created() {//生命周期函数
            var adminString = localStorage.getItem("admin");
            if (adminString) {
                this.admin = JSON.parse(adminString);
            } else {
                alert("您尚未登录，点击确定跳转至登录页面");
                this.$router.push('/admin/Adminlogin');
            }


        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 80px;
        align-self: center;
        width: 700px;
    }


    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    /*分栏间隔*/
    .el-row {
        margin-bottom: 20px;
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

</style>