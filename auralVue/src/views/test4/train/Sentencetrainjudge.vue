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
                <div class="row">
                    <div style="color: #dc143c">{{result}}</div>
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

        name: "Sentencetrainjudge",
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

                result: '',
                // 本次句子有意义否
                des: '',
                // 选中按钮后不能再次点击了
                show: true,
                //用于释放setInterval
                timer: '',
                click_time:'',
                over_time:0,
                start_time:'',
                end_time:'',
            };
        },
        created() {
            document.body.style.backgroundColor="#DCDCDC";

            //将句子理解的描述内容赋给this.des
            this.des = GLOBAL.test4_audio2_des.shift();
            this.order_play();
        },
        mounted() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });
        },
        beforeDestroy() {
            clearTimeout(this.timer);
        },
        methods: {
            order_play() {
                //读取第一个音频源
                var audio = new Audio(GLOBAL.test4_audio2_src.shift())
                //音频播放完了
                audio.addEventListener("ended", this.change_show_timing)
                this.start_time=Date.now();
                audio.play()
                //用户已听了一句话
                GLOBAL.user_total_S++
            },
            //用于播放中的，先让按钮可以按，且同时开始计时
            change_show_timing() {
                this.show=false;
            },
            correct() {
                this.end_time=Date.now();
                GLOBAL.react_array.push(this.end_time-this.start_time);
                console.log(this.end_time - this.start_time)
                //将计时加进数组中
                //GLOBAL.train_react_S.push(GLOBAL.react_time);
                //重置反应时间0
                //GLOBAL.react_time = 0;
                //this.over_time=0;
                //如果用户判断正确了，全局变量user_right_S加1
                if (this.des==='true') {
                    GLOBAL.user_right_S++;
                    GLOBAL.sentence_array.push("1");
                    GLOBAL.sentence_rate_array.push("100%");
                }
                else {
                    GLOBAL.sentence_array.push("0");
                    GLOBAL.sentence_rate_array.push("0%");
                }
                this.result = (GLOBAL.user_right_S/GLOBAL.user_total_S*100).toFixed(2)+'%';
                this.show = true;

                //如果句子理解正式训练听完了
                if (GLOBAL.test4_audio2_src.length === 0 && GLOBAL.test4_audio2_des.length === 0) {
                    this.timer = setTimeout(()=>{
                        this.$router.push('/LStrain');
                    },1000)
                }
                //如果没有听完
                else {
                    this.timer = setTimeout(()=>{
                        this.des = GLOBAL.test4_audio2_des.shift();
                        this.order_play();
                    },1000)
                }
            },
            wrong() {
                this.end_time=Date.now();
                GLOBAL.react_array.push(this.end_time-this.start_time);
                console.log(this.end_time - this.start_time)
                //将计时加进数组中
                //GLOBAL.train_react_S.push(GLOBAL.react_time);
                //重置反应时间为0
                //GLOBAL.react_time = 0;
                //this.over_time=0;
                //如果用户判断正确了，全局变量user_right_S加1
                if (this.des==='false') {
                    GLOBAL.user_right_S++;
                    GLOBAL.sentence_array.push("1");
                    GLOBAL.sentence_rate_array.push("100%");;
                }
                else {
                    GLOBAL.sentence_array.push("0");
                    GLOBAL.sentence_rate_array.push("0%");
                }
                //保留小数点后两位
                this.result = (GLOBAL.user_right_S/GLOBAL.user_total_S*100).toFixed(2)+'%';

                //不能再点击
                this.show = true;
                //如果句子理解正式训练听完了
                if (GLOBAL.test4_audio2_src.length === 0 && GLOBAL.test4_audio2_des.length === 0) {
                    this.timer = setTimeout(()=>{
                        this.$router.push('/LStrain');
                    },1000)
                }
                //如果没有听完
                else {
                    this.timer = setTimeout(()=>{
                        this.des = GLOBAL.test4_audio2_des.shift();
                        this.order_play();
                    },1000)
                }
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