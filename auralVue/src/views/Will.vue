<template>
    <div class="container">
        <div class="header">
            <div v-if="state==1">
            <h1 class="el-row">您已经完成了本次测试。</h1>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="el-row">
                    <h2>我们将邀请10名测试人在第二次测试结束后接受5分钟访谈，</h2>
                </div>
                <div class="el-row">
                    <h2>了解关于测试的一
                        些细节问题。</h2>
                </div>
                <div class="el-row">
                    <h2>请问您是否愿意在第二次测试结束后接受5分钟的访谈？</h2>
                </div>

                <div class="el-row">
                    <el-button type="primary" @click="will_do">愿意参加</el-button>
                    <el-button @click="uncertain">现在不太确定</el-button>
                    <el-button @click="will_not_do">不愿意参加</el-button>

                </div>
            </div>
            <div class="right"></div>
        </div>
            </div>

            <div v-if="state==2">
                <h1 class="el-row">你已完成本次实验，请关闭页面退出！</h1>
            </div>

        </div>
        <div class="footer"></div>
    </div>


</template>

<script>
    import GLOBAL from "../plugins/global_variable";
    export default {
        name: "Will",
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
                state:2,
            };
        },
        methods:
        {
            will_do()
            {
                this.state=2;

                let content={};
                content.willingness_interview="愿意参加";
                content.email =GLOBAL.email
                axios.post('user/update_will',content).then(function (resp) {
                    console.log(resp.data);
                });


            },
            uncertain()
            {
                this.state=2;

                let content={};
                content.willingness_interview="现在不太确定";
                content.email =GLOBAL.email
                axios.post('user/update_will',content).then(function (resp) {
                    console.log(resp.data);
                });

            },
            will_not_do()
            {
                this.state=2;

                let content={};
                content.willingness_interview="不愿意参加";
                content.email =GLOBAL.email
                axios.post('user/update_will',content).then(function (resp) {
                    console.log(resp.data);
                });

            },

        },

        created() {//生命周期函数

            //不能再次参加测试了
            // GLOBAL.test4_end=true;
            document.body.style.backgroundColor = "#DCDCDC";

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
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .header {
        display: flex;
        flex-direction: column;
        height: 40vh;
    }

    .footer {
        height: 75px;
    }

    .content {
        display: flex;
        flex-direction: row;
        flex: 1;
    }

    .el-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 80px
    }

    .left, .right {
        width: 400px;
    }

    .center {
        flex: 1;
    }

    .row {
        display: flex;
        justify-content: space-around;
        margin-bottom: 80px
    }
</style>