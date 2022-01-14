<template>
    <div class="container">
        <div class="header"></div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="column">
                    <div class="el-row">
                        <div class="normal">
                            现在进行句子理解练习。
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="normal">
                            屏幕上会出现一个句子，例如：“我喜欢在操场上踢球。”
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="normal">
                            您需要
                        </div>
                        <div class="bold">
                            立即判断这个句子是否符合常识，
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="bold">
                            如果句子表达的意思符合常识(意思说得通)，请用鼠标点击“正确”；
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="bold">
                            如果句子表达的意思不符合常识(意思说不通)，请用鼠标点击“错误”。
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="normal">
                            电脑会马上显示您的回答是否正确，并继续下一个练习。
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="normal">
                            如果您准备好了，请点击“开始”进行练习。
                        </div>
                    </div>
                </div>
                <div class="row">
                    <el-button class="confirm" type="primary" @click="study" >开始</el-button>
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
                words: [],
                word:'',
                type: "",
            };
        },
        created() {
            // 选择测试材料
            this.chose_AorB();

            GLOBAL.trial_index=1;
        },
        mounted() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

            document.body.style.backgroundColor="#DCDCDC";
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
                GLOBAL.test4_materialType = 'A';
                GLOBAL.train_sentence_play = GLOBAL.train_sentence_play_1;
                GLOBAL.sentence_play_des = GLOBAL.sentence_play_des_1;
                GLOBAL.sentence_src = GLOBAL.sentence_src_1;
                GLOBAL.sentence_des = GLOBAL.sentence_des_1;
                GLOBAL.train_LS_src = GLOBAL.train_LS_src_1;
                GLOBAL.train_LS_des = GLOBAL.train_LS_des_1;
                GLOBAL.test_LS_src = GLOBAL.test_LS_src_1;
                GLOBAL.test_LS_des = GLOBAL.test_LS_des_1;
            },
            chose_B() {
                GLOBAL.test4_materialType = 'B';
                GLOBAL.train_sentence_play = GLOBAL.train_sentence_play_2;
                GLOBAL.sentence_play_des = GLOBAL.sentence_play_des_2;
                GLOBAL.sentence_src = GLOBAL.sentence_src_2;
                GLOBAL.sentence_des = GLOBAL.sentence_des_2;
                GLOBAL.train_LS_src = GLOBAL.train_LS_src_2;
                GLOBAL.train_LS_des = GLOBAL.train_LS_des_2;
                GLOBAL.test_LS_src = GLOBAL.test_LS_src_2;
                GLOBAL.test_LS_des = GLOBAL.test_LS_des_2;
            },
            study() {
                this.$router.push('/Sentenceplayjudge');
            },
        },
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
        margin-bottom:20px
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
    .column{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .bold{font-size:22px;
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