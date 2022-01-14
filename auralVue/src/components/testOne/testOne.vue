<template>
  <div>
    <el-container>
      <el-header height="50px">
        <div>
          <el-progress :text-inside="false" :stroke-width="24" :percentage="((quesNum-1)/totalQuesNum*100).toFixed(0)*1" status="success"></el-progress>
        </div>
      </el-header>
      <el-main>
        <div>
          <a v-for="(item,index) in shuffledImgs" style="float: left">
            <el-image v-bind:class="{'selected':(currChecked == item.imgIndex)&&!readyPlay}"
                      style="width: 150px; height: 150px; margin:0px 20px 0px 20px;
                                  cursor: pointer"
                      :src="item.imgSrc"
                      @click="submitAns(item.imgIndex,item.stimulus)"
            >
            </el-image>
          </a>
        </div>

        <div>
          <el-button type="primary"
                     style="font-size:50px;margin-right: 30px"
                     :disabled="startTipAudioPlay || !readyPlay"
                     @click="playAudio">播放</el-button>
          <el-button type="success" plain
                     style="font-size:50px"
                     v-if="tipAudioOver"
                     @click="showResult();uploadData()">结束</el-button>
        </div>
        <audio v-for="(item, index) in audios" :id='item.audioIndex' :src="item.audioSrc"></audio>
      </el-main>
    </el-container>

    <modal v-bind:md-show="testOver">
      <p style="font-size: 20px" slot="message">这部分测试共有20个单词，您答对了{{testScore}}个。</p>
      <div slot="btnGroup">
        <a style="font-size: 20px" class="btn btn--m" @click="backToMain()">回到主页面</a>
      </div>
    </modal>
  </div>

</template>

<script>
import modal from '../../components/Modal'
import GLOBAL from "../../plugins/global_variable"
import global_ from "../../plugins/global_variable";

export default {
  name: "testOne",
  components:{
    modal,
  },
  props:{
    imgs:null,
    audios:null,
    userId:null,
    clickTimes:Array,
  },
  mounted() {

    //防止页面后退  使用在vue时 挂载到mounted中
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });

    //加载页面时请求数据
    // this.requestRes()
    this.playTipAudio()
  },
  data(){
    return{
      baseURL:GLOBAL.baseURL,

      readyPlay:true,

      quesNum:1,//当前题号
      totalQuesNum:20,//总题目数量
      currChecked: null,//当前选中的答案，每题中，可以更改多次答案，只记录最后点击确认时的答案

      testOver:false,//测试结束标志
      testScore:0,//测试分数

      startPlayTime:null,
      submitAnsTime:null,

      sendData: {},//传回后端的数据
      sendDataList: [],

      startTipAudioPlay:true,//是否在播放开始的提示音
      tipAudioOver:false,//控制结束按钮


      timeElapsedStart: Date.now(),

      theLastTimeId:0,
      theCurrencyId:0,
      testFlag : false,
      learnFlag : false
    }
  },
  // watch:{
  //   sendDataList(value){
  //     localStorage.setItem('sendDataList',JSON.stringify(value))
  //   }
  // },
  computed:{
    //为什么要用计算属性来获取打乱的数据？
    //因为异步请求，当数据请求到才能打乱，不然this.imgs里面没有数据，打乱的是寂寞
    //shuffledAudios同理
    shuffledImgs(){
      //打乱图像数组
      let len = this.imgs.length;
      if(len > 0 ){
        let array = Array.from({length:20},(item, index)=> index)

        //打乱下标后，使用乱序下标进行交换图片数组
        for (let i = 19; i >= 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        for(let i = 0; i <= 19;i++){
          array[i] = this.imgs[array[i]]
        }
        return array
      }

    },
    shuffledAudios(){
      //打乱音频数组
      let len = this.audios.length;
      if(len > 0){
        let array = Array.from({length:20},(item, index)=> index)

        //打乱下标后，使用乱序下标进行交换音频数组
        for (let i = 19; i >= 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        for(let i = 0; i <= 19;i++){
          array[i] = this.audios[array[i]]
        }
        return array
      }
    }
  },
  methods:{
    //点击播放按钮播放音频
    playAudio(){
      let index = this.shuffledAudios[this.quesNum-1].audioIndex
      let audio = document.getElementById(index)
      audio.play()
      this.readyPlay=false
      this.startPlayTime = Date.now();
    },
    //提交答案
    submitAns(index,stimulus){
      console.log("")
      var sendDataCopy = {}
      if(!this.readyPlay) {
        //上传数据
        {
          /*结束处理*/
          //构建返回后端的数据
          this.sendData["expName"] = "aural_vl"//测试名称，固定
          this.sendData["expType"] = localStorage.getItem('test1Type')
          var d = new Date();
          this.sendData["expDate"] = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()//测试时间
          this.sendData["partEmail"] = global_.email
          this.sendData["expSession"] = global_.session
          this.sendData['trialType'] = "sound_test"//固定
          this.sendData['testSession'] = "test"//测试阶段，固定

          this.sendData['trialIndex'] = this.shuffledAudios[this.quesNum-1].audioIndex    //当前的题目对应的下标
          this.sendData['stimulus'] = this.imgs[this.shuffledAudios[this.quesNum-1].audioIndex-1].stimulus  //当前题目对应的单词
          //记录测试反应时间
          this.submitAnsTime = Date.now()
          this.sendData['rt'] = this.submitAnsTime - this.startPlayTime   //反应时间
          //this.sendData['buttonPressed'] = this.clickTimes[this.shuffledImgs[this.quesNum-1].imgIndex - 1]  //TODO:需定下来下标i
          this.sendData['userResponse'] = index   //用户答案对应的下标
          this.sendData['userResponseStimulus'] = stimulus //用户答案对应的单词
          if(this.sendData['trialIndex'] == index)
          {
            this.sendData['correct'] = 1
            this.testScore++
          }
          else
            this.sendData['correct'] = 0

          if(this.quesNum >= this.totalQuesNum)
          {
            this.sendData['totalScore'] = this.testScore
            this.sendData['timeElapsed'] = Date.now()-this.timeElapsedStart//整个测试所用时间
          }
          // console.log(this.sendData)
          sendDataCopy = this.sendData


          axios.post("/testOne/sendTestOneData", this.sendData).then((response) => {
              console.log(response)
          })

          // axios.post("/testOne/sendTestOneData", JSON.parse('dataRow')).then((response) => {
          // console.log(response)
          // })
        }
        console.log(sendDataCopy)
        // this.sendDataList.push(sendDataCopy)
        // console.log(this.sendDataList)
        //console.log(this.sendDataList)
        //localStorage.setItem('sendDataList',JSON.stringify(this.sendDataList))


        this.$message({
          message: '已成功作答',
          type: 'success',
        });

        //循环做题逻辑
        if (this.quesNum >= this.totalQuesNum) {
          this.quesNum++
          //播放结束提示音
          let tipAudio = new Audio(this.audios[23].audioSrc)
          console.log(tipAudio)
          tipAudio.addEventListener("ended", this.overTipAudio)
          tipAudio.play()
          //主页的index的题型1按钮不能再改了
          GLOBAL.vl_end = true;
          GLOBAL.sd_end = false;
        } else {
          //下一题
          this.quesNum++
          this.readyPlay = true
        }
      }
    },
    playTipAudio(){
      //TODO：修改提示音的部分
      let tipAudio = new Audio(this.audios[22].audioSrc)
      console.log(tipAudio)
      tipAudio.addEventListener("ended",this.startTipAudioOver)
      tipAudio.play()
    },
    startTipAudioOver(){
      this.startTipAudioPlay=false
    },
    overTipAudio(){
      this.tipAudioOver=true
    },
    showResult(){
      this.testOver = true
    },
    uploadData(){
      let list_test = []
      let list_learn = []
      list_learn = JSON.parse(localStorage.getItem('dataList'))
      list_test = JSON.parse(localStorage.getItem('sendDataList'))
      //console.log(this.sendDataList)
      // for (let i = 0; i < 20; i++) {
      //   axios.post("/testOne/sendTestOneData", list_test[i]).then((response) => {
      //     console.log(response)
      //   })
      // }
      //
      // for(let i = 0; i < 20; i++) {
      //   axios.post("/testOne/sendTestOneData", list_learn[i]).then((response) => {
      //     console.log(response)
      //   })
      // }
      // axios.get("/testOne/findMaxId").then((response) =>{
      //   this.theLastTimeId = response.data
      //   console.log(this.theLastTimeId)
      // })
      // axios.post("/testOne/sendAllTestData",this.sendDataList).then((response) => {
      //   if(response.data == 'success'){
      //     this.testFlag = true
      //   }
      //   console.log(response)
      // })

      // axios.post("/testOne/sendAllTestData", list_learn).then((response) => {
      //   if(response.data == 'success'){
      //     this.learnFlag =true
      //   }
      //   console.log(response)
      // })
      // setTimeout(()=> {
      //   axios.get("/testOne/findMaxId").then((response) => {
      //     this.theCurrencyId = response.data
      //     console.log(this.theCurrencyId)
      //   })
      // },300)
    },
    // uploadAlert(){
    //   if((this.theCurrencyId - this.theLastTimeId == 40)||(this.testFlag&&this.learnFlag)){
    //     alert("答案上传成功")
    //   }
    //   else{
    //     alert("答案上传失败")
    //   }
    // },
    backToMain(){
      localStorage.removeItem('dataList')
      localStorage.removeItem('sendDataList')
      localStorage.removeItem('imgs')
      localStorage.removeItem('audios')
      //TODO：修改返回页面的值
      this.$router.push({
        path:"/index"
      })
    }

  }
}
</script>

<style scoped>
.selected{
  opacity:0.1; filter: alpha(opacity=10);
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
</style>