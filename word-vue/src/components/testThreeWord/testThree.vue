<template>
    <div>
        <el-container>
            <el-header height="50px">
                <div>
                    <el-progress :text-inside="false" :stroke-width="30" :percentage="((quesNum-1)/totalQuesNum*100).toFixed(0)*1" status="success"></el-progress>
                </div>

            </el-header>
            <el-main id="testThree" style="margin-top: 50px">
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

                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <div v-for="(item,index) in ['A','B','C','D']">
                                <el-button @click="submit(item,index)"
                                            :disabled="!flag"
                                            style="width: 95%;font-size: 18px">
                                    {{item}}. {{currChoiceList[index]}}
                                </el-button>
                            </div>
                        </div>
                    </el-col>

                </el-row>
                <p style="line-height: 0px;font-size: 30px" v-if="flag">
                    请选择图片对应的正确句子
                </p>
                <p style="line-height: 0px;font-size: 30px" v-if="!flag">
                    {{tip}}
                </p>
                <el-button v-show="!flag"
                           style="font-size: 50px"
                           @click="showImg">⊳</el-button>
            </el-main>
        </el-container>

        <modal v-bind:md-show="testOver">
            <p style="font-size: 20px" slot="message">语言分析测试结束，你的分数是{{testScore}}/{{totalQuesNum}}</p>
<!--            <p style="font-size: 20px" slot="message">请点击“结束”，获得完整的外语学能测试报告。</p>-->
            <div slot="btnGroup">
                <a style="font-size: 30px" class="btn btn--m" @click="backToMain">结束</a>
            </div>
        </modal>
    </div>
</template>

<script>
    import modal from "../Modal";
    import GLOBAL from "../../plugins/global_variable";

    export default {
        name: "testThree",
        components:{
            modal
        },
        props:{
        },
        data(){
            return{
                baseURL:GLOBAL.baseURL,

                flag:false,//是否出题阶段
                tip:"点击 ⊳ 开始测试",
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
                choice:[],
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
                ['teisejas rase','teiseja raselo','teiseja rase','teisejas raselo'],//3
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
                quesNum:1,//当前题号
                totalQuesNum:30,//总题目数量
                testScore:0,

                currImgSrc:require("../../assets/defaultImg.png"),//当前显示的图片
                currChoiceList:['~','~','~','~'],//当前显示的选项

                correctAnswerList:[
                'A','B','D','C','B',
                'D','A','C','D','C',
                'A','B','B','C','D',
                'A','C','B','D','A',
                'A','C','B','D','C',
                'D','B','A','D','A'],
                testType:null,
                startPlayTime:null,
                submitAnsTime:null,
                timeElapsedStart:Date.now(),

                testOver:false,//标记测试结束

                sendData:{},//发送给后端的数据，包含正确答案，用户答案

            }
        },
        // created(){
        //   this.getAorB()
        // },
        mounted() {

            //防止页面后退  使用在vue时 挂载到mounted中
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });
            this.getAorB() //先判断试卷类型
            this.shuffleQuesAndChoice()
            //图片预加载

            setTimeout(() =>{
              for(let i = 0; i < this.imgs.length; i++){
                let img = new Image()
                img.src = this.imgs[i].imgSrc
                console.log(img.src)
              }
            },300);

        },
        methods:{
            getAorB(){
              this.testType = localStorage.getItem("test3Type")
              if(this.testType == "A"){
                this.imgs = this.imgsA
                this.choice = this.choiceA
              }
              else {
                this.imgs = this.imgsB
                this.choice = this.choiceB
              }
              console.log("测试题试卷类型:"+this.testType)
              console.log(this.imgs)
            },
            showImg(){
                this.flag = true    //进入答题阶段
                //开始计时
                this.startPlayTime = Date.now()
                console.log(this.imgs)
                console.log(this.choice)
                //设置显示图片
                this.currImgSrc = this.imgs[this.quesNum-1].imgSrc
                this.currChoiceList = this.choice[this.quesNum-1]
            },
            submit(item,index){
                //TODO: 更新此逻辑
                {
                    //构建返回后端数据
                    this.sendData["expName"] = "written_laa"//测试名称，固定
                    var d = new Date();
                    this.sendData["expType"] = localStorage.getItem('test3Type')
                    this.sendData["expDate"] = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()//测试时间
                    this.sendData["partEmail"] = GLOBAL.email//TODO:测试者邮箱，唯一标识，需要从全局拿
                    this.sendData["expSession"] = GLOBAL.session//TODO:需要从全局拿
                    this.sendData['trialType'] = "image_test"//固定
                    this.sendData['testSession'] = "test"//测试阶段，固定

                    this.sendData['trialIndex'] = this.imgs[this.quesNum-1].imgIndex   //测试的第几题
                    this.sendData['stimulus'] = this.imgs[this.quesNum-1].imgDes //当前题目的图片
                    //记录反应时间
                    this.submitAnsTime = Date.now()
                    this.sendData['rt'] = this.submitAnsTime - this.startPlayTime   //反应时间
                    let A = ['A','B','C','D']
                    this.sendData['userResponse'] = A[index] //用户选项


                    this.sendData['userResponseStimulus'] = this.currChoiceList[index] //用户答案对应的单词
                    this.sendData['correctResponse'] = this.correctAnswerList[this.quesNum-1]
                    if (this.correctAnswerList[this.quesNum-1] == A[index]) {
                        this.sendData['correct'] = 1
                        this.testScore++
                    } else
                        this.sendData['correct'] = 0

                    if (this.quesNum >= 30){
                        this.sendData['timeElapsed'] = Date.now() - this.timeElapsedStart //整个测试所用时间
                        this.sendData['totalScore'] = this.testScore
                    }
                    //构建完成，发送数据给后端
                    axios.post("/Laa/sendLaaData", this.sendData).then((response) => {
                        console.log(response)
                    })
                }
                this.quesNum++
                if(this.flag == true){
                    this.flag = false;
                    this.tip = "点击 ⊳ 继续下一道题"
                    this.currImgSrc = require("../../assets/defaultImg.png")
                    this.currChoiceList = ['~','~','~','~']

                    if(this.quesNum > this.totalQuesNum){
                        //结束处理
                        this.testOver=true;
                        this.currImgSrc=require("../../assets/defaultImg.png")
                        //主页的index的题型3按钮不能再改了
                        GLOBAL.laa_end=true;
                        GLOBAL.wm_end = false;

                    }

                }
            },
            shuffleQuesAndChoice(){
                //打乱图像数组
                console.log("打乱前：")
                let array = Array.from({length:30},(item, index)=> index)
                let array1 = Array.from({length:30},(item, index)=> index)
                let array2 = Array.from({length:30},(item, index)=> index)

                console.log(array)
                //打乱下标，使用乱序下标进行交换图片数组
                for (let i = 29; i >= 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                    [array1[i], array1[j]] = [array1[j], array1[i]];
                    [array2[i], array2[j]] = [array2[j], array2[i]];
                }
                for(let i = 0; i <= 29;i++){
                    array[i] = this.imgs[array[i]]
                    array1[i] = this.choice[array1[i]]
                    array2[i] = this.correctAnswerList[array2[i]]
                }

                this.imgs = array
                this.choice = array1
                this.correctAnswerList = array2
                console.log("img:"+array)
                console.log("choice:"+array1)
                console.log("答案："+array2)

            },
            backToMain(){
                this.$router.push('/Index');
            },
        }
    }
</script>

<style scoped>
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
        height: 520px;
    }

    /*#testThree{*/
    /*    width: 800px;*/
    /*}*/

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