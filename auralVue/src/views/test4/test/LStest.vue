<template>
    <div class="container">
        <div class="header">
            <h2 style="color: red; text-align: center">这部分测试不能做笔记</h2>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="row">
                    <h2>正式测试开始</h2>
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
        name: "LStest",
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
                timer:'',
                audio:'',
            };
        },
        created() {
            // 混合阶段数据上次测试
            /*axios.post('test4info/saveAll', GLOBAL.test4_part2_dataBag.slice(0, 18)).then((resp)=> {
                if (resp.data === "success") {
                    console.log("saveAll() is ok");
                } else {
                    console.log("saveAll() isn't ok");
                }
            });
            axios.post('test4info/save_array_all', GLOBAL.test4_part2_dataBag.slice(18, 20)).then((resp)=> {
                if (resp.data === "success") {
                    this.canEnd = true;
                    console.log("save_array_all() is ok")
                } else {
                    console.log("sava_array_all() isn't ok");
                }
            });*/
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

            document.body.style.backgroundColor="#DCDCDC";
        },
        mounted() {
            GLOBAL.trial_index = 0;
            GLOBAL.react_array = [];
            GLOBAL.sentence_array=[];
            GLOBAL.sentence_rate_array=[];
            GLOBAL.temp_answer = [];
            // 打乱测试材料顺序，即不按3~7句的顺序进行
            this.shuffleMaterial()

            this.audio= [require("../../../assets/static/test4/newAudio/Instruction_70.mp3")];
            this.order_play();
        },
        beforeDestroy() {
            clearTimeout(this.timer);
        },
        methods:{
            // 打乱测试材料数组顺序；正确答案数组需与之保持同步
            shuffleMaterial() {
                let array1 = Array.from({length: 15}, (item, index) => index);
                let array2 = Array.from({length: 15}, (item, index) => index);
                let array3 = Array.from({length: 15}, (item, index) => index);

                //打乱音频数组，正确答案数组，正确文本数组下标，使用乱序下标进行交换
                for (let i = 14; i >= 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [array1[i], array1[j]] = [array1[j], array1[i]];
                    [array2[i], array2[j]] = [array2[j], array2[i]];
                    [array3[i], array3[j]] = [array3[j], array3[i]];
                }
                for (let i = 0; i <= 14; i++) {
                    array1[i] = GLOBAL.test4_audio4_src[array1[i]];
                    array2[i] = GLOBAL.test4_audio4_des[array2[i]];
                    array3[i] = GLOBAL.test4_part2_Trial_index[array3[i]];
                }
                GLOBAL.test4_audio4_src = array1;
                GLOBAL.test4_audio4_des = array2;
                GLOBAL.test4_part2_Trial_index = array3;
            },
            forced_jump() {
                this.timer = setTimeout(()=>{
                    this.$router.push('/LStestjudgeS');
                },300);
            },
            order_play() {
                //如果数组长度为0，即播放完了
                if (this.audio.length === 0) {
                    this.forced_jump();
                } else {
                    let music = new Audio(this.audio.shift());
                    music.addEventListener("ended", this.order_play);
                    music.play();
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
</style>