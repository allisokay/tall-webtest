<template>
    <div class="container">
        <div class="header">
            <h2 style="color: red; text-align: center">这部分测试不能做笔记</h2>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="row">
                    <el-button class="normal" v-for="(letter, index) in letter_array_top" :key="index" @click="click_letter(letter)">{{letter}}</el-button>
                </div>

                <div class="row">
                    <el-button class="normal" v-for="(letter, index) in letter_array_bottom" :key="index" @click="click_letter(letter)">{{letter}}</el-button>
                </div>

                <div class="row">
                    <el-button class="normal" @click="click_space">空格</el-button>
                    <div>
                        <span class="normal" v-for="item in check_array" style="margin-left: 15px"> {{item}}</span>
                    </div>
                </div>
                <div class="row">
                    <el-button class="confirm" type="primary" @click="click_delete">清除</el-button>
                    <el-button class="confirm" type="primary" @click="submit" :disabled="show">确认</el-button>
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
        name: "LStrainjudgeL",
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

                // 用户自己认为听到的字母的数组
                check_array: [],
                //本组训练中的实际数组的长度
                letter_length:'',
                //显示在上端的按钮
                letter_array_top:['C','T','R','F','V','S'],
                //显示在下端的按钮
                letter_array_bottom:['Y','A','J','W','H','I'],
                start_time:'',
                end_time:'',
                show:false,
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
            this.start_time=Date.now();
            //取出本组训练中的字母的长度
            this.letter_length=GLOBAL.temp_LS_des.length/2;

            // 开始两分钟倒计时，若未点击确认则自动跳过
            let time_limit = 0;
            this.timer = setInterval(()=>{
                time_limit++;
                if (time_limit === 120) {
                    this.force_jump();
                }
            }, 1000)
        },
        methods: {
            //双向绑定的使用
            //限制输入的个数
            click_letter(letter){
                if(this.check_array.length < this.letter_length) {
                    this.check_array.push(letter);
                }
            },
            click_space() {
                //限制输入的个数
                if(this.check_array.length < this.letter_length) {
                    this.check_array.push('?');
                }
            },
            click_delete() {
                this.check_array.pop();
                //this.check_array=[];
            },
            force_jump() {
                clearInterval(this.timer);
                for (let i = 0; i < this.letter_length; i++) {
                    GLOBAL.temp_answer.push(" ");
                }
                GLOBAL.user_L_judge = [];
                GLOBAL.react_array.push(" ");
                GLOBAL.train_correct_L.push(this.correct_letter(GLOBAL.user_L_judge, GLOBAL.temp_LS_des));
                GLOBAL.train_correct_S.push(this.correct_sentence(GLOBAL.user_S_judge, GLOBAL.temp_LS_des));
                this.$router.push('/Resultshow')
            },
            submit() {
                clearInterval(this.timer);
                for (let i = 0; i < this.check_array.length; i++) {
                    GLOBAL.temp_answer.push(this.check_array[i]);
                }
                if (this.check_array.length < this.letter_length) {
                    for (let i = this.check_array.length; i < this.letter_length; i++) {
                        GLOBAL.temp_answer.push(" ");
                    }
                }
                this.end_time=Date.now();
                GLOBAL.react_array.push(this.end_time-this.start_time);
                this.show=true;
                //将用户判断正确字母的个数push进入train_correct_L
                //这里只是读取train_L_des二维数组中的第一个数组，在下一个Resultshow中会将第一个数组删除掉
                // GLOBAL.train_correct_L.push(this.correct_letter(this.check_array, GLOBAL.train_L_des[0]));
                GLOBAL.train_correct_L.push(this.correct_letter(this.check_array, GLOBAL.temp_LS_des));
                //将用户判断正确句子的个数push进入train_correct_S
                //这里只是读取train_S_des二维数组中的第一个数组，在下一个Resultshow中会将第一个数组删除掉
                //也会在下一个页面将user_S_judge置为空
                // GLOBAL.train_correct_S.push(this.correct_letter(GLOBAL.user_S_judge, GLOBAL.train_S_des[0]));
                GLOBAL.train_correct_S.push(this.correct_sentence(GLOBAL.user_S_judge, GLOBAL.temp_LS_des));
                this.$router.push('/Resultshow')

            },
            correct_letter(L_array, SL_array) {
                let correct = 0;
                for (let i = 1,j=0; i < SL_array.length; i=i+2,j++) {
                    if (L_array[j]===SL_array[i])
                        correct++;
                }
                return correct;
            },
            correct_sentence(S_array, SL_array) {
                let correct = 0;
                for (let i = 0,j=0; i < SL_array.length; i=i+2,j++) {
                    if (S_array[j]===SL_array[i]) {
                        correct++;
                        GLOBAL.sentence_array.push(1);
                    } else {
                        GLOBAL.sentence_array.push(0);
                    }
                }
                return correct;
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
    .normal{
        font-size:30px;
        font-weight:700;
        font-family: "akkurat", sans-serif;
    }
    .confirm{
        font-size:25px;
        font-weight:500;
    }

</style>