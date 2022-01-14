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
                <div class="row">
                    <div class="confirm" style="color: #dc143c">{{result}}</div>
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
                show: false,
                //用于释放setInterval
                timer: '',
                click_time:'',
                over_time:0,
                word:'',
                words:[],
                start_time:'',
                end_time:'',
            };
        },
        created() {
            //将句子理解的描述内容赋给this.des
            this.des = GLOBAL.sentence_des.shift();
        },
        mounted() {
            this.order_show();
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

            document.body.style.backgroundColor="#DCDCDC";
        },
        methods: {
            correct() {
                this.end_time=Date.now();
                GLOBAL.react_array.push(this.end_time-this.start_time);
                console.log(this.end_time - this.start_time)
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
                this.change_show();
                //如果句子理解正式训练听完了
                if (GLOBAL.sentence_des.length === 0 && GLOBAL.sentence_src.length === 0) {
                    this.timer = setTimeout(()=>{
                        this.$router.push('/LStrain');
                    },1000)
                }
                //如果没有听完
                else {
                    this.timer = setTimeout(()=>{
                        this.order_show()
                        this.change_show();
                        this.des = GLOBAL.sentence_des.shift();
                    },1000)
                }
            },
            wrong() {
                this.end_time=Date.now();
                GLOBAL.react_array.push(this.end_time-this.start_time);
                console.log(this.end_time - this.start_time)
                //如果用户判断正确了，全局变量user_right_S加1
                if (this.des==='false') {
                    GLOBAL.user_right_S++;
                    GLOBAL.sentence_array.push("1");
                    GLOBAL.sentence_rate_array.push("100%");
                }
                else {
                    GLOBAL.sentence_array.push("0");
                    GLOBAL.sentence_rate_array.push("0%");
                }
                //保留小数点后两位
                this.result = (GLOBAL.user_right_S/GLOBAL.user_total_S*100).toFixed(2)+'%';

                //不能再点击
                this.change_show();
                //如果句子理解正式训练听完了
                if (GLOBAL.sentence_des.length === 0 && GLOBAL.sentence_src.length === 0) {
                    this.timer = setTimeout(()=>{
                        this.$router.push('/LStrain');
                    },1000)
                }
                //如果没有听完
                else {
                    this.timer = setTimeout(()=>{
                        this.order_show();
                        this.change_show();
                        this.des = GLOBAL.sentence_des.shift();
                    },1000)
                }
            },
            order_show() {
                this.word=GLOBAL.sentence_src.shift();
                this.start_time=Date.now();
                // //用户已听了一句话
                GLOBAL.user_total_S++;
            },
            change_show() {
                this.show=!this.show
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