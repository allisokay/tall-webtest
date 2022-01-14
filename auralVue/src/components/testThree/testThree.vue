<template>
    <div>
        <el-container>
            <el-header height="50px">
                <div>
                    <el-progress :text-inside="false" :stroke-width="30"
                                 :percentage="((quesNum-1)/totalQuesNum*100).toFixed(0)*1"
                                 status="success"></el-progress>
                </div>
            </el-header>
            <div  class="content">
                <el-main style="margin: 46px 0px 20px 0px" v-if="!tipAudioPlay">
                    <el-row :gutter="21">
                        <el-col :span="1">
                            <h2 style="color: #d1434a; line-height: 5px">{{quesNum}}</h2>
                        </el-col>
                        <el-col :span="13">
                            <div class="grid-content bg-purple">
                                <div class="grid-content bg-purple">
                                    <el-image style="height:230px; width: 230px; margin: 50px 0px 10px 0px"
                                              :src="currImgSrc">
                                    </el-image>
                                </div>
                            </div>
                        </el-col>
                        <audio v-for="(item,index) in audios" :id='item.audioIndex'
                               :src="item.audioSrc"></audio>

                        <el-col :span="5">
                            <div class="grid-content bg-purple">
                                <div v-for="(choice,index) in choices">
                                    <el-button @click="listenThenCheck(choice,index)"
                                               style="font-size: 30px;"
                                               :disabled="testTipAudioPlay">{{choice}}
                                    </el-button>
                                </div>
                            </div>
                        </el-col>

                        <el-col :span="5">
                            <div class="grid-content bg-purple">
                                <div>
                                    <el-button style="margin: 60px 0px 20px 0px; font-size: 30px"
                                               :disabled="true">{{currChecked}}
                                    </el-button>
                                </div>
                                <div>
                                    <el-button type="primary"
                                               style="margin: 60px 0px 70px 0px; font-size: 30px"
                                               :disabled="!isChecked || testTipAudioPlay"
                                               @click="submit">确认
                                    </el-button>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-main>
            </div>
        </el-container>
        <modal v-bind:md-show="testOver">
            <p style="font-size: 20px" slot="message">语言分析测试结束，你的分数是{{testScore}}/{{totalQuesNum}}</p>
            <div slot="btnGroup">
                <a style="font-size: 20px" class="btn btn--m" @click="backToMain()">结束</a>
            </div>
        </modal>
    </div>
</template>

<script>
    import modal from "../Modal";
    import GLOBAL from "../../plugins/global_variable";
    import global_ from "../../plugins/global_variable";

    export default {
        name: "testThree",
        components: {
            modal
        },
        props: {
            audios: null,
        },
        computed: {
            isChecked() {
                return this.currChecked == "~" ? false : true
            }
        },
        data() {
            return {
                baseURL: GLOBAL.baseURL,

                //选项列表
                choices: ['A', 'B', 'C', 'D'],
                //音频选项列表，存放音频的index
                audiosChoices: [], //一次存放四个按钮

                quesNum: 1,//当前题号
                totalQuesNum: 30,//总题目数量
                testScore: 0,
                testType : null,

                currStage: "show",//标识当前状态，
                currImgSrc: require("../../assets/defaultImg/defaultImg.png"),//当前显示的图片
                currChecked: "~",//当前选中的是谁
                currIndex: -1,//当前选中的下标

                // correctAnswerList: ['A', 'B', 'D', 'A', 'D',
                //     'C', 'A', 'D', 'B', 'B',
                //     'A', 'C', 'D', 'C', 'C',
                //     'C', 'B', 'B', 'C', 'C',
                //     'A', 'C', 'B', 'B'],//正确答案记录
                correctAnswerList:[
                    'A','B','D','C','B',
                    'D','A','C','D','C',
                    'A','B','B','C','D',
                    'A','C','B','D','A',
                    'A','C','B','D','C',
                    'D','B','A','D','A'],
              imgs:[],
              imgsA:[
                {
                  imgIndex: "1",
                  imgSrc: require("../../assets/image/Test3/Test/A/T1_a cat is sleeping.jpg"),
                  imgDes: "a cat is sleeping"
                },
                {
                  imgIndex: "2",
                  imgSrc: require("../../assets/image/Test3/Test/A/T2_a cat is not sleeping.jpg"),
                  imgDes: "a cat is not sleeping"
                },
                {
                  imgIndex: "3",
                  imgSrc: require("../../assets/image/Test3/Test/A/T3_three cats are running.jpg"),
                  imgDes: "three cats are running"
                },
                {
                  imgIndex: "4",
                  imgSrc: require("../../assets/image/Test3/Test/A/T4_two cats are not eating.jpg"),
                  imgDes: "two cats are not eating"
                },
                {
                  imgIndex: "5",
                  imgSrc: require("../../assets/image/Test3/Test/A/T5_a dog is climbing.jpg"),
                  imgDes: "a dog is climbing"
                },
                {
                  imgIndex: "6",
                  imgSrc: require("../../assets/image/Test3/Test/A/T6_a horse is jumping.jpg"),
                  imgDes: "a horse is jumping"
                },

                {
                  imgIndex: "7",
                  imgSrc: require("../../assets/image/Test3/Test/A/T7_a horse is drinking.jpg"),
                  imgDes: "a horse is drinking"
                },
                {
                  imgIndex: "8",
                  imgSrc: require("../../assets/image/Test3/Test/A/T8_a dog is not climbing.jpg"),
                  imgDes: "a dog is not climbing"
                },
                {
                  imgIndex: "9",
                  imgSrc: require("../../assets/image/Test3/Test/A/T9_a dog is not drinking.jpg"),
                  imgDes: "a dog is not drinking"
                },
                {
                  imgIndex: "10",
                  imgSrc: require("../../assets/image/Test3/Test/A/T10_a horse is not jumping.jpg"),
                  imgDes: "a horse is not jumping"
                },
                {
                  imgIndex: "11",
                  imgSrc: require("../../assets/image/Test3/Test/A/T11_two dogs are climbing.jpg"),
                  imgDes: "two dogs are climbing"
                },
                {
                  imgIndex: "12",
                  imgSrc: require("../../assets/image/Test3/Test/A/T12_three horses are jumping.jpg"),
                  imgDes: "three horses are jumping"
                },

                {
                  imgIndex: "13",
                  imgSrc: require("../../assets/image/Test3/Test/A/T13_two horses are drinking.jpg"),
                  imgDes: "two horses are drinking"
                },
                {
                  imgIndex: "14",
                  imgSrc: require("../../assets/image/Test3/Test/A/T14_two dogs are not climbing.jpg"),
                  imgDes: "two dogs are not climbing"
                },
                {
                  imgIndex: "15",
                  imgSrc: require("../../assets/image/Test3/Test/A/T15_three dogs are not drinking.jpg"),
                  imgDes: "three dogs are not drinking"
                },
                {
                  imgIndex: "16",
                  imgSrc: require("../../assets/image/Test3/Test/A/T16_three horses are not jumping.jpg"),
                  imgDes: "three horses are not jumping"
                },
                {
                  imgIndex: "17",
                  imgSrc: require("../../assets/image/Test3/Test/A/T17_a dirty dog is sleeping.jpg"),
                  imgDes: "a dirty dog is sleeping"
                },
                {
                  imgIndex: "18",
                  imgSrc: require("../../assets/image/Test3/Test/A/T18_a wounded horse is not sleeping.jpg"),
                  imgDes: "a wounded horse is not sleeping"
                },

                {
                  imgIndex: "19",
                  imgSrc: require("../../assets/image/Test3/Test/A/T19_a wounded horse is not eating.jpg"),
                  imgDes: "a wounded horse is not eating"
                },
                {
                  imgIndex: "20",
                  imgSrc: require("../../assets/image/Test3/Test/A/T20_two dirty dogs are eating.jpg"),
                  imgDes: "two dirty dogs are eating"
                },
                {
                  imgIndex: "21",
                  imgSrc: require("../../assets/image/Test3/Test/A/T21_three wounded dogs are not running.jpg"),
                  imgDes: "three wounded dogs are not running"
                },
                {
                  imgIndex: "22",
                  imgSrc: require("../../assets/image/Test3/Test/A/T22_two dirty horses are running.jpg"),
                  imgDes: "two dirty horses are running"
                },
                {
                  imgIndex: "23",
                  imgSrc: require("../../assets/image/Test3/Test/A/T23_a yellow dog is not climbing.jpg"),
                  imgDes: "a yellow dog is not climbing"
                },
                {
                  imgIndex: "24",
                  imgSrc: require("../../assets/image/Test3/Test/A/T24_a yellow horse is not jumping.jpg"),
                  imgDes: "a yellow horse is not jumping"
                },
                {
                  imgIndex: "25",
                  imgSrc: require("../../assets/image/Test3/Test/A/T25_a blue dog is drinking.jpg"),
                  imgDes: "a blue dog is drinking"
                },
                {
                  imgIndex: "26",
                  imgSrc: require("../../assets/image/Test3/Test/A/T26_two blue dogs are climbing.jpg"),
                  imgDes: "two blue dogs are climbing"
                },
                {
                  imgIndex: "27",
                  imgSrc: require("../../assets/image/Test3/Test/A/T27_three yellow horses are jumping.jpg"),
                  imgDes: "three yellow horses are jumping"
                },
                {
                  imgIndex: "28",
                  imgSrc: require("../../assets/image/Test3/Test/A/T28_two blue horses are not drinking.jpg"),
                  imgDes: "two blue horses are not drinking"
                },
                {
                  imgIndex: "29",
                  imgSrc: require("../../assets/image/Test3/Test/A/T29_a yellow cat is eating.jpg"),
                  imgDes: "a yellow cat is eating"
                },
                {
                  imgIndex: "30",
                  imgSrc: require("../../assets/image/Test3/Test/A/T30_three blue cats are running.jpg"),
                  imgDes: "three blue cats are running"
                }],

              imgsB:[{
                imgIndex: "1",
                imgSrc: require("../../assets/image/Test3/Test/B/T1_a girl will plant.jpg"),
                imgDes: "a girl will plant"
              },
                {
                  imgIndex: "2",
                  imgSrc: require("../../assets/image/Test3/Test/B/T2_a girl planted.jpg"),
                  imgDes: "a girl planted"
                },
                {
                  imgIndex: "3",
                  imgSrc: require("../../assets/image/Test3/Test/B/T3_a boy will paint.jpg"),
                  imgDes: "a boy will paint"
                },
                {
                  imgIndex: "4",
                  imgSrc: require("../../assets/image/Test3/Test/B/T4_a boy watered.jpg"),
                  imgDes: "a boy watered"
                },
                {
                  imgIndex: "5",
                  imgSrc: require("../../assets/image/Test3/Test/B/T5_a woman will swim.jpg"),
                  imgDes: "a woman will swim"
                },
                {
                  imgIndex: "6",
                  imgSrc: require("../../assets/image/Test3/Test/B/T6_a grandma will cook.jpg"),
                  imgDes: "a grandma will cook"
                },

                {
                  imgIndex: "7",
                  imgSrc: require("../../assets/image/Test3/Test/B/T7_a grandma will cycle.jpg"),
                  imgDes: "a grandma will cycle"
                },
                {
                  imgIndex: "8",
                  imgSrc: require("../../assets/image/Test3/Test/B/T8_a woman swam.jpg"),
                  imgDes: "a woman swam"
                },
                {
                  imgIndex: "9",
                  imgSrc: require("../../assets/image/Test3/Test/B/T9_a woman cycled.jpg"),
                  imgDes: "a woman cycled"
                },
                {
                  imgIndex: "10",
                  imgSrc: require("../../assets/image/Test3/Test/B/T10_a grandma cooked.jpg"),
                  imgDes: "a grandma cooked"
                },
                {
                  imgIndex: "11",
                  imgSrc: require("../../assets/image/Test3/Test/B/T11_a man will swim.jpg"),
                  imgDes: "a man will swim"
                },
                {
                  imgIndex: "12",
                  imgSrc: require("../../assets/image/Test3/Test/B/T12_a grandpa will cook.jpg"),
                  imgDes: "a grandpa will cook"
                },

                {
                  imgIndex: "13",
                  imgSrc: require("../../assets/image/Test3/Test/B/T13_a grandpa will cycle.jpg"),
                  imgDes: "a grandpa will cycle"
                },
                {
                  imgIndex: "14",
                  imgSrc: require("../../assets/image/Test3/Test/B/T14_a man swam.jpg"),
                  imgDes: "a man swam"
                },
                {
                  imgIndex: "15",
                  imgSrc: require("../../assets/image/Test3/Test/B/T15_a grandpa cooked.jpg"),
                  imgDes: "a grandpa cooked"
                },
                {
                  imgIndex: "16",
                  imgSrc: require("../../assets/image/Test3/Test/B/T16_a man cylced.jpg"),
                  imgDes: "a man cylced"
                },
                {
                  imgIndex: "17",
                  imgSrc: require("../../assets/image/Test3/Test/B/T17_a woman will paint near.jpg"),
                  imgDes: "a woman will paint near"
                },
                {
                  imgIndex: "18",
                  imgSrc: require("../../assets/image/Test3/Test/B/T18_a grandma planted far.jpg"),
                  imgDes: "a grandma planted far"
                },

                {
                  imgIndex: "19",
                  imgSrc: require("../../assets/image/Test3/Test/B/T19_a woman will water far.jpg"),
                  imgDes: "a woman will water far"
                },
                {
                  imgIndex: "20",
                  imgSrc: require("../../assets/image/Test3/Test/B/T20_a man watered near.jpg"),
                  imgDes: "a man watered near"
                },
                {
                  imgIndex: "21",
                  imgSrc: require("../../assets/image/Test3/Test/B/T21_a man painted near.jpg"),
                  imgDes: "a man painted near"
                },
                {
                  imgIndex: "22",
                  imgSrc: require("../../assets/image/Test3/Test/B/T22_a grandpa will plant far.jpg"),
                  imgDes: "a grandpa will plant far"
                },
                {
                  imgIndex: "23",
                  imgSrc: require("../../assets/image/Test3/Test/B/T23_a woman will swim inside.jpg"),
                  imgDes: "a woman will swim inside"
                },
                {
                  imgIndex: "24",
                  imgSrc: require("../../assets/image/Test3/Test/B/T24_a grandma cooked outside.jpg"),
                  imgDes: "a grandma cooked outside"
                },
                {
                  imgIndex: "25",
                  imgSrc: require("../../assets/image/Test3/Test/B/T25_a woman cylced outside.jpg"),
                  imgDes: "a woman cylced outside"
                },
                {
                  imgIndex: "26",
                  imgSrc: require("../../assets/image/Test3/Test/B/T26_a grandpa swam insdie.jpg"),
                  imgDes: "a grandpa swam insdie"
                },
                {
                  imgIndex: "27",
                  imgSrc: require("../../assets/image/Test3/Test/B/T27_a man will cook inside.jpg"),
                  imgDes: "a man will cook inside"
                },
                {
                  imgIndex: "28",
                  imgSrc: require("../../assets/image/Test3/Test/B/T28_a grandpa will cycle outside.jpg"),
                  imgDes: "a grandpa will cycle outside"
                },
                {
                  imgIndex: "29",
                  imgSrc: require("../../assets/image/Test3/Test/B/T29_a girl watered inside.jpg"),
                  imgDes: "a girl watered inside"
                },
                {
                  imgIndex: "30",
                  imgSrc: require("../../assets/image/Test3/Test/B/T30_a boy will paint outside.jpg"),
                  imgDes: "a boy will paint outside"
                }],
              choiceA:[
                ['lapinas miega','lapinai miega','lapinai miegane','lapinas miegane'],//1
                ['lapinai miega','lapinas miegane','lapinas miega','lapinai miegane'],//2
                ['lapinas begane','lapinai begane','lapinas bega','lapinai bega'],//3
                ['lapinas verdane','lapinai verda','lapinai verdane','lapinas verda'],//4
                ['grotuvas lipane','grotuvas lipa','grotuvai lipa','grotuvai lipane'],//5

                ['plaktukai dirba','plaktukai dirbane','plaktukas dirbane','plaktukas dirba'],//6
                ['plaktukas loja','plaktukai lojane','plaktukas lojane','plaktukai loja'],//7
                ['grotuvai lipa','grotuvas lipa','grotuvas lipane','grotuvai lipane'],//8
                ['grotuvas loja','grotuvai lojane','grotuvai loja','grotuvas lojane'],//9
                ['plaktukai dirbane','plaktukai dirba','plaktukas dirbane','plaktukas dirba'],//10

                ['grotuvai lipa','grotuvai lipane','grotuvas lipa','grotuvas lipane'],//11
                ['plaktukai dirbane','plaktukai dirba','plaktukas dirbane','plaktukas dirba'],//12
                ['plaktukai lojane','plaktukai loja','plaktukas lojane','plaktukas loja'],//13
                ['grotuvai lipa','grotuvas lipane','grotuvai lipane','grotuvas lipa'],//14
                ['grotuvas lojane','grotuvas loja','grotuvai loja','grotuvai lojane'],//15

                ['plaktukai dirbane','plaktukai dirba','plaktukas dirbane','plaktukas dirba'],//16
                ['grotuvas purvin miegane','purvin grotuvas miega','grotuvas purvin miega','grotuvai purvin miega'],//17
                ['tylus plaktuks miegane','plaktukas tylus miegane','plaktukai tylus miegane','plaktukas tylus miega'],//18
                ['tylus plaktukas verdane','plaktukai tylus verdane',' plaktukas tylus verda','plaktukas tylus verdane'],//19
                ['grotuvai purvin verda','grotuvai purvin verdane','grotuvas purvin verda','purvin grotuvai verda'],//20

                ['grotuvai tylus begane','grotuvai tylus bega','tylus grotuvai begane','grotuvas tylus begane'],//21
                ['purvin plaktukai bega','plaktukai purvin begane','plaktukai purvin bega','plaktukas purvin bega'],//22
                ['grotuvas gelton lipa','grotuvas gelton lipane','grotuvai gelton lipane','gelton grotuvas lipane'],//23
                ['plaktukas gelton dirba','gelton plaktukas dirbane','plaktukai gelton dirbane','plaktukas gelton dirbane'],//24
                ['grotuvas melyn lojane','grotuvai melyn loja','grotuvas melyn loja','melyn grotuvas loja'],//25

                ['melyn grotuvai lipa','grotuvas melyn lipa','grotuvai melyn lipane','grotuvai melyn lipa'],//26
                ['plaktukai gelton dirbane','plaktukai gelton dirba','plaktukas gelton dirba','gelton plaktukai dirba'],//27
                ['plaktukai melyn lojane','melyn plaktukai lojane','plaktukai melyn loja','plaktukas melyn lojane'],//28
                ['lapinas gelton verda','gelton lapinas verdane','lapinai gelton verdane','lapinas gelton verdane'],//29
                ['lapinai melyn bega','lapinas melyn bega','lapinai melyn begane','melyn lapinai bega'],//30
              ],

              choiceB:[
                ['teiseja taiselo',' teisejas taise','teiseja taise','teisejas taiselo'],//1
                ['teisejas taiselo','teiseja taise','teiseja taiselo','teisejas taise'],//2
                ['teisejas rase','teiseja raselo','teisejas rase','teisejas raselo'],//3
                ['teiseja valgelo','teisejas valgelo','teisejas valge','teiseja valge'],//4
                ['kirpejas ruke','kirpeja rukelo','kirpejas rukelo','kirpeja ruke'],//5

                ['vireja daze','virejas daze','virejas dazelo','vireja dazelo'],//6
                ['vireja laistelo','virejas laiste','virejas laistelo','vireja laiste'],//7
                ['kirpejas ruke','kirpejas rukelo','kirpeja ruke','kirpeja rukelo'],//8
                ['kirpeja laistelo','kirpejas laiste','kirpejas laistelo','kirpeja laiste'],//9
                ['virejas dazelo','virejas daze','vireja daze','vireja dazelo'],//10

                ['kirpejas rukelo','kirpeja ruke','kirpeja rukelo','kirpejas ruke'],//11
                ['virejas daze','virejas dazelo','vireja daze','vireja dazelo'],//12
                ['vireja laiste','virejas laistelo','virejas laiste','vireja laistelo'],//13
                ['kirpejas rukelo','kirpeja rukelo','kirpejas ruke','kirpeja ruke'],//14
                ['virejas dazelo','vireja daze','vireja dazelo','virejas daze'],//15

                ['kirpejas laiste','kirpeja laistelo','kirpejas laistelo','kirpeja laiste'],//16
                ['kirpeja arti rase','kirpeja raselo arti','kirpeja arti raselo','kirpejas arti raselo'],//17
                ['vireja taise toli','vireja toli taise','vireja toli taiselo',' virejas toli taise'],//18
                ['kirpeja toli valge','kirpeja valgelo toli','kirpejas toli valgelo','kirpeja toli valgelo'],//19
                ['kirpejas arti valge','kirpejas arti valgelo','kirpeja arti valge','kirpejas valge arti'],//20

                ['kirpejas arti rase','kirpejas rase arti','kirpeja arti rase','kirpejas arti raselo'],//21
                ['virejas taiselo toli','vireja toli taiselo','virejas toli taiselo','virejas toli taise'],//22
                ['kirpeja viduje ruke','kirpeja viduje rukelo','kirpeja rukelo viduje','kirpejas viduje rukelo'],//23
                ['virejas lauke daze','vireja lauke dazelo','vireja daze lauke','vireja lauke daze'],//24
                ['kirpeja lauke laistelo','kirpeja laiste lauke','kirpeja lauke laiste','kirpejas lauke laiste'],//25

                ['virejas viduje rukelo','vireja viduje ruke','virejas ruke viduje ','virejas viduje ruke'],//26
                ['kirpejas dazelo viduje','kirpejas viduje dazelo','kirpejas viduje daze','kirpeja viduje dazelo'],//27
                ['virejas lauke laistelo',' vireja lauke laistelo','virejas laistelo lauke','virejas lauke laiste'],//28
                ['teiseja viduje valgelo','teisejas viduje valge','teiseja valge viduje ',' teiseja viduje valge'],//29
                ['teisejas lauke raselo','teisejas raselo lauke','teisejas lauke rase','teiseja lauke raselo'],//30
              ],
                startPlayTime: null,
                submitAnsTime: null,

                testOver: false,//标记测试结束

                sendData: {},//发送给后端的数据，包含正确答案，用户答案
                sendDataList: [],

                tipAudioPlay: true,
                testTipAudioPlay: true,

                timeElapsedStart: 0,//开始测试的时间
                theLastTimeId:0,
                theCurrencyId:0
            }
        },
        mounted() {
            //防止页面后退  使用在vue时 挂载到mounted中
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });
            this.AorB()
            this.timeElapsedStart = Date.now()
            this.shuffleImageAndQues()
            this.playTipAudio()
        },
        watch:{
        sendDataList(value){
          localStorage.setItem('sendDataList',JSON.stringify(value))
        }
      },
        methods: {

          AorB() {
            var type = localStorage.getItem('test1Type')
            if (type == 'A') {
              this.imgs = this.imgsA
            }
            else
            {
              this.imgs = this.imgsB
            }
          },
            playTipAudio() {
                //tipAudio内容：学习结束，现在开始测试
                let tipAudio = new Audio(this.audios[24].audioSrc)
                console.log(tipAudio)
                tipAudio.addEventListener("ended", this.tipAudioOver)
                tipAudio.play()
            },
            tipAudioOver() {
                this.tipAudioPlay = false
                //testTipAudio内容：点击XXXX，然后点击XXX，直到测试结束
                let testTipAudio = new Audio(this.audios[25].audioSrc)
                testTipAudio.addEventListener("ended", this.testTipAudioOver)
                testTipAudio.play()

            },
            testTipAudioOver() {
                this.testTipAudioPlay = false
                this.show()
            },
            show() {
                // 获取音频数据
                // this.audiosChoices
                //查询整个数组，找到与图片相对应的音频序号，4个
              console.log(this.imgs[this.quesNum - 1].imgIndex)
                for (let i = 0; i < this.audios.length; i++) {
                    //console.log(this.audios[i].audioDes)
                    if (this.audios[i].audioDes == this.imgs[this.quesNum - 1].imgIndex) {
                        console.log("找到啦")
                        this.audiosChoices.push(this.audios[i].audioIndex)
                    }
                }
                console.log("选项："+this.audiosChoices)

                //开始计时
                this.startPlayTime = Date.now()
                //改变当前状态
                this.currStage = "answer"

                //设置显示图片
                this.currImgSrc = this.imgs[this.quesNum - 1].imgSrc

            },
            submit() {
                {
                    //构建返回后端数据
                    this.sendData["expName"] = "aural_laa"//测试名称，固定
                    var d = new Date();
                    this.sendData["expType"] = localStorage.getItem('test1Type')
                    this.sendData["expDate"] = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()//测试时间
                    this.sendData["partEmail"] = global_.email
                    this.sendData["expSession"] = global_.session
                    this.sendData['trialType'] = "sound_test"//固定
                    this.sendData['testSession'] = "test"//测试阶段，固定


                    this.sendData['trialIndex'] = this.imgs[this.quesNum - 1].imgIndex   //测试的第几题
                    this.sendData['stimulus'] = this.imgs[this.quesNum - 1].imgDes //当前题目的图片
                    //记录反应时间
                    this.submitAnsTime = Date.now()
                    this.sendData['rt'] = this.submitAnsTime - this.startPlayTime   //反应时间
                    this.sendData['userResponse'] = this.currChecked //用户选项

                    console.log(this.audiosChoices[this.currIndex])

                    let path
                    for (let i = 0; i < this.audios.length; i++) {
                        if (this.audios[i].audioIndex == this.audiosChoices[this.currIndex]) {
                            path = this.audios[i].audioSrc
                            break
                        }
                    }

                    var index = path.lastIndexOf("/")
                    // path = path.substring(index + 1, path.length)//找到路径最后一部分
                    // index = path.lastIndexOf(".")
                    // path = path.substring(0, index)//去掉后缀名
                    // index = path.lastIndexOf(".")
                    // path = path.substr(index + 1, path.length)//去掉前面的数字

                    path = path.substring(index + 1, path.length)//找到路径最后一部分，A_T1_A.mp3
                    index = path.lastIndexOf(".")
                    path = path.substring(0, index)//去掉后缀名,A_T1_A
                    index = path.lastIndexOf("_")
                    path = path.substr(index + 1, path.length)//去掉前面的数字
                    console.log()
                    this.sendData['userResponseStimulus'] = path //用户答案对应的单词
                    this.sendData['correctResponse'] = this.correctAnswerList[this.quesNum - 1]
                    if (this.correctAnswerList[this.quesNum - 1] == this.currChecked) {
                        this.sendData['correct'] = 1
                        this.testScore++
                    } else
                        this.sendData['correct'] = 0

                    if (this.quesNum >= 30) {
                        this.sendData['timeElapsed'] = Date.now() - this.timeElapsedStart //整个测试所用时间
                        this.sendData['totalScore'] = this.testScore
                    }

                    this.sendDataList.push(this.sendData)

                    //构建完成，发送数据给后端
                    axios.post("/testThree/sendTestThreeData", this.sendData).then((response) => {
                        console.log(response)
                    })
                }
                if (this.quesNum >= this.totalQuesNum) {
                    this.quesNum++;
                    let overTipAudio = new Audio(this.audios[26].audioSrc)
                    overTipAudio.play()
                    //结束处理
                    this.testOver = true;
                    this.currImgSrc = require("../../assets/defaultImg.png")
                    //主页的index的按钮不能再改了
                    GLOBAL.laa_end = true;
                    GLOBAL.wm_end = false;
                } else {
                    //下一题
                    this.quesNum++

                    //清空下一题所需变量
                    this.audiosChoices = []
                    this.currChecked = "~"

                    this.show()
                }

            },
            //听音并选择答案
            listenThenCheck(choice, index) {
                //听音
                console.log(choice+","+index)
                let audio = document.getElementById(this.audiosChoices[index])
                //audio.src = this.audios[this.audiosChoices[index]].audioSrc
                console.log(audio)
                this.currChecked = choice
                this.currIndex = index

              setTimeout(() =>{
                audio.play()
              },50);

            },
            shuffleImageAndQues() {
                //打乱图像数组
                let array = Array.from({length: 30}, (item, index) => index)
                let array1 = Array.from({length: 30}, (item, index) => index)

                //打乱下标，使用乱序下标进行交换图片数组
                for (let i = 29; i >= 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                    [array1[i], array1[j]] = [array1[j], array1[i]];
                }
                for (let i = 0; i <= 29; i++) {
                    array[i] = this.imgs[array[i]]
                    array1[i] = this.correctAnswerList[array1[i]]
                }
                this.imgs = array
                this.correctAnswerList = array1
                console.log("图片:"+array)
                console.log("正确答案:"+array1)
            },
          //   uploadData(){
          //   let list_test = []
          //   let list_learn = []
          //   list_test = JSON.parse(localStorage.getItem('dataList'))
          //   list_learn = JSON.parse(localStorage.getItem('sendDataList'))
          //   // for (let i = 0; i < list_test.length; i++) {
          //   //   axios.post("/testThree/sendTestThreeData", list_test[i]).then((response) => {
          //   //     console.log(response)
          //   //   })
          //   // }
          //   //
          //   // for(let i = 0; i < list_learn.length; i++) {
          //   //   axios.post("/testThree/sendTestThreeData", list_learn[i]).then((response) => {
          //   //     console.log(response)
          //   //   })
          //   // }
          //     axios.get("/testThree/findMaxId").then((response) =>{
          //       this.theLastTimeId = response.data
          //       console.log(this.theLastTimeId)
          //     })
          //     axios.post("/testThree/sendAllTestData",list_test).then((response) => {
          //       console.log(response)
          //     })
          //     axios.post("/testThree/sendAllTestData", list_learn).then((response) => {
          //       console.log(response)
          //     })
          //     setTimeout(()=> {
          //       axios.get("/testThree/findMaxId").then((response) => {
          //         this.theCurrencyId = response.data
          //         console.log(this.theCurrencyId)
          //       })
          //     },300)
          // },
            backToMain() {
                setTimeout(()=>{
                  localStorage.removeItem('dataList')
                  localStorage.removeItem('sendDataList')
                  localStorage.removeItem('imgs')
                  localStorage.removeItem('audios')
                  this.$router.push('/Index');
                },500)

            },

        }
    }
</script>

<style scoped>

    .content {
        margin: 0;
        padding: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>