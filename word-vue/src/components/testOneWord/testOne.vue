<template>
    <div>
        <el-container>
            <el-header height="50px">
                <div>
                    <el-progress :text-inside="true" :stroke-width="30"
                                 :percentage="((quesNum-1)/totalQuesNum*100).toFixed(0)*1"
                                 status="success"></el-progress>
                </div>
            </el-header>
            <el-main>
                <div>
                    <el-image v-for="(item,index) in showImgs"
                              v-bind:class="{'selected':(currChecked == item.index)}"
                              style="width: 100px; height: 100px; margin:0px 10px 0px 10px;"
                              :src="item.src"
                              @click="submitAns(item.index,item.name)">
                    </el-image>
                </div>
                <p style="line-height: 0px" v-if="flag">
                    <strong>
                        <font>请点击</font>
                        <font size="6" style="margin: 0px 15px 0px 15px">{{quesImgs[quesNum - 1].name}}</font>
                        <font>对应的图片。如果您记不清楚，可以猜一下。</font>
                    </strong>
                </p>
                <h1 style="line-height: 0px;" v-if="!flag">
                    {{tip}}
                </h1>
                <div>
                    <el-button v-show="!flag"
                               primary
                               style="font-size: 50px"
                               @click="showWord">{{confirmOrOver}}
                    </el-button>
                </div>
            </el-main>
        </el-container>

        <modal v-bind:md-show="testOver">
            <p style="font-size: 20px" slot="message">这部分测试共有20个单词，您答对了{{testScore}}个。</p>
            <div slot="btnGroup">
                <a class="btn btn--m" style="font-size: 20px" @click="backToMain()">回到主页面</a>
            </div>
        </modal>
    </div>

</template>

<script>
    import modal from '../../components/Modal'
    import GLOBAL from "../../plugins/global_variable"
    import global_variable from "../../plugins/global_variable";
    // import global_variable from "../../plugins/global_variable";

    export default {
        name: "testOne",
        components: {
            modal
        },
        data() {
            return {
                baseURL: GLOBAL.baseURL,
                confirmOrOver: "⊳",
                tip: "点击 ⊳ 开始测试",

                quesNum: 1,//当前题号
                totalQuesNum: 20,//总题目数量
                currChecked: null,//当前选中的答案，每题中，可以更改多次答案，只记录最后点击确认时的答案

                testOver: false,//测试结束标志
                testScore: 0,//测试分数

                startPlayTime: null,
                submitAnsTime: null,

                sendData: {},//传回后端的数据
                sendDataList: [],

                testType:null,

                flag: false,//是否出题阶段
                showImgs:[],
                showAImgs: [
                    {index: 1, name:"alk",src:require("../../assets/image/Test1/A/1.jpeg")},
                    {index: 2, name:"bėk",src:require("../../assets/image/Test1/A/2.jpg")},
                    {index: 3, name:"dek",src:require("../../assets/image/Test1/A/3.jpeg")},
                    {index: 4, name:"imk",src:require("../../assets/image/Test1/A/4.jpeg")},
                    {index: 5, name:"lėk",src:require("../../assets/image/Test1/A/5.jpg")},

                    {index: 6, name:"lok",src:require("../../assets/image/Test1/A/6.jpg")},
                    {index: 7, name:"sek",src:require("../../assets/image/Test1/A/7.jpeg")},
                    {index: 8, name:"šuo",src:require("../../assets/image/Test1/A/8.jpg")},
                    {index: 9, name:"vyk",src:require("../../assets/image/Test1/A/9.jpg")},
                    {index: 10, name:"lai",src:require("../../assets/image/Test1/A/10.jpeg")},

                    {index: 11, name:"burė",src:require("../../assets/image/Test1/A/11.jpeg")},
                    {index: 12, name:"gėlė",src:require("../../assets/image/Test1/A/12.jpeg")},
                    {index: 13, name:"kasa",src:require("../../assets/image/Test1/A/13.jpg")},
                    {index: 14, name:"lapė",src:require("../../assets/image/Test1/A/14.jpg")},
                    {index: 15, name:"musė",src:require("../../assets/image/Test1/A/15.jpeg")},

                    {index: 16, name:"ožys",src:require("../../assets/image/Test1/A/16.jpeg")},
                    {index: 17, name:"pala",src:require("../../assets/image/Test1/A/17.jpg")},
                    {index: 18, name:"sagė",src:require("../../assets/image/Test1/A/18.jpg")},
                    {index: 19, name:"lova",src:require("../../assets/image/Test1/A/19.jpg")},
                    {index: 20, name:"žolė",src:require("../../assets/image/Test1/A/20.jpg")},
                ],
              showBImgs: [
                {index: 1, name:"auk",src:require("../../assets/image/Test1/B/1.jpeg")},
                {index: 2, name:"dėk",src:require("../../assets/image/Test1/B/2.jpg")},
                {index: 3, name:"eik",src:require("../../assets/image/Test1/B/3.jpg")},
                {index: 4, name:"jau",src:require("../../assets/image/Test1/B/4.jpg")},
                {index: 5, name:"lis",src:require("../../assets/image/Test1/B/5.jpg")},

                {index: 6, name:"mik",src:require("../../assets/image/Test1/B/6.jpg")},
                {index: 7, name:"nei",src:require("../../assets/image/Test1/B/7.jpeg")},
                {index: 8, name:"peš",src:require("../../assets/image/Test1/B/8.jpg")},
                {index: 9, name:"pyk",src:require("../../assets/image/Test1/B/9.jpeg")},
                {index: 10, name:"veš",src:require("../../assets/image/Test1/B/10.jpg")},

                {index: 11, name:"ačiū",src:require("../../assets/image/Test1/B/11.jpeg")},
                {index: 12, name:"ežys",src:require("../../assets/image/Test1/B/12.jpeg")},
                {index: 13, name:"gyva",src:require("../../assets/image/Test1/B/13.jpeg")},
                {index: 14, name:"kėdė",src:require("../../assets/image/Test1/B/14.jpg")},
                {index: 15, name:"lėlė",src:require("../../assets/image/Test1/B/15.jpg")},

                {index: 16, name:"saga",src:require("../../assets/image/Test1/B/16.jpg")},
                {index: 17, name:"oras",src:require("../../assets/image/Test1/B/17.jpeg")},
                {index: 18, name:"ritė",src:require("../../assets/image/Test1/B/18.jpg")},
                {index: 19, name:"šaka",src:require("../../assets/image/Test1/B/19.jpg")},
                {index: 20, name:"žemė",src:require("../../assets/image/Test1/B/20.jpg")},
              ],
                quesImgs: [],

                timeElapsedStart: 0,//开始测试的时间
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
        },
      watch:{
        sendDataList(value){
          localStorage.setItem('sendDataList',JSON.stringify(value))
        }
      },

        methods: {
            showWord() {
                this.flag = true//进入答题阶段
                this.startPlayTime = Date.now()
            },
            //判断是A卷还是B卷
            AorB(){
                this.testType = localStorage.getItem('test1Type')
                console.log('测试卷为'+this.testType)
                if(this.testType=='A'){
                  this.showImgs = this.showAImgs
                }
                else {
                  this.showImgs = this.showBImgs
                }
            },
            //提交答案
            submitAns(index, name) {
                if (this.flag == true) {
                    this.$message({
                        message: '已成功作答',
                        type: 'success',
                    });

                    //上传数据
                    {
                        /*结束处理*/
                        //构建返回后端的数据
                        this.sendData["expName"] = "written_vl"//测试名称，固定
                        var d = new Date();
                        this.sendData["expType"] = localStorage.getItem('test1Type')
                        this.sendData["expDate"] = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()//测试时间
                        this.sendData["partEmail"] = GLOBAL.email//TODO:测试者邮箱，唯一标识，需要从全局拿
                        this.sendData["expSession"] = GLOBAL.session//TODO:需要从全局拿
                        this.sendData['trialType'] = "image_test"//固定
                        this.sendData['testSession'] = "test"//测试阶段，固定


                        this.sendData['trialIndex'] = this.quesImgs[this.quesNum - 1].index    //当前的题目对应的下标
                        this.sendData['stimulus'] = this.quesImgs[this.quesNum - 1].name  //当前题目对应的单词
                        //记录测试反应时间
                        this.submitAnsTime = Date.now()
                        this.sendData['rt'] = this.submitAnsTime - this.startPlayTime   //反应时间

                        this.sendData['userResponse'] = index   //用户答案对应的下标
                        this.sendData['userResponseStimulus'] = name //用户答案对应的单词
                        if (this.sendData['trialIndex'] == index) {
                            this.sendData['correct'] = 1
                            this.testScore++
                        } else
                            this.sendData['correct'] = 0

                        if (this.quesNum >= this.totalQuesNum) {
                            this.sendData['totalScore'] = this.testScore
                            this.sendData['timeElapsed'] = Date.now() - this.timeElapsedStart//整个测试所用时间
                        }
                        this.sendDataList.push(this.sendData)
                        axios.post("/Vl/sendVlData", this.sendData).then((response) => {
                            console.log(response)
                        })
                    }

                    this.quesNum++;
                    this.flag = false;
                    this.currChecked = index
                    this.tip = "点击 ⊳ 继续下一道题"
                    //设定无当前选中图片
                    this.currChecked = null
                    //结束
                    if (this.quesNum > this.totalQuesNum) {
                        this.quesNum++
                        this.confirmOrOver = "结束"
                        this.showResult()
                        //主页的index的题型1按钮不能再改了
                        GLOBAL.vl_end = true;
                        GLOBAL.sd_end = false;
                    }
                }

            },

            showResult() {
                this.testOver = true
            },
            shuffleImageAndQues() {
                //打乱图像数组
                let array = Array.from({length: 20}, (item, index) => index)

                //打乱下标，使用乱序下标进行交换图片数组
                for (let i = 19; i >= 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                for (let i = 0; i <= 19; i++) {
                    array[i] = this.showImgs[array[i]]
                }

                //打乱图像数组
                let array1 = Array.from({length: 20}, (item, index) => index)

                //打乱下标，使用乱序下标进行交换图片数组
                for (let i = 19; i >= 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [array1[i], array1[j]] = [array1[j], array1[i]];
                }
                for (let i = 0; i <= 19; i++) {
                    array1[i] = this.showImgs[array1[i]]
                }
                this.showImgs = array

                this.quesImgs = array1
            },
            backToMain() {
              localStorage.removeItem('dataList')
              localStorage.removeItem('sendDataList')
                //TODO：修改返回页面的值
                this.$router.push({
                    path: "/index"
                })
            }

        }
    }
</script>

<style scoped>
    .selected {
        opacity: 0.1;
        filter: alpha(opacity=10);
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
        height: 720px;
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
</style>