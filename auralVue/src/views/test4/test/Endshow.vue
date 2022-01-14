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
                        <h2>这部分测试共有74个字母，您答对了{{info.l_right}}个。</h2>
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
<!--                <div v-if="state===2">
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
                    <div class="el-row" v-if="session==='second'">
                        <el-button type="primary" @click="back_to_index" >下载报告</el-button>
                    </div>
                </div>-->

            </div>
            <div class="right"></div>
        </div>
    </div>

</template>


<script>
    import GLOBAL from './../../../plugins/global_variable'
    import 'url-search-params-polyfill';
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
                state:1,
                session:GLOBAL.session,
                canEnd:false,

            };
        },
        created() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });
        },
        mounted() {
            // 传输之前各阶段(不包括混合阶段)的数据到后端
            axios.post('test4info/saveAll', GLOBAL.test4_part2_dataBag.slice(0, GLOBAL.test4_part2_dataBag.length - 17)).then((resp)=> {
                if (resp.data === "success") {
                    console.log("saveAll() is ok");
                } else {
                    console.log("saveAll() isn't ok");
                }
            });
            // 传输混合阶段的数据到后端
            axios.post('test4info/save_array_all', GLOBAL.test4_part2_dataBag.slice(GLOBAL.test4_part2_dataBag.length - 17, GLOBAL.test4_part2_dataBag.length)).then((resp)=> {
                if (resp.data === "success") {
                    this.canEnd = true;
                    console.log("save_array_all() is ok")
                } else {
                    this.canEnd = true;
                    console.log("sava_array_all() isn't ok");
                }
            });
            document.body.style.backgroundColor="#DCDCDC";

            //更新user表的相关数据
            let content = {};
            content.aural_done = "true";
            let d = new Date();
            content.aural_donetime = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();//测试时间
            content.email = GLOBAL.email;
            content.exp_type = localStorage.getItem("test1Type");
            axios.post('user/update_aural', content).then(function (resp) {
                console.log(resp.data);
            });
            GLOBAL.wm_end=true;
            this.session = GLOBAL.session

            this.save();

            this.info.l_right = this.sum(GLOBAL.test_correct_L);
            localStorage.removeItem("test1Type");
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
                if (GLOBAL.session === "second")
                    this.$router.push({
                        path: "/Ending"
                    })
                if(GLOBAL.session === "first")
                    this.$router.push({
                        path: "/Will"
                    })
            },
            save() {
                let content = {}
                let date = new Date()
                content.email = GLOBAL.email;
                //content.word_score=GLOBAL.user_right_w;
                content.letter_score=this.sum(GLOBAL.test_correct_L);
                content.sentence_score=this.sum(GLOBAL.test_correct_S);
                content.date = date.toLocaleDateString();
                content.session = GLOBAL.session;
                console.log(content);

                axios.post('test4info/save_score', content).then(
                    function (resp) {
                        if (resp.data === "success") {
                            console.log("ok")
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