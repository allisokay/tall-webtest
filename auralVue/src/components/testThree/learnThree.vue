<template>
    <div>
        <el-container>
            <el-header height="50px"  style="margin-top: 30px">
                <div v-if="!startFlag">
                    <div class="tip">
                        <h1 style="font-size: 50px">语言分析</h1>
                    </div>
                    <div class="tip-btn">
                        <el-button type="primary"
                                   style="font-size:50px;margin-right: 30px"
                                   @click="reListen">重听</el-button>
                        <el-button type="primary"
                                   style="font-size:50px;margin-right: 30px"
                                   :disabled="tipAudioPlay"
                                   @click="startLearn()">开始学习</el-button>
                    </div>
                </div>

              <div v-if="startFlag">
                <el-progress :text-inside="true" :stroke-width="20"
                             :percentage="(restTime/totalTime*100).toFixed(0)*1" status="success"></el-progress>
                <div style="font-size: 20px; ">
                  <strong>
                    <div><font>点击蓝色按键开始学习。可以做笔记。</font></div>
                  </strong>
                </div>
              </div>


            </el-header>

            <el-main v-if="startFlag && !timeOutFlag" style="margin-top: 50px">
                <el-row :gutter="20">
                    <el-col :span="13">
                        <div class="grid-content bg-purple">
                            <el-button class="btn" v-for="item in imgs" @click="checked(item)" :disabled="!canClick"></el-button>
                        </div>
                    </el-col>

                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-image style="height:230px; width: 230px; margin: 50px 0px 10px 0px" :src="this.checkedImg">
                            </el-image>
                        </div>
                    </el-col>
                </el-row>

                <audio v-for="(item,index) in audios" :id='item.audioIndex' :src="item.audioSrc"></audio>

            </el-main>
        </el-container>

<!--        <el-image v-for="(item,index) in imgs" :src="baseURL + item.imgSrc" v-show="false"></el-image>-->
<!--        <modal v-bind:md-show="timeOutFlag">-->
<!--            <p slot="message">学习时间结束，点击开始测试进入测试阶段</p>-->
<!--            <div slot="btnGroup">-->
<!--                <a class="btn btn&#45;&#45;m" @click="goToTestThree">开始测试</a>-->
<!--            </div>-->
<!--        </modal>-->
    </div>
</template>

<script>
    import modal from "../Modal";
    import global_ from "../../plugins/global_variable";

    export default {
        name: "learnThree",
        components:{
            modal//倒计时结束后弹出的对话框
        },
        props:{
            imgs:null,
            audios:null,
            clickTimes:Array
        },
        data(){
            return{
                startFlag:false,//是否点击开始学习按钮
                // restTime:300,//剩余学习时间
                // totalTime:300,//总学习时间
               restTime:300,//剩余学习时间 300
               totalTime:300,//总学习时间 300

                //选中的图像
                checkedImg:require("../../assets/defaultImg.png"),

                baseURL:global_.baseURL,

                tipAudio:[],//页面1提示音，包含1-1和1-2
                copyTipAudio:[],//提示音数组副本，存放正在播放或已经播放的数组，为了实现重听功能
                tipAudioPlay:true,

                canClick:false,//用户是否可以点击图片了
                firstClick:true,//标记用户是否点击第一张图片

                timeElapsedStart:Date.now(),//开始学习的时间

                dataList: []//存放每一个图片的学习数据
            }
        },
        computed:{
            //计算属性，学习结束后自动弹出弹框
            timeOutFlag(){
                return this.restTime<0
            }
        },
        mounted() {

            //防止页面后退  使用在vue时 挂载到mounted中
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

            // this.requestRes()
            console.log(this.imgs)
            this.tipAudio.push(new Audio(this.audios[20].audioSrc))
            this.tipAudio.push(new Audio(this.audios[21].audioSrc))
            //this.tipAudio.push(new Audio(this.baseURL + this.audios[25].audioSrc))
            this.playTipAudio()
        },
        methods:{
            //开始学习的倒计时
            startLearn(){
                this.startFlag = true
                this.tipAudio.push(new Audio(this.audios[22].audioSrc))
                this.tipAudio.push(new Audio(this.audios[23].audioSrc))
                // this.tipAudio.push(new Audio(this.baseURL + this.audios[27].audioSrc))
                this.playTip2Audio()
                this.preLoadImage()
            },
            preLoadImage(){
                //图片预加载
                for(let i = 0; i < this.imgs.length; i++){
                    let img = new Image()
                    //img.src = this.baseURL + this.imgs[i].imgSrc
                    img.src = this.imgs[i].imgSrc
                }
            },
            //页面2播放提示音
            playTip2Audio(){
                if(this.tipAudio.length == 0){
                    this.changeCanClick()
                }
                else{
                    this.copyTipAudio.push(this.tipAudio[0])
                    let tip = this.tipAudio.shift()
                    tip.addEventListener("ended",this.playTip2Audio)
                    tip.play()
                }
            },
            //可以点击20个按钮开始学习
            changeCanClick(){
                this.canClick=true
            },
            //组件更换，学习完成后跳转到测试组件
            goToTestThree(){
                this.restTime = 0
                this.$emit('learnFinished')
            },
            checked(item){
                if(this.canClick){
                    this.clickTimes[item.imgIndex-1]++    //TODO:点击次数加一
                    console.log(this.clickTimes)
                    //第一次点击图片后，开始计时
                    if(this.firstClick){
                        this.startTiming()
                        this.firstClick = false
                    }
                    this.checkedImg = item.imgSrc
                    let audio = document.getElementById(item.imgIndex)
                    audio.play()
                }
            },
            //开始学习倒计时，点击第一个图片后开始计时
            startTiming(){
                this.timer = setInterval(()=>{
                        this.restTime--
                        if(this.restTime < 0){
                            //提示学习结束，并弹框，跳转测试页面
                            clearInterval(this.timer)
                            for(let i = 0; i < 20; i++)
                            {
                                let dataRow={}
                                //构建返回后端数据
                                dataRow["expName"] = "aural_laa"//测试名称，固定
                                dataRow["expType"] = localStorage.getItem('test3Type')
                                var d = new Date();
                                dataRow["expDate"] = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()//测试时间
                                dataRow["partEmail"] = global_.email//TODO:测试者邮箱，唯一标识，需要从全局拿
                                dataRow["expSession"] = global_.session//TODO:需要从全局拿
                                dataRow['trialType'] = "sound_test"//固定
                                dataRow['testSession'] = "learning"//学习阶段，固定
                                // if(i == 23)
                                if(i == 19)
                                    dataRow['timeElapsed'] = Date.now()-this.timeElapsedStart//整个测试所用时间
                                dataRow['trialIndex'] = i+1   //当前的题目对应的下标是哪个？？
                                dataRow['stimulus'] = this.imgs[i].imgDes //当前题目对应的是啥？？？
                                dataRow['buttonPressed'] = this.clickTimes[i]  //学习次数

                                this.dataList.push(dataRow)
                                //构建完成，发送数据给后端
                                axios.post("/testThree/sendTestThreeData", dataRow).then((response) => {
                                    console.log(response)
                                })
                            }
                            localStorage.setItem('dataList',JSON.stringify(this.dataList))
                            this.$emit('learnFinished')
                        }
                    },1000
                )
            },
            //页面1播放提示音
            playTipAudio(){
              console.log("开始放提示音")
                if(this.tipAudio.length == 0){
                    this.tipAudioOver()
                }
                else{
                    //TODO：修改提示音的部分
                    this.copyTipAudio.push(this.tipAudio[0])
                    let tip = this.tipAudio.shift()
                    tip.addEventListener("ended",this.playTipAudio)
                    tip.play()
                }
            },
            //页面1的提示音
            tipAudioOver(){
                this.tipAudioPlay=false
            },
            reListen(){
                //暂停目前正在播放的音频
                for(let i = 0;i < this.copyTipAudio.length; i++){
                    this.copyTipAudio[i].pause();
                }
                //清空原来的音频
                let j = this.tipAudio.length
                for(let i = 0; i < j; i++){
                    this.tipAudio.shift()
                }
                //重新设置音频播放
                this.tipAudioPlay=true
                // this.tipAudio.push(new Audio(this.baseURL + this.audios[24].audioSrc))
                // this.tipAudio.push(new Audio(this.baseURL + this.audios[25].audioSrc))
                this.tipAudio.push(new Audio(this.audios[20].audioSrc))
                this.tipAudio.push(new Audio(this.audios[21].audioSrc))
                this.playTipAudio()
            }
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