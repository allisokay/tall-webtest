<template>

    <div class="container">
        <div class="header">
            <h2 style="color: red; text-align: center">这部分测试不能做笔记</h2>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
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
                audios:[], // 本阶段所需所有音频
                audio:'',
                //用于中断计时器
                timer_1: null,
                timer_2: null,
                show:true,
                start_time:'',
                end_time:'',
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
            if (GLOBAL.temp_LS_src.length === 0) {
                GLOBAL.temp_LS_src = GLOBAL.test4_audio3_src.shift()
                GLOBAL.temp_LS_des = GLOBAL.test4_audio3_des.shift()
            }

            this.order_play();
        },
        beforeDestroy() {
            clearTimeout(this.timer_2);
        },
        methods: {
            order_play() {
                //取音频数组中的第一个元素来播放并移除
                this.audio = new Audio(GLOBAL.temp_LS_src.shift());

                //如果播放完了就进行页面跳转
                this.audio.addEventListener("ended", ()=>{this.change_show_timing()});
                // 开始计时，用于记录反应时间
                this.start_time=Date.now();
                //开始计时，用于判断是否超时
                this.timer_1 = setInterval(() => {
                    GLOBAL.time_limit++;
                    this.forced_jump();
              }, 100)
                this.audio.play();
            },
            change_show_timing(){
                this.show=false;
            },
            forced_jump() {
                // 如果超时了
                if (GLOBAL.time_limit >= GLOBAL.mean_std / 100) {
                    // 记录用户的选择
                    GLOBAL.temp_answer.push(" ")
                    this.end_time=Date.now();
                    GLOBAL.react_array.push(this.end_time-this.start_time);

                    //结束计时
                    clearInterval(this.timer_1);
                    //重新赋值为0
                    GLOBAL.time_limit = 0;
                    //用户做出的判断默认为NaN，NaN既不等于true,也不等于false
                    GLOBAL.user_S_judge.push('');
                    //强行转到下一页面
                    this.$router.push('/LStrainlistenL');
                }
            },
            correct() {
                // 记录用户的选择
                GLOBAL.temp_answer.push("正确")
                this.end_time=Date.now();
                GLOBAL.react_array.push(this.end_time-this.start_time);
                this.show=true
                // 将用户做出的判断填入数组内
                GLOBAL.user_S_judge.push('true');
                //这里也需要清除这个定时器
                clearInterval(this.timer_1);
                //重新将计时赋值为0
                GLOBAL.time_limit = 0;
                //间隔一段时间再听字母
                this.timer_2 = setTimeout(()=>{
                    this.$router.push('/LStrainlistenL');
                },200)
            },
            wrong() {
                // 记录用户的选择
                GLOBAL.temp_answer.push("错误")
                this.end_time=Date.now();
                GLOBAL.react_array.push(this.end_time-this.start_time);
                this.show=true
                // 将用户做出的判断填入数组内
                GLOBAL.user_S_judge.push('false');

                //这里也需要清除这个定时器
                clearInterval(this.timer_1);
                //重新将计时赋值为0
                GLOBAL.time_limit = 0;
                //间隔一段时间再听字母
                this.timer_2 = setTimeout(()=>{
                    this.$router.push('/LStrainlistenL');
                },200)
            }
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
    .confirm{
        font-size:25px;
        font-weight:500;
    }
</style>