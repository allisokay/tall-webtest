<template>
    <div class="container">
        <div class="header">
            <h2 style="color: red; text-align: center">这部分测试不能做笔记</h2>
        </div>
        <div class="content">
            <div class="left"></div>

            <div class="center">
                <div class="row">
                    <el-button class="normal" v-for="(letter, index) in letter_array_top" :key="index" @click="click_letter(letter)" v-show="show" :disabled="!canClick">{{letter}}</el-button>
                </div>

                <div class="row">
                    <el-button class="normal" v-for="(letter, index) in letter_array_bottom" :key="index" @click="click_letter(letter)" v-show="show" :disabled="!canClick">{{letter}}</el-button>
                </div>

                <div class="row">
                    <el-row><el-button class="normal" @click="click_space" v-show="show" :disabled="!canClick">空格</el-button></el-row>
                    <div>
                        <span class="normal" v-for="item in check_array" style="margin-left: 15px"> {{item}}</span>
                    </div>
                </div>

                <div class="row">
                    <el-button class="confirm" type="primary" @click="click_delete" v-show="show" :disabled="!canClick">清除</el-button>
                    <el-button class="confirm" type="primary" @click="submit" v-show="show" :disabled="!canClick">确认</el-button>
                </div>

                <div class="row">
                    <h2>{{result}}</h2>
                    <el-button type="primary" v-show="can_go_on" @click="go_on()"><h2>{{go_on_button}}</h2></el-button>
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
        name: "Lettertrainjudge",
        data() {
            return {
                test4_audio_3:[
                    require("../../../assets/static/test4/newAudio/C_Y.mp3"),
                    require("../../../assets/static/test4/newAudio/T_A_F.mp3"),
                    require("../../../assets/static/test4/newAudio/W_S_I.mp3"),
                    require("../../../assets/static/test4/newAudio/R_J_V_H.mp3"),
                ],
                // 存放句子正确多少的内容
                result: '',
                correct:0,
                //存放“继续”两个字
                go_on_button:'',
                // 用户自己认为听到的字母的数组
                check_array: [],
                // 实际的数组答案
                actual_arrays: [
                    ['C', 'Y'],
                    ['T', 'A', 'F'],
                    ['W', 'S', 'I'],
                    ['R', 'J', 'V', 'H'],
                ],
                actual_array:[],
                // 选中按钮后不能再次点击了
                show: false,
                canClick:true,
                can_go_on:false,
                //显示在上端的按钮
                letter_array_top:['C','T','R','F','V','S'],
                //显示在下端的按钮
                letter_array_bottom:['Y','A','J','W','H','I'],
                start_time:'',
                end_time:'',
            };
        },
        mounted() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });
        },
        created() {
            this.order_play();

            document.body.style.backgroundColor="#DCDCDC";
        },
        methods: {
            order_play() {
                let music = new Audio(this.test4_audio_3.shift());
                this.actual_array = this.actual_arrays.shift()
                music.addEventListener("ended", ()=>{
                    // 打乱上排字母原始顺序
                    this.letter_array_top.sort(function() {
                        return .6 - Math.random();
                    });
                    // 打乱下排字母原始顺序
                    this.letter_array_bottom.sort(function() {
                        return .6 - Math.random();
                    });

                    this.show = true;
                    this.start_time=Date.now();
                });
                music.play();
            },
            //双向绑定的使用
            //限制输入的个数
            click_letter(letter){
                if(this.check_array.length < this.actual_array.length) {
                    this.check_array.push(letter);
                }
            },
            click_space() {
                //限制输入的个数
                if(this.check_array.length < this.actual_array.length) {
                    this.check_array.push('?');
                }
            },
            click_delete() {
                this.check_array.pop();
            },
            submit() {
                this.end_time=Date.now();
                GLOBAL.react=this.end_time-this.start_time
                //计算正确的个数
                let result = this.correct_letter(this.check_array, this.actual_array);
                //显示给用户
                this.correct = result.correct;
                this.result = String(this.correct) + '/' + String(this.actual_array.length) + '正确 点击继续';
                this.can_go_on=true
                this.go_on_button='继续'
                this.canClick=false

                this.save();
            },
            correct_letter(check_arry, actual_array) {
                let result = {
                    correct: 0,
                    each_result: [],
                }
                for (let i = 0; i < actual_array.length; i++) {
                    if (actual_array[i] === check_arry[i]) {
                        result.correct++;
                        result.each_result.push("true");
                    } else {
                        result.each_result.push("false");
                    }
                }
                return result;
            },
            save() {
                let content = {}
                let date = new Date()
                content.part_email = GLOBAL.email;
                content.number=GLOBAL.number;
                content.trial_index="letter_T"+String(GLOBAL.trial_index);
                content.trial_type = "letter_T";
                content.user_answer= String(this.check_array);//增加的字段，后端需改之，再议
                content.correct_answer = String(this.actual_array);
                content.letter = this.correct;
                content.total_item =this.actual_array.length;
                content.letter_rate = String((content.letter * 100 / content.total_item).toFixed(0)) + '%';
                content.exp_date =  date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
                content.exp_Session = GLOBAL.session;
                content.rt = GLOBAL.react;
                GLOBAL.test4_part2_dataBag.push(content);
                console.log(content);
                /*axios.post('test4info/save', content).then(
                    function (resp) {
                        if (resp.data === "success") {
                            console.log("ok")
                        }
                    });*/
                GLOBAL.number++;
                GLOBAL.trial_index++;

                //都在save里面重置
                //重置全局变量
                GLOBAL.react=0
                GLOBAL.right=0;

            },
            go_on() {
                if (this.test4_audio_3.length !== 0) {
                    this.check_array=[];
                    this.result='';
                    this.go_on_button='';
                    this.can_go_on=false;
                    this.show = false;
                    this.canClick=true;
                    this.order_play();
                } else {
                    this.$router.push('/Sentencetrain'); // Sentenceplayjudge
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
    .left, .right{
        width:400px;
    }
    .center{
        flex: 1;
    }
    .row{
        display: flex;
        justify-content: space-around;
        margin-bottom:60px
    }
    .normal{
        font-family: "akkurat", sans-serif;
        font-size:30px;
        font-weight:700;
    }
    .confirm{
        font-size:25px;
        font-weight:500;
    }
</style>