<template>
    <div class="container">
        <div class="header">
            <h1 class="el-row">欢迎进入文字版在线测试系统</h1>
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
        name: "EmailRegister",
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
        },
        watch:{
            'testemail':function () {
                if(this.testemail==this.form.email)
                {
                    this.show=false
                    this.$forceUpdate();
                }
                else
                {
                    this.show=true
                    this.$forceUpdate();
                }
            }
        },
        methods: {
            submitForm(formName) {
                var _this = this;
                this.$refs[formName].validate((valid) => {
                    // 如果邮箱格式正确
                    if (valid) {
                   //查找邮箱是否重复
                        this.find_user_email();

                    }
                    // 如果邮箱格式不正确
                    else {

                        return false;
                    }
                });

            },
            save(){
                GLOBAL.email=this.form.email;
                this.$router.push('/Questionnaire');

            },


            // save() {
            //     //全局变量赋值
            //
            //     GLOBAL.content.email=this.form.email;
            //     GLOBAL.content.invited_code=GLOBAL.invited_code
            //     GLOBAL.content.aural_done=false;
            //     // GLOBAL.content.aural_donetime='';
            //     GLOBAL.content.word_done=false;
            //     // GLOBAL.content.word_donetime='';
            //
            //
            //
            //     var _this = this;
            //     console.log(GLOBAL.content);
            //     axios.post('user/save', GLOBAL.content).then(
            //         function (resp) {
            //             if (resp.data != null) {
            //                 _this.$message({
            //                     message: '成功进入系统！',
            //                     type: 'success',
            //
            //                 });
            //                 GLOBAL.session='first';
            //                 //这里需要存的全局变量邮箱应该是由后端发来的邮箱
            //                 GLOBAL.email=resp.data.email;
            //                 _this.$router.push('/Audition');
            //
            //
            //             }
            //
            //         });
            //
            // },

            find_user_email() {
                //查询邮箱是否已被使用
                var _this = this;
                axios.get('user/findByEmail' + this.form.email).then(function (resp) {
                    //查询没有查询到这个邮箱，后端返回的是success
                    if (resp.data == "success") {
                        //存入数据
                        _this.save()

                    }
                    // 如果邮箱已经被使用
                    else {
                        _this.$alert('邮箱已被使用！请重新输入', '提示', {
                            confirmButtonText: '确定',
                        })
                        _this.show=true;
                        _this.$forceUpdate();
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