<template>
    <div class="container">
        <div class="header">
            <h1 class="el-row">欢迎进入视听版在线测试系统</h1>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <el-form :model="form" ref="dynamicValidateForm"  class="demo-dynamic">
                    <div>
                        <div class="row">
                            <div>
                                <el-form-item
                                        label-position="right"
                                        prop="email"
                                        label="邮箱"
                                        :rules="[
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
    ]"
                                >
                                    <el-input v-model="form.email" placeholder="请输入邮箱登录"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                <el-form-item
                                        label-position="right"
                                        prop="email"
                                        label="确认邮箱"
                                        :rules="[
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
    ]"
                                >
                                    <el-input v-model="testemail" placeholder="两次输入的邮箱需一致"></el-input>
                                </el-form-item>
                            </div>
                        </div>

                        <div class="yesbutton">
                            <el-button  :disabled="show" type="primary" @click="submitForm('dynamicValidateForm')">登录</el-button>
                        </div>
                    </div>
                </el-form>
            </div>
            <div class="right"></div>
        </div>
        <div class="footer"></div>
    </div>

</template>
<script>
    import GLOBAL from "../plugins/global_variable";

    export default {
        name: "Emaillogin",
        data() {
            return {
                testemail:'',
                show:true,
                form: {
                    email: '',
                    invited_code: '',
                }
            };
        },
        created() {
            document.body.style.backgroundColor="#DCDCDC";
            // var date = new Date()
            // console.log(date.toLocaleDateString());
            // console.log(this.getD('2020/11/7',date.toLocaleDateString()));
        },
        watch:{
            'testemail':function () {
                if(this.testemail===this.form.email) {
                    this.show=false
                    this.$forceUpdate();
                } else {
                    this.show=true
                    this.$forceUpdate();
                }
            }
        },
        methods: {
            //比较两个时间是否大于一个月，例如20170215--到20170315 是一个月，到20170316是大于一个月
            getD(sDate, endDate) {
                var sDate = new Date(sDate);
                var eDate = new Date(endDate);
                if (eDate.getFullYear() - sDate.getFullYear() > 1) {//先比较年
                    return true;
                } else if (eDate.getMonth() - sDate.getMonth() > 1) {//再比较月
                    return true;
                } else if (eDate.getMonth() - sDate.getMonth() === 1) {
                    if (eDate.getDate() - sDate.getDate() >= 1) {
                        return true;
                    }
                } else if (eDate.getFullYear() - sDate.getFullYear() === 1) {
                    if (eDate.getMonth() + 12 - sDate.getMonth() > 1) {
                        return true;
                    } else if (eDate.getDate() - sDate.getDate() >= 1) {
                        return true;
                    }
                }
                return false;
            },

    submitForm(formName) {
                var _this = this;
                this.$refs[formName].validate((valid) => {
                    // 如果邮箱格式正确
                    if (valid) {
                          _this.find_user_email();
                    }
                    // 如果邮箱格式不正确
                    else {
                        return false;
                    }
                });
            },

            find_user_email() {
                //查询邮箱是否已被使用
                var _this = this;
                axios.get('user/findAllByEmail' + this.form.email).then(function (resp) {
                    //查询查询到这个邮箱
                    if (resp.data ) {
                        //如果完成了文字版本的练习
                        if (resp.data.word_done==='true') {
                            var date = new Date();
                            var now_date= date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()//完成时间
                            GLOBAL.session='second';
                            //这里需要存的全局变量邮箱应该是由后端发来的邮箱
                            GLOBAL.email=resp.data.email;
                            // _this.$router.push('/Index');
                            //如果间隔了一个月
                            if (_this.getD(resp.data.word_donetime, now_date)) {
                                //如果视听版未完成
                                if(resp.data.aural_done==='false')
                                {
                                    _this.$message({
                                        message: '成功进入系统！',
                                        type: 'success',
                                    });
                                    GLOBAL.session='second';
                                    //这里需要存的全局变量邮箱应该是由后端发来的邮箱
                                    GLOBAL.email=resp.data.email;
                                    _this.$router.push('/Index');
                                } else {
                                    _this.$alert('你已经完成了视听版的测试，请退出！', '提示', {
                                        confirmButtonText: '确定',
                                    });
                                }
                            }
                            else {
                                _this.$alert('需要间隔一个月后才能测试视听版，你上次完成文字版的时间：'+String(resp.data.word_donetime), '提示', {
                                    confirmButtonText: '确定',
                                });
                            }
                        }
                        else {
                            _this.$alert('你尚未完第一次的文字版测试，请先去完成', '提示', {
                                confirmButtonText: '确定',
                            });
                        }
                    }
                    // 如果邮箱已经被使用
                    else {
                        _this.$alert('邮箱未在此系统注册！请重新输入', '提示', {
                            confirmButtonText: '确定',
                        });
                    }
                });
            },
        },
        mounted() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

        }
    }
</script>

<style scoped>
    .header{
        height: 100px;
        line-height: 100px;
        background-color: #D8D8D8;
        text-align: center;
        margin-bottom:80px
    }
    .footer {
        height: 100px;
        line-height: 100px;
        text-align: center;
        margin-bottom:80px
    }
    .el-row{
        display: flex;
        margin-bottom:80px;
        justify-content:center
    }
    .yesbutton{
        display: flex;
        justify-content: center;
        margin-bottom:80px
    }
    .row{
        display: flex;
        justify-content: center;
        margin-bottom:80px
    }
    .container{
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content{
        display: flex;
        flex-direction: row;
        flex: 1;
    }
    .el-row{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom:80px
    }
    .left,.right{
        width:400px;
    }
    .center{
        flex: 1;
    }

</style>