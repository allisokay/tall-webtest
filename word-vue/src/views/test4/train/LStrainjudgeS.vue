<template>

    <div class="container">
        <div class="header">
            <h2 style="color: red; text-align: center">这部分测试不能做笔记</h2>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="el-row">
                    <h1>{{word}}</h1>
                </div>
                <div class="row">
                    <el-button class="confirm" type="primary" @click="correct" :disabled="show">正确</el-button>
                    <el-button class="confirm" type="primary" @click="wrong" :disabled="show">错误</el-button>
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
        name: "LStrainjudgeS",
        data() {
            return {
                // user不一定能用到
                user: {
                    id: 0,
                    email: '',
                    invited_code: '',
                    test_fin_time: '',
                    register_time: '',
                },

                // 本次句子有意义否
                // des: '',
                //用于中断计时器
                timer: '',
                //前面句子理解的反应时间的均值+2.5*标准差
                // time_limit: '',
                show:false,
                word:'',
                start_time:'',
                end_time:'',
            };
        },
        methods: {
            correct() {
                // 记录用户的选择
                GLOBAL.temp_answer.push("正确");
                this.end_time=Date.now();
                GLOBAL.react_array.push(this.end_time-this.start_time);
                this.show=true;
                // 将用户做出的判断填入数组内
                GLOBAL.user_S_judge.push('true');
                //这里也需要清除这个定时器
                clearInterval(this.timer);
                //重新将计时赋值为0
                GLOBAL.time_limit = 0;

                //间隔一段时间再听字母
                this.timer = setTimeout(()=>{
                    this.$router.push('/LStrainlistenL');
                },50)
            },
            wrong() {
                // 记录用户的选择
                GLOBAL.temp_answer.push("错误");
                this.end_time=Date.now();
                GLOBAL.react_array.push(this.end_time-this.start_time);
                this.show=true;
                // 将用户做出的判断填入数组内
                GLOBAL.user_S_judge.push('false');

                //这里也需要清除这个定时器
                clearInterval(this.timer);
                //重新将计时赋值为0
                GLOBAL.time_limit = 0;
                //间隔一段时间再听字母
                this.timer = setTimeout(()=>{
                    this.$router.push('/LStrainlistenL');
                },50)
            },
            forced_jump() {
                // 如果超时了
                if (GLOBAL.time_limit >= GLOBAL.mean_std / 100) {
                    // 记录用户的选择
                    GLOBAL.temp_answer.push(" ");
                    this.end_time=Date.now();
                    GLOBAL.react_array.push(this.end_time-this.start_time);
                    //结束计时
                    clearInterval(this.timer);
                    //重新赋值为0
                    GLOBAL.time_limit = 0;
                    //用户做出的判断默认为NaN，NaN既不等于true,也不等于false
                    GLOBAL.user_S_judge.push(' ');
                    //强行转到下一页面
                    this.$router.push('/LStrainlistenL');
                }
            },
            order_show(){
                this.word=GLOBAL.temp_LS_src.shift();
                this.start_time=Date.now();
                this.change_show_timing();
            },
            change_show_timing(){
                //开始计时，用于判断是否超时
                this.timer = setInterval(() => {
                    GLOBAL.time_limit++;
                    this.forced_jump();
                }, 100)
            },
        },
        mounted() {
            this.order_show();
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });
        },
        created() {
            document.body.style.backgroundColor="#DCDCDC";
            if (GLOBAL.temp_LS_src.length === 0) {
                GLOBAL.temp_LS_src = GLOBAL.train_LS_src.shift()
                GLOBAL.temp_LS_des = GLOBAL.train_LS_des.shift()
            }
        },
        beforeDestroy() {
            clearTimeout(this.timer);
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
        width:300px;
    }
    .center{
        flex: 1;
    }
    .row{
        display: flex;
        justify-content: space-around;
        margin-bottom:80px
    }
    .confirm{
        font-size:25px;
        font-weight:500;
    }
</style>