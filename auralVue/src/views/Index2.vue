<template>
    <div class="container">
        <div class="header">
<!--            <h1 class="el-row">欢迎来到在线学习能力测试系统</h1>-->
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="row">
                    <div class="column">
                        <div class="el-column">
                            <h3>A. 单词学习</h3>
                            <h3> Vocabulary Learning</h3>
                        </div>

                        <div class="el-column">
                            <h3>B. 工作记忆</h3>
                            <h3> Working Memory</h3>
                        </div>
                        <div class="el-column">
                            <h3>C. 语言分析</h3>
                            <h3> Language Analytic Ability</h3>
                        </div>
                    </div>
                    <div class="column">
                        <div>
                            <el-button type="primary" @click="enter_A" :disabled="test1_end">开始</el-button>
                        </div>

                        <div>
                            <el-button type="primary" @click="enter_C" :disabled="test4_end">开始</el-button>
                        </div>
                        <div>
                            <el-button type="primary" @click="enter_D" :disabled="test3_end">开始</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
            </div>
            <div class="footer"></div>
        </div>
    </div>
</template>
<script>
    import GLOBAL from '../plugins/global_variable'
    export default {
        name: "index2",
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
                test1_end:'',
                test2_end:'',
                test3_end:'',
                test4_end:'',
            };
        },
        methods: {
            enter_A() {
                this.$router.push('/test1');
            },



            enter_C() {
                this.$router.push('/Trainindex');
                // this.$router.push('/Letterlistenbegin');
                // this.$router.push('/test4/test/LStest');
                // this.$router.push('/test4/train/Lettertrainjudge');
                // this.$router.push('/test4/train/Part1result');
            },
            enter_D() {
                this.$router.push('/test3');
            },




            analyzing_match_src(src_arr)
            {
                //一维数组
                var arr1=[];
                //二维数组
                var arr2=[];
                //用于返回的三维数组
                var arr3=[];
                //用数组简单实现栈的pop和push
                var stack_arr=[];
                for(var i=0;i<src_arr.length;i++)
                {
                    if(src_arr[i]=='b1')
                    {
                        //压入数组
                        stack_arr.push('b1');
                        //跳过本次循环
                        continue;
                    }
                    else if(src_arr[i]=='b2')
                    {
                        //压入数组
                        stack_arr.push('b2');
                        //跳过本次循环
                        continue;
                    }

                    else if(src_arr[i]=='e1')
                    {
                        //压出一个元素
                        stack_arr.pop();
                        //如果栈数组为空，说明这个是单独的一维数组，并不是嵌套在二维数组里面的
                        if(stack_arr.length==0)
                        {
                            //将单独的一维数组压入需要的三维数组
                            arr3.push(arr1);
                            //arr1重新赋值为空数组
                            arr1=[];
                            //跳过本次循环
                            continue;
                        }
                        //如果栈数组不为空，说明这个不是是单独的一维数组，是嵌套在二维数组里面的
                        else {
                            //将一维数组压入二维数组
                            arr2.push(arr1);
                            arr1=[];
                            continue;
                        }
                    }
                    else if(src_arr[i]=='e2')
                    {
                        stack_arr.pop();
                        //我这里不用做判断了，因为我们默认数据库传来的数组的匹配样式是正确的
                        //此时的stack_arr必定为空


                        //将二维数组压入需要的三维数组
                        arr3.push(arr2);
                        //arr2重新置为空
                        arr2=[];
                        continue;
                    }
                    //如果是单个资源元素，不是标志元素，用arr1来接收
                    else {
                        //我这里针对音频源，加上了baseURL
                        arr1.push(GLOBAL.baseURL+src_arr[i]);
                    }


                }
                //返回需要的三维数组
                return arr3;
            },
            analyzing_match_des(des_arr)
            {
                //一维数组
                var arr1=[];
                //二维数组
                var arr2=[];
                //用于返回的三维数组
                var arr3=[];
                //用数组简单实现栈的pop和push
                var stack_arr=[];
                for(var i=0;i<des_arr.length;i++)
                {
                    if(des_arr[i]=='b1')
                    {
                        //压入数组
                        stack_arr.push('b1');
                        //跳过本次循环
                        continue;
                    }
                    else if(des_arr[i]=='b2')
                    {
                        //压入数组
                        stack_arr.push('b2');
                        //跳过本次循环
                        continue;
                    }

                    else if(des_arr[i]=='e1')
                    {
                        //压出一个元素
                        stack_arr.pop();
                        //如果栈数组为空，说明这个是单独的一维数组，并不是嵌套在二维数组里面的
                        if(stack_arr.length==0)
                        {
                            //将单独的一维数组压入需要的三维数组
                            arr3.push(arr1);
                            //arr1重新赋值为空数组
                            arr1=[];
                            //跳过本次循环
                            continue;
                        }
                        //如果栈数组不为空，说明这个不是是单独的一维数组，是嵌套在二维数组里面的
                        else {
                            //将一维数组压入二维数组
                            arr2.push(arr1);
                            arr1=[];
                            continue;
                        }
                    }
                    else if(des_arr[i]=='e2')
                    {
                        stack_arr.pop();
                        //我这里不用做判断了，因为我们默认数据库传来的数组的匹配样式是正确的
                        //此时的stack_arr必定为空


                        //将二维数组压入需要的三维数组
                        arr3.push(arr2);
                        //arr2重新置为空
                        arr2=[];
                        continue;
                    }
                    //如果是单个资源元素，不是标志元素，用arr1来接收
                    else {

                        arr1.push(des_arr[i]);
                    }


                }
                //返回需要的三维数组
                return arr3;
            },
            get_test2_audio()
            {
                var _this =this;
                //在这里开始获取后端的音频路径
                axios.get('test2_audio/find_audio').then(function (resp) {
                    var src=(resp.data);

                    var src_arr=new Array();

                    for(var i =0;i<resp.data.length;i++)
                    {
                        src_arr[i]=resp.data[i].src;

                    }

                    var src_arr3 = _this.analyzing_match_src(src_arr);

                    // //以下为音频源依次赋值
                    GLOBAL.test2_study1_audio1=src_arr3[0];
                    GLOBAL.test2_study1_audio2=src_arr3[1];
                    GLOBAL.test2_study1_audio3=src_arr3[2];
                    GLOBAL.test2_study1_audio4=src_arr3[3];
                    GLOBAL.test2_study1_audio5=src_arr3[4];
                    GLOBAL.test2_study1_audio6=src_arr3[5];

                    GLOBAL.test2_test1_audio1=src_arr3[6];
                    GLOBAL.test2_test1_audio2=src_arr3[7];


                    GLOBAL.test2_study2_audio1=src_arr3[8];
                    GLOBAL.test2_study2_audio2=src_arr3[9];
                    GLOBAL.test2_study2_audio3=src_arr3[10];
                    GLOBAL.test2_study2_audio4=src_arr3[11];

                    GLOBAL.test2_test2_audio1=src_arr3[12];
                    GLOBAL.test2_test2_audio2=src_arr3[13];


                });

            },
            get_test4_res(){
                var _this =this;
                //在这里开始获取后端的音频路径和相应的说明等。
                axios.get('test4audio/audios').then(function (resp) {

                    var src_arr=new Array();
                    var des_arr=new Array();
                    for(var i =0;i<resp.data.length;i++)
                    {
                        src_arr[i]=resp.data[i].src;
                        des_arr[i]=resp.data[i].des;
                    }

                    var src_arr3 = _this.analyzing_match_src(src_arr);
                    var des_arr3 = _this.analyzing_match_des(des_arr);
                    console.log(src_arr3);
                    console.log(des_arr3);

                    //以下为音频源依次赋值
                    GLOBAL.train_introduce=src_arr3[0];
                    GLOBAL.train_introduce_part2=src_arr3[1];
                    GLOBAL.train_letter_introduce=src_arr3[2];
                    GLOBAL.letter_src=src_arr3[3];
                    GLOBAL.train_sentence_introduce=src_arr3[4];
                    GLOBAL.train_sentence_play=src_arr3[5];
                    GLOBAL.train_sentence_begin=src_arr3[6];
                    GLOBAL.sentence_src=src_arr3[7];
                    GLOBAL.sentence_src_backup=JSON.parse(JSON.stringify(GLOBAL.sentence_src));
                    GLOBAL.train_mix_introduce=src_arr3[8];
                    GLOBAL.train_LS_src=src_arr3[9];
                    GLOBAL.test_introduce=src_arr3[10];
                    GLOBAL.test_LS_src=src_arr3[11];
                    GLOBAL.train_introduce_part1=src_arr3[12];
                    GLOBAL.train_word_play=src_arr3[13];
                    GLOBAL.train_word_begin=src_arr3[14];
                    GLOBAL.train_word=src_arr3[15];
                    GLOBAL.train_word_end=src_arr3[16];



                    //以下为描述的依次赋值

                    GLOBAL.letter_des=des_arr3[3];
                    GLOBAL.sentence_play_des=des_arr3[5];
                    GLOBAL.sentence_des=des_arr3[7];
                    GLOBAL.sentence_des_backup=JSON.parse(JSON.stringify(GLOBAL.sentence_des))
                    GLOBAL.train_des=des_arr3[9];
                    GLOBAL.test_des=des_arr3[11];
                    //字符串转化为数组
                    for(var i=0;i<des_arr3[13].length;i++)
                    {
                        GLOBAL.train_word_play_des.push(des_arr3[13][i].split('，'));

                    }
                    console.log('train_word_play_des',GLOBAL.train_word_play_des);
                    for(var i=0;i<des_arr3[15].length;i++)
                    {
                        GLOBAL.train_word_des.push(des_arr3[15][i].split('，'));

                    }
                    // GLOBAL.train_word_set=GLOBAL.train_word_des.flat(1);
                    // console.log(GLOBAL.train_word_set);


                });
            },
        },
        created() {//生命周期函数
            //得到test2图片
            axios.get("test2_img/find_img").then((response)=>{
                GLOBAL.img=response.data
                //console.log('data')
               // console.log(response.data)
            });

            //得到音频二和音频四
            this.get_test2_audio();
            this.get_test4_res();

            //初始三个按钮都能点击
            this.test1_end=GLOBAL.test1_end;
            this.test3_end=GLOBAL.test3_end;
            this.test4_end=GLOBAL.test4_end;
            //这里进入就设test2_end为true
            GLOBAL.test2_end=true;

            document.body.style.backgroundColor="#DCDCDC";


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
        margin-bottom:100px
    }
    .left{
        width:400px;
    }
    .right{
        width:400px;
    }
    .center{
        flex: 1;
    }
    .row{
        display: flex;
        justify-content: space-between;
        margin-bottom:30px
    }
    .column{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .el-column{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom:30px
    }
</style>