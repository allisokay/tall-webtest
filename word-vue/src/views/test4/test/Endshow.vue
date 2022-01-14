<template>
    <div class="container">
        <div class="header">
            <h1>工作记忆测试结束</h1>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div v-if="state===1">
                    <div class="el-row">
                        <h2>这部分测试共有74个字母,您答对了{{info.l_right}}个。</h2>
                    </div>
                    <div class="el-row" v-if="session==='first'">
                        <h2>本次测试结束，请关闭页面退出。</h2>
                        <el-row  v-loading="!canEnd"
                                 element-loading-text="数据上传中..."
                                 element-loading-spinner="el-icon-loading"
                                 element-loading-background="rgba(0, 0, 0, 0.8)">
                        </el-row>
                    </div>
                    <div class="el-row" v-if="session==='second'">
                        <h2>本次测试结束，请关闭页面退出。</h2>
                        <el-row  v-loading="!canEnd"
                                 element-loading-text="数据上传中..."
                                 element-loading-spinner="el-icon-loading"
                                 element-loading-background="rgba(0, 0, 0, 0.8)">
                        </el-row>
                    </div>
                </div>
            </div>
<!--                <div v-if="state==2">
                    <div class="el-row">
                        <div class="normal">
                            <h2>您的句子意义判断正确率低于系统设置的最低正确率85%</h2>
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="normal">
                            <h2>本次测试结束，请关闭页面退出。</h2>
                        </div>
                    </div>
                    <div class="el-row">&ndash;&gt;
                        <div class="normal">&ndash;&gt;
                            <h2>请联系实验组织者,关闭页面退出!</h2>&ndash;&gt;
                        </div>&ndash;&gt;
                    </div>&ndash;&gt;
                    <div class="el-row" v-if="session=='second'">
                        <el-button type="primary" @click="back_to_index" >下载报告</el-button>
                    </div>
                </div>-->
            <div class="right"></div>
        </div>
    </div>

</template>


<script>
    import GLOBAL from './../../../plugins/global_variable'
    import qs from'qs';

    export default {
        name: "Endshow",
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
                info: {
                    s_right: '',
                    l_right: '',
                    accuracy: '',
                    user_id: '',
                    react_time: '',


                },
                canEnd: false,
                state:1,
                session:GLOBAL.session

            };
        },
        methods:{
            sum(arr){
                let sum = 0;
                for (let i = 0, len = arr.length; i < len; i++) {
                    sum += arr[i];
                }
                return sum;
            },
            back_to_index() {
                // this.$router.push('/Index');
                if (GLOBAL.session === "second")
                    this.$router.push({
                        path: "/Ending"
                    })
                if(GLOBAL.session === "first")
                    this.$router.push({
                        path: "/Will"
                    })
            },
            back_to_login()
            {
                // 未写，需要加上前面的登录再写
                // this.$router.push('/Index');
            },
            save() {
                let content = {}
                let date = new Date()
                content.email = GLOBAL.email;
                // content.word_score=GLOBAL.user_right_w;
                content.letter_score=this.sum(GLOBAL.test_correct_L);
                content.sentence_score=this.sum(GLOBAL.test_correct_S);
                content.date = date.toLocaleDateString();
                content.session = GLOBAL.session;
                console.log(content);
                axios.post('word/wm/save_score', content).then((resp)=> {
                    if (resp.data === "success") {
                        console.log("ok");
                    }
                });
              axios.post('recordScore/setRecordScore',qs.stringify({
                email:content.email,
                date:content.date,
                session:content.session
              })).then(
                  function (resp) {
                    if (resp.data === "success") {
                      console.log("成绩数据生成ok")
                    }
                  });
            },
        },
        created() {
            // 上传test4第二部分四组字母记忆练习的训练数据
            /*axios.post('test4info/saveAll', GLOBAL.test4_part2_dataBag.slice(0, 4)).then((resp)=> {
                if (resp.data === "success") {
                    console.log("saveAll() is ok");
                }
            });*/
            // 上传两个句子判断的训练数据
            axios.post('word/wm/saveAll', GLOBAL.test4_part2_dataBag.slice(0, 6)).then((resp)=> {
                if (resp.data === "success") {
                    console.log("word saveAll() is ok");
                }
            });
            // 上传混合阶段的训练和测试数据
            axios.post('word/wm/save_array_all', GLOBAL.test4_part2_dataBag.slice(6, GLOBAL.test4_part2_dataBag.length)).then((resp)=> {
                if (resp.data === "success") {
                    this.canEnd = true;
                    console.log("word save_array_all() is ok");
                }
            });

            //更新user表的相关数据
            let content={};
            content.word_done = "true";
            let d = new Date();
            content.word_donetime = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();//测试时间
            content.email = GLOBAL.email
            content.exp_type = localStorage.getItem("test1Type");
            axios.post('user/update_word',content).then(function (resp) {
                console.log(resp.data);
            });

            document.body.style.backgroundColor="#DCDCDC";

            GLOBAL.wm_end=true;
            // GLOBAL.laa_end=false;
            this.session = GLOBAL.session
            this.save();
            this.info.l_right=this.sum(GLOBAL.test_correct_L);
            localStorage.removeItem("test1Type");
        },
        mounted() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });
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
        text-align: center;
    }
    .footer{
        height: 75px;
    }
    .content{
        display: flex;
        flex-direction: row;
        flex: 1;
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