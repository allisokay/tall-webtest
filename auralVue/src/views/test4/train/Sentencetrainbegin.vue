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
                    <el-button class="confirm" type="primary" @click="study" :disabled="show" >开始</el-button>
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
        name: "Sentencetrainbegin",
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
                test4_audio_5:[
                    require("../../../assets/static/test4/newAudio/Instruction_51.mp3"),
                    require("../../../assets/static/test4/newAudio/Instruction_52.mp3"),
                ],
                show:true,
                audios: [],
                audio:'',
            };
        },
        created() {
            // 每个阶段开始前重置该全局变量为1
            GLOBAL.trial_index = 1;
            GLOBAL.react_array = [];
            for (let i = 0; i < this.test4_audio_5.length; i++) {
                this.audios[i] = this.test4_audio_5[i]
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
            order_play() {
                //如果数组长度为0，即播放完了，才可以点击开始学习
                if (this.audios.length === 0) {
                    this.show=false;
                } else {
                    this.audio  = new Audio(this.audios.shift());
                    this.audio.addEventListener("ended", this.order_play);
                    this.audio.play();
                }
            },
            listen_again() {
                //目前点击重听的话，就不能点击开始
                this.show=true;
                //将之前的音频暂停
                this.audio.pause();
                for (let i = 0; i < this.test4_audio_5.length; i++) {
                    this.audios[i] = this.test4_audio_5[i]
                }
                //播放音频
                this.order_play();
            },
            study() {
                this.$router.push('/Sentencetrainjudge');
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