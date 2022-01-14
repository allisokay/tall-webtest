<template>
    <div class="container">
        <div class="header">

        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="el-row">

<!--                    <h2>这部分测试共有81个词组,您答对了{{user_right_w}}个。</h2>-->
                </div>

                <el-row  v-loading="loading"
                         element-loading-text="请休息30秒"
                         element-loading-spinner="el-icon-loading"
                         element-loading-background="rgba(0, 0, 0, 0.8)"
                         v-loading.fullscreen.lock="loading_show"></el-row>
                <div class="el-row">
                    <el-button class="confirm" type="primary" @click="go_to_part2" :disabled="show">第二部分</el-button>
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


            };
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
            },
            save()
            {



                var content = {}
                var date = new Date()
                content.email = GLOBAL.email;
                content.word_score=3;
                content.trial_type = "word_T";
                content.word= GLOBAL.right;
                content.total_item =81;
                content.word_rate = String((content.word * 100 / content.total_item).toFixed(0)) + '%';
                content.exp_date =  date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

                content.exp_Session = GLOBAL.session;
                content.rt = GLOBAL.react_array;
                console.log(content);
                axios.post('word/wm/save', content).then(
                    function (resp) {
                        if (resp.data == "success") {

                            console.log("ok")

                        }

                    });
                //都在save里面重置
                //重置全局变量
                GLOBAL.react_array=[];
                GLOBAL.right=0;

            },

        },
        created() {
            // this.save();
            GLOBAL.trial_index=1;
            this.user_right_w=String(GLOBAL.user_right_w);
            this.change_show();
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
    .bold{font-size:35px;
        font-weight: bold;
    }
    .normal{
        font-size:22px;
        font-weight: normal;
    }
    .confirm{
        font-size:25px;
        font-weight:500;
    }
</style>