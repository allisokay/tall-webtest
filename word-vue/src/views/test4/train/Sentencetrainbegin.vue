<template>
    <div class="container">
        <div class="header">
<!--            <h1 class="el-row">欢迎来到题型四的句子理解正式练习</h1>-->
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="column">
                    <div class="el-row">
                        <div class="normal">
                            下面再来练习一组句子，判断每一句是否有意义。
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="normal">
                            请尽可能地用最快的速度做出判断，
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="normal">
                            电脑将显示您回答的正确率。
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="normal">
                            如果您准备好了，请点击“开始”进入练习。
                        </div>
                    </div>
                </div>
                <div class="row">

                    <el-button class="confirm" type="primary" @click="study"  >开始</el-button>
                </div>
            </div>
            <div class="right"></div>
        </div>
        <div class="footer"></div>
    </div>

</template>
<script>
    import GLOBAL from './../../../plugins/global_variable'
    export default {
        name: "Sentencetrainbegin",
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
                this.$router.push('/Sentencetrainjudge');
            },
        },
        created() {
            GLOBAL.trial_index=1;
            GLOBAL.react_array = [];
            /*GLOBAL.sentence_src=JSON.parse(JSON.stringify(GLOBAL.sentence_src_backup))
            GLOBAL.sentence_des=JSON.parse(JSON.stringify(GLOBAL.sentence_des_backup))*/

        },
        mounted() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

            document.body.style.backgroundColor="#DCDCDC";
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
        margin-bottom:20px
    }
    .el-row1{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom:35px
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
    .column{
        display: flex;
        flex-direction: column;
        justify-content: center;
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