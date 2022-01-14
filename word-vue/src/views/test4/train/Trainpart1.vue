<template>
    <div class="container">
        <div class="header">

        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="column">
                    <div class="el-row">
                        <div class="normal">在第一部分中，屏幕上将显示</div>
                        <div class="bold">一组单词。</div>
                    </div>
                    <div class="el-row">
                        <div class="normal"> 您需要按</div>
                        <div class="bold">单词出现的顺序</div>
                        <div class="normal">记住这些单词。</div>
                    </div>
                    <div class="el-row">
                        <div class="normal">每一组单词显示完毕后，</div>
                    </div>
                    <div class="el-row">
                        <div class="normal">屏幕上会出现12个备选单词。</div>
                    </div>
                    <div class="el-row">
                        <div class="bold">您需要按单词出现的顺序，用鼠标点击单词来选择。</div>
                    </div>
                    <div class="el-row">
                        <div class="bold">如果忘记了某个单词，请点击“空格”按钮代替它的位置。</div>
                    </div>
                    <div class="el-row">
                        <div class="normal">您已经选择的单词会按顺序出现在屏幕下方。</div>
                    </div>
                    <div class="el-row">
                        <div class="normal">在确认单词和顺序都正确后，点击</div>
                        <div class="bold">“确认”</div>
                        <div class="normal">按钮，继续下一道题。</div>
                    </div>
                    <div class="el-row">
                        <div class="normal">如果发现选错了，可点击</div>
                        <div class="bold">“清除”</div>
                        <div class="normal">按钮，然后重新选择。</div>
                    </div>
                    <div class="el-row">
                        <div class="bold">请注意：</div>
                    </div>
                    <div class="el-row">
                        <div class="normal">一定要按单词出现的顺序来选择，</div>
                    </div>
                    <div class="el-row">
                        <div class="normal">如果忘记了其中一个，点击</div>
                        <div class="bold">“空格”</div>
                        <div class="normal">按钮代替它的位置。</div>
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
        name: "Train_part1",
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

                this.$router.push('/recordTrainpart1');

            },


        },
        created() {//生命周期函数


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
        margin-bottom:20px
    }
    .left,.right{
        width:200px;
    }
    .center{
        flex: 1;
    }
    .column{
        display: flex;
        flex-direction: column;
        justify-content: center;
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
