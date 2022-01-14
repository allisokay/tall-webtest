<template>

    <div class="container">
        <div class="header">
            <div class="el-row">
                <h1 style="color: orangered">请勿在任何时候点击刷新页面，否则系统将会关闭测试，您将失去参加测试的资格！</h1>
            </div>
          <div class="el-row">
          <h1 style="color: orangered">这部分测试不能记笔记</h1>
             </div>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="el-row">
                    <h1 class="el-row">欢迎来到工作记忆测试</h1>
                </div>
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
    export default {
        name: "trainindex",
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

                show: true,
                test4_audio_00:[
                    require("../../../assets/static/test4/newAudio/Instruction_001.mp3"),
                    require("../../../assets/static/test4/newAudio/Instruction_002.mp3"),
                    require("../../../assets/static/test4/newAudio/Instruction_003.mp3"),
                ],
                audios: [],
                audio:'',


            };
        },
        created() {
            // 加载本页面所需音频
            for (let i = 0; i < this.test4_audio_00.length; i++) {
                this.audios[i] = this.test4_audio_00[i]
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
            study() {
                this.$router.push('/recordTrainpart1');
            },
            listen_again() {
                //目前点击重听的话，就不能点击开始
                this.show=true;
                //将之前的音频暂停
                this.audio.pause();
                // 加载本页面所需音频
                for (let i = 0; i < this.test4_audio_00.length; i++) {
                    this.audios[i] = this.test4_audio_00[i]
                }
                //播放音频
                this.order_play();
            },
            order_play() {
                //如果数组长度为0，即播放完了，才可以点击开始学习
                if (this.audios.length === 0) {
                    this.show=false;
                } else {
                    this.audio  = new Audio(this.audios.shift());
                    this.audio.addEventListener("ended", this.order_play);
                    this.audio.play();
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
    .el-row{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom:80px
    }
    .el-row2{
      display: flex;
      flex-direction: row;
      justify-content: center;

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