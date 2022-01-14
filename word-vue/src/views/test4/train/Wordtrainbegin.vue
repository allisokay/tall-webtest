<template>
    <div class="container">
        <div class="header">

        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="row">
                    <div class="normal">
                        <h2>现在开始测试。</h2>
                    </div>

                </div>
                <div class="row">
                    <div class="normal">
                        <h3>在测试阶段，电脑不会显示你的正确率。</h3>
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
        name: "Wordtrainbegin",
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
                audios: [],
                audio:'',


            };
        },
        methods: {
            study() {

                this.$router.push('/Wordtrain');

            },
            save()
            {

                console.log(GLOBAL.right)
                console.log(GLOBAL.react_array)
                var i;
                var _this = this;
                var content = {}
                var date = new Date()
                content.part_email = GLOBAL.email;
                content.trial_index=1
                content.trial_type = "word_L";
                content.word= GLOBAL.right;
                content.total_item =5;
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
        created() {//生命周期函数

            // this.save();
            GLOBAL.trial_index=1;
            document.body.style.backgroundColor="#DCDCDC";


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