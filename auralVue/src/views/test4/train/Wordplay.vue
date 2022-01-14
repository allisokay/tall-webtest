<template>

</template>

<script>
    import GLOBAL from './../../../plugins/global_variable'

    export default {
        name: "Wordplay",
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
                audio: [],
            };
        },
        created() {
            //播放这一组音频
            this.play();
            document.body.style.backgroundColor = "#DCDCDC";
        },
        mounted() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
              history.pushState(null, null, document.URL);
            });
        },
        methods: {
            force_jump() {
                this.$router.push('/Wordplayjudge');
            },
            play() {
                var music = new Audio(GLOBAL.train_word_play.shift());
                music.addEventListener("ended", this.force_jump);
                music.play();
            }
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
</style>