<template>

    <div class="container">
        <div class="header">
            <h1 class="el-row" style="color: orangered">请勿在任何时候点击刷新页面，否则系统将会关闭测试，您将失去参加测试的资格！</h1>
            <div class="el-row">
            <h1 style="color: orangered">这部分测试不能记笔记</h1>
          </div>

        </div>
      <h1 class="el-row">工作记忆</h1>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="column">
                    <div class="el-row">
                        <div class="normal">
                            工作记忆测试分为两部分，在每一部分中您都将先做一些练习来熟悉流程。
                        </div>
                    </div>

                    <div class="el-row">
                        <div class="normal">在练习和测试中，</div>
                        <div class="bold">您不能做任何笔记。</div>

                    </div>
                    <div class="el-row">
                        <div class="normal">为了保证数据的有效，系统设置的</div>
                        <div class="bold">最低正确率。</div>
                    </div>
                    <div class="el-row">
                        <div class="normal"> 您的分数如果低于最低正确率，系统将终止您的测试。</div>

                    </div>
                    <div class="el-row">
                        <div class="normal">因此，</div>
                        <div class="bold">请务必认真答题。</div>
                    </div>
                </div>

                <div class="row">

                    <el-button class="confirm" type="primary" @click="study" >开始第一部分</el-button>
                </div>
            </div>
            <div class="right"></div>
        </div>
        <div class="footer"></div>
    </div>

</template>

<script>

    export default {
        name: "trainindex",
        data() {
            return {
                // user不一定能用到
                user: {
                    id: '',
                    email: '',
                    invited_code: '',
                    test_fin_time: '',
                    register_time: '',
                },



            };
        },
        methods: {
            study() {

                this.$router.push('/recordTrainpart1');

            },

        },
        created() {//生命周期函数


            document.body.style.backgroundColor="#DCDCDC";

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
    .container{
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .header{
        display: flex;
        flex-direction: column;
        height: 30vh;
    }
    .footer{
        height: 75px;
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
        margin-bottom:30px
    }
    .left,.right{
        width:360px;
    }
    .center{
        flex: 1;
    }
    .column{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .row{
        display: flex;
        justify-content: space-around;
        margin-bottom:80px
    }
    .bold{font-size:22px;
        font-weight: bold;
    }
    .normal{
        font-size:22px;
        font-weight: normal;
    }
    .confirm{
        font-size:25px;
        font-weight:500;
    }
</style>
