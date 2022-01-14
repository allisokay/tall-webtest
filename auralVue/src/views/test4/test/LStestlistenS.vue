<template>
    <div class="container">
        <div class="header">
            <h1 class="el-row">欢迎来到题型四的正式测试</h1>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
<!--                <div class="el-row">-->
<!--                    <div>你正在听相应的<h1 >句子</h1>音频。。。。</div>-->
                <el-progress :text-inside="true" :stroke-width="24" :percentage="(current_group/test_length*100).toFixed(0)" status="success"></el-progress>
<!--                </div>-->
            </div>
            <div class="right"></div>
        </div>
        <div class="footer"></div>
    </div>

</template>

<script>
    import GLOBAL from './../../../plugins/global_variable'
    export default {
        name: "LStestlistenS",
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
                //测试的总组数
                test_length:'',
                //当前的组数
                current_group:'',

            };
        },
        methods: {

            forced_jump() {
                this.$router.push('/LStestjudgeS');
            },

        },
        created() {//生命周期函数


            //用户已听了一句子
            GLOBAL.user_total_S++;
            //取临时数组中的第一个元素来播放并移除
            var audio = new Audio(GLOBAL.temp_LS_src.shift());
            //如果播放完了就进行页面跳转
            audio.addEventListener("ended", this.forced_jump);
            audio.play();

            console.log(GLOBAL.train_react_S);
            //赋值测试的组数个数
            this.test_length=GLOBAL.test_length;

            // //赋值测试的当前组数
            this.current_group=GLOBAL.test_correct_L.length+1;

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