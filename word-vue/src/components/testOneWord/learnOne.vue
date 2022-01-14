<template>
    <div>
        <el-container>
            <el-header height="50px">
                <div v-if="!startFlag">
                    <h1 style="font-size: 50px">单词学习</h1>
                    <h2>这一部分测试考查的是您学习外语新单词的能力。</h2>
                    <h2>
                        首先，您有两分钟的时间来学习和记忆20个物体的名称。
                        在学习的过程中，
                    </h2>
                    <h2 style="color: red"><strong>您不能做任何笔记。</strong></h2>
                    <h2>
                        完成学习后，电脑将测试您记住了多少个物体的名称。
                    </h2>
                    <el-button type="primary"
                               style="font-size: 50px"
                               @click="startLearn">开始学习</el-button>
                </div>
                <div v-if="startFlag">
                    <el-progress :text-inside="true"
                                 :stroke-width="24"
                                 :percentage="(restTime/totalTime*100).toFixed(0)*1"
                                 status="success">
                    </el-progress>
                </div>
            </el-header>
            <el-main v-if="startFlag && !timeOutFlag">
                <h3 style="line-height: 20px;font-size: 50px">{{this.word}}</h3>
                <el-image style="width: 100px; height: 100px; margin:0px 10px 0px 10px;"
                          v-for="(item,index) in imgs"
                          :src="item.src"
                          v-on:mousemove="setWord(item.name,index)"
                          v-on:mouseleave="setDefault()">
                </el-image>
                <h3 style="line-height: 10px">移动鼠标到图片上，学习它的名称</h3>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import global_ from "../../plugins/global_variable"
    import global_variable from "../../plugins/global_variable";
    import GLOBAL from "@/plugins/global_variable";
    export default {
        name: "learnOne",
        components:{
            // modal,//倒计时结束后弹出的对话框
        },
        props:{
            clickTimes:Array,
        },
        data(){
            return{
                baseURL:global_.baseURL,
                startFlag:false,//是否点击开始学习按钮

                startTime:Date.now(),//开始学习的时间
                // totalTime:180,//总时间
                // restTime:180,//剩余学习时间

                totalTime:120,//总时间
                restTime:120,//剩余学习时间
                canClick:false,//用户是否可以点击图片了
                firstClick:true,//标记用户是否点击第一张图片

                dataList: [],//存放每一个图片的学习数据
                testType:'',

                word:"~",
                index: 0,
                imgs:[],
                imgsA:[
                    {name:"alk",src:require("../../assets/image/Test1/A/1.jpeg")},
                    {name:"bėk",src:require("../../assets/image/Test1/A/2.jpg")},
                    {name:"dek",src:require("../../assets/image/Test1/A/3.jpeg")},
                    {name:"imk",src:require("../../assets/image/Test1/A/4.jpeg")},
                    {name:"lėk",src:require("../../assets/image/Test1/A/5.jpg")},

                    {name:"lok",src:require("../../assets/image/Test1/A/6.jpg")},
                    {name:"sek",src:require("../../assets/image/Test1/A/7.jpeg")},
                    {name:"šuo",src:require("../../assets/image/Test1/A/8.jpg")},
                    {name:"vyk",src:require("../../assets/image/Test1/A/9.jpg")},
                    {name:"lai",src:require("../../assets/image/Test1/A/10.jpeg")},

                    {name:"burė",src:require("../../assets/image/Test1/A/11.jpeg")},
                    {name:"gėlė",src:require("../../assets/image/Test1/A/12.jpeg")},
                    {name:"kasa",src:require("../../assets/image/Test1/A/13.jpg")},
                    {name:"lapė",src:require("../../assets/image/Test1/A/14.jpg")},
                    {name:"musė",src:require("../../assets/image/Test1/A/15.jpeg")},

                    {name:"ožys",src:require("../../assets/image/Test1/A/16.jpeg")},
                    {name:"pala",src:require("../../assets/image/Test1/A/17.jpg")},
                    {name:"sagė",src:require("../../assets/image/Test1/A/18.jpg")},
                    {name:"lova",src:require("../../assets/image/Test1/A/19.jpg")},
                    {name:"žolė",src:require("../../assets/image/Test1/A/20.jpg")},
                ],
                imgsB:[
                  {name:"auk",src:require("../../assets/image/Test1/B/1.jpeg")},
                  {name:"dėk",src:require("../../assets/image/Test1/B/2.jpg")},
                  {name:"eik",src:require("../../assets/image/Test1/B/3.jpg")},
                  {name:"jau",src:require("../../assets/image/Test1/B/4.jpg")},
                  {name:"lis",src:require("../../assets/image/Test1/B/5.jpg")},

                  {name:"mik",src:require("../../assets/image/Test1/B/6.jpg")},
                  {name:"nei",src:require("../../assets/image/Test1/B/7.jpeg")},
                  {name:"peš",src:require("../../assets/image/Test1/B/8.jpg")},
                  {name:"pyk",src:require("../../assets/image/Test1/B/9.jpeg")},
                  {name:"veš",src:require("../../assets/image/Test1/B/10.jpg")},

                  {name:"ačiū",src:require("../../assets/image/Test1/B/11.jpeg")},
                  {name:"ežys",src:require("../../assets/image/Test1/B/12.jpeg")},
                  {name:"gyva",src:require("../../assets/image/Test1/B/13.jpeg")},
                  {name:"kėdė",src:require("../../assets/image/Test1/B/14.jpg")},
                  {name:"lėlė",src:require("../../assets/image/Test1/B/15.jpg")},

                  {name:"saga",src:require("../../assets/image/Test1/B/16.jpg")},
                  {name:"oras",src:require("../../assets/image/Test1/B/17.jpeg")},
                  {name:"ritė",src:require("../../assets/image/Test1/B/18.jpg")},
                  {name:"šaka",src:require("../../assets/image/Test1/B/19.jpg")},
                  {name:"žemė",src:require("../../assets/image/Test1/B/20.jpg")},
                ],
            }
        },
        mounted() {
            //防止页面后退  使用在vue时 挂载到mounted中
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });
            this.AorB()
            this.preLoadImage()
        },
        computed:{
            //计算属性，学习结束后自动弹出弹框
            timeOutFlag(){
                return this.restTime < 0
            }
        },
        methods: {
          //检查两次做的时间间隔
            setWord(name,index){
                this.word = name
                //console.log('word is ' + this.word)
                this.index = index
                // 如果是第一次开始学习，就开始计时
                if(this.firstClick){
                    this.startTiming()
                    this.firstClick = false
                }
            },
            setDefault(){
                this.clickTimes[this.index]++
                console.log(this.clickTimes)
                this.word = "~"
            },
            preLoadImage(){
                //图片预加载
                for(let i = 0; i < this.imgs.length; i++){
                    let img = new Image()
                    img.src = this.imgs[i].src
                }
            },
            //开始学习
            startLearn(){
                this.startFlag = true
            },
            changeCanClick(){
                this.canClick=true
            },
            //开始学习倒计时，点击第一个图片后开始计时
            startTiming(){
                this.timer = setInterval(()=>{
                        this.restTime--
                        if(this.restTime < 0){
                            //提示学习结束，并弹框，跳转测试页面
                            clearInterval(this.timer)
                            //学习数据发送给后端
                            for(let i = 0; i < 20; i++)
                            {
                                let dataRow={}
                                //构建返回后端数据
                                dataRow["expName"] = "written_vl"//测试名称，固定
                                var d = new Date();
                                dataRow["expDate"] = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()//测试时间
                                dataRow["expType"] = localStorage.getItem('test1Type')
                                dataRow["partEmail"] = global_.email//TODO:测试者邮箱，唯一标识，需要从全局拿
                                dataRow["expSession"] = global_.session//TODO:需要从全局拿
                                dataRow['trialType'] = "image_test"//固定
                                dataRow['testSession'] = "learning"//学习阶段，固定
                                if(i==19)
                                    dataRow['timeElapsed'] = Date.now()-this.startTime//整个测试所用时间
                                dataRow['trialIndex'] = i+1  //当前的题目对应的下标是哪个？？
                                dataRow['stimulus'] = this.imgs[i].name //当前题目对应的是啥？？？
                                dataRow['buttonPressed'] = this.clickTimes[i]  //学习次数

                                this.dataList.push(dataRow)
                                console.log(this.dataList)
                                // //构建完成，发送数据给后端
                                axios.post("/Vl/sendVlData", dataRow).then((response) => {
                                    console.log(response)
                                })
                            }
                            localStorage.setItem('dataList',JSON.stringify(this.dataList))
                            this.$emit('learnFinished')
                        }
                    },1000
                )
            },
            //A、B卷随机
          AorB(){
            let type = GLOBAL.testType;
            if(type.length != 0 ) {
              GLOBAL.Session = 'second';
              console.log('Session: ' + GLOBAL.Session);
              //第二次做试卷
              if(type === 'A'){
                this.testType = 'B'
                this.imgs = this.imgsB
              }
              else {
                this.testType = 'A'
                this.imgs = this.imgsA
              }
              console.log('当前为试卷'+this.testType)
            }
            else {
              GLOBAL.Session = 'first';
              console.log('Session: ' + GLOBAL.Session);
              var seed = Math.round(Math.random() * 10 + 1)
              console.log('seed:' + seed)
              if (seed > 5) {
                this.imgs = this.imgsB
                this.testType = 'B'
                console.log('当前为试卷' + this.testType)
              }
              else {
                this.imgs = this.imgsA
                this.testType = 'A'
                console.log('当前为试卷' + this.testType)
              }
            }
            localStorage.setItem('test1Type', this.testType) //存储当前试卷类型
          }
            // //组件更换，学习完成后跳转到测试组件
            // goToTestOne(){
            //     this.restTime = 0
            //     this.$emit('learnFinished')
            // },
        },

    }
</script>

<style scoped>

    #restTime{
        color:#d1434a;
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