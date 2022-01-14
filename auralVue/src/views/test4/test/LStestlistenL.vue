<template>
    <div class="container">
        <div class="header">
<!--            <h1 class="el-row">欢迎来到题型四的正式测试</h1>-->
            <el-progress :text-inside="true" :stroke-width="24" :percentage="(current_group/15*100).toFixed(0)*1" status="success"></el-progress>
            <h2 style="color: red; text-align: center">这部分测试不能做笔记</h2>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
<!--                <div class="el-row">-->
<!--                    <div>你正在听相应的<h1 >字母</h1>音频。。。。</div>-->
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
        name: "LStestlistenL",
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
        created() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

            document.body.style.backgroundColor="#DCDCDC";
        },
        mounted() {
            //取临时数组中的第一个元素来播放并移除
            let audio = new Audio(GLOBAL.temp_LS_src.shift());
            //这里的force_jump需要判断临时数组是否为空，如果为空，则跳到字母判断页面，
            //不为空就继续跳到听句子界面。
            audio.addEventListener("ended", this.forced_jump);
            audio.play();
            //赋值测试的组数个数
            this.test_length=GLOBAL.test_length;
            // //赋值测试的当前组数
            this.current_group=GLOBAL.test_correct_L.length;
        },
        methods: {
            forced_jump() {
                //如果临时数组为空，跳到字母判断
                if (GLOBAL.temp_LS_src.length === 0) {
                    this.$router.push('/LStestjudgeL');
                }
                //否则跳到听句子
                else {
                    this.$router.push('/LStestjudgeS');
                }
            },
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