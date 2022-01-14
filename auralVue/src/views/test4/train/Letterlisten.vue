<template>
    <div class="container">
        <div class="header">
            <h2 style="color: red; text-align: center">这部分测试不能做笔记</h2>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">

                <div class="row">
                    <el-button class="normal" v-for="(letter, index) in word_array_top" :key="index" @click="click_letter(letter)":disabled="show" >
                        {{letter}}
                    </el-button>
                </div>

                <div class="row">
                    <el-button class="normal" v-for="(letter, index) in word_array_bottom" :key="index" @click="click_letter(letter)":disabled="show" >
                        {{letter}}
                    </el-button>
                </div>
                    <div class="row">
                        <h2>{{result}}</h2>
                    </div>
            </div>
            <div class="right"></div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
    import GLOBAL from "../../../plugins/global_variable";

    export default {
        name: "Letterlisten",
        data() {
            return {
                // user不一定能用到
                user: {
                    id: 0,
                    email: '',
                    invited_code: '',
                    test_fin_time: '',
                    register_time: '',
                },
                show:true,
                // 用户根据听到的字母音频选择的字母数组
                check_array: [],
                // 实际的数组答案
                actual_array: [],
                // 未打乱的原始音频数组，每次都会被打乱
                test4_audio_1:[
                    require("../../../assets/static/test4/newAudio/C.mp3"),
                    require("../../../assets/static/test4/newAudio/Y.mp3"),
                    require("../../../assets/static/test4/newAudio/T.mp3"),
                    require("../../../assets/static/test4/newAudio/A.mp3"),
                    require("../../../assets/static/test4/newAudio/F.mp3"),
                    require("../../../assets/static/test4/newAudio/W.mp3"),
                    require("../../../assets/static/test4/newAudio/S.mp3"),
                    require("../../../assets/static/test4/newAudio/I.mp3"),
                    require("../../../assets/static/test4/newAudio/R.mp3"),
                    require("../../../assets/static/test4/newAudio/J.mp3"),
                    require("../../../assets/static/test4/newAudio/V.mp3"),
                    require("../../../assets/static/test4/newAudio/H.mp3"),
                ],
                //未打乱的原始数组，每次都会被打乱
                init_array:['C','Y','T','A','F','W','S','I','R','J','V','H'],
                //打乱后的数组
                shuffled_array:[],
                //备份打乱后的代码
                init_array_backup:[],
                init_array_backup2:[],

                total_array:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
                //显示的总的单词数组
                word_array: [],
                //显示在上端的按钮
                word_array_top: [],
                //显示在下端的按钮
                word_array_bottom: [],

                current_group:'',
                part1_test_length:'',
                //基准地址
                base_url:GLOBAL.baseURL+'test4/audio/',
                src_array:[],
                result:'',
                letter:'',
                timer:'',
                start_time:'',
                end_time:'',
            }
        },
        created() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

            document.body.style.backgroundColor = "#DCDCDC";
        },
        mounted() {
            //打乱数组
            this.shuffleMaterial()
            // 复制打乱后的字母数组，其一用于生成备选答案数组，其二用于判断用户选择正确否
            for (let i = 0; i < this.init_array.length; i++) {
                this.init_array_backup[i] = this.init_array[i];
                this.init_array_backup2[i] = this.init_array[i];
            }
            //展示字母
            this.select_shuffle();
            //播放音频
            this.play();
        },
        beforeDestroy() {
            clearTimeout(this.timer);
        },
        methods: {
            // 打乱音频数组顺序；正确答案数组需与之保持同步
            shuffleMaterial() {
                let array1 = Array.from({length: 12}, (item, index) => index);
                let array2 = Array.from({length: 12}, (item, index) => index);

                //打乱音频数组，正确文本数组下标，使用乱序下标进行交换
                for (let i = 11; i >= 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [array1[i], array1[j]] = [array1[j], array1[i]];
                    [array2[i], array2[j]] = [array2[j], array2[i]];
                }
                for (let i = 0; i <= 11; i++) {
                    array1[i] = this.test4_audio_1[array1[i]];
                    array2[i] = this.init_array[array2[i]];
                }
                this.test4_audio_1 = array1;
                this.init_array = array2;
            },
            select_shuffle() {
                //先赋给展示的单词数组正确的单词,深复制
                let word_array = []
                word_array.push(this.init_array_backup.shift())
                let random_elem = '';
                while (word_array.length < 12) {
                    //随机选择一个元素
                    random_elem = this.total_array[Math.floor(Math.random() * this.total_array.length)];
                    //如果这个元素不在当前的数组中
                    if (!word_array.includes(random_elem)) {
                        //加入随机元素
                        word_array.push(random_elem);
                    }
                }
                console.log("word_array = " + word_array);
                //重新打乱数组
                this.word_array=this.randArr(word_array);
                this.word_array_top=this.word_array.slice(0,6);
                this.word_array_bottom=this.word_array.slice(6,12);
            },
            play(){
                let music = new Audio(this.test4_audio_1.shift())
                music.addEventListener('ended',this.change_show)
                music.play();
            },
            change_show(){
                this.start_time=Date.now();//用于计算每一次的反应时间
                this.show=!this.show
            },
            randArr(arr) {
                for (let i = 0; i < arr.length; i++) {
                    let iRand = Math.floor(arr.length * Math.random());
                    let temp = arr[i];
                    arr[i] = arr[iRand];
                    arr[iRand] = temp;
                }
                return arr;
            },
            //双向绑定的使用
            //限制输入的个数
            click_letter(letter) {
                this.end_time=Date.now();
                GLOBAL.react=this.end_time-this.start_time;
                if(letter===this.init_array_backup2.shift())
                {
                    GLOBAL.right=1;
                }
                else {
                    GLOBAL.right=0;
                }
                this.check_array.push(letter);
                //做出选择后音频播放完成前，字母不可以点击
                this.change_show()
                this.letter = letter;
                this.save()

                //如果听完了音频
                if(this.test4_audio_1.length===0) {
                    let right = this.correct_letter(this.check_array, this.init_array);
                    GLOBAL.right=right;
                    this.result= String(right)+'/'+String(this.init_array.length)+'正确';
                    //间隔一段时间页面跳转
                    this.timer = setTimeout(()=>{
                        this.$router.push('/Lettertrain'); // Lettertrainjudge
                    },2000)
                }
                else {
                    //继续播放其余字母音频，并随机展示12个字母选项(其中包含正确选项)
                    this.select_shuffle();
                    this.play();
                }
            },
            correct_letter(check_array, actual_array) {
                let correct = 0;
                for (let i = 0; i < actual_array.length; i++) {
                    if (actual_array[i] === check_array[i])
                        correct++;
                }
                return correct;
            },
            save() {
                let content = {}
                let date = new Date()
                content.part_email = GLOBAL.email;
                content.number=GLOBAL.number;
                content.trial_index="letter_L"+String(GLOBAL.trial_index);
                content.trial_type = "letter_L";
                content.letter= GLOBAL.right;
                content.user_answer = this.letter;
                content.total_item =1;
                content.letter_rate = String((content.letter * 100 / content.total_item).toFixed(0)) + '%';
                content.exp_date =  date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
                content.exp_Session = GLOBAL.session;
                content.rt = GLOBAL.react;
                GLOBAL.test4_part2_dataBag.push(content);
                console.log(content);
                /*axios.post('test4info/save', content).then(
                    function (resp) {
                        if (resp.data === "success") {
                            console.log("ok")
                        }
                    });*/
                GLOBAL.number++;
                GLOBAL.trial_index++;

                //都在save里面重置
                //重置全局变量
                GLOBAL.react=0
                GLOBAL.right=0;
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
        height: 30vh;
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
        margin-bottom: 70px
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
        margin-bottom: 60px
    }
    .normal{
        font-size:30px;
        font-weight:700;
        font-family: "akkurat", sans-serif;
    }
</style>