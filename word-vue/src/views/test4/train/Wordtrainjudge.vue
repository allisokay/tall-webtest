<template>
    <div class="container">
        <div class="header">
            <el-progress :text-inside="true" :stroke-width="24" :percentage="(current_group/part1_test_length*100).toFixed(0)*1" status="success"></el-progress>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="row">
                    <el-button class="normal" v-for="letter in word_array_top" @click="click_letter(letter)" :disabled="show">
                        {{letter[0]+' '+letter[1]}}
                    </el-button>
                </div>

                <div class="row">
                    <el-button class="normal" v-for="letter in word_array_bottom" @click="click_letter(letter)" :disabled="show">
                        {{letter[0]+' '+letter[1]}}
                    </el-button>
                </div>
                <div class="row">
                    <el-row>
                        <el-button class="normal" @click="click_space" :disabled="show">空 格</el-button>
                    </el-row>
                    <div>
                        <span class="normal" v-for="item in check_array" style="margin-left: 15px"> {{item}}</span>
                    </div>
                </div>
                <div class="row">
                    <el-button class="confirm" type="primary" @click="click_delete" >清除</el-button>
                    <el-button class="confirm" type="primary" @click="submit" :disabled="show">确认</el-button>
                </div>
<!--                <div class="row">-->
<!--                    <h2>{{result}}</h2>-->
<!--                    <el-button :type="type" @click="go_on()"><h2>{{go_on_button}}</h2></el-button>-->
<!--                </div>-->

            </div>
            <div class="right"></div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
    import GLOBAL from './../../../plugins/global_variable'
    export default {
        name: "Wordtrainjudge",
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

                // 用户自己认为听到的字母的数组
                check_array: [],
                // 实际的数组答案
                actual_array: [],

                //显示的总的单词数组
                word_array: [],
                //显示在上端的按钮
                word_array_top: [],
                //显示在下端的按钮
                word_array_bottom: [],

                current_group:'',
                part1_test_length:'',
                start_time:'',
                end_time:'',
                show:false,

            };
        },
        methods: {
            //双向绑定的使用
            //限制输入的个数
            click_letter(letter) {
                // if (this.check_array.length < this.actual_array.length) {
                    this.check_array.push(letter);

            },

            click_space() {
                //限制输入的个数
                // if (this.check_array.length < this.actual_array.length) {
                    this.check_array.push('?');

            },
            click_delete() {
                this.check_array = [];
            },
            submit() {
                this.show=true;
                this.end_time=Date.now();
                GLOBAL.react=(this.end_time-this.start_time);
                GLOBAL.right = this.correct_letter(this.check_array, this.actual_array);
                // console.log(this.check_array);
                //计算正确的个数
                GLOBAL.user_right_w = (this.correct_letter(this.check_array, this.actual_array))+GLOBAL.user_right_w;
                this.save();
                //如果听完了单词
                if(GLOBAL.train_word_des.length==0)
                {
                    this.$router.push('/Part1result');
                }
                else {
                    this.$router.push('/Wordtrain');
                }


            },

            correct_letter(check_arry, actual_array) {
                var correct = 0;
                for (var i = 0; i < actual_array.length; i++) {
                    if (actual_array[i] == check_arry[i])
                        correct++;

                }
                return correct;

            },
            //打乱全局变量，随机选择单词来展现在前端
            select_shuffle() {
                //先赋给展示的单词数组正确的单词,深复制
                var word_array = JSON.parse(JSON.stringify(this.actual_array));
                var random_elem;
                while (word_array.length < 12) {
                    //随机选择一个元素
                    random_elem = GLOBAL.train_word_set[Math.floor(Math.random() * GLOBAL.train_word_set.length)];
                    //如果这个元素不在当前的数组中
                    if (!word_array.includes(random_elem)) {
                        //加入随机元素
                        word_array.push(random_elem);
                    }
                }
                //重新打乱数组
                this.word_array=this.randArr(word_array);

                this.word_array_top=this.word_array.slice(0,6);
                this.word_array_bottom=this.word_array.slice(6,12);


            },
            randArr(arr) {
                for (var i = 0; i < arr.length; i++) {
                    var iRand = parseInt(arr.length * Math.random());
                    var temp = arr[i];
                    arr[i] = arr[iRand];
                    arr[iRand] = temp;
                }
                return arr;
            },
            save()
            {

                console.log(GLOBAL.right);
                console.log(this.actual_array.length);
                console.log(GLOBAL.react);
                var i;
                var _this = this;
                var content = {}
                var date = new Date()
                content.part_email = GLOBAL.email;
                content.number=GLOBAL.number;
                content.trial_index="word_T"+String(GLOBAL.trial_index);
                content.trial_type = "word_T";
                content.word= GLOBAL.right;
                content.total_item =this.actual_array.length;
                content.word_rate = String((content.word * 100 / content.total_item).toFixed(0)) + '%';
                content.exp_date =  date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

                content.exp_Session = GLOBAL.session;
                content.rt = GLOBAL.react;
                console.log(content);
                axios.post('word/wm/save', content).then(
                    function (resp) {
                        if (resp.data == "success") {

                            console.log("ok")

                        }

                    });
                GLOBAL.number++;
                GLOBAL.trial_index++;

                //都在save里面重置
                //重置全局变量
                GLOBAL.react=0
                GLOBAL.right=0;

            },



        },
        mounted() {
            this.start_time=Date.now();
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

        },
        created() {//生命周期函数



            //取第一组的描述
            this.actual_array = GLOBAL.train_word_des.shift();

            console.log(this.actual_array);
            this.select_shuffle();
            this.part1_test_length=GLOBAL.part1_test_length;
            this.current_group=GLOBAL.part1_test_length-GLOBAL.train_word_des.length-1;

            document.body.style.backgroundColor = "#DCDCDC";
        },
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
    }
    .confirm{
        font-size:25px;
        font-weight:500;
    }
</style>