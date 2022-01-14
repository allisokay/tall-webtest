<template>
  <div>
    <el-container>
      <el-header height="50px">
        <div v-if="!startFlag">
          <h1 style="color: orangered">请勿在任何时候点击刷新页面，否则系统将会关闭测试，您将失去参加测试的资格！</h1>
          <div class="tip">
            <h1 style="color: darkred">这部分测试不能记笔记</h1>
            <h1 style="font-size: 50px">单词学习</h1>


          </div>
          <div class="btn">
            <el-button type="primary"
                       style="font-size:50px;margin-right: 30px"
                       @click="reListen">重听
            </el-button>
            <el-button type="primary"
                       style="font-size:50px;margin-left: 30px"
                       :disabled="tipAudioPlay"
                       @click="startLearn()">开始学习
            </el-button>
          </div>
        </div>
        <div v-if="startFlag">
          <el-progress :text-inside="true" :stroke-width="24"
                       :percentage="(restTime/totalTime*100).toFixed(0)*1" status="success"></el-progress>
          <!--                    <el-progress :percentage="(restTime/totalTime*100).toFixed(0)"></el-progress>-->
        </div>
      </el-header>
      <el-main v-if="startFlag && !timeOutFlag">
        <!--                <h3 id="restTime">剩余学习时间：{{restTime}}s</h3>-->
        <el-image v-if="imgs.length>0"
                  style="width: 150px; height: 150px; margin:0px 20px 0px 20px;"
                  v-bind:class="{'hangup':!tipAudioPlay}"
                  v-for="(item,index) in imgs"
                  :src="item.imgSrc"
                  @click="playAudio(item.imgIndex)">
        </el-image>
        <audio v-if="audios.length>0 && !tipAudioPlay" v-for="(item,index) in audios" :id='item.audioIndex'
               :src="item.audioSrc"></audio>

      </el-main>
    </el-container>

  </div>
</template>

<script>
import global_ from "../../plugins/global_variable"

export default {
  name: "learnOne",
  components: {
    // modal,//倒计时结束后弹出的对话框
  },
  data() {
    return {
      baseURL: global_.baseURL,
      startFlag: false,//是否点击开始学习按钮
      // totalTime: 180,//总时间
      // restTime: 180,//剩余学习时间
      totalTime: 120,//总时间
      restTime: 120,//剩余学习时间
      //图片，后端进行请求
      // imgs:null,
      // audios:null,

      tipAudioPlay: true,//是否在播放提示音
      tipAudio: [],//提示音数组，存放待播放的数组
      copyTipAudio: [],//提示音数组副本，存放正在播放或已经播放的数组

      canClick: false,//用户是否可以点击图片了
      firstClick: true,//标记用户是否点击第一张图片

      startTime: Date.now(),//开始学习时间

      dataList: []//存放每一个图片的学习数据
    }
  },
  props: {
    imgs: Array,
    audios: Array,
    clickTimes: Array,
  },
  mounted() {

    //防止页面后退  使用在vue时 挂载到mounted中
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });
    // this.requestRes()
    // console.log(this.audios)
    // this.tipAudio.push(new Audio(this.baseURL + this.audios[20].audioSrc))
    // this.tipAudio.push(new Audio(this.baseURL + this.audios[21].audioSrc))
    this.tipAudio.push(new Audio(this.audios[20].audioSrc))
    //this.tipAudio.push(new Audio(this.audios[21].audioSrc))
    console.log(this.tipAudio)
    this.playTipAudio()

    this.preLoadImage()
  },
  computed: {
    //计算属性，学习结束后自动弹出弹框
    timeOutFlag() {
      return this.restTime < 0
    }
  },
  // watch:{
  //   dataList(value){
  //     localStorage.setItem('dataList',JSON.stringify(value))
  //   }
  // },
  methods: {
    checkSource(){
      let flag_img = false;
      let flag_audio = false;
      let imgLists = JSON.parse(localStorage.getItem('imgs'))
      let audioLists = JSON.parse(localStorage.getItem('audios'))
      if(imgLists.length==20){
        flag_img = true
      }
      if(audioLists.length==20){
        flag_audio = true
      }
      if(flag_img&&flag_audio){
        return true
      }
      else {
        return false
      }
    },
    preLoadImage() {
      console.log(typeof this.imgs)
      console.log(this.imgs.length)

      //图片预加载
      for (let i = 0; i < this.imgs.length; i++) {
        let img = new Image()
        img.src = this.imgs[i].imgSrc
        console.log(img.src)
      }
    },
    //开始学习
    startLearn() {
      setTimeout(()=> {
        this.startFlag = true
        // let tip = new Audio(this.audios[22].audioSrc)
        let tip = new Audio(this.audios[21].audioSrc)
        tip.addEventListener("ended", this.changeCanClick)
        tip.play()
      },500)
      // this.startFlag = true
      // let tip = new Audio(this.baseURL + this.audios[22].audioSrc)
      // tip.addEventListener("ended", this.changeCanClick)
      // tip.play()
    },
    changeCanClick() {
      this.canClick = true
    },
    //开始学习倒计时，点击第一个图片后开始计时
    startTiming() {
      this.timer = setInterval(() => {
            this.restTime--
            if (this.restTime < 0) {
              //提示学习结束，并弹框，跳转测试页面
              clearInterval(this.timer)
              //学习数据发送给后端
              for (let i = 0; i < 20; i++) {
                let dataRow = {}
                //构建返回后端数据
                dataRow["expName"] = "aural_vl"//测试名称，固定
                dataRow["expType"] = localStorage.getItem('test1Type')
                var d = new Date();
                dataRow["expDate"] = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()//测试时间
                dataRow["partEmail"] = global_.email//邮箱
                dataRow["expSession"] = global_.session//邮箱
                dataRow['trialType'] = "sound_test"//固定
                dataRow['testSession'] = "learning"//学习阶段，固定
                if (i == 19)
                  dataRow['timeElapsed'] = Date.now() - this.startTime//整个测试所用时间
                dataRow['trialIndex'] = i + 1   //当前的题目对应的下标是哪个？？
                dataRow['stimulus'] = this.imgs[i].stimulus //当前题目对应的是啥？？？
                dataRow['buttonPressed'] = this.clickTimes[i]  //学习次数

                //this.dataList.push(dataRow)
                console.log(this.dataList)
                // //存数据到本地
                // localStorage.setItem('dataRow',JSON.stringify(dataRow))

                // //构建完成，发送数据给后端
                axios.post("/testOne/sendTestOneData", dataRow).then((response) => {
                    console.log(response)
                })
              }
              localStorage.setItem('dataList',JSON.stringify(this.dataList))
              // console.log(this.dataList)

              this.$emit('learnFinished')
            }
          }, 1000
      )
    },
    // //组件更换，学习完成后跳转到测试组件
    // goToTestOne(){
    //     this.restTime = 0
    //     this.$emit('learnFinished')
    // },
    //点击图片播放音频
    playAudio(index) {
      if (this.canClick) {
        this.clickTimes[index - 1]++    //点击次数加一
        console.log(this.clickTimes)
        //第一次点击图片后，开始计时
        if (this.firstClick) {
          this.startTiming()
          this.firstClick = false
        }
        console.log(index)
        let audio = document.getElementById(index)
        audio.play()
      }
    },
    playTipAudio() {
      if (this.tipAudio.length == 0) {
        this.tipAudioOver()
      } else {
        this.copyTipAudio.push(this.tipAudio[0])
        let tip = this.tipAudio.shift()
        tip.addEventListener("ended", this.playTipAudio)
        tip.play()
      }
    },
    tipAudioOver() {
      this.tipAudioPlay = false
    },
    reListen() {
      //暂停目前正在播放的音频
      for (let i = 0; i < this.copyTipAudio.length; i++) {
        this.copyTipAudio[i].pause();
      }
      //清空原来的音频
      let j = this.tipAudio.length
      for (let i = 0; i < j; i++) {
        this.tipAudio.shift()
      }
      //重新设置音频播放
      this.tipAudioPlay = true
      this.tipAudio.push(new Audio(this.audios[20].audioSrc))
      // this.tipAudio.push(new Audio(this.audios[21].audioSrc))
      this.playTipAudio()
    }
  },

}
</script>

<style scoped>
.hangup{
  cursor: pointer
}

.tip {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.btn {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  width: 1000px;
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