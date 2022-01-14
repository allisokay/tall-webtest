<!--第一页-->
<template>
  <div class="container">
    <div class="header">
      <!--            <h1 class="el-row">欢迎来到在线学习能力测试系统</h1>-->
      <div class="el-row">
        <h1>请注意阅读以下注意事项:</h1>
      </div>
    </div>
    <div class="content">
      <div class="el-row">
        <h2>1．本测试要求不间断地一次完成全部题目，中途不能点击“后退”或“刷新”，完成全部测试需要大约1.5小时。
          如果您现在没有时间，请关闭页面退出，等有时间的时候再来测试。</h2>
        <div class="button_group1">
          <el-button id="continue_button" :class="{active: this.continue}" type="primary" @click="Check_continue()">
            我同意按要求进行测试
          </el-button>
          <el-button type="primary" style="background: #d1434a" @click="CloseWindow()">
            我现在不能保证有时间完成全部测试
          </el-button>
        </div>
      </div>

      <div class="el-row">
        <h2>2．本测试中有大量的听力题，并且需要将您的复述录音，因此必须在一个安静的环境中进行。
          您需要独立完成所有测试，不能与他人进行讨论。</h2>
        <div class="button_group1">
          <el-button id="quiet_button" type="primary" @click="Check_quiet()"
                     :disabled="!this.continue"
          >
            我同意按要求进行测试
          </el-button>
          <el-button type="primary" style="background: #d1434a" @click="CloseWindow()">
            我现在不能保证周围的环境是安静的，没有打扰
          </el-button>
        </div>
      </div>

      <div class="el-row">
        <h2>3．本测试只能在电脑上（不能在ipad或手机上）进行。请检查您的电脑设置（浏览器和音频）：<br /></h2>
        <div class="button_group2">
          <div class="browser">
            <el-button id="browser_button" type="primary" @click="Check_browser"
                       :disabled="!(this.continue&&this.quiet)">
              我使用的浏览器是Chrome或者Edge
            </el-button>
            <el-button type="primary" style="background: #d1434a" @click="CloseWindow()">
              我使用的浏览器不是以上两种
            </el-button>
          </div>

          <div class="audio">
            <el-button id="audio_button" type="primary" @click="Check_audio(),PlayAudio()"
                       :disabled="!(this.continue&&this.quiet&&this.browser)"
                       style="background: #4ABE84">
              检查音频播放
            </el-button>
            <el-button  type="primary" style="background: #d1434a" @click="CloseWindow()">
              我听不到播放的音频
            </el-button><br />
          </div>

          <div class="microphone">
            <el-button id="microphone_button" type="primary" @click="Check_microphone()"
                       :disabled="!(this.continue&&this.quiet&&this.browser&&this.audio_canplay)"
                       style="background: #4ABE84">
              测试麦克风
            </el-button>
            <el-button v-show="microphone"
                       @click="handleStart()">
              点击录音
            </el-button>
            <el-button v-show="microphone"
                       @click="handleStop()">
              结束录音
            </el-button>
            <el-button v-show="play_microAudio"
                       @click="handlePlay()">
              播放录音
            </el-button>
            <el-button type="primary" style="background: #d1434a" @click="CloseWindow()">
              我听不到麦克风的录音
            </el-button><br />
          </div>

        </div>
      </div>
      <el-row>
        <div>
          <el-button type="primary" @click="NextPage()"
                     :disabled="!CheckNext()"
                     style="float: right">
            进入下一页</el-button>
        </div>
      </el-row>

    </div>
  </div>
</template>

<script>
import Recorder from 'js-audio-recorder'

export default {

  name: "BeforeLogin",
  data(){
    return{
      continue:false,
      quiet:false,
      browser:false,
      audio_canplay:false,
      microphone:false,
      finish:false,
      microCount:0,
      play_microAudio:false,
      recorder:'',
      timer:''
    }
  },
  methods:{
    //点击，退出系统
    CloseWindow(){
      if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
        window.location.href="about:blank";
        window.close();
      } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
      }
    },
    //记录第一步操作结果
    Check_continue(){
      this.continue = true;
      document.getElementById("continue_button").style.background = "lightblue"
    },
    Check_quiet(){
      this.quiet = true;
      document.getElementById("quiet_button").style.background = "lightblue"
    },
    Check_browser(){
      this.browser = true;
      document.getElementById("browser_button").style.background = "lightblue"
    },
    Check_audio(){
      this.audio_canplay = true;
      document.getElementById("audio_button").style.background = "lightblue"
    },
    Check_microphone(){
      this.microphone =true;
      document.getElementById("microphone_button").style.background = "lightblue"
    },
    PlayAudio(){
      var audio_src = require('../assets/audio/Lenovo.mp3');
      var audio = new Audio(audio_src);
      audio.play();
    },
    handleStart (){
      this.recorder = new Recorder()
      Recorder.getPermission().then(() => {
        console.log('开始录音')
        this.recorder.start() // 开始录音
      }, (error) => {
        this.$message.info('请先允许该网页使用麦克风')
        console.log(`${error.name} : ${error.message}`)
      })
    },
    handleStop () {
      console.log('停止录音')
      this.recorder.stop() // 停止录音
      this.play_microAudio = true
    },
    handlePlay () {
      console.log('播放录音')
      this.recorder.play() // 播放录音
      this.finish = true
      // 播放时长
      this.timer = setInterval(() => {
        try {
          this.playTime = this.recorder.getPlayTime()
        } catch (error) {
          this.timer = null
        }
      }, 100)
    },
    // CheckMicrophoneTimes(){
    //   this.microCount++;
    //   if(this.microCount == 1){
    //     this.handleStart()
    //   }
    //   else if(this.microCount == 2){
    //     this.handleStop()
    //   }
    //   else{
    //     this.play_microAudio =true
    //   }
    //
    // },
    CheckNext(){
      if(this.continue&&this.quiet&&this.browser&&this.audio_canplay&&this.microphone&&this.finish){
        return true
      }
      else{
        return false
      }
    },
    NextPage(){
      console.log('进入下一页')
      this.$router.push('/Login');
    },


  }
}
</script>

<style scoped>
h1{
  margin-top: 40px;
  line-height:50px;
  padding: 0px;
}
.container{
  width: 80%;
  height: 80%;
  margin-right: 10%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*height: 100vh;*/
}
.header{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 10px;
}
.footer{
  height: 75px;
}
.content{
  display: flex;
  flex-direction: column;
  flex: 1;
  /*position: fixed;*/
}
.left,.right{
  width:200px;
}
.center{
  flex: 1;
}
.el-row{
  font-size:16px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin-bottom:20px;
}
.button_group1{
  margin-bottom: 10%;
}
.button_group2{
  width: 70%;
  length: 70%;
  display: flex;
  flex-direction:column ;
}
el-button{
  background: #0ABBF9;

}
.browser{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom:20px
}
.audio{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom:20px
}
.microphone{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom:20px
}



</style>