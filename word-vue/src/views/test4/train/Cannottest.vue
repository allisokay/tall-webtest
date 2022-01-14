<template>
    <div class="container">
        <div class="header">
            <h1 class="el-row">你的回答正确率低于系统设置的最低值，将不能继续参加测试。</h1>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="el-row">
                </div>
                <div class="el-row">
                    <h2>请联系实验组织者,关闭页面退出!</h2>
                </div>
                <div class="el-row">
<!--                    <el-button type="primary" @click="quit" >点击退出</el-button>-->
                </div>
            </div>
            <div class="right"></div>
        </div>
        <div class="footer"></div>
    </div>


</template>

<script>
    import GLOBAL from "../../../plugins/global_variable";

    export default {
        name: "Cannottest",
        data() {
            return {
                // user不一定能用到
                user: {
                    id: '',
                    email: '',
                    invited_code: '',
                    test_fin_time: '',
                    register_time: '',
                }
            };
        },
        methods: {
            //具体退出到哪里未作
            // quit() {
            //     this.$router.push('/index');
            //
            // }

        },


        created() {//生命周期函数

            //不能再次参加测试了
            // GLOBAL.test4_end=true;
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
        height: 40vh;
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
        margin-bottom:80px
    }
    .left,.right{
        width:400px;
    }
    .center{
        flex: 1;
    }
    .row{
        display: flex;
        justify-content: space-around;
        margin-bottom:80px
    }
</style>