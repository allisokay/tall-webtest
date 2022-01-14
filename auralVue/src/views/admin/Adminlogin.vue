<template>
    <div>
        <el-container>
            <el-header height="733px"><strong>管理员登录</strong>
                <el-form :model="form" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                    <el-form-item
                            label-position="right" label-width="580px"
                            prop="account"
                            label="账号"
                            :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
                        <el-col :span="8">
                            <el-input v-model="form.account" placeholder="请输入账号"></el-input>
                        </el-col>

                    </el-form-item>
                    <el-form-item label-position="right" label-width="580px" prop="pwd" label="密码" :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' },

    ]">
                        <el-col :span="8">
                            <el-input type="password" v-model="form.pwd" autocomplete="new-password"
                                      placeholder="请输入密码"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label-position="center" label-width="-50px">
                        <el-button type="primary" @click="submitForm('dynamicValidateForm')">登录</el-button>

                    </el-form-item>

                </el-form>
            </el-header>


        </el-container>

    </div>
</template>
<script>
    export default {
        name: "Adminlogin",
        data() {
            return {
                form: {
                    account: '',
                    pwd: '',
                }
            };
        },
        methods: {
            submitForm(dynamicValidateForm) {
                var _this = this;
                this.$refs[dynamicValidateForm].validate((valid) => {

                    if (valid) {
                        axios.get('admin/login' + this.form.account + "/" + this.form.pwd).then(function (resp) {
                            //登录成功
                            if (resp.data.state) {
                                _this.$message({
                                    message: resp.data.msg,
                                    type: 'success',

                                });
                                localStorage.setItem("admin", JSON.stringify(resp.data.admin));
                                _this.$router.push('/Adminindex');
                            }
                            //用户名错误或者密码错误
                            else {
                                _this.$alert(resp.data.msg + '请重新输入', '提示', {
                                    confirmButtonText: '确定',
                                })
                            }
                        })
                    }
                })
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