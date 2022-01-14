<template>
    <div>
        <el-container>
            <el-header height="50px" style="margin-top: 30px">
                <div v-if="!startFlag">
                    <h1 style="font-size: 50px">语言分析</h1>
                    <div style="font-size: 25px">
                        <div>
                            <font>这部分测试考查的是您接触一门新语言（萨马吉提语）时，对<strong>语法</strong>的掌握能力。</font>
                        </div>
                        <div><font>电脑将显示一些图片和图片对应的单词或句子。</font></div>
                        <div><font>您有<strong>五分钟时间</strong>来学习这些单词和句子，分析它们的规则。</font></div>
                        <div><font>您可以按任何顺序来点击图片进行学习，也可以做笔记来帮助您分析。</font></div>
                        <div><font>但请注意，您<strong>只有5分钟的学习时间</strong>。</font></div>
                        <div><font>因此您必须在5分钟内完成所有图片的学习。</font></div>
                        <div><font>学习时间结束后， 电脑将测试您是否掌握了萨马吉提语的基本语法。</font></div>
                    </div>
                    <el-button type="primary" style="font-size: 50px" @click="startLearn">开始学习</el-button>
                </div>
                <div v-if="startFlag">
                    <el-progress :text-inside="true" :stroke-width="20"
                                 :percentage="(restTime/totalTime*100).toFixed(0)*1" status="success"></el-progress>
                    <div style="font-size: 20px; ">
                        <strong>
                            <div><font>点击蓝色按键，电脑将在右边的方框中显示这张图片，</font></div>
                            <font>并显示图片对应的单词或句子。</font>
                            <font>请点击任一蓝色按键，开始学习。可以做笔记。</font>
                        </strong>
                    </div>
                </div>

            </el-header>

            <el-main v-if="startFlag && !timeOutFlag" style="margin-top: 100px">
                <el-row :gutter="20">
                    <el-col :span="13">
                        <div class="grid-content bg-purple">
                            <el-button class="btn" v-for="(item,index) in imgs" @click="checked(item,index)"></el-button>
                        </div>
                    </el-col>

                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-image style="height:230px; width: 230px; margin: 50px 0px 10px 0px"
                                      :src="checkedImg">
                            </el-image>

                        </div>
                        <h3 style="line-height: 30px;font-size: 30px">{{checkedWord}}</h3>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import modal from "../Modal";
    import global_ from "../../plugins/global_variable";

    export default {
        name: "learnThree",
        components: {},
        // props: {
        //     clickTimes: Array
        // },
        props:{
          //imgs:[],
          clickTimes:Array
      },
        data() {
            return {
                startFlag: false,//是否点击开始学习按钮
                restTime: 300,//剩余学习时间
                totalTime: 300,//总学习时间

                // //图片
                // imgs: [
                //     {imgIndex: 1, imgDes: "vyras", imgSrc: require("../../assets/test3wordimg/learn/1.jpg")},
                //     {imgIndex: 2, imgDes: "berniukas", imgSrc: require("../../assets/test3wordimg/learn/2.jpg")},
                //     {imgIndex: 3, imgDes: "Vyras taiso", imgSrc: require("../../assets/test3wordimg/learn/4.jpg")},
                //     {imgIndex: 4, imgDes: "Vyras rašo", imgSrc: require("../../assets/test3wordimg/learn/5.jpg")},
                //
                //     {imgIndex: 5, imgDes: "Berniukas valgo", imgSrc: require("../../assets/test3wordimg/learn/6.jpg")},
                //     {imgIndex: 6, imgDes: "Vyrai taiso", imgSrc: require("../../assets/test3wordimg/learn/7.jpg")},
                //     {imgIndex: 7, imgDes: "Vyrai rašo", imgSrc: require("../../assets/test3wordimg/learn/8.jpg")},
                //     {imgIndex: 8, imgDes: "Berniukai valgo", imgSrc: require("../../assets/test3wordimg/learn/9.jpg")},
                //     {imgIndex: 9, imgDes: "Vyras valgė", imgSrc: require("../../assets/test3wordimg/learn/10.jpg")},
                //
                //     {
                //         imgIndex: 10,
                //         imgDes: "Berniukas taisė",
                //         imgSrc: require("../../assets/test3wordimg/learn/11.jpg")
                //     },
                //     {imgIndex: 11, imgDes: "Berniukas rašė", imgSrc: require("../../assets/test3wordimg/learn/12.jpg")},
                //     {imgIndex: 12, imgDes: "Vyrai taisė", imgSrc: require("../../assets/test3wordimg/learn/13.jpg")},
                //     {imgIndex: 13, imgDes: "Vyrai rašė", imgSrc: require("../../assets/test3wordimg/learn/14.jpg")},
                //     {
                //         imgIndex: 14,
                //         imgDes: "Berniukai valgė",
                //         imgSrc: require("../../assets/test3wordimg/learn/15.jpg")
                //     },
                //
                //     {imgIndex: 15, imgDes: "Vyras nerašo", imgSrc: require("../../assets/test3wordimg/learn/16.jpg")},
                //     {
                //         imgIndex: 16,
                //         imgDes: "Berniukas nevalgo",
                //         imgSrc: require("../../assets/test3wordimg/learn/17.jpg")
                //     },
                //     {
                //         imgIndex: 17,
                //         imgDes: "Berniukas netaiso",
                //         imgSrc: require("../../assets/test3wordimg/learn/18.jpg")
                //     },
                //     {imgIndex: 18, imgDes: "Vyrai netaiso", imgSrc: require("../../assets/test3wordimg/learn/19.jpg")},
                //     {
                //         imgIndex: 19,
                //         imgDes: "Berniukai nevalgo",
                //         imgSrc: require("../../assets/test3wordimg/learn/20.jpg")
                //     },
                //
                //     {
                //         imgIndex: 20,
                //         imgDes: "Berniukai nerašo",
                //         imgSrc: require("../../assets/test3wordimg/learn/21.jpg")
                //     },
                //     {imgIndex: 21, imgDes: "sodininkas", imgSrc: require("../../assets/test3wordimg/learn/3.jpg")},
                //
                //     {imgIndex: 22, imgDes: "dažyti", imgSrc: require("../../assets/test3wordimg/learn/22.jpg")},
                //     {imgIndex: 23, imgDes: "laistyti", imgSrc: require("../../assets/test3wordimg/learn/23.jpg")},
                //     {imgIndex: 24, imgDes: "rūkyti", imgSrc: require("../../assets/test3wordimg/learn/24.jpg")},
                //
                // ],
              imgs:[],
              imgsA:[
                {imgIndex: 1, imgSrc: require("../../assets/image/Test3/learn/A/L1_a dog.jpg"), imgDes: "grotuvas"},
                {imgIndex: 2, imgSrc: require("../../assets/image/Test3/learn/A/L2_a dog is running.jpg"), imgDes: "grotuvas bega"},
                {imgIndex: 3, imgSrc: require("../../assets/image/Test3/learn/A/L3_three dogs are running.jpg"), imgDes: "grotuvai bega"},
                {imgIndex: 4, imgSrc: require("../../assets/image/Test3/learn/A/L4_a horse.jpg"), imgDes: "plaktukas"},
                {imgIndex: 5, imgSrc: require("../../assets/image/Test3/learn/A/L5_a horse is sleeping.jpg"), imgDes: "plaktukas miega"},

                {imgIndex: 6, imgSrc: require("../../assets/image/Test3/learn/A/L6_two horses are sleeping.jpg"), imgDes: "plaktukai miega"},
                {imgIndex: 7, imgSrc: require("../../assets/image/Test3/learn/A/L7_a dog is eating.jpg"), imgDes: "grotuvas verda"},
                {imgIndex: 8, imgSrc: require("../../assets/image/Test3/learn/A/L8_a dog is not eating.jpg"), imgDes: "grotuvas verdane"},
                {imgIndex: 9, imgSrc: require("../../assets/image/Test3/learn/A/L9_three horses are eating.jpg"), imgDes: "plaktukai verda"},
                {imgIndex: 10, imgSrc: require("../../assets/image/Test3/learn/A/L10_three horses are not eating.jpg"), imgDes: "plaktukai verdane"},

                {imgIndex: 11, imgSrc: require("../../assets/image/Test3/learn/A/L11_a dog is not sleeping.jpg"), imgDes: "grotuvas miegane"},
                {imgIndex: 12, imgSrc: require("../../assets/image/Test3/learn/A/L12_two dogs are not sleeping.jpg"), imgDes: "grotuvai miegane"},
                {imgIndex: 13, imgSrc: require("../../assets/image/Test3/learn/A/L13_a horse is not running.jpg"), imgDes: "plaktukas begane"},
                {imgIndex: 14, imgSrc: require("../../assets/image/Test3/learn/A/L14_two horses are not running.jpg"), imgDes: "plaktukai begane"},
                {imgIndex: 15, imgSrc: require("../../assets/image/Test3/learn/A/L15_a blue dog is sleeping.jpg"), imgDes: "grotuvas melyn miega"},

                {imgIndex: 16, imgSrc: require("../../assets/image/Test3/learn/A/L16_three yellow horses are running.jpg"), imgDes: "plaktukai gelton bega"},
                {imgIndex: 17, imgSrc: require("../../assets/image/Test3/learn/A/L17_two yellow dogs are eating.jpg"), imgDes: "grotuvai gelton verda"},
                {imgIndex: 18, imgSrc: require("../../assets/image/Test3/learn/A/L18_a blue horse is not eating.jpg"), imgDes: "plaktukas melyn verdane"},
                {imgIndex: 19, imgSrc: require("../../assets/image/Test3/learn/A/L19_two blue dogs are not sleeping.jpg"), imgDes: "grotuvai melyn miegane"},
                {imgIndex: 20, imgSrc: require("../../assets/image/Test3/learn/A/L20_a yellow horse is not running.jpg"), imgDes: "plaktukas gelton begane"}

              ],
              imgsB:[
                {imgIndex: 1, imgSrc: require("../../assets/image/Test3/learn/B/L1_a woman.jpg"), imgDes: "kirpeja"},
                {imgIndex: 2, imgSrc: require("../../assets/image/Test3/learn/B/L2_a woman painted.jpg"), imgDes: "kirpeja rase"},
                {imgIndex: 3, imgSrc: require("../../assets/image/Test3/learn/B/L3_a man painted.jpg"), imgDes: "kirpejas rase"},
                {imgIndex: 4, imgSrc: require("../../assets/image/Test3/learn/B/L4_a grandpa.jpg"), imgDes: "virejas"},
                {imgIndex: 5, imgSrc: require("../../assets/image/Test3/learn/B/L5_a grandpa planted.jpg"), imgDes: "virejas taise"},

                {imgIndex: 6, imgSrc: require("../../assets/image/Test3/learn/B/L6_a grandma planted.jpg"), imgDes: "vireja taise"},
                {imgIndex: 7, imgSrc: require("../../assets/image/Test3/learn/B/L7_a woman watered.jpg"), imgDes: "kirpeja valge"},
                {imgIndex: 8, imgSrc: require("../../assets/image/Test3/learn/B/L8_a woman will water.jpg"), imgDes: "kirpeja valgelo"},
                {imgIndex: 9, imgSrc: require("../../assets/image/Test3/learn/B/L9_a grandpa watered.jpg"), imgDes: "virejas valge"},
                {imgIndex: 10, imgSrc: require("../../assets/image/Test3/learn/B/L10_a grandpa will water.jpg"), imgDes: "virejas valgelo"},

                {imgIndex: 11, imgSrc: require("../../assets/image/Test3/learn/B/L11_a woman will plant.jpg"), imgDes: "kirpeja taiselo"},
                {imgIndex: 12, imgSrc: require("../../assets/image/Test3/learn/B/L12_a man will plant.jpg"), imgDes: "kirpejas taiselo"},
                {imgIndex: 13, imgSrc: require("../../assets/image/Test3/learn/B/L13_a grandma will paint.jpg"), imgDes: "vireja raselo"},
                {imgIndex: 14, imgSrc: require("../../assets/image/Test3/learn/B/L14_a grandpa will paint.jpg"), imgDes: "virejas raselo"},
                {imgIndex: 15, imgSrc: require("../../assets/image/Test3/learn/B/L15_a woman planted inside.jpg"), imgDes: "kirpeja viduje taise"},

                {imgIndex: 16, imgSrc: require("../../assets/image/Test3/learn/B/L16_a grandpa will paint insdie.jpg"), imgDes: "virejas viduje raselo"},
                {imgIndex: 17, imgSrc: require("../../assets/image/Test3/learn/B/L17_a man will water outside.jpg"), imgDes: "kirpejas lauke valgelo"},
                {imgIndex: 18, imgSrc: require("../../assets/image/Test3/learn/B/L18_a grandma watered outsdie.jpg"), imgDes: "vireja lauke valge"},
                {imgIndex: 19, imgSrc: require("../../assets/image/Test3/learn/B/L19_a man will plant inside.jpg"), imgDes: "kirpejas viduje taiselo"},
                {imgIndex: 20, imgSrc: require("../../assets/image/Test3/learn/B/L20_a woman painted outside.jpg"), imgDes: "kirpeja lauke rase"}
              ],

                // 选中的图像
                checkedImg: require("../../assets/defaultImg.png"),
                //选中的字
                checkedWord: "~",

                baseURL: global_.baseURL,

                firstClick: true,//标记用户是否点击第一张图片
                timeElapsedStart: Date.now()
            }
        },
        computed: {
            //计算属性，学习结束后自动弹出弹框
            timeOutFlag() {
                return this.restTime < 0
            }
        },
        created(){
          this.AorB()
        },
        mounted() {
            //防止页面后退  使用在vue时 挂载到mounted中
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

            //图片预加载
            for (let i = 0; i < this.imgs.length; i++) {
                let img = new Image()
                img.src = this.imgs[i].imgSrc
            }
        },
        methods: {
          AorB(){
            //var type = localStorage.getItem('test3Type')
            var type = localStorage.getItem('test1Type')
            //console.log('上一次试卷为'+type)
            if(type != null){
              if(type == 'A'){
                this.testType = 'A'
                this.imgs = this.imgsA
              }
              else {
                this.testType = 'B'
                this.imgs = this.imgsB
              }
              console.log('当前为试卷'+this.testType)
            }
            else {
              var seed = Math.round(Math.random() * 10 + 1)
              console.log('seed:' + seed)
              if (seed > 5) {
                this.imgs = this.imgsB
                // global_variable.testType = 'B'
                this.testType = 'B'
                console.log('当前为试卷' + this.testType)
              }
              else {
                this.imgs = this.imgsA
                // global_variable.testType = 'A'
                this.testType = 'A'
                console.log('当前为试卷' + this.testType)
              }

            }
            localStorage.setItem('test3Type', this.testType) //存储当前试卷类型
          },
            startLearn() {
                this.startFlag = true;
            },
            //可以点击20个按钮开始学习
            changeCanClick() {
                this.canClick = true
            },
            //组件更换，学习完成后跳转到测试组件
            goToTestThree() {
                this.restTime = 0
                this.$emit('learnFinished')
            },
            checked(item, index) {
                //第一次点击图片后，开始计时
                if (this.firstClick) {
                    this.startTiming()
                    this.firstClick = false
                }
                this.checkedImg = item.imgSrc
                this.checkedWord = item.imgDes
                this.clickTimes[index]++    //记录学习数据
                console.log(this.clickTimes)
            },
            //开始学习倒计时，点击第一个图片后开始计时
            startTiming() {
                this.timer = setInterval(() => {
                        this.restTime--
                        if (this.restTime < 0) {
                            //提示学习结束，并弹框，跳转测试页面
                            clearInterval(this.timer)

                            for (let i = 0; i < 20; i++) {
                                let dataRow = {}
                                //构建返回后端数据
                                dataRow["expName"] = "written_laa"//测试名称，固定
                                dataRow["expType"] = localStorage.getItem('test3Type')
                                var d = new Date();
                                dataRow["expDate"] = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()//测试时间
                                dataRow["partEmail"] = global_.email    //TODO:测试者邮箱，唯一标识，需要从全局拿
                                dataRow["expSession"] = global_.session      //TODO:需要从全局拿
                                dataRow['trialType'] = "image_test"//固定
                                dataRow['testSession'] = "learning"//学习阶段，固定
                                if (i == 19)
                                    dataRow['timeElapsed'] = Date.now() - this.timeElapsedStart//整个测试所用时间
                                dataRow['trialIndex'] = i + 1  //当前的题目对应的下标是哪个？？
                                dataRow['stimulus'] = this.imgs[i].imgDes //当前题目对应的是啥？？？
                                dataRow['buttonPressed'] = this.clickTimes[i]  //学习次数

                                //构建完成，发送数据给后端
                                axios.post("/Laa/sendLaaData", dataRow).then((response) => {
                                    console.log(response)
                                })
                            }
                            this.$emit('learnFinished')
                        }
                    }, 1000
                )
            },

        }
    }
</script>

<style scoped>

    .btn:hover{
        color: #fff;
        background-color: #8B83D2;
        border-color: #8B83D2;
    }
    .btn{
        margin-left: 10px;
        margin-right: 10px;
        background-color: #0ABBF9;
        border-color: #0ABBF9;
    }
    .btn:focus{
        background-color: #8B83D2;
        border-color: #8B83D2;
    }

    #restTime {
        color: #d1434a;
    }

    .el-header, .el-footer {
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 80px;
        align-self: center;
        width: 700px;
    }


    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    /*分栏间隔*/
    .el-row {
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 100px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }


</style>