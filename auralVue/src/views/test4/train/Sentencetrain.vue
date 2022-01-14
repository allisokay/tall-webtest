<template>
    <div class="container">
        <div class="header">
            <h2 style="color: red; text-align: center">这部分测试不能做笔记</h2>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="el-row">
                    <h2>请务必先仔细听清系统播放的提示音</h2>
                </div>
                <div class="row">
                    <el-button class="confirm" type="primary" @click="listen_again">重听</el-button>
                    <el-button class="confirm" type="primary" @click="study" :disabled="show">开始</el-button>
                </div>
            </div>
            <div class="right"></div>
        </div>
        <div class="footer"></div>
    </div>

</template>

<script>
    import GLOBAL from "@/plugins/global_variable";

    export default {
        name: "Sentencetrain",
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
                test4_audio_4:[
                    require("../../../assets/static/test4/newAudio/Instruction_41.mp3"),
                    require("../../../assets/static/test4/newAudio/Instruction_42.mp3"),
                    require("../../../assets/static/test4/newAudio/Instruction_43.mp3"),
                ],
                show:true,
                audios: [],
                audio:'',
            };
        },
        created() {
            // 选择测试材料A/B
            this.chose_AorB();
            // 每个阶段开始前重置该全局变量为1
            GLOBAL.trial_index = 1;
            for (let i = 0; i < this.test4_audio_4.length; i++) {
                this.audios[i] = this.test4_audio_4[i]
            }
            //播放音频
            this.order_play();

            document.body.style.backgroundColor="#DCDCDC";
        },
        mounted() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });
        },
        methods: {
            chose_AorB() {
                if (localStorage.getItem("test1Type") === "A") {
                    this.chose_A();
                } else if (localStorage.getItem("test1Type") === "B") {
                    this.chose_B();
                }
            },
            chose_A() {
                GLOBAL.test4_materialType  = 'A'
                GLOBAL.test4_audio1_src = GLOBAL.test4_audio_A1_src
                GLOBAL.test4_audio1_des = GLOBAL.test4_audio_A1_des
                GLOBAL.test4_audio2_src = GLOBAL.test4_audio_A2_src
                GLOBAL.test4_audio2_des = GLOBAL.test4_audio_A2_des
                GLOBAL.test4_audio3_src = GLOBAL.test4_audio_A3_src
                GLOBAL.test4_audio3_des = GLOBAL.test4_audio_A3_des
                GLOBAL.test4_audio4_src = GLOBAL.test4_audio_A4_src
                GLOBAL.test4_audio4_des = GLOBAL.test4_audio_A4_des
            },
            chose_B() {
                GLOBAL.test4_materialType  = 'B'
                GLOBAL.test4_audio1_src = GLOBAL.test4_audio_B1_src
                GLOBAL.test4_audio1_des = GLOBAL.test4_audio_B1_des
                GLOBAL.test4_audio2_src = GLOBAL.test4_audio_B2_src
                GLOBAL.test4_audio2_des = GLOBAL.test4_audio_B2_des
                GLOBAL.test4_audio3_src = GLOBAL.test4_audio_B3_src
                GLOBAL.test4_audio3_des = GLOBAL.test4_audio_B3_des
                GLOBAL.test4_audio4_src = GLOBAL.test4_audio_B4_src
                GLOBAL.test4_audio4_des = GLOBAL.test4_audio_B4_des
            },
            order_play() {
                //如果数组长度为0，即播放完了，才可以点击开始学习
                if (this.audios.length === 0) {
                    this.show = false;
                } else {
                    this.audio = new Audio(this.audios.shift());
                    this.audio.addEventListener("ended", this.order_play);
                    this.audio.play();
                }
            },
            study() {
                this.$router.push('/Sentenceplayjudge');
            },
            listen_again() {
                //目前点击重听的话，就不能点击开始
                this.show = true;
                //将之前的音频暂停
                this.audio.pause();
                for (let i = 0; i < this.test4_audio_4.length; i++) {
                    this.audios[i] = this.test4_audio_4[i]
                }
                //播放音频
                this.order_play();
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