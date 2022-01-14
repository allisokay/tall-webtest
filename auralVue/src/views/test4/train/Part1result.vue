<template>
    <div class="container">
        <div class="header"></div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="el-row">
                    <h2>第一部分测试的得分将由后续人工评价得出。</h2>
                </div>

                <el-row  v-loading="loading"
                         element-loading-text="请休息30秒"
                         element-loading-spinner="el-icon-loading"
                         element-loading-background="rgba(0, 0, 0, 0.8)"
                         v-loading.fullscreen.lock="loading_show"></el-row>
                <div class="el-row">
                    <el-button type="primary" @click="go_to_part2" :disabled="show">第二部分</el-button>
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
        name: "Part1result",
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
                user_right_w:'',
                show:true,
                timer:'',
                loading:true,
                loading_show:'',
            }
        },
        created() {
            GLOBAL.trial_index=1;
            let music = new Audio(require("../../../assets/static/test4/newAudio/Instruction_004.mp3"));
            music.addEventListener("ended", this.change_show);
            music.play();

            document.body.style.backgroundColor="#DCDCDC";
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
        methods:{
            change_show(){
                this.timer = setTimeout(()=>{
                    this.show=false;
                    this.loading_show = false;
                },30000);
            },
            go_to_part2()
            {
                this.$router.push('/Trainpart2');
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