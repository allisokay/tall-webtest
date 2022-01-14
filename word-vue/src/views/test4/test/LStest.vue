<template>
    <div class="container">
        <div class="header">
            <h2 style="color: red; text-align: center">这部分测试不能做笔记</h2>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="row">
                    <h1>正式测试开始</h1>
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
        name: "LStest",
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
                timer:'',
                audio:'',
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
            // 测试 数据上传
            /*axios.post('word/wm/saveAll', GLOBAL.test4_part2_dataBag.slice(0, 6)).then((resp)=> {
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
            });*/

            GLOBAL.trial_index=0;

            // 打乱测试材料
            this.shuffleMaterial();
            this.forced_jump();
        },
        methods:{
            // 打乱测试材料数组顺序；正确答案数组需与之保持同步
            shuffleMaterial() {
                let array1 = Array.from({length: 15}, (item, index) => index);
                let array2 = Array.from({length: 15}, (item, index) => index);
                let array3 = Array.from({length: 15}, (item, index) => index);

                //打乱音频数组，正确答案数组，正确文本数组下标，使用乱序下标进行交换
                for (let i = 14; i >= 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [array1[i], array1[j]] = [array1[j], array1[i]];
                    [array2[i], array2[j]] = [array2[j], array2[i]];
                    [array3[i], array3[j]] = [array3[j], array3[i]];
                }
                for (let i = 0; i <= 14; i++) {
                    array1[i] = GLOBAL.test_LS_src[array1[i]];
                    array2[i] = GLOBAL.test_LS_des[array2[i]];
                    array3[i] = GLOBAL.test4_part2_Trial_index[array3[i]];
                }
                GLOBAL.test_LS_src = array1;
                GLOBAL.test_LS_des = array2;
                GLOBAL.test4_part2_Trial_index = array3;
            },
            forced_jump(){
                this.timer = setTimeout(()=>{
                    this.$router.push('/LStestjudgeS');
                },1000);
            },
        },
        beforeDestroy() {
            clearTimeout(this.timer);
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

</style>