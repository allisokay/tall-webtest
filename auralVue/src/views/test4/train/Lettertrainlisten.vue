<template>

</template>

<script>
    import GLOBAL from './../../../plugins/global_variable'

    export default {
        name: "Lettertrainlisten",
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
                audios: [],
                //释放定时器
                timer:'',
            };
        },
        created() {
            //取要播放的一组音频，其中包含三段或四段音频
            this.audios = GLOBAL.letter_src.shift()
            //顺序播放该组音频
            this.order_play();

            document.body.style.backgroundColor="#DCDCDC";
        },
        mounted() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });
        },
        methods: {
            order_play() {
                //如果数组长度为0，即播放完了，跳转到新的页面
                if (this.audios.length === 0) {
                    this.$router.push('/Lettertrainjudge') // 强制切换当前路由 path
                }
                else {
                    var music = new Audio(this.audios.shift());
                    music.addEventListener("ended", this.order_play);
                    // 在一组音频内，间隔300ms播放下一个字母的音频
                    setTimeout(()=>{music.play()},300);
                }
            },
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
</style>