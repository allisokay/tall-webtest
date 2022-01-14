<template>
    <div>
        <el-container>
            <el-header height="710px">欢迎来到在线学习能力测试系统
                <el-form class="demo-form-inline" label-width="500px">
                    <div>
                        <el-form-item label="题型一 看图记音">
                            <el-button type="primary" @click="enter_test1">开始</el-button>
                        </el-form-item>
                    </div>
                    <div>
                        <div>
                        <span v-for="item in check_array">{{item}}&emsp;</span>
                        </div>
                        <span v-for="item in check_array" style="margin-left: 15px">{{item}}</span>
                        <el-form-item label="题型二 辨音">

                            <el-button type="primary" @click="enter_test2">开始</el-button>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="题型三 语言分析">

                            <el-button type="primary" @click="enter_test3">开始</el-button>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="题型四 工作记忆">

                            <el-button type="primary" @click="enter_test4">开始</el-button>
                        </el-form-item>
                    </div>

                </el-form>
            </el-header>


        </el-container>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                check_array:['谢欢','朱曦'],
                options1: [{
                    value: '选项1',
                    label: '男'
                }, {
                    value: '选项2',
                    label: '女'
                }],
                options2: [{
                    value: '选项1',
                    label: '大学本科'
                }, {
                    value: '选项2',
                    label: '研究生'
                },{
                    value: '选项3',
                    label: '高职高专'
                },{
                    value: '选项4',
                    label: '高中'
                }, {
                        value: '选项5',
                        label: '初中'
                    },
                    {
                        value: '选项6',
                        label: '小学'
                    },
                    {
                        value: '选项7',
                        label: '未上过学'
                    }
                ],
                options3: [{
                    value: '选项1',
                    label: '人文门类 （文学、历史学、哲学、艺术学）'
                }, {
                    value: '选项2',
                    label: '社会科学门类（教育学、法学、经济学、管理学、军事学）'
                },{
                    value: '选项3',
                    label: '理工门类（理学、工学）'
                },{
                    value: '选项4',
                    label: '农医门类（医学、农学）'
                },{
                    value: '选项5',
                    label: '无'
                }
                ],
                options4: [{
                    value: '选项1',
                    label: '高考英语'
                }, {
                    value: '选项2',
                    label: '大学英语四级'
                },{
                    value: '选项3',
                    label: '大学英语六级'
                },{
                    value: '选项4',
                    label: '出国雅思考试'
                },{
                    value: '选项5',
                    label: '出国托福考试'
                },
                    {
                        value: '选项6',
                        label: '无'
                    }
                ],

                content:{
                    user_major:'',
                    user_edu:'',
                    user_sex:'',
                    user_age:'',
                    user_id:1,
                    stage:'',
                    grade:'',


                },
                content1:{
                    user_major:'',
                    user_edu:'',
                    user_grade:'',
                    user_sex:'',
                    user_age:'',
                    user_id:1,

                }
            }
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid){
                        this.content1.user_age=this.content.user_age;
                        this.content1.user_edu=this.content.user_edu;
                        this.content1.user_sex=this.content.user_sex;
                        this.content1.user_id=this.content.user_id;
                        this.content1.user_major=this.content.user_major;
                        this.content1.user_grade=this.content.stage+this.content.grade;

                        console.log(this.content1);
                        var _this = this;
                        axios.post('questionnaire/save',this.content1).then(
                            function (resp) {
                             console.log(resp.data);

                });

            }

        });
    },
            jump()
            {
                this.$router.push('/test4/test/LStest');
            },
            order_play() {

                //如果数组长度为0，即播放完了，才可以点击开始学习
                if (this.audio.length == 0) {
                    // this.change_show();
                    console.log('end')
                } else {
                    var music = new Audio(this.audio.shift());
                    music.addEventListener("ended", this.order_play);
                    music.play();


                }
            },
        },
        created() {
            // this.audio=[require('../assets/audio/3.mp4'),require('../assets/audio/18.mp4')]
            // var music1 = new Audio(require('../assets/audio/3.mp4'));
            // var music2 = new Audio(require('../assets/audio/18.mp4'));
            // music1.addEventListener("ended", music2.play());
            // music1.play();
            // this.order_play();
            // this.audios1=[{audioIndex1: 40, audioSrc1: require('../assets/audio/3.mp4')}]
            // this.audios2=[{audioIndex2: 41, audioSrc2: require('../assets/audio/18.mp4')}]
            // var audio1 = new Audio(this.audios1.shift().audioSrc1)
            // var audio2 = new Audio(this.audios2.shift().audioSrc2)
            // audio1.addEventListener('ended',audio2.play())
            // // setTimeout(()=>{
            // //     audio1.play()
            // // },1000);
            // audio1.play()
            var arr=['true','false']
            if(arr[1]=='true')
            {
                console.log('no');
            }
            else
            {
                console.log('yes');
        }

            if(arr[1]=='false')
            {
                console.log('yes');
            }
            else
            {
                console.log('no');
            }
            if(arr[1]=='')
            {
                console.log('no');
            }
            else
            {
                console.log('yes');
            }

        }
    }
</script>