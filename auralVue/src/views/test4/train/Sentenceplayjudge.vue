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
                <div class="el-row">
                    <h2>{{result}}</h2>
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
        name: "Sentenceplayjudge",
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
                answer:'',
                // 选中按钮后不能再次点击了
                show: true,
                //中断计时器
                timer:'',
                start_time:'',
                end_time:'',
            };
        },
        created() {
            //将句子理解的描述内容赋给this.des
            this.des = GLOBAL.test4_audio1_des.shift();
            document.body.style.backgroundColor="#DCDCDC";

            this.order_play()
        },
        mounted() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });
        },
        beforeDestroy() {
            //中断计时器
            clearTimeout(this.timer);
        },
        methods: {
            order_play(){
                // 每次播放新句子音频时不显示上次判断的结果
                this.result=''
                //读取第一个音频源
                let audio = new Audio(GLOBAL.test4_audio1_src.shift());
                //音频播放完了就进入下一个页面
                audio.addEventListener("ended", this.change_show);
                this.start_time=Date.now();
                audio.play();
            },
            change_show(){
                this.show=!this.show
            },
            correct() {
                this.answer = "正确"
                this.end_time=Date.now();
                GLOBAL.react=this.end_time-this.start_time;
                if (this.des==='true') {
                    this.result = '回答正确';
                    GLOBAL.right=1;
                } else {
                    this.result = '回答错误';
                    GLOBAL.right=0;
                }

                this.change_show();
                this.save();

                //如果玩的句子理解听完了
                if (GLOBAL.test4_audio1_src.length === 0 && GLOBAL.test4_audio1_des.length === 0) {
                    this.timer = setTimeout(()=>{
                        this.$router.push('/Sentencetrainbegin');
                    },2000)
                } else {
                    this.timer = setTimeout(()=>{
                        this.des = GLOBAL.test4_audio1_des.shift();
                        this.order_play();
                    },2000)
                }
            },
            wrong() {
                this.answer = "错误"
                this.end_time=Date.now();
                GLOBAL.react=this.end_time-this.start_time;
                if (this.des==='true') {
                    this.result = '回答错误';
                    GLOBAL.right=0;
                } else {
                    this.result = '回答正确'
                    GLOBAL.right=1;
                }
                this.change_show();
                this.save();

                //如果玩的句子理解听完了
                if (GLOBAL.test4_audio1_src.length === 0 && GLOBAL.test4_audio1_des.length === 0) {
                    this.timer = setTimeout(()=>{
                        this.$router.push('/Sentencetrainbegin'); // LStrain
                    },2000)
                } else {
                    this.timer = setTimeout(()=>{
                        this.order_play();
                        this.des = GLOBAL.test4_audio1_des.shift();
                    },2000)
                }
            },
            save() {
                var content = {}
                var date = new Date()
                content.part_email = GLOBAL.email;
                content.number=GLOBAL.number;
                content.trial_index="sentence_L"+String(GLOBAL.trial_index);
                content.trial_type = "sentence_L";
                content.exp_type = GLOBAL.test4_materialType;
                content.user_answer = this.answer;
                content.sentence= GLOBAL.right;
                content.total_item =1;
                content.sentence_rate = String((content.sentence * 100 / content.total_item).toFixed(0)) + '%';
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