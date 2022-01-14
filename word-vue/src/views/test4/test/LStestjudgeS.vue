<template>
    <div class="container">
        <div class="header">
            <el-progress :text-inside="true" :stroke-width="24" :percentage="(current_group/15*100).toFixed(0)*1" status="success"></el-progress>
            <h2 style="color: red; text-align: center">这部分测试不能做笔记</h2>
            <div class="header-content">
                <div class ="left" ></div>
                <div class="center"></div>
                <div class="right">
                    <div class="right-row"  style="color: #dc143c">
                        <h1>
                            {{test_S_accuracy}}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class ="left" ></div>
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
        name: "LStestjudgeS",
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
                //测试的总组数
                test_length:'',
                //当前的组数
                current_group:'',

                // 本次句子有意义否
                // des: '',
                //用于中断计时器
                timer: '',
                //前面句子理解的反应时间的均值+2.5*标准差
                // time_limit: '',
                show:false,
                test_S_accuracy:'',
                word:'',
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
            this.test_S_accuracy=GLOBAL.test_S_accuracy;
            //赋值测试的组数个数
            this.test_length=GLOBAL.test_length;
            // //赋值测试的当前组数
            this.current_group=GLOBAL.test_correct_L.length;

            //这里先提取train_LS_src中的第一个元素，即第一个数组赋给临时数组
            if (GLOBAL.temp_LS_src.length === 0) {
                GLOBAL.temp_LS_src = GLOBAL.test_LS_src.shift();
                GLOBAL.temp_LS_des = GLOBAL.test_LS_des.shift();
                GLOBAL.temp_Letter_len = GLOBAL.temp_LS_src.length / 2;
            }
            this.order_show();
        },
        methods: {
            order_show(){
                this.word=GLOBAL.temp_LS_src.shift();
                this.start_time=Date.now();
                this.change_show_timing();
                GLOBAL.user_total_S++;
            },
            change_show_timing(){
                // this.show=!this.show;
                //开始计时，用于判断是否超时
                this.timer = setInterval(() => {
                    GLOBAL.time_limit++;
                    this.forced_jump();
                }, 100)
            },
            forced_jump() {
                // 如果超时了
                if (GLOBAL.time_limit >= GLOBAL.mean_std / 100) {
                    GLOBAL.temp_answer.push(" ");
                    this.end_time=Date.now();
                    GLOBAL.react_array.push(this.end_time-this.start_time);
                    //结束计时
                    clearInterval(this.timer);
                    //记录正式测试，用户的反应时间
                    GLOBAL.test_react_S.push(GLOBAL.mean_std);
                    //重新赋值为0
                    GLOBAL.time_limit = 0;
                    //用户做出的判断默认为NaN，NaN既不等于true,也不等于false
                    GLOBAL.user_S_judge.push('');
                    //强行转到下一页面
                    this.$router.push('/LStestlistenL');
                }
            },
            correct() {
                GLOBAL.temp_answer.push("正确");
                this.end_time=Date.now();
                GLOBAL.react_array.push(this.end_time-this.start_time);
                this.show=true;
                // 将用户做出的判断填入数组内
                GLOBAL.user_S_judge.push('true');
                //这里也需要清除这个定时器
                clearInterval(this.timer);
                //这里计时time_limit两个作用，一：用于保证用户在规定时间内作答；二，保存用户的反应时间
                //记录正式测试，用户的反应时间
                GLOBAL.test_react_S.push(GLOBAL.time_limit);
                //重新将计时赋值为0
                GLOBAL.time_limit = 0;
                //间隔一段时间再听字母
                this.timer = setTimeout(()=>{
                    this.$router.push('/LStestlistenL');
                },500)
            },
            wrong() {
                GLOBAL.temp_answer.push("错误");
                this.end_time=Date.now();
                GLOBAL.react_array.push(this.end_time-this.start_time);
                this.show=true;
                // 将用户做出的判断填入数组内
                GLOBAL.user_S_judge.push('false');

                //这里也需要清除这个定时器
                clearInterval(this.timer);
                //这里计时time_limit两个作用，一：用于保证用户在规定时间内作答；二，保存用户的反应时间
                //记录正式测试，用户的反应时间
                GLOBAL.test_react_S.push(GLOBAL.time_limit);
                //重新将计时赋值为0
                GLOBAL.time_limit = 0;
                //间隔一段时间再听字母
                this.timer = setTimeout(()=>{
                    this.$router.push('/LStestlistenL');
                },500)
            },
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
.header-content{
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
.center-height{
    height:20vh;
    margin-bottom:50px
}
.center{
    flex: 1;
}
.row{
    display: flex;
    justify-content: space-around;
    margin-bottom:80px
}
.right-row{
    display: flex;
    flex-direction: row;
    justify-content:center;
    margin-bottom:80px
}
.confirm{
    font-size:25px;
    font-weight:500;
}
</style>