<template>


    <div class="container">
        <div class="header">
            <div>
                <el-progress :text-inside="true" :stroke-width="24"
                             :percentage="(current_group/part1_test_length*100).toFixed(0)*1" status="success"></el-progress>

            </div>
        </div>
        <div class="content">
            <div class="left">

            </div>
            <div class="center">
                <div class="row">
                    <el-button class="normal">
                        {{word}}
                    </el-button>
                </div>
            </div>

            <div class="right">
            </div>
        </div>
        <div class="footer">

        </div>

    </div>

</template>

<script>
    import GLOBAL from './../../../plugins/global_variable'

    export default {
        name: "Wordtrain",
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

                word: '',
                words: [],
                current_group: '',
                part1_test_length: '',
                timer:'',


            };
        },
        methods: {

            force_jump() {
                this.$router.push('/Wordtrainjudge');
            },
            order_show() {
                //如果数组长度为0，即播放完了，才可以点击开始学习
                if (this.words == 0) {
                    this.force_jump()
                } else {
                    this.word = this.words.shift();
                    // 加空格
                    this.word=this.word[0]+' '+this.word[1];

                    this.timer = setTimeout(() => {
                        this.order_show()
                    }, 1000)


                }
            },


        },
        mounted() {
            this.order_show();
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });


        },


        created() {//生命周期函数

            this.words = GLOBAL.train_word.shift();
            this.part1_test_length = GLOBAL.part1_test_length;
            this.current_group = GLOBAL.part1_test_length - GLOBAL.train_word.length - 1;
            document.body.style.backgroundColor = "#DCDCDC";

        },
        beforeDestroy() {
            clearTimeout(this.timer);
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .header {
        display: flex;
        flex-direction: column;
        height: 40vh;
    }

    .footer {
        height: 75px;
    }

    .content {
        display: flex;
        flex-direction: row;
        flex: 1;
    }

    .el-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 80px
    }

    .left, .right {
        width: 400px;
    }

    .center {
        flex: 1;
    }

    .row {
        display: flex;
        justify-content: space-around;
        margin-bottom: 80px
    }
    .bold{font-size:22px;
        font-weight: bold;
    }
    .normal{
        font-size:30px;
        font-weight:700;
    }
</style>