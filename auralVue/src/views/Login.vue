<template>
    <div class="container">
        <div class="header">
          <h1 class="el-row">外语学能测试(视听版1)<br />
            TALL (Aural Version 1)
          </h1>
        </div>
        <div class="content">
            <div class="leftbound">

            </div>
            <div class="left">
                <div class="el-row1">
                    <el-text  class="normal">受邀测试人
                        （第一次测试）<br><br>
                        Invited participant
                        the 1st test
                    </el-text>
                </div>

                <div class="el-row1">
                    <el-text class="normal" >受邀测试人（第二次测试）<br><br>
                        Participant for the 2nd test
                    </el-text>
                </div>
                <div class="el-row1">
                    <el-text class="normal">普通访问者
                        Vistor
                    </el-text>
                </div>
            </div>
            <div class="center">
                <div class="row">
                    <el-text class="normal" >请输入邀请码:
                        Please enter the code here:
                    </el-text><br>

                </div>
                <div class="row" >

                    <el-col :span="15">
                        <el-input v-model="invited_code" placeholder="请输入邀请码"></el-input>                    </el-col>
                </div>

              <br>
              <br>
              <br>
              <br>
              <br>
              <div class="row">
                <div class="normal" >不需要输入邀请码 （Do not need the code）
                </div><br>
              </div>

            </div>
            <div class="right">
                <div class="el-row2">
                    <el-button type="primary" :disabled="false" @click="first_enter">进入(Enter1)</el-button>
                </div>
                <div class="el-row2">
                    <el-button type="primary" :disabled="false" @click="second_enter">进入(Enter2)</el-button>
                </div>
                <div class="el-row2">
                    <el-button type="primary" :disabled="true" @click="visitor_enter">进入(Enter3)</el-button>
                </div>
            </div>
            <div class="leftbound">

            </div>
        </div>
        <div class="footer"></div>
    </div>

</template>
<script>
    import GLOBAL from "../plugins/global_variable";
    export default {
        name: "login",
        data() {
            return {

                    invited_code: '',

            };
        },
        created() {
            document.body.style.backgroundColor="#DCDCDC";
        },
        methods: {
            first_enter(){
                //如果邀请码不为空
                if(this.invited_code)
                {

                    // GLOBAL.invited_code=this.invited_code;
                    this.find_user_code();

                }
                else{
                    this.$alert('邀请码为空！请重新输入', '提示', {
                        confirmButtonText: '确定',
                })}

            },
            second_enter(){
                this.$message({
                    message: '成功进入系统！',
                    type: 'success',

                });
                this.$router.push('/Emaillogin');

            },
            visitor_enter()
            {
                //待写
                this.$router.push('/index');
            },

            find_invite() {
                var _this = this;
                axios.get('invite/findByCode' + this.invited_code).then(function (resp) {
                    //查询到了这个邀请码，即不为空
                    if (resp.data) {
                        //如果code的sesesions属性为A
                       if(resp.data.session=='A')
                       {
                           GLOBAL.invited_code=resp.data.code;
                           _this.$message({
                               message: '成功进入系统！',
                               type: 'success',

                           });
                           _this.$router.push('/Notification');
                       }
                       //如果code的sesesions属性为W
                       else{
                           _this.$alert('该邀请码为文字版的邀请码！请输入视听版的邀请码', '提示', {
                               confirmButtonText: '确定',
                           });

                       }


                    }
                    // 如果没有查询到正确的邀请码
                    else {
                        _this.$alert('邀请码错误！请重新输入', '提示', {
                            confirmButtonText: '确定',
                        })
                    }
                });

            },
            find_user_code() {
                //查询code是否已被使用
                var _this = this;
                axios.get('user/findByCode' + this.invited_code).then(function (resp) {
                    //查询没有查询到这个邀请码，后端返回的是success
                    if (resp.data == "success") {

                        // _this.$message({
                        //     message: '成功进入系统！',
                        //     type: 'success',
                        //
                        // });
                        // _this.$router.push('/Notification');
                        _this.find_invite();

                    }
                    // 如果邀请码已经被使用
                    else {
                        _this.$alert('邀请码已被使用！请重新输入', '提示', {
                            confirmButtonText: '确定',
                        })
                    }
                });

            },
            // find_user_email() {
            //     //查询邮箱是否已被使用
            //     var _this = this;
            //     axios.get('user/findByEmail' + this.form.email).then(function (resp) {
            //         //查询没有查询到这个邮箱，后端返回的是success
            //         if (resp.data == "success") {
            //             //继续查询邀请码是否错误
            //             _this.find_invite();
            //
            //         }
            //         // 如果邮箱已经被使用
            //         else {
            //             _this.$alert('邮箱已被使用！请重新输入', '提示', {
            //                 confirmButtonText: '确定',
            //             })
            //         }
            //     });
            // },


        }
    }
</script>

<style scoped>
  h1{
    margin-top: 30px;
    line-height:50px;
    padding: 0px;
  }
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
        margin-bottom:20px
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
    .el-row1{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-bottom:80px
    }
    .el-row2{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom:185px
    }
    .left,.right{
        width:200px;
    }
    .leftbound{
        width:250px;
    }
    .center{
        flex: 1;
    }
    .normal{
        font-size:22px;
        font-weight: normal;
    }

</style>