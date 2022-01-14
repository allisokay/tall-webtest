<template>
    <div class="container">
        <div class="header">
            <h1 class="el-row">欢迎来到题型四的句子理解练习</h1>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="el-row">
                    <h2>你正在听相应的句子音频。。。。</h2>
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
        name: "Sentenceplay",
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

            forced_jump() {
                this.$router.push('/Sentenceplayjudge');
            },

        },
        created() {//生命周期函数


            //读取第一个音频源
            var audio = new Audio(GLOBAL.train_sentence_play.shift());
            //音频播放完了就进入下一个页面
            audio.addEventListener("ended", this.forced_jump);
            audio.play();

            document.body.style.backgroundColor="#DCDCDC";

        },

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