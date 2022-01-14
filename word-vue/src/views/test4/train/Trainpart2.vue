<template>
    <div class="container">
        <div class="header"></div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="column">
                    <div class="el-row">
                        <div class="normal">在第二部分中，</div>
                    </div>

                    <div class="el-row">
                        <div class="normal"> 您需要按顺序记住屏幕上出现的字母，</div>
                    </div>

                    <div class="el-row">
                        <div class="normal">并判断屏幕上出现的句子是否符合常识。</div>
                    </div>

                    <div class="el-row">
                        <div class="normal">您将先做些练习，熟悉测试的流程，然后再进行测试。</div>
                    </div>

                    <div class="el-row">
                        <div class="normal">在练习和测试的过程中， </div>
                        <div class="bold">您不能做任何笔记。</div>
                    </div>

                    <div class="el-row">
                        <div class="normal">如果您准备好了，请点击</div>
                        <div class="normal">“开始”</div>
                        <div class="normal">按钮进行练习。</div>
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
        name: "Trainpart2",
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
        created() {
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
                this.$router.push('/Lettertrain');
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
        height: 20vh;
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
    .el-row1{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom:35px
    }
    .left,.right{
        width:400px;
    }
    .center{
        flex: 1;
    }
    .column{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom:100px
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