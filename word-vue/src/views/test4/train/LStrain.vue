<template>
    <div class="container">
        <div class="header"></div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="el-row">
                    <div v-if="state===1">
                        <div class="column">
                            <div class="el-row">
                                <div class="normal">
                                    现在您将练习同时完成字母记忆和句子判断 。
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    屏幕上会先出现一个句子，当您对句子是否符合常识做出判断后，
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    屏幕上就会出现一个字母。请您记住这个字母。
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    屏幕上会出现下一个句子，您做出句子是否符合常识的判断后，
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    屏幕上会出现另一个字母。
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    在每一组练习的最后，屏幕上会出现备选字母。
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    请按字母出现的顺序来选择。
                                </div>
                            </div>
                        </div>

                    </div>
                    <div v-if="state===2">
                        <div class="column">
                            <div class="el-row">
                                <div class="normal">
                                    在前面的句子判断练习中，
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    电脑已经记下了您做出判断的平均时间。
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    如果
                                </div>
                                <div class="bold">超出了平均时间没有对句子是否符合常识做出判断，</div>
                            </div>
                            <div class="el-row">
                                <div class="bold">
                                    电脑会自动跳过句子判断部分，显示下一个字母，
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="bold">
                                    而句子判断就会被记录为判断错误。
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    因此，
                                </div>
                                <div class="bold"> 非常重要的一点：</div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    您必须快速准确地完成句子是否符合常识的判断，
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="bold">
                                    在字母出现之前，必须确保做出了句子判断。
                                </div>
                            </div>
                        </div>

                    </div>
                    <div v-if="state===3">
                        <div class="column">
                            <div class="el-row">
                                <div class="normal">
                                    在下面的练习中，电脑不会显示句子判断是否正确。
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    但是在完成了字母选择后，
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    电脑会显示
                                </div>
                                <div class="bold"> 字母的正确个数和句子判断的正确率。</div>
                            </div>
<!--                            <div class="el-row">
                                <div class="normal">
                                    根据实验设计，我们只能使用句子判断正确率在85%以上的数据。
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    因此
                                </div>
                                <div class="bold">为了能够参加后续的实验，</div>
                            </div>
                            <div class="el-row">
                                <div class="bold">
                                    您必须达到85%以上的正确率，
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="normal">
                                    同时尽可能准确地回忆更多字母。
                                </div>
                            </div>-->
                            <div class="el-row">
                                <div class="normal">
                                    如果您准备好了，请点击“开始”进行练习。
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="row" >
                    <el-button class="confirm" type="primary" @click="study">开始</el-button>
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
        name: "LStrain",
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

                show:true,
                state:1,
            };
        },
        created() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

            document.body.style.backgroundColor="#DCDCDC";
        },
        mounted() {
            let sum_time = 0;
            for (let i = 0; i < GLOBAL.react_array.length; i++) {
                sum_time += GLOBAL.react_array[i];
            }
            GLOBAL.mean_std = this.time_calculate(GLOBAL.react_array);
            console.log("GLOBAL.mean_std = " + GLOBAL.mean_std);
            GLOBAL.react_array = [];
            GLOBAL.sentence_array=[];
            GLOBAL.sentence_rate_array=[];
            GLOBAL.trial_index=1;

            GLOBAL.user_right_S=0;
            GLOBAL.user_total_S=0;
        },
        methods: {
            time_calculate(arr) {
                let sd, ave, sum = 0, sums=0, len = arr.length;
                for (let i = 0; i < len; i++) {
                    sum += Number(arr[i]);
                }
                ave = sum / len;
                for(let i = 0; i < len; i++){
                    sums+=(Number(arr[i])- ave)*(Number(arr[i])- ave)
                }
                sd=(Math.sqrt(sums/len)).toFixed(2);
                return Math.round(ave + 2.5 *sd);
            },
            study() {
                this.state++;
                if(this.state>=4){
                    this.$router.push('/LStrainjudgeS');
                }
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
    .column{
        display: flex;
        flex-direction: column;
        justify-content: center;
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