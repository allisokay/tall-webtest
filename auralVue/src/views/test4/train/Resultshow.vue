<template>
    <div class="container">
        <div class="header">
<!--            <h1 class="el-row">测试二</h1>-->
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="el-row">
                    <h1>你在本组中的学习结果如下:</h1>
                </div>
                <div class="el-row">
                    <div class="confirm" style="color: #dc143c">句子判断的正确率：{{accuracy}}</div>
                </div>
                <div class="el-row">
                    <el-tag class="confirm">字母记忆的结果：{{result_L}}</el-tag>
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
        name: "Resultshow",
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
                //显示字母的结果
                result_L: '',
                //显示句子的结果
                result_S: '',
                //显示本组的句子的正确率
                accuracy: '',
                //显示在点击按钮上的文字
                next_group: '',
                timer:'',
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
            //重新将用户判断的句子正确与否置为空,这里我会复用到正式测试。
            GLOBAL.user_S_judge = [];
            //显示结果
            this.show();
            //存字母的数据
            this.save();
            //自动跳转
            this.jump();
        },
        beforeDestroy() {
            clearTimeout(this.timer);
        },
        methods: {
            show() {
                //全局变量传来值，渲染到页面中
                //取句子描述二维数组的第一个数组
                // var sentence_des = GLOBAL.train_S_des.shift();
                let half_length = GLOBAL.temp_LS_des.length / 2;
                //GLOBAL.train_correct_L[GLOBAL.train_correct_L.length-1]取这个数组的最后一个值
                //GLOBAL.train_L_des.shift().length移除字母描述的第一个数组，同时得到其长度
                this.result_L = String(GLOBAL.train_correct_L[GLOBAL.train_correct_L.length - 1]) +
                    '/' + String(half_length) + '正确';

                // this.result_S = String(sentence_des.length - GLOBAL.train_correct_S[GLOBAL.train_correct_S.length - 1]) + '句子错误';
                this.accuracy = String((GLOBAL.train_correct_S[GLOBAL.train_correct_S.length - 1] / half_length * 100).toFixed(2)) + '%'

            },
            jump(){
                //如果本次训练结束了
                if (GLOBAL.test4_audio3_src.length === 0) {
                    //间隔一秒后再跳转
                    this.timer = setTimeout(()=>{
                        this.$router.push('/LStest');
                    },2000)
                }
                //如果没有，则进行下一组的训练
                else {
                    this.timer = setTimeout(()=>{
                        this.$router.push('/LStrainjudgeS');
                    },2000)
                }
            },
            sum(arr){
                let sum = 0;
                for (let i = 0, len = arr.length; i < len; i++) {
                    sum += arr[i];
                }
                return sum;
            },
            save() {
                let content = {};
                let date = new Date();
                content.part_email = GLOBAL.email;
                content.number=GLOBAL.number;
                content.trial_index = "letter_sentence_L"+String(GLOBAL.trial_index);
                content.trial_type = "letter_sentence_L";
                content.exp_type = GLOBAL.test4_materialType // 新增字段
                content.user_answer = GLOBAL.temp_answer; // 新增字段
                let correct_answer = [];
                for (let i = 1; i < GLOBAL.temp_LS_des.length; i += 2) {
                    correct_answer.push(GLOBAL.temp_LS_des[i]);
                }
                content.correct_answer = String(correct_answer);
                content.letter=GLOBAL.train_correct_L[GLOBAL.train_correct_L.length - 1];
                content.sentence_array=GLOBAL.sentence_array;
                let correct = (this.sum(content.sentence_array)/content.sentence_array.length*100).toFixed(0)+"%";
                content.sentence_rate_array=new Array(content.sentence_array.length).fill(correct);
                content.total_item =content.sentence_array.length;
                content.letter_rate = String((content.letter * 100 / content.total_item).toFixed(0)) + '%';
                content.exp_date =  date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
                content.exp_Session = GLOBAL.session;
                content.rt = GLOBAL.react_array;
                GLOBAL.test4_part2_dataBag.push(content);
                console.log(content);
                /*axios.post('test4info/save_array', content).then(
                    function (resp) {
                        if (resp.data === "success") {
                            console.log("ok")
                        }
                    });*/
                GLOBAL.number=GLOBAL.number+content.rt.length;
                GLOBAL.trial_index++;
                //都在save里面重置
                //重置全局变量
                GLOBAL.react_array=[];
                GLOBAL.sentence_array=[];
                GLOBAL.sentence_rate_array=[];
                GLOBAL.temp_answer = [];
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
    .confirm{
        font-size:25px;
        font-weight:500;
    }
</style>